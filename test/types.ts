import {
  createInspectArtifact,
  createInspectArtifactFromRegistryGraph,
  createInspectArtifactsFromPlaywrightTimeline,
  createInspectBundle,
  createInspectFeatureMap,
  createInspectProof,
  createInspectReport,
  decodeInspectJsonl,
  encodeInspectJsonl,
  explainInspectBundle,
  mergeInspectBundles,
  queryInspectBundle,
  redactInspectBundle,
  traceInspectImpact,
  type FrontierInspectArtifact,
  type FrontierInspectBundle,
  type FrontierInspectEvent,
  type FrontierInspectFeatureMap,
  type FrontierInspectImpact,
  type FrontierInspectProof,
  type FrontierInspectQueryResult,
  type FrontierInspectReport
} from '../dist/index.js';

const artifact: FrontierInspectArtifact = createInspectArtifact({
  id: 'artifact:types',
  kind: 'test',
  feature: 'types',
  entries: [
    {
      id: 'types.entry',
      kind: 'test',
      feature: 'types',
      reads: ['types.input'],
      writes: ['types.output']
    }
  ],
  events: [{ id: 'types.event', entryId: 'types.entry', status: 'ok' }]
});

const bundle: FrontierInspectBundle = createInspectBundle({
  artifacts: [artifact],
  events: [{ id: 'manual.event', feature: 'types', value: { ok: true } }]
});
const registryArtifact: FrontierInspectArtifact = createInspectArtifactFromRegistryGraph(bundle.graph);
const timelineArtifact: FrontierInspectArtifact = createInspectArtifactsFromPlaywrightTimeline([
  {
    index: 1,
    timestamp: 1,
    state: [{ id: 'state', paths: [{ path: 'app.ready', value: true }] }],
    registry: [{ id: 'registry', entries: [{ id: 'play.entry', kind: 'probe', feature: 'types' }] }]
  }
]);
const merged: FrontierInspectBundle = mergeInspectBundles([bundle, createInspectBundle({ artifacts: [timelineArtifact] })]);
const query: FrontierInspectQueryResult = queryInspectBundle(merged, { features: ['types'] });
const impact: FrontierInspectImpact = traceInspectImpact(merged, { paths: ['types.input'] });
const featureMap: FrontierInspectFeatureMap = createInspectFeatureMap(merged);
const proof: FrontierInspectProof = createInspectProof(merged);
const redacted: FrontierInspectBundle = redactInspectBundle(merged, { redactKeys: ['token'] });
const jsonl: string = encodeInspectJsonl(redacted);
const decoded: FrontierInspectBundle = decodeInspectJsonl(jsonl);
const report: FrontierInspectReport = createInspectReport(decoded, {
  queries: [{ id: 'types', query: { features: ['types'] } }],
  includeJsonl: true
});
const explained = explainInspectBundle(decoded, { features: ['types'] });
const event: FrontierInspectEvent | undefined = report.bundle?.events[0];

void registryArtifact;
void query;
void impact;
void featureMap;
void proof;
void report;
void explained;
void event;
