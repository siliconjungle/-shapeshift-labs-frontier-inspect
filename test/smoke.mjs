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
  createInspectBundleHealthSummary,
  createInspectDefaultDrainGateHealthSummary,
  createInspectAppliedWorkSummary,
  createInspectAutonomousMergeHealthSummary,
  createInspectMergeQueueHealthSummary,
  createInspectContinuousPoolHealthSummary,
  createInspectCoordinatorQueueThroughputSummary,
  createInspectDashboardSummary,
  createInspectFeatureMap,
  createInspectProof,
  createInspectAutonomousRunOutcomeSummary,
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
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'implementation',
        agentId: 'worker-17',
        jobId: 'job:worker-17',
        taskId: 'task:worker-17',
        status: 'running',
        runtimeMs: 1200,
        usage: {
          inputTokens: 120,
          cachedInputTokens: 20,
          uncachedInputTokens: 100,
          outputTokens: 30,
          totalTokens: 150
        },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:worker:completed',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'completed worker output',
      files: ['workers/completed-worker.json'],
      resources: ['run:worker-completed'],
      data: {
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'implementation',
        jobId: 'job:worker-completed',
        taskId: 'task:worker-completed',
        status: 'completed',
        runtimeMs: 2100,
        usage: {
          inputTokens: 12,
          outputTokens: 4,
          totalTokens: 16
        },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:worker:committed',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'committed worker output',
      files: ['workers/committed-worker.json'],
      resources: ['run:worker-committed'],
      data: {
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'implementation',
        jobId: 'job:worker-committed',
        taskId: 'task:worker-committed',
        status: 'committed',
        runtimeMs: 3400,
        usage: {
          inputTokens: 9,
          outputTokens: 5,
          totalTokens: 14
        },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        },
        wasteFlags: ['stale-worker-rerun']
      }
    },
    {
      id: 'artifact:worker:missing-pricing',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'missing pricing worker output',
      files: ['workers/missing-pricing-worker.json'],
      resources: ['run:worker-missing-pricing'],
      data: {
        modelId: 'gpt-5.4-pro',
        computeTier: 'codex.priority',
        taskKind: 'review',
        jobId: 'job:worker-missing-pricing',
        taskId: 'task:worker-missing-pricing',
        status: 'success',
        runtimeMs: 5100,
        usage: {
          inputTokens: 60,
          outputTokens: 12,
          totalTokens: 72
        }
      }
    },
    {
      id: 'artifact:worker:waste',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'waste worker output',
      files: ['workers/waste-worker.json'],
      resources: ['run:worker-waste'],
      data: {
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'implementation',
        jobId: 'job:worker-waste',
        taskId: 'task:worker-waste',
        status: 'queued',
        runtimeMs: 900,
        usage: {
          inputTokens: 18,
          outputTokens: 2,
          totalTokens: 20
        },
        wasteFlags: ['rejected-worker'],
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:gate:package',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'package gates for drained run',
      files: ['auto-drain/package-gates.json'],
      resources: ['gate:packages/frontier-inspect'],
      data: {
        package: '@shapeshift-labs/frontier-inspect',
        finalGateSummary: {
          gates: [
            { name: 'packages/frontier-inspect test', required: true, status: 'passed' },
            { name: 'packages/frontier-inspect lint', required: true, status: 'failed' }
          ]
        }
      }
    },
    {
      id: 'artifact:audit:stale-collection-row',
      kind: 'collection-row',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      summary: 'stale intermediate collection row',
      files: ['auto-drain/coordinator-review/stale-row.json'],
      resources: ['collection:coordinator-review'],
      data: {
        status: 'stale-against-head',
        kind: 'collection-row',
        summary: 'stale intermediate collection row'
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
      label: 'rerun worker',
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
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'rerun',
        runtimeMs: 95,
        usage: {
          inputTokens: 14,
          outputTokens: 2,
          totalTokens: 16
        },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        },
        status: 'rerun'
      }
    },
    {
      id: 'event:conflict',
      type: 'decision',
      label: 'conflict blocked worker',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'inspect',
      status: 'conflict-blocked',
      resource: 'conflict-work',
      value: {
        decisionId: 'decision:conflict',
        jobId: 'job:conflict',
        taskId: 'task:conflict',
        status: 'conflict-blocked'
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

const swarmLifetimeSummary = createInspectAutonomousRunOutcomeSummary(swarmLifetimeBundle);
assert.strictEqual(swarmLifetimeSummary.kind, 'frontier.inspect.swarm-lifetime-summary');
assert.strictEqual(swarmLifetimeSummary.live.activeAgents.count, 1);
assert.ok(swarmLifetimeSummary.live.activeAgents.ids.includes('worker-17'));
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.activeWork, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.coordinatorReview, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.completedHistory, 2);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.committedApplied, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.conflicts, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.rerunWork, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.packageGates, 2);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.suppressedAuditArtifacts, 1);
assert.strictEqual(swarmLifetimeSummary.live.queueDepthByMeaning.humanQuestions, 1);
assert.strictEqual(swarmLifetimeSummary.live.reviewDebt.count, 2);
assert.strictEqual(swarmLifetimeSummary.live.trueHumanQuestions.count, 1);
assert.ok(swarmLifetimeSummary.live.trueHumanQuestions.reasons.some((reason) => reason.startsWith('human-question:')));
assert.strictEqual(swarmLifetimeSummary.live.runOutcomes.completed.count, 1);
assert.strictEqual(swarmLifetimeSummary.live.runOutcomes.committedApplied.count, 1);
assert.strictEqual(swarmLifetimeSummary.live.runOutcomes.conflicts.count, 1);
assert.strictEqual(swarmLifetimeSummary.live.runOutcomes.reruns.count, 1);
assert.strictEqual(swarmLifetimeSummary.live.packageGates.count, 2);
assert.deepStrictEqual(swarmLifetimeSummary.live.packageGates.states, ['failed', 'passed']);
assert.strictEqual(swarmLifetimeSummary.live.packageGates.requiredCount, 2);
assert.strictEqual(swarmLifetimeSummary.live.packageGates.failedCount, 1);
assert.strictEqual(swarmLifetimeSummary.live.packageGates.passedCount, 1);
assert.strictEqual(swarmLifetimeSummary.live.suppressedAuditArtifacts.count, 1);
assert.ok(swarmLifetimeSummary.live.suppressedAuditArtifacts.reasons.some((reason) => reason.includes('collection')));
assert.strictEqual(swarmLifetimeSummary.visibleOutcomeCount, 2);
assert.strictEqual(swarmLifetimeSummary.suppressedAuditArtifactCount, 1);
assert.strictEqual(swarmLifetimeSummary.usefulOutputCount, 2);
assert.strictEqual(swarmLifetimeSummary.cost?.known, true);
assert.strictEqual(swarmLifetimeSummary.cost?.inputTokens, 233);
assert.strictEqual(swarmLifetimeSummary.cost?.outputTokens, 55);
assert.strictEqual(swarmLifetimeSummary.cost?.totalTokens, 288);
assert.ok(Math.abs((swarmLifetimeSummary.cost?.estimatedCostUsd ?? 0) - 0.00030975) < 1e-12);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.modelCount, 2);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.computeTierCount, 2);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.taskKindCount, 3);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.count, 6);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.successCount, 3);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.usefulOutputCount, 3);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.cheapSuccessCount, 1);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.expensiveSuccessCount, 2);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.rerunCount, 1);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.staleCount, 1);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.rejectCount, 1);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.escalationBenefitCount, 1);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.missingPricingCount, 1);
assert.ok(Math.abs(swarmLifetimeSummary.modelPerformance.successRate - 0.5) < 1e-12);
assert.ok(Math.abs(swarmLifetimeSummary.modelPerformance.usefulOutputRate - 0.5) < 1e-12);
assert.ok(Math.abs(swarmLifetimeSummary.modelPerformance.wasteRate - 0.5) < 1e-12);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.cost?.known, true);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.cost?.inputTokens, 233);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.cost?.outputTokens, 55);
assert.strictEqual(swarmLifetimeSummary.modelPerformance.cost?.totalTokens, 288);
assert.ok(Math.abs((swarmLifetimeSummary.modelPerformance.cost?.estimatedCostUsd ?? 0) - 0.00030975) < 1e-12);
const modelPerformanceByModel = new Map(swarmLifetimeSummary.modelPerformance.byModel.map((entry) => [entry.model, entry]));
const miniPerformance = modelPerformanceByModel.get('gpt-5.4-mini');
const proPerformance = modelPerformanceByModel.get('gpt-5.4-pro');
assert.ok(miniPerformance);
assert.ok(proPerformance);
assert.strictEqual(miniPerformance.count, 5);
assert.strictEqual(miniPerformance.usefulOutputCount, 2);
assert.strictEqual(miniPerformance.cheapSuccessCount, 1);
assert.strictEqual(miniPerformance.expensiveSuccessCount, 1);
assert.strictEqual(miniPerformance.rerunCount, 1);
assert.strictEqual(miniPerformance.staleCount, 1);
assert.strictEqual(miniPerformance.rejectCount, 1);
assert.strictEqual(miniPerformance.escalationBenefitCount, 1);
assert.strictEqual(miniPerformance.missingPricingCount, 0);
assert.strictEqual(miniPerformance.cost?.known, true);
assert.ok(miniPerformance.byComputeTier.some((entry) => entry.computeTier === 'codex.standard'));
assert.strictEqual(proPerformance.count, 1);
assert.strictEqual(proPerformance.usefulOutputCount, 1);
assert.strictEqual(proPerformance.cheapSuccessCount, 0);
assert.strictEqual(proPerformance.expensiveSuccessCount, 1);
assert.strictEqual(proPerformance.missingPricingCount, 1);
assert.strictEqual(proPerformance.cost?.known, false);
assert.strictEqual(proPerformance.cost?.inputTokens, 60);
assert.strictEqual(proPerformance.cost?.outputTokens, 12);
assert.strictEqual(proPerformance.cost?.totalTokens, 72);
assert.ok(swarmLifetimeSummary.sourcesScanned.packages.includes('@shapeshift-labs/frontier-swarm-codex'));
assert.ok(swarmLifetimeSummary.sourcesScanned.files.includes('workers/active-worker.json'));
assert.ok(swarmLifetimeSummary.archivedEvidence.artifactCount >= 5);
assert.ok(swarmLifetimeSummary.archivedEvidence.eventCount >= 4);

