import assert from 'node:assert';
import {
  createInspectArtifactFromBenchmarkReport,
  createInspectArtifactFromEventLog,
  createInspectArtifactFromLogRecords,
  createInspectArtifactFromMigrationReport,
  createInspectArtifactFromRouteImpact,
  createInspectArtifactFromRouteManifest,
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

const routeManifest = createInspectArtifactFromRouteManifest({
  routes: [
    {
      id: 'todos.detail',
      kind: 'route',
      pattern: 'route:/todos/:id',
      feature: 'todos',
      package: '@app/todos',
      reads: ['entities.todos'],
      writes: ['ui.route'],
      source: { file: 'src/todos/routes.ts' },
      tags: ['route']
    }
  ],
  transitions: [{ from: 'todos.list', to: 'todos.detail', kind: 'push', reads: ['auth.user'] }]
}, { id: 'artifact:route-manifest', feature: 'todos' });

const routeImpact = createInspectArtifactFromRouteImpact({
  routeIds: ['todos.detail'],
  transitionIds: ['transition:todos.detail'],
  resources: ['route:/todos/:id'],
  paths: ['/entities/todos', '/ui/route'],
  files: ['src/todos/routes.ts'],
  features: ['todos'],
  packages: ['@app/todos'],
  tags: ['route']
}, { id: 'artifact:route-impact' });

const migrationReport = createInspectArtifactFromMigrationReport({
  registryId: 'todos',
  fromVersion: '1',
  toVersion: '2',
  changed: true,
  dryRun: false,
  steps: [{ id: 'todos.v2', from: '1', to: '2', reads: ['entities.todos'], writes: ['entities.todosById'], elapsedMs: 2 }],
  warnings: [{ severity: 'warning', message: 'manual review', path: 'entities.todos' }]
}, { id: 'artifact:migration-report', feature: 'todos' });

const logRecords = createInspectArtifactFromLogRecords([
  {
    time: 12,
    level: 'warn',
    name: 'todo.save.warn',
    message: 'slow save',
    attributes: { feature: 'todos', package: '@app/todos', entryId: 'todo.save', path: '/entities/todos', resource: 'route:/todos/:id' }
  }
], { id: 'artifact:logs' });

const eventLog = createInspectArtifactFromEventLog([
  {
    offset: 1,
    timestamp: 13,
    key: 'todo.save',
    headers: { feature: 'todos', path: '/entities/todos', resource: 'route:/todos/:id' },
    value: { kind: 'patch', patch: [['replace', '/entities/todos/1/text', 'new']] }
  }
], { id: 'artifact:event-log' });

const benchmark = createInspectArtifactFromBenchmarkReport({
  package: '@app/todos',
  rows: [{ fixture: 'todo-save', medianUs: 12, p95Us: 20 }]
}, { id: 'artifact:benchmark', feature: 'todos' });

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
    routeManifest,
    routeImpact,
    migrationReport,
    logRecords,
    eventLog,
    benchmark,
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

assert.strictEqual(bundle.summary.entryCount, 5);
assert.ok(bundle.summary.eventCount >= 5);
assert.ok(bundle.graph.edges.some((edge) => edge.kind === 'declared-in' && edge.to === 'file:src/todos/save.ts'));

const byFeature = queryInspectBundle(bundle, { features: ['todos'] });
assert.ok(byFeature.registry.entries.some((entry) => entry.id === 'todo.save'));
assert.ok(byFeature.registry.entries.some((entry) => entry.id === 'todos.detail'));
assert.ok(byFeature.artifacts.some((artifact) => artifact.id === 'artifact:playwright'));
assert.ok(byFeature.events.some((event) => event.id === 'manual:telemetry'));

const byResource = queryInspectBundle(bundle, { resources: ['route:/todos/:id'] });
assert.ok(byResource.artifacts.some((artifact) => artifact.id === 'artifact:playwright'));
assert.ok(byResource.artifacts.some((artifact) => artifact.id === 'artifact:route-impact'));
assert.ok(byResource.events.some((event) => event.id.startsWith('log:')));

const byArtifactKind = queryInspectBundle(bundle, { artifactKinds: ['migration-report'] });
assert.strictEqual(byArtifactKind.artifacts[0].id, 'artifact:migration-report');

const byStatus = queryInspectBundle(bundle, { statuses: ['pending'] });
assert.ok(byStatus.events.some((event) => event.type === 'migration.diagnostic'));

const impact = traceInspectImpact(bundle, { paths: ['entities.todos'] });
assert.ok(impact.registry.entries.some((entry) => entry.id === 'todo.save'));
assert.ok(impact.resources.includes('route:/todos/:id'));
assert.ok(impact.files.includes('src/todos/save.ts'));

const featureMap = createInspectFeatureMap(bundle);
const todos = featureMap.features.find((feature) => feature.id === 'todos');
assert.ok(todos);
assert.ok(todos.entries.includes('todo.save'));
assert.ok(todos.entries.includes('todos.detail'));
assert.ok(todos.artifacts.includes('artifact:playwright'));
assert.ok(todos.benchmarks.includes('artifact:benchmark'));
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
