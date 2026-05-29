import assert from 'node:assert';
import {
  createInspectArtifactsFromPlaywrightTimeline,
  createInspectBundle,
  createInspectFeatureMap,
  createInspectProof,
  createInspectReport,
  decodeInspectJsonl,
  encodeInspectJsonl,
  queryInspectBundle,
  redactInspectBundle,
  traceInspectImpact
} from '../dist/index.js';

const timeline = createInspectArtifactsFromPlaywrightTimeline([
  {
    index: 0,
    label: 'before',
    timestamp: 10,
    state: [{ id: 'state', paths: [{ path: 'entities.todos', value: [{ id: '1', text: 'old' }] }] }],
    dom: [{ id: 'save', selector: '[data-action="save"]', nodes: [{ index: 0, text: 'Save' }] }],
    marks: [{ id: 'start', label: 'save todo', timestamp: 10, data: { route: 'route:/todos/1' } }],
    registry: [
      {
        id: 'registry',
        entries: [
          {
            id: 'todo.save',
            kind: 'action',
            feature: 'todos',
            package: '@app/todos',
            tags: ['mutation'],
            sourceFiles: ['src/todos/save.ts'],
            touches: ['route:/todos/:id']
          }
        ],
        records: [{ id: 'record:save:1', entryId: 'todo.save', kind: 'action', status: 'ok' }]
      }
    ]
  }
], {
  id: 'artifact:playwright',
  sourcePackage: '@shapeshift-labs/frontier-playwright',
  feature: 'todos',
  tags: ['playwright'],
  resources: ['route:/todos/:id']
});

const bundle = createInspectBundle({
  id: 'inspect:smoke',
  graph: {
    entries: [
      {
        id: 'todo.save',
        kind: 'action',
        feature: 'todos',
        package: '@app/todos',
        reads: ['form.todo'],
        writes: ['entities.todos'],
        touches: ['route:/todos/:id'],
        source: { file: 'src/todos/save.ts', line: 4 }
      },
      {
        id: 'todo.test',
        kind: 'test',
        feature: 'todos',
        package: '@app/todos',
        covers: ['todo.save'],
        source: { file: 'test/todos/save.test.ts' }
      }
    ]
  },
  artifacts: [
    timeline,
    {
      id: 'artifact:migration',
      kind: 'migration',
      sourcePackage: '@shapeshift-labs/frontier-migrations',
      feature: 'todos',
      files: ['migrations/001-todos.ts'],
      paths: ['entities.todos'],
      events: [{ id: 'migration:todos', type: 'migration', path: 'entities.todos', status: 'changed' }]
    }
  ],
  events: [
    {
      id: 'manual:telemetry',
      type: 'telemetry',
      entryId: 'todo.save',
      feature: 'todos',
      package: '@app/todos',
      status: 'changed',
      value: { token: 'secret-value', count: 1 }
    }
  ]
});

assert.strictEqual(bundle.summary.entryCount, 2);
assert.ok(bundle.summary.eventCount >= 5);
assert.ok(bundle.graph.edges.some((edge) => edge.kind === 'declared-in' && edge.to === 'file:src/todos/save.ts'));

const byFeature = queryInspectBundle(bundle, { features: ['todos'] });
assert.strictEqual(byFeature.registry.entries.length, 2);
assert.ok(byFeature.artifacts.some((artifact) => artifact.id === 'artifact:playwright'));
assert.ok(byFeature.events.some((event) => event.id === 'manual:telemetry'));

const byResource = queryInspectBundle(bundle, { resources: ['route:/todos/:id'] });
assert.ok(byResource.artifacts.some((artifact) => artifact.id === 'artifact:playwright'));

const impact = traceInspectImpact(bundle, { paths: ['entities.todos'] });
assert.ok(impact.registry.entries.some((entry) => entry.id === 'todo.save'));
assert.ok(impact.resources.includes('route:/todos/:id'));
assert.ok(impact.files.includes('src/todos/save.ts'));

const featureMap = createInspectFeatureMap(bundle);
const todos = featureMap.features.find((feature) => feature.id === 'todos');
assert.ok(todos);
assert.ok(todos.entries.includes('todo.save'));
assert.ok(todos.artifacts.includes('artifact:playwright'));
assert.ok(todos.events.includes('manual:telemetry'));

const proof = createInspectProof(bundle);
assert.match(proof.hash, /^[0-9a-f]{8}$/);

const redacted = redactInspectBundle(bundle, { redactKeys: ['token'] });
assert.strictEqual(redacted.events.find((event) => event.id === 'manual:telemetry').value.token, '[redacted]');

const jsonl = encodeInspectJsonl(redacted);
assert.ok(jsonl.includes('frontier.inspect.jsonl'));
const decoded = decodeInspectJsonl(jsonl);
assert.strictEqual(decoded.id, 'inspect:smoke');
assert.strictEqual(decoded.summary.entryCount, bundle.summary.entryCount);

const report = createInspectReport(bundle, {
  queries: [{ id: 'todos', query: { features: ['todos'] } }],
  impact: { paths: ['entities.todos'] },
  includeFeatureMap: true,
  includeJsonl: true,
  redactKeys: ['token']
});
assert.strictEqual(report.kind, 'frontier.inspect.report');
assert.strictEqual(report.queries[0].id, 'todos');
assert.ok(report.featureMap.features.some((feature) => feature.id === 'todos'));
assert.ok(report.jsonl.includes('[redacted]'));

console.log('frontier inspect smoke passed');