const emptyLifetimeSummary = createInspectAutonomousRunOutcomeSummary(createInspectBundle({ id: 'inspect:empty-history' }));
assert.strictEqual(emptyLifetimeSummary.modelPerformance.count, 0);
assert.strictEqual(emptyLifetimeSummary.modelPerformance.modelCount, 0);
assert.strictEqual(emptyLifetimeSummary.modelPerformance.byModel.length, 0);
assert.strictEqual(emptyLifetimeSummary.modelPerformance.missingPricingCount, 0);
assert.strictEqual(emptyLifetimeSummary.modelPerformance.cost, undefined);

const autonomousMergeHealthBundle = createInspectBundle({
  id: 'inspect:autonomous-merge-health',
  generatedAt: 10_000,
  artifacts: [
    {
      id: 'artifact:merge:coordinator',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active coordinator',
      files: ['auto-drain/coordinator.json'],
      resources: ['coordinator:lane:ops'],
      data: {
        coordinatorId: 'coordinator-1',
        lane: 'lane:ops',
        status: 'running',
        jobId: 'job:coordinator',
        taskId: 'task:coordinator',
        queueItemIds: ['queue:coordinator']
      }
    },
    {
      id: 'artifact:merge:review-old',
      kind: 'collection-row',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'old coordinator review state',
      files: ['auto-drain/collection/review-old.json'],
      resources: ['lane:docs'],
      data: {
        decisionId: 'decision:review-close',
        jobId: 'job:review-close',
        taskId: 'task:review-close',
        queueItemIds: ['queue:review-close'],
        lane: 'lane:docs',
        status: 'coordinator-review'
      }
    },
    {
      id: 'artifact:merge:review-open',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'open coordinator review state',
      timestamp: 9_000,
      files: ['auto-drain/collection/review-open.json'],
      resources: ['lane:api'],
      data: {
        decisionId: 'decision:review-open',
        jobId: 'job:review-open',
        taskId: 'task:review-open',
        queueItemIds: ['queue:review-open'],
        lane: 'lane:api',
        status: 'coordinator-review',
        reason: 'needs manual review',
        owner: 'docs-review-owner',
        terminalPath: 'auto-drain/collection/review-open.json'
      }
    },
    {
      id: 'artifact:merge:human-blocker',
      kind: 'collection-row',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'explicit human blocker',
      files: ['auto-drain/collection/human-blocker.json'],
      resources: ['lane:design'],
      data: {
        decisionId: 'decision:human-blocker',
        jobId: 'job:human-blocker',
        taskId: 'task:human-blocker',
        queueItemIds: ['queue:human-blocker'],
        lane: 'lane:design',
        status: 'human-blocked',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the merge-health summary?; answer-code=approve|reject'
      }
    },
    {
      id: 'artifact:merge:cleanup',
      kind: 'collection-row',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'rerun cleanup item',
      files: ['auto-drain/collection/cleanup.json'],
      resources: ['lane:cleanup'],
      data: {
        decisionId: 'decision:cleanup',
        jobId: 'job:cleanup',
        taskId: 'task:cleanup',
        queueItemIds: ['queue:cleanup'],
        lane: 'lane:cleanup',
        status: 'rerun'
      }
    }
  ],
  events: [
    {
      id: 'event:merge:review-close',
      type: 'decision',
      label: 'applied review close',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      status: 'applied',
      resource: 'lane:docs',
      value: {
        decisionId: 'decision:review-close',
        jobId: 'job:review-close',
        taskId: 'task:review-close',
        queueItemIds: ['queue:review-close'],
        lane: 'lane:docs',
        status: 'applied',
        commit: 'commit:applied'
      }
    },
    {
      id: 'event:merge:terminal-reject',
      type: 'decision',
      label: 'rejected terminal decision',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      status: 'rejected',
      resource: 'lane:terminal',
      value: {
        decisionId: 'decision:terminal-reject',
        jobId: 'job:terminal-reject',
        taskId: 'task:terminal-reject',
        queueItemIds: ['queue:terminal-reject'],
        lane: 'lane:terminal',
        status: 'rejected'
      }
    }
  ]
});

