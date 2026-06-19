import assert from 'node:assert';
import {
  createInspectArtifactFromBenchmarkReport,
  createInspectArtifactFromEventLog,
  createInspectArtifactFromLogRecords,
  createInspectArtifactFromMigrationReport,
  createInspectArtifactFromRouteImpact,
  createInspectArtifactFromRouteManifest,
  createInspectArtifactFromSemanticMergeEvidence,
  createInspectArtifactsFromPlaywrightTimeline,
  createInspectBundle,
  createInspectFeatureMap,
  createInspectProof,
  createInspectSwarmLifetimeSummary,
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

const semanticMerge = createInspectArtifactFromSemanticMergeEvidence({
  id: 'inspect-semantic-merge-evidence',
  mergeId: 'merge:inspect-semantic',
  changedPaths: ['frontierInspect/semanticMergeEvidence'],
  changedFiles: ['packages/frontier-inspect/src/index.ts'],
  semanticRegions: [
    {
      id: 'region:semantic-merge-helper',
      kind: 'function',
      file: 'packages/frontier-inspect/src/index.ts',
      path: ['frontierInspect', 'semanticMergeEvidence'],
      symbol: 'createInspectArtifactFromSemanticMergeEvidence',
      startLine: 1,
      endLine: 1,
      writes: ['frontierInspect/semanticMergeEvidence'],
      tags: ['helper']
    }
  ],
  decision: 'accepted',
  status: 'changed',
  proofLinks: [
    {
      id: 'proof:frontier-inspect-test',
      kind: 'test-log',
      href: 'agent-runs/run11/evidence/frontier-inspect-test.log',
      hash: 'abc123',
      status: 'ok'
    }
  ]
}, {
  id: 'artifact:semantic-merge',
  feature: 'inspect',
  package: '@shapeshift-labs/frontier-inspect',
  tags: ['semantic']
});

assert.strictEqual(semanticMerge.kind, 'semantic-merge-evidence');
assert.ok(semanticMerge.paths.includes('/frontierInspect/semanticMergeEvidence'));
assert.ok(semanticMerge.files.includes('packages/frontier-inspect/src/index.ts'));
assert.strictEqual(semanticMerge.data.decision, 'accepted');
assert.strictEqual(semanticMerge.data.status, 'changed');
assert.strictEqual(semanticMerge.data.semanticRegions[0].symbol, 'createInspectArtifactFromSemanticMergeEvidence');
assert.strictEqual(semanticMerge.data.proofLinks[0].href, 'agent-runs/run11/evidence/frontier-inspect-test.log');

const semanticBundle = createInspectBundle({
  id: 'inspect:semantic-merge',
  artifacts: [semanticMerge]
});
const semanticByStatus = queryInspectBundle(semanticBundle, { statuses: ['changed'] });
assert.ok(semanticByStatus.events.some((event) => event.type === 'semantic-merge'));
assert.ok(semanticByStatus.events.some((event) => event.type === 'semantic-region'));
const semanticByProof = queryInspectBundle(semanticBundle, { resources: ['agent-runs/run11/evidence/frontier-inspect-test.log'] });
assert.ok(semanticByProof.events.some((event) => event.type === 'semantic-merge.proof'));
const semanticImpact = traceInspectImpact(semanticBundle, { paths: ['frontierInspect/semanticMergeEvidence'] });
assert.ok(semanticImpact.registry.entries.some((entry) => entry.id === 'region:semantic-merge-helper'));
assert.ok(semanticImpact.files.includes('packages/frontier-inspect/src/index.ts'));
const semanticDecoded = decodeInspectJsonl(encodeInspectJsonl(semanticBundle));
const semanticDecodedArtifact = semanticDecoded.artifacts.find((artifact) => artifact.id === 'artifact:semantic-merge');
assert.ok(semanticDecodedArtifact);
assert.deepStrictEqual(semanticDecodedArtifact.data.changedPaths, ['/frontierInspect/semanticMergeEvidence']);
assert.strictEqual(semanticDecodedArtifact.data.semanticRegions[0].id, 'region:semantic-merge-helper');
assert.strictEqual(semanticDecodedArtifact.data.proofLinks[0].hash, 'abc123');
assert.ok(semanticDecoded.events.some((event) => event.status === 'changed'));

const swarmLifetimeBundle = createInspectBundle({
  id: 'inspect:swarm-lifetime',
  artifacts: [
    {
      id: 'artifact:worker:active',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'active worker output',
      files: ['workers/active-worker.json'],
      resources: ['run:worker-active'],
      data: {
        agentId: 'worker-17',
        jobId: 'job:worker-17',
        taskId: 'task:worker-17',
        status: 'running',
        usage: {
          inputTokens: 120,
          cachedInputTokens: 20,
          uncachedInputTokens: 100,
          outputTokens: 30,
          totalTokens: 150
        },
        cost: {
          estimatedCostUsd: 0.42
        }
      }
    },
    {
      id: 'artifact:worker:useful',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'completed worker output',
      files: ['workers/useful-worker.json'],
      resources: ['run:worker-useful'],
      data: {
        jobId: 'job:worker-useful',
        taskId: 'task:worker-useful',
        status: 'committed',
        usage: {
          inputTokens: 12,
          outputTokens: 4,
          totalTokens: 16
        },
        cost: {
          estimatedCostUsd: 0.08
        }
      }
    }
  ],
  events: [
    {
      id: 'event:review',
      type: 'decision',
      label: 'coordinator review',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      status: 'needs-review',
      resource: 'coordinator-review',
      value: {
        decisionId: 'decision:review',
        jobId: 'job:review',
        taskId: 'task:review',
        status: 'needs-review'
      }
    },
    {
      id: 'event:rerun',
      type: 'decision',
      label: 'rerun stale worker',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      status: 'rerun',
      resource: 'rerun-work',
      value: {
        decisionId: 'decision:rerun',
        jobId: 'job:rerun',
        taskId: 'task:rerun',
        status: 'rerun'
      }
    },
    {
      id: 'event:question',
      type: 'decision',
      label: 'human question',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      status: 'human-blocked',
      resource: 'human-questions',
      value: {
        questionId: 'question:approval',
        decisionId: 'decision:question',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the new summary shape?; answer-code=approve|reject',
        question: 'Approve the new summary shape?'
      }
    }
  ]
});

const swarmLifetimeSummary = createInspectSwarmLifetimeSummary(swarmLifetimeBundle);
assert.strictEqual(swarmLifetimeSummary.kind, 'frontier.inspect.swarm-lifetime-summary');
assert.strictEqual(swarmLifetimeSummary.live.activeAgents.count, 1);
assert.ok(swarmLifetimeSummary.live.activeAgents.ids.includes('worker-17'));
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.activeWork, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.coordinatorReview, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.rerunWork, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.humanQuestions, 1);
assert.strictEqual(swarmLifetimeSummary.live.reviewDebt.count, 2);
assert.strictEqual(swarmLifetimeSummary.live.trueHumanQuestions.count, 1);
assert.ok(swarmLifetimeSummary.live.trueHumanQuestions.reasons.some((reason) => reason.startsWith('human-question:')));
assert.strictEqual(swarmLifetimeSummary.usefulOutputCount, 1);
assert.strictEqual(swarmLifetimeSummary.cost?.known, true);
assert.strictEqual(swarmLifetimeSummary.cost?.inputTokens, 132);
assert.strictEqual(swarmLifetimeSummary.cost?.outputTokens, 34);
assert.strictEqual(swarmLifetimeSummary.cost?.totalTokens, 166);
assert.strictEqual(swarmLifetimeSummary.cost?.estimatedCostUsd, 0.5);
assert.ok(swarmLifetimeSummary.sourcesScanned.packages.includes('@shapeshift-labs/frontier-swarm-codex'));
assert.ok(swarmLifetimeSummary.sourcesScanned.files.includes('workers/active-worker.json'));
assert.ok(swarmLifetimeSummary.archivedEvidence.artifactCount >= 2);
assert.ok(swarmLifetimeSummary.archivedEvidence.eventCount >= 3);

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