const autonomousMergeHealthSummary = createInspectAutonomousMergeHealthSummary(autonomousMergeHealthBundle);
assert.strictEqual(autonomousMergeHealthSummary.kind, 'frontier.inspect.autonomous-merge-health-summary');
assert.strictEqual(autonomousMergeHealthSummary.activeCoordinators.count, 1);
assert.deepStrictEqual(autonomousMergeHealthSummary.activeCoordinators.ids, ['coordinator-1']);
assert.strictEqual(autonomousMergeHealthSummary.openLanes.count, 4);
assert.ok(autonomousMergeHealthSummary.openLanes.ids.includes('lane:ops'));
assert.ok(autonomousMergeHealthSummary.openLanes.ids.includes('lane:api'));
assert.ok(autonomousMergeHealthSummary.openLanes.ids.includes('lane:design'));
assert.ok(autonomousMergeHealthSummary.openLanes.ids.includes('lane:cleanup'));
assert.strictEqual(autonomousMergeHealthSummary.terminalDecisions.count, 2);
assert.deepStrictEqual(autonomousMergeHealthSummary.terminalDecisions.statuses.sort(), ['applied', 'rejected']);
assert.strictEqual(autonomousMergeHealthSummary.reviewDebt.count, 1);
assert.strictEqual(autonomousMergeHealthSummary.reviewDebt.coordinatorReviewCount, 1);
assert.deepStrictEqual(autonomousMergeHealthSummary.reviewDebt.ids, ['decision:review-open']);
assert.strictEqual(autonomousMergeHealthSummary.reviewDebt.items.length, 1);
assert.deepStrictEqual(autonomousMergeHealthSummary.reviewDebt.items[0], {
  id: 'decision:review-open',
  reason: 'needs manual review',
  owner: 'docs-review-owner',
  ageMs: 1000,
  terminalPath: 'auto-drain/collection/review-open.json',
  sources: ['file:auto-drain/collection/review-open.json', 'package:@shapeshift-labs/frontier-swarm-codex', 'resource:lane:api']
});
assert.strictEqual(autonomousMergeHealthSummary.realHumanBlockers.count, 1);
assert.ok(autonomousMergeHealthSummary.realHumanBlockers.reasons.some((reason) => reason.startsWith('human-question:')));
assert.strictEqual(autonomousMergeHealthSummary.staleRerunCleanup.count, 1);
assert.strictEqual(autonomousMergeHealthSummary.staleRerunCleanup.rerunCount, 1);
assert.strictEqual(autonomousMergeHealthSummary.staleRerunCleanup.staleCount, 0);
assert.strictEqual(autonomousMergeHealthSummary.appliedThroughput.count, 1);
assert.strictEqual(autonomousMergeHealthSummary.appliedThroughput.appliedCount, 1);
assert.strictEqual(autonomousMergeHealthSummary.appliedThroughput.committedCount, 0);
assert.strictEqual(autonomousMergeHealthSummary.archivedEvidence.artifactCount, 5);
assert.ok(!autonomousMergeHealthSummary.reviewDebt.ids.includes('decision:review-close'));

const mergeQueueHealthSummary = createInspectMergeQueueHealthSummary(autonomousMergeHealthBundle);
assert.strictEqual(mergeQueueHealthSummary.kind, 'frontier.inspect.merge-queue-health-summary');
assert.strictEqual(mergeQueueHealthSummary.queueDepthByMeaning.activeWork, 1);
assert.strictEqual(mergeQueueHealthSummary.queueDepthByMeaning.coordinatorReview, 1);
assert.strictEqual(mergeQueueHealthSummary.queueDepthByMeaning.completedHistory, 1);
assert.strictEqual(mergeQueueHealthSummary.queueDepthByMeaning.committedApplied, 0);
assert.strictEqual(mergeQueueHealthSummary.queueDepthByMeaning.humanQuestions, 1);
assert.strictEqual(mergeQueueHealthSummary.leaders.count, 1);
assert.deepStrictEqual(mergeQueueHealthSummary.leaders.ids, ['coordinator-1']);
assert.strictEqual(mergeQueueHealthSummary.deferredWork.count, 1);
assert.deepStrictEqual(mergeQueueHealthSummary.deferredWork.ids, ['decision:review-open']);
assert.strictEqual(mergeQueueHealthSummary.promotions.count, 1);
assert.strictEqual(mergeQueueHealthSummary.promotions.appliedCount, 1);
assert.strictEqual(mergeQueueHealthSummary.promotions.committedCount, 0);
assert.strictEqual(mergeQueueHealthSummary.terminalDecisions.count, 2);
assert.deepStrictEqual(mergeQueueHealthSummary.terminalDecisions.statuses.sort(), ['applied', 'rejected']);

const continuousPoolHealthyBundle = createInspectBundle({
  id: 'inspect:continuous-pool-healthy',
  artifacts: [
    {
      id: 'artifact:pool:config',
      kind: 'pool-config',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'target concurrency for healthy pool',
      data: {
        targetConcurrency: 3
      }
    },
    {
      id: 'artifact:pool:worker-1',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active worker 1',
      data: {
        agentId: 'worker-1',
        jobId: 'job:worker-1',
        taskId: 'task:worker-1',
        status: 'running'
      }
    },
    {
      id: 'artifact:pool:worker-2',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active worker 2',
      data: {
        agentId: 'worker-2',
        jobId: 'job:worker-2',
        taskId: 'task:worker-2',
        status: 'running'
      }
    },
    {
      id: 'artifact:pool:worker-3',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active worker 3',
      data: {
        agentId: 'worker-3',
        jobId: 'job:worker-3',
        taskId: 'task:worker-3',
        status: 'running'
      }
    },
    {
      id: 'artifact:pool:applied',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'applied output for dashboard',
      data: {
        decisionId: 'decision:pool-applied',
        jobId: 'job:pool-applied',
        taskId: 'task:pool-applied',
        status: 'applied'
      }
    }
  ]
});

const continuousPoolHealthySummary = createInspectContinuousPoolHealthSummary(continuousPoolHealthyBundle);
assert.strictEqual(continuousPoolHealthySummary.kind, 'frontier.inspect.continuous-pool-health-summary');
assert.strictEqual(continuousPoolHealthySummary.activeWork.activeAgents.count, 3);
assert.deepStrictEqual(continuousPoolHealthySummary.activeWork.activeAgents.ids, ['worker-1', 'worker-2', 'worker-3']);
assert.strictEqual(continuousPoolHealthySummary.activeWork.targetConcurrency, 3);
assert.strictEqual(continuousPoolHealthySummary.activeWork.targetGap, 0);
assert.strictEqual(continuousPoolHealthySummary.activeWork.backlogCount, 0);
assert.strictEqual(continuousPoolHealthySummary.activeWork.refillGap, 0);
assert.strictEqual(continuousPoolHealthySummary.coordinatorDrain.reviewDrainPressure, 0);
assert.strictEqual(continuousPoolHealthySummary.trueBlockers.conflictBlocks.count, 0);
assert.strictEqual(continuousPoolHealthySummary.trueBlockers.trueHumanQuestions.count, 0);
assert.strictEqual(continuousPoolHealthySummary.doneOutput.appliedCount, 1);
assert.strictEqual(continuousPoolHealthySummary.doneOutput.committedCount, 0);
assert.strictEqual(continuousPoolHealthySummary.noise.staleRerunCount, 0);
assert.strictEqual(continuousPoolHealthySummary.noise.staleRerunRate, 0);

const continuousPoolDrainedBundle = createInspectBundle({
  id: 'inspect:continuous-pool-drained',
  artifacts: [
    {
      id: 'artifact:pool:config-drained',
      kind: 'pool-config',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'target concurrency for drained pool',
      data: {
        desiredConcurrency: 4
      }
    },
    {
      id: 'artifact:pool:drained-worker',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'only active worker',
      data: {
        agentId: 'worker-drained',
        jobId: 'job:drained',
        taskId: 'task:drained',
        status: 'running'
      }
    },
    {
      id: 'artifact:pool:queued-1',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'queued backlog work',
      data: {
        jobId: 'job:queued-1',
        taskId: 'task:queued-1',
        status: 'queued'
      }
    },
    {
      id: 'artifact:pool:queued-2',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'queued backlog work',
      data: {
        jobId: 'job:queued-2',
        taskId: 'task:queued-2',
        status: 'pending'
      }
    },
    {
      id: 'artifact:pool:review',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'coordinator review work',
      data: {
        decisionId: 'decision:review-drain',
        jobId: 'job:review-drain',
        taskId: 'task:review-drain',
        status: 'coordinator-review'
      }
    },
    {
      id: 'artifact:pool:rerun',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'rerun cleanup',
      data: {
        decisionId: 'decision:rerun-drain',
        jobId: 'job:rerun-drain',
        taskId: 'task:rerun-drain',
        status: 'rerun'
      }
    },
    {
      id: 'artifact:pool:stale',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'stale cleanup',
      data: {
        decisionId: 'decision:stale-drain',
        jobId: 'job:stale-drain',
        taskId: 'task:stale-drain',
        status: 'stale-against-head'
      }
    }
  ]
});

const continuousPoolDrainedSummary = createInspectContinuousPoolHealthSummary(continuousPoolDrainedBundle);
assert.strictEqual(continuousPoolDrainedSummary.activeWork.activeAgents.count, 1);
assert.strictEqual(continuousPoolDrainedSummary.activeWork.targetConcurrency, 4);
assert.strictEqual(continuousPoolDrainedSummary.activeWork.targetGap, 3);
assert.strictEqual(continuousPoolDrainedSummary.activeWork.backlogCount, 2);
assert.strictEqual(continuousPoolDrainedSummary.activeWork.refillGap, 3);
assert.strictEqual(continuousPoolDrainedSummary.coordinatorDrain.reviewDrainPressure, 2);
assert.strictEqual(continuousPoolDrainedSummary.coordinatorDrain.reviewCount, 1);
assert.strictEqual(continuousPoolDrainedSummary.coordinatorDrain.rerunCount, 1);
assert.strictEqual(continuousPoolDrainedSummary.trueBlockers.conflictBlocks.count, 0);
assert.strictEqual(continuousPoolDrainedSummary.trueBlockers.trueHumanQuestions.count, 0);
assert.strictEqual(continuousPoolDrainedSummary.doneOutput.appliedCount, 0);
assert.strictEqual(continuousPoolDrainedSummary.noise.staleCount, 1);
assert.strictEqual(continuousPoolDrainedSummary.noise.rerunCount, 1);
assert.strictEqual(continuousPoolDrainedSummary.noise.staleRerunCount, 2);
assert.ok(continuousPoolDrainedSummary.noise.staleRerunRate > 0);

const continuousPoolBlockedHumanBundle = createInspectBundle({
  id: 'inspect:continuous-pool-blocked-human',
  artifacts: [
    {
      id: 'artifact:pool:block-config',
      kind: 'pool-config',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'target concurrency for blocked pool',
      data: {
        targetConcurrency: 2
      }
    },
    {
      id: 'artifact:pool:block-worker',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active worker',
      data: {
        agentId: 'worker-blocked',
        jobId: 'job:blocked',
        taskId: 'task:blocked',
        status: 'running'
      }
    },
    {
      id: 'artifact:pool:conflict',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'conflict block for dashboard',
      data: {
        decisionId: 'decision:conflict-block',
        jobId: 'job:conflict-block',
        taskId: 'task:conflict-block',
        status: 'conflict-blocked'
      }
    },
    {
      id: 'artifact:pool:human',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'true human question',
      data: {
        decisionId: 'decision:human-question',
        jobId: 'job:human-question',
        taskId: 'task:human-question',
        status: 'human-blocked',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the pool health summary?; answer-code=approve|reject',
        question: 'Approve the pool health summary?'
      }
    },
    {
      id: 'artifact:pool:blocked-queued',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'queued backlog work for blocked pool',
      data: {
        jobId: 'job:blocked-queued',
        taskId: 'task:blocked-queued',
        status: 'queued'
      }
    },
    {
      id: 'artifact:pool:applied-blocked',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'applied output still visible',
      data: {
        decisionId: 'decision:blocked-applied',
        jobId: 'job:blocked-applied',
        taskId: 'task:blocked-applied',
        status: 'applied'
      }
    }
  ]
});

const continuousPoolBlockedHumanSummary = createInspectContinuousPoolHealthSummary(continuousPoolBlockedHumanBundle);
assert.strictEqual(continuousPoolBlockedHumanSummary.activeWork.activeAgents.count, 1);
assert.strictEqual(continuousPoolBlockedHumanSummary.activeWork.targetConcurrency, 2);
assert.strictEqual(continuousPoolBlockedHumanSummary.activeWork.targetGap, 1);
assert.strictEqual(continuousPoolBlockedHumanSummary.activeWork.backlogCount, 1);
assert.strictEqual(continuousPoolBlockedHumanSummary.activeWork.refillGap, 1);
assert.strictEqual(continuousPoolBlockedHumanSummary.coordinatorDrain.reviewDrainPressure, 0);
assert.strictEqual(continuousPoolBlockedHumanSummary.trueBlockers.conflictBlocks.count, 1);
assert.deepStrictEqual(continuousPoolBlockedHumanSummary.trueBlockers.conflictBlocks.ids, ['decision:conflict-block']);
assert.strictEqual(continuousPoolBlockedHumanSummary.trueBlockers.trueHumanQuestions.count, 1);
assert.ok(continuousPoolBlockedHumanSummary.trueBlockers.trueHumanQuestions.reasons.some((reason) => reason.startsWith('human-question:')));
assert.strictEqual(continuousPoolBlockedHumanSummary.belowTargetReasons.gap, 1);
assert.deepStrictEqual(continuousPoolBlockedHumanSummary.belowTargetReasons.reasons, []);
assert.strictEqual(continuousPoolBlockedHumanSummary.doneOutput.appliedCount, 1);
assert.strictEqual(continuousPoolBlockedHumanSummary.noise.staleRerunCount, 0);

const continuousPoolBelowTargetReasonBundle = createInspectBundle({
  id: 'inspect:continuous-pool-below-target-reasons',
  artifacts: [
    {
      id: 'artifact:pool:reason-config',
      kind: 'pool-config',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'target concurrency for below-target reasons',
      data: {
        desiredConcurrency: 5
      }
    },
    {
      id: 'artifact:pool:reason-worker-1',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'only active worker',
      data: {
        agentId: 'worker-reason-1',
        jobId: 'job:reason-1',
        taskId: 'task:reason-1',
        status: 'running'
      }
    },
    {
      id: 'artifact:pool:reason-review',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'review reserved for the pool',
      data: {
        decisionId: 'decision:reason-review',
        jobId: 'job:reason-review',
        taskId: 'task:reason-review',
        status: 'coordinator-review'
      }
    },
    {
      id: 'artifact:pool:reason-quota',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'quota pressure',
      data: {
        decisionId: 'decision:reason-quota',
        jobId: 'job:reason-quota',
        taskId: 'task:reason-quota',
        status: 'budget-exhausted',
        backpressureReason: 'budget-exhausted'
      }
    },
    {
      id: 'artifact:pool:reason-cpu',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'cpu pressure',
      data: {
        decisionId: 'decision:reason-cpu',
        jobId: 'job:reason-cpu',
        taskId: 'task:reason-cpu',
        status: 'cpu-pressure',
        cpuPressure: 0.9
      }
    },
    {
      id: 'artifact:pool:reason-dirty',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'dirty checkout collect-only',
      data: {
        skippedReason: 'dirty-worktree',
        dirtyPaths: ['src/dirty.ts'],
        status: 'dirty-worktree'
      }
    },
    {
      id: 'artifact:pool:reason-lock',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'lock contention',
      data: {
        decisionId: 'decision:reason-lock',
        jobId: 'job:reason-lock',
        taskId: 'task:reason-lock',
        status: 'lock-contention',
        reason: 'lock contention'
      }
    }
  ]
});

const continuousPoolBelowTargetReasonSummary = createInspectContinuousPoolHealthSummary(continuousPoolBelowTargetReasonBundle);
assert.strictEqual(continuousPoolBelowTargetReasonSummary.activeWork.targetConcurrency, 5);
assert.strictEqual(continuousPoolBelowTargetReasonSummary.activeWork.activeAgents.count, 1);
assert.strictEqual(continuousPoolBelowTargetReasonSummary.activeWork.targetGap, 4);
assert.strictEqual(continuousPoolBelowTargetReasonSummary.activeWork.backlogCount, 0);
assert.strictEqual(continuousPoolBelowTargetReasonSummary.activeWork.refillGap, 0);
assert.strictEqual(continuousPoolBelowTargetReasonSummary.belowTargetReasons.gap, 4);
assert.deepStrictEqual(continuousPoolBelowTargetReasonSummary.belowTargetReasons.reasons.map((reason) => reason.id), [
  'no-backlog',
  'review-reserved',
  'quota',
  'cpu',
  'dirty-checkout',
  'lock-contention'
]);
assert.ok(continuousPoolBelowTargetReasonSummary.belowTargetReasons.reasons.every((reason) => reason.count > 0));
assert.ok(continuousPoolBelowTargetReasonSummary.belowTargetReasons.sources.includes('activeWork.backlogCount'));

const coordinatorQueueThroughputBundle = createInspectBundle({
  id: 'inspect:coordinator-queue-throughput',
  artifacts: [
    {
      id: 'artifact:queue:config',
      kind: 'pool-config',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'target concurrency for coordinator queue',
      data: {
        targetConcurrency: 4
      }
    },
    {
      id: 'artifact:queue:active',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active coordinator lane worker',
      data: {
        agentId: 'worker-queue-active',
        jobId: 'job:queue-active',
        taskId: 'task:queue-active',
        status: 'running'
      }
    },
    {
      id: 'artifact:queue:backlog-1',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'queued backlog work',
      data: {
        jobId: 'job:queue-backlog-1',
        taskId: 'task:queue-backlog-1',
        status: 'queued'
      }
    },
    {
      id: 'artifact:queue:backlog-2',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'pending backlog work',
      data: {
        jobId: 'job:queue-backlog-2',
        taskId: 'task:queue-backlog-2',
        status: 'pending'
      }
    },
    {
      id: 'artifact:queue:review',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'coordinator review work',
      data: {
        decisionId: 'decision:queue-review',
        jobId: 'job:queue-review',
        taskId: 'task:queue-review',
        status: 'coordinator-review'
      }
    },
    {
      id: 'artifact:queue:rerun',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'rerun cleanup',
      data: {
        decisionId: 'decision:queue-rerun',
        jobId: 'job:queue-rerun',
        taskId: 'task:queue-rerun',
        status: 'rerun'
      }
    },
    {
      id: 'artifact:queue:conflict',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'conflict block for coordinator queue',
      data: {
        decisionId: 'decision:queue-conflict',
        jobId: 'job:queue-conflict',
        taskId: 'task:queue-conflict',
        status: 'conflict-blocked'
      }
    },
    {
      id: 'artifact:queue:human',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'human question for coordinator queue',
      data: {
        decisionId: 'decision:queue-human',
        jobId: 'job:queue-human',
        taskId: 'task:queue-human',
        status: 'human-blocked',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the coordinator queue report?; answer-code=approve|reject',
        question: 'Approve the coordinator queue report?'
      }
    },
    {
      id: 'artifact:queue:applied',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'applied queue output',
      data: {
        decisionId: 'decision:queue-applied',
        jobId: 'job:queue-applied',
        taskId: 'task:queue-applied',
        status: 'applied'
      }
    },
    {
      id: 'artifact:queue:committed',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'committed queue output',
      data: {
        decisionId: 'decision:queue-committed',
        jobId: 'job:queue-committed',
        taskId: 'task:queue-committed',
        status: 'committed'
      }
    },
    {
      id: 'artifact:queue:blocked',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'real blocker for coordinator queue',
      data: {
        decisionId: 'decision:queue-blocked',
        jobId: 'job:queue-blocked',
        taskId: 'task:queue-blocked',
        status: 'blocked'
      }
    },
    {
      id: 'artifact:queue:package-gate',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'package gate for coordinator queue',
      data: {
        package: '@shapeshift-labs/frontier-inspect',
        name: 'packages/frontier-inspect test',
        required: true,
        status: 'passed'
      }
    },
    {
      id: 'artifact:queue:audit',
      kind: 'audit',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'suppressed audit artifact',
      data: {
        status: 'record-only',
        reason: 'intermediate collection row'
      }
    }
  ]
});

const coordinatorQueueThroughputSummary = createInspectCoordinatorQueueThroughputSummary(coordinatorQueueThroughputBundle);
assert.strictEqual(coordinatorQueueThroughputSummary.kind, 'frontier.inspect.coordinator-queue-throughput-summary');
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.activeAgents.count, 1);
assert.deepStrictEqual(coordinatorQueueThroughputSummary.throughput.activeAgents.ids, ['worker-queue-active']);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.targetConcurrency, 4);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.backlogCount, 2);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.refillGap, 3);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.appliedCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.committedCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.completedCount, 2);
assert.strictEqual(coordinatorQueueThroughputSummary.throughput.usefulOutputCount, 2);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.reviewDrainPressure, 2);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.reviewCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.rerunCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.conflictCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.humanQuestionCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.realBlockerCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.packageGateCount, 1);
assert.strictEqual(coordinatorQueueThroughputSummary.bottlenecks.suppressedAuditArtifactCount, 1);
assert.deepStrictEqual(coordinatorQueueThroughputSummary.bottlenecks.primaryBottlenecks.map((bottleneck) => bottleneck.name), [
  'backlog',
  'coordinator-drain',
  'conflicts',
  'human-questions',
  'package-gates',
  'real-blockers',
  'suppressed-audit-artifacts'
]);

const appliedWorkSummaryBundle = createInspectBundle({
  id: 'inspect:run21-applied-work',
  artifacts: [
    {
      id: 'artifact:run21:active-worker-a',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active worker a',
      data: {
        agentId: 'worker-21-a',
        jobId: 'job:run21:active-a',
        taskId: 'task:run21:active-a',
        status: 'running'
      }
    },
    {
      id: 'artifact:run21:active-worker-b',
      kind: 'worker-run',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active worker b',
      data: {
        workerId: 'worker-21-b',
        jobId: 'job:run21:active-b',
        taskId: 'task:run21:active-b',
        status: 'leased'
      }
    },
    {
      id: 'artifact:run21:applied',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'applied success output',
      data: {
        decisionId: 'decision:run21:applied',
        jobId: 'job:run21:applied',
        taskId: 'task:run21:applied',
        status: 'applied'
      }
    },
    {
      id: 'artifact:run21:committed',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'committed success output',
      data: {
        decisionId: 'decision:run21:committed',
        jobId: 'job:run21:committed',
        taskId: 'task:run21:committed',
        status: 'committed'
      }
    },
    {
      id: 'artifact:run21:evidence-only',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'evidence-only success output',
      data: {
        decisionId: 'decision:run21:evidence-only',
        jobId: 'job:run21:evidence-only',
        taskId: 'task:run21:evidence-only',
        status: 'evidence-only'
      }
    },
    {
      id: 'artifact:run21:review',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'coordinator review output',
      data: {
        decisionId: 'decision:run21:review',
        jobId: 'job:run21:review',
        taskId: 'task:run21:review',
        status: 'coordinator-review'
      }
    },
    {
      id: 'artifact:run21:conflict',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'conflict blocker',
      data: {
        decisionId: 'decision:run21:conflict',
        jobId: 'job:run21:conflict',
        taskId: 'task:run21:conflict',
        status: 'conflict-blocked'
      }
    },
    {
      id: 'artifact:run21:human',
      kind: 'coordinator-gate',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'true human blocker',
      data: {
        decisionId: 'decision:run21:human',
        jobId: 'job:run21:human',
        taskId: 'task:run21:human',
        status: 'human-blocked',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the applied-work summary?; answer-code=approve|reject'
      }
    },
    {
      id: 'artifact:run21:rerun',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'rerun cleanup',
      data: {
        decisionId: 'decision:run21:rerun',
        jobId: 'job:run21:rerun',
        taskId: 'task:run21:rerun',
        status: 'rerun'
      }
    },
    {
      id: 'artifact:run21:stale',
      kind: 'worker-result',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      package: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'stale cleanup',
      data: {
        decisionId: 'decision:run21:stale',
        jobId: 'job:run21:stale',
        taskId: 'task:run21:stale',
        status: 'stale-against-head'
      }
    }
  ]
});

const appliedWorkSummary = createInspectAppliedWorkSummary(appliedWorkSummaryBundle);
assert.strictEqual(appliedWorkSummary.kind, 'frontier.inspect.applied-work-summary');
assert.strictEqual(appliedWorkSummary.activeWorkers.count, 2);
assert.deepStrictEqual(appliedWorkSummary.activeWorkers.ids, ['worker-21-a', 'worker-21-b']);
assert.strictEqual(appliedWorkSummary.appliedWork.count, 1);
assert.strictEqual(appliedWorkSummary.appliedWork.appliedCount, 1);
assert.deepStrictEqual(appliedWorkSummary.appliedWork.ids, ['decision:run21:applied']);
assert.strictEqual(appliedWorkSummary.committedWork.count, 1);
assert.strictEqual(appliedWorkSummary.committedWork.committedCount, 1);
assert.deepStrictEqual(appliedWorkSummary.committedWork.ids, ['decision:run21:committed']);
assert.strictEqual(appliedWorkSummary.evidenceOnlyDoneWork.count, 1);
assert.strictEqual(appliedWorkSummary.evidenceOnlyDoneWork.evidenceOnlyCount, 1);
assert.deepStrictEqual(appliedWorkSummary.evidenceOnlyDoneWork.ids, ['decision:run21:evidence-only']);
assert.strictEqual(appliedWorkSummary.successfulOutputCount, 3);
assert.strictEqual(appliedWorkSummary.coordinatorReview.count, 1);
assert.strictEqual(appliedWorkSummary.coordinatorReview.coordinatorReviewCount, 1);
assert.deepStrictEqual(appliedWorkSummary.coordinatorReview.ids, ['decision:run21:review']);
assert.strictEqual(appliedWorkSummary.trueBlockers.conflictBlocks.count, 1);
assert.deepStrictEqual(appliedWorkSummary.trueBlockers.conflictBlocks.ids, ['decision:run21:conflict']);
assert.strictEqual(appliedWorkSummary.trueBlockers.trueHumanQuestions.count, 1);
assert.ok(appliedWorkSummary.trueBlockers.trueHumanQuestions.reasons.some((reason) => reason.startsWith('human-question:')));
assert.strictEqual(appliedWorkSummary.staleRerun.count, 2);
assert.strictEqual(appliedWorkSummary.staleRerun.staleCount, 1);
assert.strictEqual(appliedWorkSummary.staleRerun.rerunCount, 1);
assert.strictEqual(appliedWorkSummary.staleRerun.staleRerunCount, 2);
assert.ok(appliedWorkSummary.staleRerun.ids.includes('decision:run21:rerun'));
assert.ok(appliedWorkSummary.staleRerun.ids.includes('decision:run21:stale'));
assert.strictEqual(appliedWorkSummary.archivedEvidence.artifactCount, 10);

const bundleHealthSummaryBundle = createInspectBundle({
  id: 'inspect:bundle-health-summary',
  artifacts: [
    {
      id: 'artifact:bundle-health:complete',
      kind: 'bundle-health',
      summary: 'complete bundle',
      files: ['auto-drain/complete/merge.json', 'auto-drain/complete/changes.patch'],
      data: {
        jobId: 'job:complete',
        bundlePath: 'auto-drain/complete/merge.json',
        patchPath: 'auto-drain/complete/changes.patch',
        changedPaths: ['src/complete.ts'],
        gatesPassed: true,
        outputKind: 'merge-bundle',
        terminalClassification: 'admitted-merge-bundle',
        status: 'complete-bundle'
      }
    },
    {
      id: 'artifact:bundle-health:generated',
      kind: 'bundle-health',
      summary: 'generated patch',
      files: ['auto-drain/generated/changes.patch'],
      data: {
        jobId: 'job:generated',
        patchPath: 'auto-drain/generated/changes.patch',
        changedPaths: ['src/generated.ts'],
        gatesPassed: true,
        outputKind: 'evidence-json',
        terminalClassification: 'admitted-evidence-json',
        status: 'generated-patch'
      }
    },
    {
      id: 'artifact:bundle-health:missing-patch',
      kind: 'bundle-health',
      summary: 'missing patch',
      files: ['auto-drain/missing-patch/merge.json'],
      data: {
        jobId: 'job:missing-patch',
        bundlePath: 'auto-drain/missing-patch/merge.json',
        changedPaths: ['src/missing-patch.ts'],
        status: 'missing-patch'
      }
    },
    {
      id: 'artifact:bundle-health:missing-bundle',
      kind: 'bundle-health',
      summary: 'missing bundle',
      files: ['auto-drain/missing-bundle/changes.patch'],
      data: {
        jobId: 'job:missing-bundle',
        patchPath: 'auto-drain/missing-bundle/changes.patch',
        changedPaths: ['src/missing-bundle.ts'],
        status: 'missing-bundle'
      }
    },
    {
      id: 'artifact:bundle-health:no-change',
      kind: 'bundle-health',
      summary: 'no-change done',
      data: {
        jobId: 'job:no-change',
        status: 'done-no-change',
        outputKind: 'evidence-only',
        changedPaths: []
      }
    },
    {
      id: 'artifact:bundle-health:evidence-only',
      kind: 'bundle-health',
      summary: 'evidence-only done',
      data: {
        jobId: 'job:evidence-only',
        status: 'evidence-only',
        outputKind: 'evidence-only',
        changedPaths: ['src/evidence-only.ts']
      }
    },
    {
      id: 'artifact:bundle-health:failed-gate',
      kind: 'bundle-health',
      summary: 'failed gate',
      data: {
        jobId: 'job:failed-gate',
        bundlePath: 'auto-drain/failed-gate/merge.json',
        patchPath: 'auto-drain/failed-gate/changes.patch',
        changedPaths: ['src/failed-gate.ts'],
        gatesPassed: false,
        status: 'failed-gate'
      }
    },
    {
      id: 'artifact:bundle-health:human-blocker',
      kind: 'bundle-health',
      summary: 'true human blocker',
      data: {
        jobId: 'job:human-blocker',
        status: 'human-blocked',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the bundle-health summary?; answer-code=approve|reject'
      }
    }
  ]
});

const bundleHealthSummary = createInspectBundleHealthSummary(bundleHealthSummaryBundle);
assert.strictEqual(bundleHealthSummary.kind, 'frontier.inspect.bundle-health-summary');
assert.strictEqual(bundleHealthSummary.status, 'blocked');
assert.ok(bundleHealthSummary.headline.includes('true human blocker'));
assert.strictEqual(bundleHealthSummary.completeBundles.count, 1);
assert.deepStrictEqual(bundleHealthSummary.completeBundles.ids, ['job:complete']);
assert.strictEqual(bundleHealthSummary.generatedPatches.count, 1);
assert.deepStrictEqual(bundleHealthSummary.generatedPatches.ids, ['job:generated']);
assert.strictEqual(bundleHealthSummary.missingPatch.count, 1);
assert.deepStrictEqual(bundleHealthSummary.missingPatch.ids, ['job:missing-patch']);
assert.strictEqual(bundleHealthSummary.missingBundle.count, 1);
assert.deepStrictEqual(bundleHealthSummary.missingBundle.ids, ['job:missing-bundle']);
assert.strictEqual(bundleHealthSummary.noChangeDone.count, 1);
assert.deepStrictEqual(bundleHealthSummary.noChangeDone.ids, ['job:no-change']);
assert.strictEqual(bundleHealthSummary.evidenceOnlyDone.count, 1);
assert.deepStrictEqual(bundleHealthSummary.evidenceOnlyDone.ids, ['job:evidence-only']);
assert.strictEqual(bundleHealthSummary.failedGate.count, 1);
assert.deepStrictEqual(bundleHealthSummary.failedGate.ids, ['job:failed-gate']);
assert.strictEqual(bundleHealthSummary.trueHumanBlockers.count, 1);
assert.deepStrictEqual(bundleHealthSummary.trueHumanBlockers.ids, ['job:human-blocker']);
assert.ok(bundleHealthSummary.trueHumanBlockers.reasons.some((reason) => reason.startsWith('human-question:')));
assert.deepStrictEqual(bundleHealthSummary.cards.map((card) => card.id), [
  'complete-bundles',
  'generated-patches',
  'missing-patch',
  'missing-bundle',
  'no-change-done',
  'evidence-only-done',
  'failed-gate',
  'true-human-blockers'
]);
assert.ok(bundleHealthSummary.cards.every((card) => typeof card.detail === 'string' && card.detail.length > 0));

const defaultDrainGateHealthBundle = createInspectBundle({
  id: 'inspect:default-drain-gate-health',
  artifacts: [
    {
      id: 'artifact:default-drain:applied',
      kind: 'bundle-health',
      summary: 'applied after gates',
      data: {
        jobId: 'job:applied-after-gates',
        status: 'applied',
        gatesPassed: true,
        gateSummary: {
          gates: [
            {
              id: 'lint',
              state: 'passed',
              required: true
            }
          ]
        }
      }
    },
    {
      id: 'artifact:default-drain:missing',
      kind: 'bundle-health',
      summary: 'missing gates',
      data: {
        jobId: 'job:missing-gates',
        status: 'applied'
      }
    },
    {
      id: 'artifact:default-drain:failed',
      kind: 'bundle-health',
      summary: 'failed gate',
      data: {
        jobId: 'job:failed-gates',
        status: 'failed-gate',
        gatesPassed: false,
        gateSummary: {
          gates: [
            {
              id: 'tests',
              state: 'failed',
              required: true
            }
          ]
        }
      }
    },
    {
      id: 'artifact:default-drain:skipped',
      kind: 'bundle-health',
      summary: 'skipped required gate',
      data: {
        jobId: 'job:skipped-required-gates',
        status: 'skipped-required-gate',
        gateSummary: {
          gates: [
            {
              id: 'security',
              state: 'skipped',
              required: true
            }
          ]
        }
      }
    },
    {
      id: 'artifact:default-drain:human',
      kind: 'bundle-health',
      summary: 'explicit human blocker',
      data: {
        jobId: 'job:human-blocker',
        status: 'human-blocked',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the default drain gate summary?; answer-code=approve|reject'
      }
    }
  ]
});

const defaultDrainGateHealthSummary = createInspectDefaultDrainGateHealthSummary(defaultDrainGateHealthBundle);
assert.strictEqual(defaultDrainGateHealthSummary.kind, 'frontier.inspect.default-drain-gate-health-summary');
assert.strictEqual(defaultDrainGateHealthSummary.status, 'blocked');
assert.ok(defaultDrainGateHealthSummary.headline.includes('true human blocker'));
assert.ok(defaultDrainGateHealthSummary.headline.includes('gate configuration issue'));
assert.strictEqual(defaultDrainGateHealthSummary.candidatesWithGates.count, 3);
assert.deepStrictEqual(defaultDrainGateHealthSummary.candidatesWithGates.ids, [
  'job:applied-after-gates',
  'job:failed-gates',
  'job:skipped-required-gates'
]);
assert.strictEqual(defaultDrainGateHealthSummary.candidatesWithGates.requiredCount, 3);
assert.strictEqual(defaultDrainGateHealthSummary.candidatesWithGates.passedCount, 1);
assert.strictEqual(defaultDrainGateHealthSummary.candidatesWithGates.failedCount, 1);
assert.strictEqual(defaultDrainGateHealthSummary.candidatesWithGates.skippedCount, 1);
assert.strictEqual(defaultDrainGateHealthSummary.candidatesMissingGates.count, 1);
assert.deepStrictEqual(defaultDrainGateHealthSummary.candidatesMissingGates.ids, ['job:missing-gates']);
assert.strictEqual(defaultDrainGateHealthSummary.appliedAfterGates.count, 1);
assert.deepStrictEqual(defaultDrainGateHealthSummary.appliedAfterGates.ids, ['job:applied-after-gates']);
assert.strictEqual(defaultDrainGateHealthSummary.appliedAfterGates.passedCount, 1);
assert.strictEqual(defaultDrainGateHealthSummary.failedGates.count, 1);
assert.deepStrictEqual(defaultDrainGateHealthSummary.failedGates.ids, ['job:failed-gates']);
assert.strictEqual(defaultDrainGateHealthSummary.failedGates.failedCount, 1);
assert.strictEqual(defaultDrainGateHealthSummary.skippedRequiredGates.count, 1);
assert.deepStrictEqual(defaultDrainGateHealthSummary.skippedRequiredGates.ids, ['job:skipped-required-gates']);
assert.strictEqual(defaultDrainGateHealthSummary.skippedRequiredGates.skippedCount, 1);
assert.strictEqual(defaultDrainGateHealthSummary.trueHumanBlockers.count, 1);
assert.deepStrictEqual(defaultDrainGateHealthSummary.trueHumanBlockers.ids, ['job:human-blocker']);
assert.ok(defaultDrainGateHealthSummary.trueHumanBlockers.reasons.some((reason) => reason.startsWith('human-question:')));
assert.deepStrictEqual(defaultDrainGateHealthSummary.cards.map((card) => card.id), [
  'candidates-with-gates',
  'candidates-missing-gates',
  'failed-gates',
  'applied-after-gates',
  'skipped-required-gates',
  'true-human-blockers'
]);
assert.ok(defaultDrainGateHealthSummary.cards.every((card) => typeof card.detail === 'string' && card.detail.length > 0));

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

const dashboardBundle = createInspectBundle({
  id: 'inspect:dashboard',
  artifacts: [
    {
      id: 'artifact:dashboard:active',
      kind: 'worker-run',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'active dashboard task',
      tags: ['operator-dashboard', 'lane'],
      files: ['dashboard/active.json'],
      resources: ['lane:dashboard/backlog'],
      data: {
        agentId: 'agent:alpha',
        taskId: 'task:dashboard-1',
        lane: 'lane:dashboard/backlog',
        status: 'running',
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'implementation',
        runtimeMs: 120,
        usage: { inputTokens: 20, outputTokens: 5, totalTokens: 25 },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:dashboard:applied',
      kind: 'worker-result',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'applied dashboard task',
      tags: ['operator-dashboard', 'lane'],
      files: ['dashboard/applied.json'],
      resources: ['lane:dashboard/review'],
      data: {
        jobId: 'job:dashboard-2',
        taskId: 'task:dashboard-2',
        lane: 'lane:dashboard/review',
        status: 'applied',
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'implementation',
        runtimeMs: 220,
        usage: { inputTokens: 18, outputTokens: 4, totalTokens: 22 },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:dashboard:committed',
      kind: 'worker-result',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'committed dashboard task',
      tags: ['operator-dashboard', 'lane'],
      files: ['dashboard/committed.json'],
      resources: ['lane:dashboard/review'],
      data: {
        jobId: 'job:dashboard-3',
        taskId: 'task:dashboard-3',
        lane: 'lane:dashboard/review',
        status: 'committed',
        modelId: 'gpt-5.4-pro',
        computeTier: 'codex.priority',
        taskKind: 'review',
        runtimeMs: 340,
        usage: { inputTokens: 24, outputTokens: 6, totalTokens: 30 },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:dashboard:evidence',
      kind: 'worker-result',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'evidence-only dashboard task',
      tags: ['operator-dashboard'],
      files: ['dashboard/evidence.json'],
      data: {
        taskId: 'task:dashboard-4',
        status: 'evidence-only',
        modelId: 'gpt-5.4-mini',
        computeTier: 'codex.standard',
        taskKind: 'documentation',
        runtimeMs: 75,
        usage: { inputTokens: 8, outputTokens: 2, totalTokens: 10 },
        pricing: {
          currency: 'USD',
          inputCostPerUnit: 0.75,
          cachedInputCostPerUnit: 0.075,
          outputCostPerUnit: 4.5,
          unitTokens: 1000000
        }
      }
    },
    {
      id: 'artifact:dashboard:test',
      kind: 'test',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-test',
      summary: 'dashboard test artifact',
      files: ['dashboard/smoke.test.json'],
      data: { result: 'passed' }
    },
    {
      id: 'artifact:dashboard:benchmark',
      kind: 'benchmark',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-test',
      summary: 'dashboard benchmark artifact',
      files: ['dashboard/bench.json'],
      data: { rows: [{ fixture: 'dashboard', medianUs: 14, p95Us: 20 }] }
    },
    {
      id: 'artifact:dashboard:gate',
      kind: 'coordinator-gate',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      summary: 'dashboard gate artifact',
      files: ['dashboard/gates.json'],
      data: {
        finalGateSummary: {
          gates: [
            { id: 'dashboard.test', required: true, state: 'passed' },
            { id: 'dashboard.lint', required: true, state: 'failed' }
          ]
        }
      }
    }
  ],
  events: [
    {
      id: 'event:dashboard:question',
      type: 'decision',
      label: 'dashboard question',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      status: 'human-blocked',
      resource: 'questions:dashboard',
      value: {
        questionId: 'question:dashboard',
        reason: 'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the dashboard schema?; answer-code=approve|reject'
      }
    },
    {
      id: 'event:dashboard:generic-question',
      type: 'decision',
      label: 'dashboard generic question',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      status: 'human-blocked',
      resource: 'questions:dashboard-generic',
      value: {
        questionId: 'question:dashboard-generic',
        reason: 'Needs a human review before we continue'
      }
    },
    {
      id: 'event:dashboard:review',
      type: 'decision',
      label: 'dashboard review',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      status: 'needs-review',
      lane: 'lane:dashboard/review',
      resource: 'history:dashboard-review',
      value: { decisionId: 'decision:dashboard-review', jobId: 'job:dashboard-review', taskId: 'task:dashboard-review', status: 'needs-review' }
    },
    {
      id: 'event:dashboard:rerun',
      type: 'decision',
      label: 'dashboard rerun',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      status: 'rerun',
      lane: 'lane:dashboard/backlog',
      resource: 'history:dashboard-rerun',
      value: { decisionId: 'decision:dashboard-rerun', jobId: 'job:dashboard-rerun', taskId: 'task:dashboard-rerun', status: 'rerun' }
    },
    {
      id: 'event:dashboard:conflict',
      type: 'decision',
      label: 'dashboard conflict',
      source: 'swarm',
      sourcePackage: '@shapeshift-labs/frontier-swarm-codex',
      feature: 'operator-dashboard',
      package: '@app/operator-dashboard',
      status: 'conflict-blocked',
      lane: 'lane:dashboard/backlog',
      resource: 'history:dashboard-conflict',
      value: { decisionId: 'decision:dashboard-conflict', jobId: 'job:dashboard-conflict', taskId: 'task:dashboard-conflict', status: 'conflict-blocked' }
    }
  ]
});

const dashboardSummary = createInspectDashboardSummary(dashboardBundle);
assert.strictEqual(dashboardSummary.kind, 'frontier.inspect.dashboard-summary');
assert.strictEqual(dashboardSummary.epics.features.some((feature) => feature.id === 'operator-dashboard'), true);
assert.ok(dashboardSummary.tasks.successfulOutputCount >= 2);
assert.ok(dashboardSummary.lanes.count >= 1);
assert.ok(dashboardSummary.activeAgents.count >= 1);
assert.strictEqual(dashboardSummary.questions.count, 1);
assert.deepStrictEqual(dashboardSummary.questions.questions.map((question) => question.code), [
  'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the dashboard schema?; answer-code=approve|reject'
]);
assert.deepStrictEqual(dashboardSummary.questions.questions.map((question) => question.status), ['human-blocked']);
assert.deepStrictEqual(dashboardSummary.questions.questions.map((question) => question.question), ['Approve the dashboard schema?']);
assert.deepStrictEqual(dashboardSummary.questions.questions.map((question) => question.answerCode), ['approve|reject']);
assert.deepStrictEqual(dashboardSummary.questions.reasons, [
  'human-question: owner=coordinator; surface=packages/frontier-inspect/src/index.ts; missing-authority=approval; question=Approve the dashboard schema?; answer-code=approve|reject'
]);
assert.strictEqual(dashboardSummary.history.kind, 'frontier.inspect.swarm-lifetime-summary');
assert.ok(dashboardSummary.performance.modelCount >= 1);
assert.strictEqual(dashboardSummary.performance.modelTaskKindCount, 3);
assert.deepStrictEqual(dashboardSummary.performance.byTaskKind.map((entry) => `${entry.model}:${entry.taskKind}`), [
  'gpt-5.4-mini:documentation',
  'gpt-5.4-mini:implementation',
  'gpt-5.4-pro:review'
]);
const dashboardPerformanceByTaskKind = new Map(dashboardSummary.performance.byTaskKind.map((entry) => [`${entry.model}:${entry.taskKind}`, entry]));
assert.strictEqual(dashboardPerformanceByTaskKind.get('gpt-5.4-mini:implementation')?.computeTierCount, 1);
assert.deepStrictEqual(dashboardPerformanceByTaskKind.get('gpt-5.4-mini:implementation')?.computeTiers, ['codex.standard']);
assert.strictEqual(dashboardPerformanceByTaskKind.get('gpt-5.4-mini:documentation')?.count, 1);
assert.strictEqual(dashboardPerformanceByTaskKind.get('gpt-5.4-pro:review')?.successCount, 1);
assert.ok(dashboardSummary.testing.failedGates.count >= 1);

console.log('frontier inspect smoke passed');
