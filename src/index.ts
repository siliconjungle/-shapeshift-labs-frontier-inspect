import type { JsonObject, JsonValue } from '@shapeshift-labs/frontier';
import {
  createFrontierRegistryGraph,
  frontierRegistryExplain,
  frontierRegistryIndex,
  frontierRegistryMergeGraphs,
  frontierRegistryQuery,
  frontierRegistryTrace,
  frontierRegistryValidateGraph,
  normalizeFrontierRegistryPath,
  type FrontierRegistryEdge,
  type FrontierRegistryExplain,
  type FrontierRegistryExplainInput,
  type FrontierRegistryGraph,
  type FrontierRegistryGraphInput,
  type FrontierRegistryImpact,
  type FrontierRegistryImpactInput,
  type FrontierRegistryIndex,
  type FrontierRegistryPath,
  type FrontierRegistryQueryInput,
  type FrontierRegistryQueryResult,
  type FrontierRegistryRecord,
  type FrontierRegistryEntry,
  type FrontierRegistryTrace,
  type FrontierRegistryTraceInput,
  type FrontierRegistryValidation,
  type FrontierRegistryValidationOptions
} from '@shapeshift-labs/frontier/registry';

export const FRONTIER_INSPECT_BUNDLE_KIND = 'frontier.inspect.bundle';
export const FRONTIER_INSPECT_BUNDLE_VERSION = 1;
export const FRONTIER_INSPECT_QUERY_KIND = 'frontier.inspect.query';
export const FRONTIER_INSPECT_QUERY_VERSION = 1;
export const FRONTIER_INSPECT_IMPACT_KIND = 'frontier.inspect.impact';
export const FRONTIER_INSPECT_IMPACT_VERSION = 1;
export const FRONTIER_INSPECT_REPORT_KIND = 'frontier.inspect.report';
export const FRONTIER_INSPECT_REPORT_VERSION = 1;
export const FRONTIER_INSPECT_FEATURE_MAP_KIND = 'frontier.inspect.feature-map';
export const FRONTIER_INSPECT_FEATURE_MAP_VERSION = 1;
export const FRONTIER_INSPECT_PROOF_KIND = 'frontier.inspect.proof';
export const FRONTIER_INSPECT_PROOF_VERSION = 1;
export const FRONTIER_INSPECT_JSONL_KIND = 'frontier.inspect.jsonl';
export const FRONTIER_INSPECT_JSONL_VERSION = 1;

export type FrontierInspectArtifactKind =
  | 'registry-graph'
  | 'timeline'
  | 'playwright-sample'
  | 'playwright-report'
  | 'event-log'
  | 'route-impact'
  | 'migration'
  | 'benchmark'
  | 'test'
  | 'telemetry'
  | string;

export type FrontierInspectEventSeverity = 'debug' | 'info' | 'warning' | 'error' | string;
export type FrontierInspectEventStatus = 'ok' | 'changed' | 'pending' | 'error' | string;
export type FrontierInspectTimestamp = number | string | Date;

export interface FrontierInspectArtifactInput {
  id?: string;
  kind: FrontierInspectArtifactKind;
  sourcePackage?: string;
  package?: string;
  feature?: string;
  summary?: string;
  timestamp?: FrontierInspectTimestamp;
  tags?: readonly string[];
  files?: readonly string[];
  paths?: readonly FrontierRegistryPath[];
  resources?: readonly string[];
  entryIds?: readonly string[];
  recordIds?: readonly string[];
  graph?: FrontierRegistryGraph | FrontierRegistryGraphInput;
  entries?: readonly FrontierRegistryEntry[];
  records?: readonly FrontierRegistryRecord[];
  edges?: readonly FrontierRegistryEdge[];
  events?: readonly FrontierInspectEventInput[];
  timeline?: readonly FrontierInspectPlaywrightSampleLike[];
  data?: JsonValue;
  metadata?: JsonObject;
}

export interface FrontierInspectArtifact {
  id: string;
  kind: FrontierInspectArtifactKind;
  sourcePackage?: string;
  package?: string;
  feature?: string;
  summary?: string;
  timestamp?: number;
  tags: string[];
  files: string[];
  paths: string[];
  resources: string[];
  entryIds: string[];
  recordIds: string[];
  graph?: FrontierRegistryGraph;
  entries?: FrontierRegistryEntry[];
  records?: FrontierRegistryRecord[];
  edges?: FrontierRegistryEdge[];
  events?: FrontierInspectEvent[];
  data?: JsonValue;
  metadata?: JsonObject;
}

export interface FrontierInspectEventInput {
  id?: string;
  type?: string;
  label?: string;
  timestamp?: FrontierInspectTimestamp;
  source?: string;
  sourcePackage?: string;
  artifactId?: string;
  entryId?: string;
  recordId?: string;
  feature?: string;
  package?: string;
  tags?: readonly string[];
  file?: string;
  path?: FrontierRegistryPath;
  resource?: string;
  selector?: string;
  routeId?: string;
  severity?: FrontierInspectEventSeverity;
  status?: FrontierInspectEventStatus;
  before?: JsonValue;
  after?: JsonValue;
  value?: JsonValue;
  previousValue?: JsonValue;
  metadata?: JsonObject;
}

export interface FrontierInspectEvent {
  id: string;
  type?: string;
  label?: string;
  timestamp?: number;
  source?: string;
  sourcePackage?: string;
  artifactId?: string;
  entryId?: string;
  recordId?: string;
  feature?: string;
  package?: string;
  tags: string[];
  file?: string;
  path?: string;
  resource?: string;
  selector?: string;
  routeId?: string;
  severity?: FrontierInspectEventSeverity;
  status?: FrontierInspectEventStatus;
  before?: JsonValue;
  after?: JsonValue;
  value?: JsonValue;
  previousValue?: JsonValue;
  metadata?: JsonObject;
}

export interface FrontierInspectBundleInput {
  id?: string;
  generatedAt?: FrontierInspectTimestamp;
  graph?: FrontierRegistryGraph | FrontierRegistryGraphInput;
  artifacts?: readonly FrontierInspectArtifactInput[];
  events?: readonly FrontierInspectEventInput[];
  metadata?: JsonObject;
}

export interface FrontierInspectBundle {
  kind: typeof FRONTIER_INSPECT_BUNDLE_KIND;
  version: typeof FRONTIER_INSPECT_BUNDLE_VERSION;
  id?: string;
  generatedAt: number;
  graph: FrontierRegistryGraph;
  artifacts: FrontierInspectArtifact[];
  events: FrontierInspectEvent[];
  summary: FrontierInspectSummary;
  metadata?: JsonObject;
}

export interface FrontierInspectSummary {
  entryCount: number;
  recordCount: number;
  edgeCount: number;
  artifactCount: number;
  eventCount: number;
  featureCount: number;
  packageCount: number;
  fileCount: number;
  resourceCount: number;
  errorCount: number;
}

export interface FrontierInspectQueryInput extends FrontierRegistryQueryInput {
  ids?: readonly string[];
  artifactIds?: readonly string[];
  eventIds?: readonly string[];
  artifactKinds?: readonly string[];
  sourcePackages?: readonly string[];
  resources?: readonly string[];
  entryIds?: readonly string[];
  recordIds?: readonly string[];
  statuses?: readonly string[];
  severities?: readonly string[];
  since?: FrontierInspectTimestamp;
  until?: FrontierInspectTimestamp;
  text?: string;
  limit?: number;
}

export interface FrontierInspectQueryResult {
  kind: typeof FRONTIER_INSPECT_QUERY_KIND;
  version: typeof FRONTIER_INSPECT_QUERY_VERSION;
  query: FrontierInspectQueryInput;
  summary: FrontierInspectSummary;
  registry: FrontierRegistryQueryResult;
  artifacts: FrontierInspectArtifact[];
  events: FrontierInspectEvent[];
}

export interface FrontierInspectImpactInput extends FrontierRegistryImpactInput {
  query?: FrontierInspectQueryInput;
}

export interface FrontierInspectImpact {
  kind: typeof FRONTIER_INSPECT_IMPACT_KIND;
  version: typeof FRONTIER_INSPECT_IMPACT_VERSION;
  generatedAt: number;
  registry: FrontierRegistryImpact;
  artifacts: FrontierInspectArtifact[];
  events: FrontierInspectEvent[];
  features: string[];
  packages: string[];
  tags: string[];
  files: string[];
  paths: string[];
  resources: string[];
}

export interface FrontierInspectQueryPlan {
  id: string;
  query: FrontierInspectQueryInput;
  description?: string;
  limit?: number;
}

export interface FrontierInspectQueryReport {
  id: string;
  description?: string;
  query: FrontierInspectQueryInput;
  count: number;
  artifactIds: string[];
  eventIds: string[];
  entryIds: string[];
}

export interface FrontierInspectReportOptions extends FrontierInspectRedactionOptions {
  queries?: readonly FrontierInspectQueryPlan[];
  impact?: FrontierInspectImpactInput;
  trace?: FrontierRegistryTraceInput;
  validation?: FrontierRegistryValidationOptions;
  includeBundle?: boolean;
  includeFeatureMap?: boolean;
  includeJsonl?: boolean;
}

export interface FrontierInspectReport {
  kind: typeof FRONTIER_INSPECT_REPORT_KIND;
  version: typeof FRONTIER_INSPECT_REPORT_VERSION;
  generatedAt: number;
  summary: FrontierInspectSummary;
  registry: FrontierRegistryExplain;
  queries: FrontierInspectQueryReport[];
  impact?: FrontierInspectImpact;
  trace?: FrontierRegistryTrace;
  validation: FrontierRegistryValidation;
  featureMap?: FrontierInspectFeatureMap;
  proof: FrontierInspectProof;
  bundle?: FrontierInspectBundle;
  jsonl?: string;
}

export interface FrontierInspectFeatureMap {
  kind: typeof FRONTIER_INSPECT_FEATURE_MAP_KIND;
  version: typeof FRONTIER_INSPECT_FEATURE_MAP_VERSION;
  generatedAt: number;
  features: FrontierInspectFeatureSummary[];
}

export interface FrontierInspectFeatureSummary {
  id: string;
  entryCount: number;
  recordCount: number;
  artifactCount: number;
  eventCount: number;
  packages: string[];
  tags: string[];
  files: string[];
  paths: string[];
  resources: string[];
  entries: string[];
  records: string[];
  artifacts: string[];
  events: string[];
  tests: string[];
  benchmarks: string[];
  errors: string[];
}

export interface FrontierInspectProof {
  kind: typeof FRONTIER_INSPECT_PROOF_KIND;
  version: typeof FRONTIER_INSPECT_PROOF_VERSION;
  generatedAt: number;
  algorithm: 'fnv1a-32';
  hash: string;
  summary: FrontierInspectSummary;
}

export interface FrontierInspectRedactionOptions {
  redactKeys?: readonly string[];
  replacement?: string;
  maxDepth?: number;
  maxEntries?: number;
}

export interface FrontierInspectPlaywrightSampleLike {
  kind?: string;
  version?: number;
  index?: number;
  label?: string;
  timestamp?: number;
  url?: string;
  title?: string;
  state?: readonly FrontierInspectPlaywrightStateSampleLike[];
  dom?: readonly FrontierInspectPlaywrightDomSampleLike[];
  registry?: readonly FrontierInspectPlaywrightRegistrySampleLike[];
  marks?: readonly FrontierInspectPlaywrightMarkLike[];
  [key: string]: unknown;
}

export interface FrontierInspectPlaywrightStateSampleLike {
  id: string;
  value?: unknown;
  paths?: readonly { path: string; value?: unknown; missing?: boolean }[];
  error?: string;
}

export interface FrontierInspectPlaywrightDomSampleLike {
  id: string;
  selector: string;
  count?: number;
  nodes?: readonly { index?: number; text?: string; value?: unknown; checked?: boolean; attributes?: Record<string, string> }[];
  error?: string;
}

export interface FrontierInspectPlaywrightRegistrySampleLike {
  id: string;
  globalName?: string;
  graph?: unknown;
  entries?: readonly {
    id: string;
    kind?: string;
    feature?: string;
    package?: string;
    tags?: readonly string[];
    sourceFiles?: readonly string[];
    touches?: readonly string[];
  }[];
  records?: readonly {
    id: string;
    entryId?: string;
    kind?: string;
    status?: string;
    causeId?: string;
  }[];
  error?: string;
}

export interface FrontierInspectPlaywrightMarkLike {
  id: string;
  label: string;
  timestamp: number;
  data?: unknown;
}

interface FrontierInspectBundleIndex {
  registry: FrontierRegistryIndex;
  artifactsById: Map<string, FrontierInspectArtifact>;
  eventsById: Map<string, FrontierInspectEvent>;
  artifactIdsByEntryId: Map<string, Set<string>>;
  eventIdsByEntryId: Map<string, Set<string>>;
  artifactIdsByRecordId: Map<string, Set<string>>;
  eventIdsByRecordId: Map<string, Set<string>>;
}

const bundleIndexes = new WeakMap<FrontierInspectBundle, FrontierInspectBundleIndex>();
const DEFAULT_REDACT_KEYS = [
  'password',
  'passwd',
  'secret',
  'token',
  'accessToken',
  'refreshToken',
  'authorization',
  'cookie',
  'set-cookie',
  'apiKey',
  'apikey',
  'privateKey'
];

export function createInspectBundle(input: FrontierInspectBundleInput = {}): FrontierInspectBundle {
  const generatedAt = normalizeTimestamp(input.generatedAt) ?? Date.now();
  const artifacts = (input.artifacts ?? []).map((artifact, index) => normalizeArtifact(artifact, index));
  const graphs: FrontierRegistryGraph[] = [];
  if (input.graph !== undefined) graphs[graphs.length] = normalizeGraphLike(input.graph);
  for (let i = 0; i < artifacts.length; i++) {
    const graph = graphFromArtifact(artifacts[i]);
    if (graph !== undefined) graphs[graphs.length] = graph;
  }

  const graph = graphs.length === 0
    ? createFrontierRegistryGraph({ generatedAt, metadata: input.metadata })
    : frontierRegistryMergeGraphs(graphs, { generatedAt, metadata: input.metadata });
  const events: FrontierInspectEvent[] = [];
  const directEvents = input.events ?? [];
  for (let i = 0; i < directEvents.length; i++) {
    events[events.length] = normalizeEvent(directEvents[i], events.length);
  }
  for (let i = 0; i < artifacts.length; i++) {
    const artifact = artifacts[i];
    const artifactEvents = artifact.events ?? [];
    for (let j = 0; j < artifactEvents.length; j++) {
      events[events.length] = normalizeEvent(artifactEvents[j], events.length, artifact);
    }
  }

  const bundle: FrontierInspectBundle = {
    kind: FRONTIER_INSPECT_BUNDLE_KIND,
    version: FRONTIER_INSPECT_BUNDLE_VERSION,
    id: input.id === undefined ? undefined : String(input.id),
    generatedAt,
    graph,
    artifacts,
    events: dedupeEvents(events),
    summary: emptySummary(),
    metadata: input.metadata === undefined ? undefined : cloneJsonObject(input.metadata)
  };
  bundle.summary = summarizeInspectBundle(bundle);
  return bundle;
}

export function createInspectArtifact(input: FrontierInspectArtifactInput): FrontierInspectArtifact {
  return normalizeArtifact(input, 0);
}

export function createInspectArtifactFromRegistryGraph(
  graph: FrontierRegistryGraph | FrontierRegistryGraphInput,
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'graph'> = {}
): FrontierInspectArtifact {
  return normalizeArtifact({ ...options, kind: 'registry-graph', graph }, 0);
}

export function createInspectArtifactsFromPlaywrightTimeline(
  timeline: readonly FrontierInspectPlaywrightSampleLike[],
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'timeline'> = {}
): FrontierInspectArtifact {
  return normalizeArtifact({ ...options, kind: 'timeline', timeline }, 0);
}

export function appendInspectArtifact(
  bundle: FrontierInspectBundle,
  artifact: FrontierInspectArtifactInput
): FrontierInspectBundle {
  return createInspectBundle({
    id: bundle.id,
    generatedAt: Date.now(),
    graph: bundle.graph,
    artifacts: [...bundle.artifacts, artifact],
    events: bundle.events,
    metadata: bundle.metadata
  });
}

export function mergeInspectBundles(
  bundles: readonly FrontierInspectBundle[],
  input: Omit<FrontierInspectBundleInput, 'graph' | 'artifacts' | 'events'> = {}
): FrontierInspectBundle {
  const artifacts: FrontierInspectArtifactInput[] = [];
  const events: FrontierInspectEventInput[] = [];
  const graphs: FrontierRegistryGraph[] = [];
  for (let i = 0; i < bundles.length; i++) {
    graphs[graphs.length] = bundles[i].graph;
    for (let j = 0; j < bundles[i].artifacts.length; j++) artifacts[artifacts.length] = bundles[i].artifacts[j];
    for (let j = 0; j < bundles[i].events.length; j++) events[events.length] = bundles[i].events[j];
  }
  return createInspectBundle({
    ...input,
    graph: frontierRegistryMergeGraphs(graphs, { generatedAt: normalizeTimestamp(input.generatedAt) ?? Date.now() }),
    artifacts,
    events
  });
}

export function queryInspectBundle(
  bundle: FrontierInspectBundle,
  input: FrontierInspectQueryInput = {}
): FrontierInspectQueryResult {
  const limit = normalizeLimit(input.limit);
  const registry = shouldQueryRegistry(input)
    ? frontierRegistryQuery(bundle.graph, registryQueryFromInspectQuery(input))
    : emptyRegistryQuery();
  const registryEntryIds = new Set(registry.entries.map((entry) => entry.id));
  const registryRecordIds = new Set(registry.records.map((record) => record.id));
  const artifacts: FrontierInspectArtifact[] = [];
  const events: FrontierInspectEvent[] = [];

  for (let i = 0; i < bundle.artifacts.length; i++) {
    const artifact = bundle.artifacts[i];
    if (matchesArtifact(artifact, input, registryEntryIds, registryRecordIds)) {
      artifacts[artifacts.length] = cloneArtifact(artifact);
      if (artifacts.length >= limit) break;
    }
  }
  for (let i = 0; i < bundle.events.length; i++) {
    const event = bundle.events[i];
    if (matchesEvent(event, input, registryEntryIds, registryRecordIds)) {
      events[events.length] = cloneEvent(event);
      if (events.length >= limit) break;
    }
  }

  return {
    kind: FRONTIER_INSPECT_QUERY_KIND,
    version: FRONTIER_INSPECT_QUERY_VERSION,
    query: cloneQuery(input),
    summary: summarizeParts(registry, artifacts, events),
    registry,
    artifacts,
    events
  };
}

export function traceInspectImpact(
  bundle: FrontierInspectBundle,
  input: FrontierInspectImpactInput = {}
): FrontierInspectImpact {
  const registry = inspectRegistryImpact(bundle.graph, input);
  const entryIds = new Set(registry.entries.map((entry) => entry.id));
  const recordIds = new Set(registry.records.map((record) => record.id));
  const nodes = new Set(registry.nodes);
  const relatedQuery = {
    ...input.query,
    entryIds: unionArray(input.query?.entryIds, Array.from(entryIds)),
    recordIds: unionArray(input.query?.recordIds, Array.from(recordIds))
  };
  const artifacts = bundle.artifacts
    .filter((artifact) => relatedToImpact(artifact, entryIds, recordIds, nodes) && matchesArtifact(artifact, relatedQuery))
    .map(cloneArtifact);
  const events = bundle.events
    .filter((event) => relatedEventToImpact(event, entryIds, recordIds, nodes) && matchesEvent(event, relatedQuery))
    .map(cloneEvent);

  return {
    kind: FRONTIER_INSPECT_IMPACT_KIND,
    version: FRONTIER_INSPECT_IMPACT_VERSION,
    generatedAt: Date.now(),
    registry,
    artifacts,
    events,
    features: collectImpactValues(registry, artifacts, events, 'feature'),
    packages: collectImpactValues(registry, artifacts, events, 'package'),
    tags: collectImpactTags(registry, artifacts, events),
    files: collectImpactFiles(registry, artifacts, events),
    paths: collectImpactPaths(registry, artifacts, events),
    resources: collectImpactResources(registry, artifacts, events)
  };
}

export function explainInspectBundle(
  bundle: FrontierInspectBundle,
  input: FrontierRegistryExplainInput = {}
): FrontierRegistryExplain {
  return frontierRegistryExplain(bundle.graph, input);
}

export function createInspectReport(
  bundle: FrontierInspectBundle,
  options: FrontierInspectReportOptions = {}
): FrontierInspectReport {
  const workingBundle = hasRedactionOptions(options) ? redactInspectBundle(bundle, options) : bundle;
  const registry = frontierRegistryExplain(workingBundle.graph, {
    validation: options.validation
  });
  const validation = frontierRegistryValidateGraph(workingBundle.graph, options.validation);
  const queryReports = (options.queries ?? []).map((plan) => {
    const result = queryInspectBundle(workingBundle, { ...plan.query, limit: plan.limit ?? plan.query.limit });
    return {
      id: plan.id,
      description: plan.description,
      query: cloneQuery(plan.query),
      count: result.artifacts.length + result.events.length + result.registry.entries.length,
      artifactIds: result.artifacts.map((artifact) => artifact.id),
      eventIds: result.events.map((event) => event.id),
      entryIds: result.registry.entries.map((entry) => entry.id)
    };
  });
  const report: FrontierInspectReport = {
    kind: FRONTIER_INSPECT_REPORT_KIND,
    version: FRONTIER_INSPECT_REPORT_VERSION,
    generatedAt: Date.now(),
    summary: summarizeInspectBundle(workingBundle),
    registry,
    queries: queryReports,
    impact: options.impact === undefined ? undefined : traceInspectImpact(workingBundle, options.impact),
    trace: options.trace === undefined ? undefined : frontierRegistryTrace(workingBundle.graph, options.trace),
    validation,
    featureMap: options.includeFeatureMap === false ? undefined : createInspectFeatureMap(workingBundle),
    proof: createInspectProof(workingBundle),
    bundle: options.includeBundle === true ? cloneBundle(workingBundle) : undefined,
    jsonl: options.includeJsonl === true ? encodeInspectJsonl(workingBundle, options) : undefined
  };
  return report;
}

export function createInspectFeatureMap(bundle: FrontierInspectBundle): FrontierInspectFeatureMap {
  const summaries = new Map<string, MutableFeatureSummary>();
  const registry = frontierRegistryIndex(bundle.graph);
  for (const feature of registry.features) {
    const summary = getFeatureSummary(summaries, feature.id);
    for (const entry of feature.entries) addUnique(summary.entries, entry);
    for (const packageName of feature.packages) addUnique(summary.packages, packageName);
    for (const tag of feature.tags) addUnique(summary.tags, tag);
    for (const path of feature.reads.concat(feature.writes)) addUnique(summary.paths, path);
    for (const touch of feature.touches) addUnique(summary.resources, touch);
    for (const test of feature.tests) addUnique(summary.tests, test);
    for (const telemetry of feature.telemetry) addUnique(summary.events, telemetry);
  }
  for (const entry of bundle.graph.entries) {
    const feature = entry.feature ?? inferFeatureFromEntry(entry);
    if (feature === undefined) continue;
    const summary = getFeatureSummary(summaries, feature);
    addUnique(summary.entries, entry.id);
    if (entry.package !== undefined) addUnique(summary.packages, entry.package);
    for (const tag of entry.tags ?? []) addUnique(summary.tags, tag);
    for (const source of normalizeSourceFiles(entry)) addUnique(summary.files, source);
    for (const path of entry.reads ?? []) addUnique(summary.paths, normalizeFrontierRegistryPath(path));
    for (const path of entry.writes ?? []) addUnique(summary.paths, normalizeFrontierRegistryPath(path));
    for (const resource of entry.touches ?? []) addUnique(summary.resources, resource);
    if (entry.kind === 'test' || entry.kind === 'fixture') addUnique(summary.tests, entry.id);
  }
  for (const record of bundle.graph.records) {
    const entry = registry.entriesById[record.entryId];
    const feature = entry?.feature ?? inferFeatureFromEntry(entry);
    if (feature === undefined) continue;
    const summary = getFeatureSummary(summaries, feature);
    addUnique(summary.records, record.id);
    if (record.status === 'error' || record.error !== undefined) addUnique(summary.errors, record.id);
  }
  for (const artifact of bundle.artifacts) {
    const feature = artifact.feature;
    if (feature === undefined) continue;
    const summary = getFeatureSummary(summaries, feature);
    addUnique(summary.artifacts, artifact.id);
    if (artifact.package !== undefined) addUnique(summary.packages, artifact.package);
    if (artifact.sourcePackage !== undefined) addUnique(summary.packages, artifact.sourcePackage);
    for (const tag of artifact.tags) addUnique(summary.tags, tag);
    for (const file of artifact.files) addUnique(summary.files, file);
    for (const path of artifact.paths) addUnique(summary.paths, path);
    for (const resource of artifact.resources) addUnique(summary.resources, resource);
    if (artifact.kind === 'test') addUnique(summary.tests, artifact.id);
    if (artifact.kind === 'benchmark') addUnique(summary.benchmarks, artifact.id);
  }
  for (const event of bundle.events) {
    const feature = event.feature;
    if (feature === undefined) continue;
    const summary = getFeatureSummary(summaries, feature);
    addUnique(summary.events, event.id);
    if (event.package !== undefined) addUnique(summary.packages, event.package);
    for (const tag of event.tags) addUnique(summary.tags, tag);
    if (event.file !== undefined) addUnique(summary.files, event.file);
    if (event.path !== undefined) addUnique(summary.paths, event.path);
    if (event.resource !== undefined) addUnique(summary.resources, event.resource);
    if (event.status === 'error' || event.severity === 'error') addUnique(summary.errors, event.id);
  }
  const features = Array.from(summaries.values(), finalizeFeatureSummary).sort((left, right) => left.id.localeCompare(right.id));
  return {
    kind: FRONTIER_INSPECT_FEATURE_MAP_KIND,
    version: FRONTIER_INSPECT_FEATURE_MAP_VERSION,
    generatedAt: Date.now(),
    features
  };
}

export function summarizeInspectBundle(bundle: FrontierInspectBundle): FrontierInspectSummary {
  const features = new Set<string>();
  const packages = new Set<string>();
  const files = new Set<string>();
  const resources = new Set<string>();
  let errorCount = 0;

  for (const entry of bundle.graph.entries) {
    if (entry.feature !== undefined) features.add(entry.feature);
    if (entry.package !== undefined) packages.add(entry.package);
    for (const source of normalizeSourceFiles(entry)) files.add(source);
    for (const resource of entry.touches ?? []) resources.add(resource);
  }
  for (const record of bundle.graph.records) {
    if (record.status === 'error' || record.error !== undefined) errorCount++;
  }
  for (const artifact of bundle.artifacts) {
    if (artifact.feature !== undefined) features.add(artifact.feature);
    if (artifact.package !== undefined) packages.add(artifact.package);
    if (artifact.sourcePackage !== undefined) packages.add(artifact.sourcePackage);
    for (const file of artifact.files) files.add(file);
    for (const resource of artifact.resources) resources.add(resource);
  }
  for (const event of bundle.events) {
    if (event.feature !== undefined) features.add(event.feature);
    if (event.package !== undefined) packages.add(event.package);
    if (event.sourcePackage !== undefined) packages.add(event.sourcePackage);
    if (event.file !== undefined) files.add(event.file);
    if (event.resource !== undefined) resources.add(event.resource);
    if (event.status === 'error' || event.severity === 'error') errorCount++;
  }

  return {
    entryCount: bundle.graph.entries.length,
    recordCount: bundle.graph.records.length,
    edgeCount: bundle.graph.edges.length,
    artifactCount: bundle.artifacts.length,
    eventCount: bundle.events.length,
    featureCount: features.size,
    packageCount: packages.size,
    fileCount: files.size,
    resourceCount: resources.size,
    errorCount
  };
}

export function createInspectProof(bundle: FrontierInspectBundle): FrontierInspectProof {
  const payload = stableStringify({
    id: bundle.id,
    graph: {
      entries: bundle.graph.entries.map((entry) => entry.id).sort(),
      records: bundle.graph.records.map((record) => record.id).sort(),
      edges: bundle.graph.edges.map((edge) => edge.from + '|' + edge.kind + '|' + edge.to).sort()
    },
    artifacts: bundle.artifacts.map((artifact) => artifact.id + ':' + artifact.kind).sort(),
    events: bundle.events.map((event) => event.id + ':' + (event.status ?? '')).sort(),
    summary: summarizeInspectBundle(bundle)
  });
  return {
    kind: FRONTIER_INSPECT_PROOF_KIND,
    version: FRONTIER_INSPECT_PROOF_VERSION,
    generatedAt: Date.now(),
    algorithm: 'fnv1a-32',
    hash: fnv1a32(payload),
    summary: summarizeInspectBundle(bundle)
  };
}

export function encodeInspectJsonl(bundle: FrontierInspectBundle, options: FrontierInspectRedactionOptions = {}): string {
  const working = hasRedactionOptions(options) ? redactInspectBundle(bundle, options) : bundle;
  const lines: string[] = [
    stableStringify({
      kind: FRONTIER_INSPECT_JSONL_KIND,
      version: FRONTIER_INSPECT_JSONL_VERSION,
      bundleKind: working.kind,
      bundleVersion: working.version,
      id: working.id,
      generatedAt: working.generatedAt,
      summary: working.summary,
      metadata: working.metadata
    })
  ];
  for (const entry of working.graph.entries) lines[lines.length] = stableStringify({ kind: 'frontier.registry.entry', value: entry });
  for (const record of working.graph.records) lines[lines.length] = stableStringify({ kind: 'frontier.registry.record', value: record });
  for (const edge of working.graph.edges) lines[lines.length] = stableStringify({ kind: 'frontier.registry.edge', value: edge });
  for (const artifact of working.artifacts) lines[lines.length] = stableStringify({ kind: 'frontier.inspect.artifact', value: artifact });
  for (const event of working.events) lines[lines.length] = stableStringify({ kind: 'frontier.inspect.event', value: event });
  return lines.join('\n') + '\n';
}

export function decodeInspectJsonl(text: string): FrontierInspectBundle {
  const artifacts: FrontierInspectArtifactInput[] = [];
  const events: FrontierInspectEventInput[] = [];
  const entries: FrontierRegistryEntry[] = [];
  const records: FrontierRegistryRecord[] = [];
  const edges: FrontierRegistryEdge[] = [];
  let id: string | undefined;
  let generatedAt: number | undefined;
  let metadata: JsonObject | undefined;
  const lines = String(text).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '') continue;
    const parsed = JSON.parse(line) as { kind?: string; value?: unknown; id?: string; generatedAt?: number; metadata?: JsonObject };
    if (parsed.kind === FRONTIER_INSPECT_JSONL_KIND) {
      id = parsed.id;
      generatedAt = parsed.generatedAt;
      metadata = parsed.metadata;
    } else if (parsed.kind === 'frontier.registry.entry') {
      entries[entries.length] = parsed.value as FrontierRegistryEntry;
    } else if (parsed.kind === 'frontier.registry.record') {
      records[records.length] = parsed.value as FrontierRegistryRecord;
    } else if (parsed.kind === 'frontier.registry.edge') {
      edges[edges.length] = parsed.value as FrontierRegistryEdge;
    } else if (parsed.kind === 'frontier.inspect.artifact') {
      artifacts[artifacts.length] = parsed.value as FrontierInspectArtifact;
    } else if (parsed.kind === 'frontier.inspect.event') {
      events[events.length] = parsed.value as FrontierInspectEvent;
    }
  }
  return createInspectBundle({
    id,
    generatedAt,
    graph: { entries, records, edges, generatedAt, metadata },
    artifacts,
    events,
    metadata
  });
}

export function redactInspectBundle(
  bundle: FrontierInspectBundle,
  options: FrontierInspectRedactionOptions = {}
): FrontierInspectBundle {
  const keys = new Set((options.redactKeys ?? DEFAULT_REDACT_KEYS).map((key) => key.toLowerCase()));
  const replacement = options.replacement ?? '[redacted]';
  const maxDepth = options.maxDepth ?? 8;
  const maxEntries = options.maxEntries ?? 200;
  return sanitizeForJson(bundle, keys, replacement, maxDepth, maxEntries) as FrontierInspectBundle;
}

function normalizeArtifact(input: FrontierInspectArtifactInput, index: number): FrontierInspectArtifact {
  const id = input.id === undefined ? 'artifact:' + index + ':' + input.kind : normalizeNonEmpty(input.id, 'inspect artifact id');
  const graph = graphFromArtifactInput(input);
  const timelineEvents = input.timeline === undefined ? [] : eventsFromPlaywrightTimeline(input.timeline, id, input);
  const inputEvents = (input.events ?? []).map((event, eventIndex) => normalizeEvent(event, eventIndex, { id } as FrontierInspectArtifact));
  const events = inputEvents.concat(timelineEvents);
  const entryIds = new Set(input.entryIds?.map(String) ?? []);
  const recordIds = new Set(input.recordIds?.map(String) ?? []);
  if (graph !== undefined) {
    for (const entry of graph.entries) entryIds.add(entry.id);
    for (const record of graph.records) recordIds.add(record.id);
  }
  return {
    id,
    kind: String(input.kind),
    sourcePackage: input.sourcePackage === undefined ? undefined : String(input.sourcePackage),
    package: input.package === undefined ? input.sourcePackage === undefined ? undefined : String(input.sourcePackage) : String(input.package),
    feature: input.feature === undefined ? undefined : String(input.feature),
    summary: input.summary === undefined ? undefined : String(input.summary),
    timestamp: normalizeTimestamp(input.timestamp),
    tags: uniqueStrings(input.tags ?? []),
    files: uniqueStrings(input.files ?? []).concat(graph === undefined ? [] : graph.entries.flatMap(normalizeSourceFiles)).sort(),
    paths: uniqueStrings((input.paths ?? []).map((path) => normalizeFrontierRegistryPath(path))),
    resources: uniqueStrings(input.resources ?? []),
    entryIds: Array.from(entryIds).sort(),
    recordIds: Array.from(recordIds).sort(),
    graph,
    entries: graph === undefined ? undefined : graph.entries.map((entry) => entry),
    records: graph === undefined ? undefined : graph.records.map((record) => record),
    edges: graph === undefined ? undefined : graph.edges.map((edge) => edge),
    events: events.length === 0 ? undefined : events,
    data: input.data === undefined ? undefined : cloneJsonValue(input.data),
    metadata: input.metadata === undefined ? undefined : cloneJsonObject(input.metadata)
  };
}

function normalizeEvent(
  input: FrontierInspectEventInput,
  index: number,
  artifact?: Pick<FrontierInspectArtifact, 'id' | 'sourcePackage' | 'feature' | 'package' | 'tags'>
): FrontierInspectEvent {
  const id = input.id === undefined
    ? 'event:' + (artifact?.id ?? 'bundle') + ':' + index
    : normalizeNonEmpty(input.id, 'inspect event id');
  return {
    id,
    type: input.type === undefined ? undefined : String(input.type),
    label: input.label === undefined ? undefined : String(input.label),
    timestamp: normalizeTimestamp(input.timestamp),
    source: input.source === undefined ? undefined : String(input.source),
    sourcePackage: input.sourcePackage === undefined ? artifact?.sourcePackage : String(input.sourcePackage),
    artifactId: input.artifactId === undefined ? artifact?.id : String(input.artifactId),
    entryId: input.entryId === undefined ? undefined : String(input.entryId),
    recordId: input.recordId === undefined ? undefined : String(input.recordId),
    feature: input.feature === undefined ? artifact?.feature : String(input.feature),
    package: input.package === undefined ? artifact?.package : String(input.package),
    tags: uniqueStrings((artifact?.tags ?? []).concat(input.tags ?? [])),
    file: input.file === undefined ? undefined : String(input.file),
    path: input.path === undefined ? undefined : normalizeFrontierRegistryPath(input.path),
    resource: input.resource === undefined ? undefined : String(input.resource),
    selector: input.selector === undefined ? undefined : String(input.selector),
    routeId: input.routeId === undefined ? undefined : String(input.routeId),
    severity: input.severity === undefined ? undefined : String(input.severity),
    status: input.status === undefined ? undefined : String(input.status),
    before: input.before === undefined ? undefined : cloneJsonValue(input.before),
    after: input.after === undefined ? undefined : cloneJsonValue(input.after),
    value: input.value === undefined ? undefined : cloneJsonValue(input.value),
    previousValue: input.previousValue === undefined ? undefined : cloneJsonValue(input.previousValue),
    metadata: input.metadata === undefined ? undefined : cloneJsonObject(input.metadata)
  };
}

function eventsFromPlaywrightTimeline(
  timeline: readonly FrontierInspectPlaywrightSampleLike[],
  artifactId: string,
  artifact: FrontierInspectArtifactInput
): FrontierInspectEvent[] {
  const events: FrontierInspectEvent[] = [];
  for (let i = 0; i < timeline.length; i++) {
    const sample = timeline[i];
    const prefix = 'playwright:' + (sample.index ?? i);
    for (const mark of sample.marks ?? []) {
      events[events.length] = normalizeEvent({
        id: prefix + ':mark:' + mark.id,
        type: 'mark',
        label: mark.label,
        timestamp: mark.timestamp,
        source: 'playwright',
        artifactId,
        feature: artifact.feature,
        package: artifact.package ?? artifact.sourcePackage,
        tags: artifact.tags,
        value: toJsonValue(mark.data),
        status: 'ok'
      }, events.length);
    }
    for (const state of sample.state ?? []) {
      for (const statePath of state.paths ?? []) {
        events[events.length] = normalizeEvent({
          id: prefix + ':state:' + state.id + ':' + statePath.path,
          type: 'state',
          label: sample.label,
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          feature: artifact.feature,
          package: artifact.package ?? artifact.sourcePackage,
          tags: artifact.tags,
          path: statePath.path,
          value: toJsonValue(statePath.value),
          status: statePath.missing === true ? 'missing' : 'ok'
        }, events.length);
      }
      if (state.error !== undefined) {
        events[events.length] = normalizeEvent({
          id: prefix + ':state-error:' + state.id,
          type: 'state',
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          severity: 'error',
          status: 'error',
          value: state.error
        }, events.length);
      }
    }
    for (const dom of sample.dom ?? []) {
      for (const node of dom.nodes ?? []) {
        events[events.length] = normalizeEvent({
          id: prefix + ':dom:' + dom.id + ':' + (node.index ?? events.length),
          type: 'dom',
          label: sample.label,
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          feature: artifact.feature,
          package: artifact.package ?? artifact.sourcePackage,
          tags: artifact.tags,
          selector: dom.selector,
          value: toJsonValue({ text: node.text, value: node.value, checked: node.checked, attributes: node.attributes }),
          status: 'ok'
        }, events.length);
      }
      if (dom.error !== undefined) {
        events[events.length] = normalizeEvent({
          id: prefix + ':dom-error:' + dom.id,
          type: 'dom',
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          selector: dom.selector,
          severity: 'error',
          status: 'error',
          value: dom.error
        }, events.length);
      }
    }
    for (const registry of sample.registry ?? []) {
      for (const entry of registry.entries ?? []) {
        events[events.length] = normalizeEvent({
          id: prefix + ':registry-entry:' + entry.id,
          type: 'registry',
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          entryId: entry.id,
          feature: entry.feature ?? artifact.feature,
          package: entry.package ?? artifact.package ?? artifact.sourcePackage,
          tags: uniqueStrings((artifact.tags ?? []).concat(entry.tags ?? [])),
          status: 'ok',
          value: toJsonValue({ kind: entry.kind, sourceFiles: entry.sourceFiles, touches: entry.touches })
        }, events.length);
      }
      for (const record of registry.records ?? []) {
        events[events.length] = normalizeEvent({
          id: prefix + ':registry-record:' + record.id,
          type: 'registry',
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          entryId: record.entryId,
          recordId: record.id,
          status: record.status ?? 'ok',
          value: toJsonValue({ kind: record.kind, causeId: record.causeId })
        }, events.length);
      }
      if (registry.error !== undefined) {
        events[events.length] = normalizeEvent({
          id: prefix + ':registry-error:' + registry.id,
          type: 'registry',
          timestamp: sample.timestamp,
          source: 'playwright',
          artifactId,
          severity: 'error',
          status: 'error',
          value: registry.error
        }, events.length);
      }
    }
  }
  return events;
}

function graphFromArtifactInput(input: FrontierInspectArtifactInput): FrontierRegistryGraph | undefined {
  if (input.graph !== undefined) return normalizeGraphLike(input.graph);
  if (input.entries !== undefined || input.records !== undefined || input.edges !== undefined) {
    return createFrontierRegistryGraph({
      entries: input.entries,
      records: input.records,
      edges: input.edges,
      generatedAt: normalizeTimestamp(input.timestamp),
      metadata: input.metadata
    });
  }
  if (input.timeline !== undefined) return graphFromPlaywrightTimeline(input.timeline, input);
  return undefined;
}

function graphFromArtifact(artifact: FrontierInspectArtifact): FrontierRegistryGraph | undefined {
  if (artifact.graph !== undefined) return artifact.graph;
  if (artifact.entries !== undefined || artifact.records !== undefined || artifact.edges !== undefined) {
    return createFrontierRegistryGraph({
      entries: artifact.entries,
      records: artifact.records,
      edges: artifact.edges,
      generatedAt: artifact.timestamp,
      metadata: artifact.metadata
    });
  }
  return undefined;
}

function graphFromPlaywrightTimeline(
  timeline: readonly FrontierInspectPlaywrightSampleLike[],
  artifact: FrontierInspectArtifactInput
): FrontierRegistryGraph | undefined {
  const graphs: FrontierRegistryGraph[] = [];
  const entries: FrontierRegistryEntry[] = [];
  const records: FrontierRegistryRecord[] = [];
  for (let i = 0; i < timeline.length; i++) {
    for (const registry of timeline[i].registry ?? []) {
      if (isRegistryGraph(registry.graph)) graphs[graphs.length] = normalizeGraphLike(registry.graph);
      for (const entry of registry.entries ?? []) {
        entries[entries.length] = {
          id: entry.id,
          kind: entry.kind ?? 'probe',
          feature: entry.feature ?? artifact.feature,
          package: entry.package ?? artifact.package ?? artifact.sourcePackage,
          source: (entry.sourceFiles ?? []).map((file) => ({ file })),
          touches: entry.touches,
          tags: uniqueStrings((artifact.tags ?? []).concat(entry.tags ?? []))
        };
      }
      for (const record of registry.records ?? []) {
        if (record.entryId === undefined) continue;
        records[records.length] = {
          id: record.id,
          entryId: record.entryId,
          kind: record.kind,
          status: record.status,
          causeId: record.causeId
        };
      }
    }
  }
  if (entries.length !== 0 || records.length !== 0) {
    graphs[graphs.length] = createFrontierRegistryGraph({ entries, records });
  }
  if (graphs.length === 0) return undefined;
  return frontierRegistryMergeGraphs(graphs);
}

function registryQueryFromInspectQuery(input: FrontierInspectQueryInput): FrontierRegistryQueryInput {
  return {
    ids: unionArray(input.entryIds, input.ids),
    kinds: input.kinds,
    features: input.features,
    packages: input.packages,
    tags: input.tags,
    files: input.files,
    paths: input.paths
  };
}

function shouldQueryRegistry(input: FrontierInspectQueryInput): boolean {
  if (!hasInspectQueryFilters(input)) return true;
  return input.ids !== undefined ||
    input.entryIds !== undefined ||
    input.kinds !== undefined ||
    input.features !== undefined ||
    input.packages !== undefined ||
    input.tags !== undefined ||
    input.files !== undefined ||
    input.paths !== undefined;
}

function hasInspectQueryFilters(input: FrontierInspectQueryInput): boolean {
  return input.ids !== undefined ||
    input.artifactIds !== undefined ||
    input.eventIds !== undefined ||
    input.artifactKinds !== undefined ||
    input.sourcePackages !== undefined ||
    input.resources !== undefined ||
    input.entryIds !== undefined ||
    input.recordIds !== undefined ||
    input.statuses !== undefined ||
    input.severities !== undefined ||
    input.since !== undefined ||
    input.until !== undefined ||
    input.text !== undefined ||
    input.kinds !== undefined ||
    input.features !== undefined ||
    input.packages !== undefined ||
    input.tags !== undefined ||
    input.files !== undefined ||
    input.paths !== undefined;
}

function emptyRegistryQuery(): FrontierRegistryQueryResult {
  return {
    kind: 'frontier.registry.query',
    version: 1,
    entries: [],
    records: [],
    edges: []
  };
}

function inspectRegistryImpact(graph: FrontierRegistryGraph, input: FrontierRegistryImpactInput): FrontierRegistryImpact {
  const seeds = normalizeImpactSeeds(input);
  const visited = new Set<string>(seeds);
  const queue = seeds.slice();
  const direction = input.direction ?? 'both';
  const forward = new Map<string, FrontierRegistryEdge[]>();
  const reverse = new Map<string, FrontierRegistryEdge[]>();

  for (const edge of graph.edges) {
    addEdge(forward, edge.from, edge);
    addEdge(reverse, edge.to, edge);
  }
  for (const path of input.paths ?? []) {
    const normalized = normalizeFrontierRegistryPath(path);
    for (const edge of graph.edges) {
      if (edge.to.startsWith('path:') && registryPathsOverlap(edge.to.slice(5), normalized)) {
        enqueue(edge.to, visited, queue);
        enqueue(edge.from, visited, queue);
      }
      if (edge.from.startsWith('path:') && registryPathsOverlap(edge.from.slice(5), normalized)) {
        enqueue(edge.from, visited, queue);
        enqueue(edge.to, visited, queue);
      }
    }
  }
  while (queue.length !== 0) {
    const node = queue.shift() as string;
    if (direction === 'forward' || direction === 'both') {
      const edges = forward.get(node);
      if (edges !== undefined) for (const edge of edges) enqueue(edge.to, visited, queue);
    }
    if (direction === 'reverse' || direction === 'both') {
      const edges = reverse.get(node);
      if (edges !== undefined) for (const edge of edges) enqueue(edge.from, visited, queue);
    }
  }

  const nodes = Array.from(visited).sort();
  const impacted = new Set(nodes);
  const selected = createFrontierRegistryGraph({
    entries: graph.entries.filter((entry) => impacted.has('entry:' + entry.id)),
    records: graph.records.filter((record) => impacted.has('record:' + record.id)),
    edges: graph.edges.filter((edge) => impacted.has(edge.from) || impacted.has(edge.to))
  });
  return {
    kind: 'frontier.registry.impact',
    version: 1,
    seeds: seeds.slice().sort(),
    nodes,
    entries: selected.entries,
    records: selected.records,
    edges: selected.edges
  };
}

function normalizeImpactSeeds(input: FrontierRegistryImpactInput): string[] {
  const seeds: string[] = [];
  for (const id of input.ids ?? []) addUnique(seeds, 'entry:' + String(id));
  for (const path of input.paths ?? []) addUnique(seeds, 'path:' + normalizeFrontierRegistryPath(path));
  for (const feature of input.features ?? []) addUnique(seeds, 'feature:' + String(feature));
  for (const packageName of input.packages ?? []) addUnique(seeds, 'package:' + String(packageName));
  for (const tag of input.tags ?? []) addUnique(seeds, 'tag:' + String(tag));
  for (const file of input.files ?? []) addUnique(seeds, 'file:' + String(file));
  for (const node of input.nodes ?? []) addUnique(seeds, normalizeInspectNode(node));
  return seeds;
}

function addEdge(map: Map<string, FrontierRegistryEdge[]>, key: string, edge: FrontierRegistryEdge): void {
  const bucket = map.get(key);
  if (bucket === undefined) map.set(key, [edge]);
  else bucket[bucket.length] = edge;
}

function enqueue(node: string, visited: Set<string>, queue: string[]): void {
  if (visited.has(node)) return;
  visited.add(node);
  queue[queue.length] = node;
}

function registryPathsOverlap(left: string, right: string): boolean {
  if (left === right || left === '/*' || right === '/*') return true;
  const leftParts = splitPointer(left);
  const rightParts = splitPointer(right);
  const length = Math.min(leftParts.length, rightParts.length);
  for (let i = 0; i < length; i++) {
    if (leftParts[i] === '*' || rightParts[i] === '*') continue;
    if (leftParts[i] !== rightParts[i]) return false;
  }
  return leftParts.length === rightParts.length ||
    leftParts[leftParts.length - 1] === '*' ||
    rightParts[rightParts.length - 1] === '*';
}

function splitPointer(path: string): string[] {
  if (path === '' || path === '/') return [];
  return path.replace(/^\//, '').split('/');
}

function normalizeInspectNode(node: string): string {
  const value = String(node);
  if (/^[a-z][a-z0-9.-]*:.+$/i.test(value)) return value;
  return 'node:' + value;
}

function matchesArtifact(
  artifact: FrontierInspectArtifact,
  input: FrontierInspectQueryInput,
  registryEntryIds: Set<string> = new Set(),
  registryRecordIds: Set<string> = new Set()
): boolean {
  if (!matchesIdFilters(artifact.id, input.artifactIds, input.ids)) return false;
  if (!matchesSetValue(artifact.kind, input.artifactKinds)) return false;
  if (!matchesSetValue(artifact.sourcePackage, input.sourcePackages)) return false;
  if (!matchesSetValue(artifact.package, input.packages)) return false;
  if (!matchesSetValue(artifact.feature, input.features)) return false;
  if (!matchesAny(artifact.tags, input.tags)) return false;
  if (!matchesAny(artifact.files, input.files)) return false;
  if (!matchesPathAny(artifact.paths, input.paths)) return false;
  if (!matchesAny(artifact.resources, input.resources)) return false;
  if (!matchesAny(artifact.entryIds, input.entryIds) && !intersectsSet(artifact.entryIds, registryEntryIds)) return false;
  if (!matchesAny(artifact.recordIds, input.recordIds) && !intersectsSet(artifact.recordIds, registryRecordIds)) return false;
  if (!matchesTime(artifact.timestamp, input.since, input.until)) return false;
  if (!matchesText(artifactText(artifact), input.text)) return false;
  return true;
}

function matchesEvent(
  event: FrontierInspectEvent,
  input: FrontierInspectQueryInput,
  registryEntryIds: Set<string> = new Set(),
  registryRecordIds: Set<string> = new Set()
): boolean {
  if (!matchesIdFilters(event.id, input.eventIds, input.ids)) return false;
  if (!matchesSetValue(event.sourcePackage, input.sourcePackages)) return false;
  if (!matchesSetValue(event.package, input.packages)) return false;
  if (!matchesSetValue(event.feature, input.features)) return false;
  if (!matchesAny(event.tags, input.tags)) return false;
  if (!matchesOptionalOne(event.file, input.files)) return false;
  if (!matchesOptionalPath(event.path, input.paths)) return false;
  if (!matchesOptionalOne(event.resource, input.resources)) return false;
  if (!matchesOptionalOne(event.entryId, input.entryIds) && !(event.entryId !== undefined && registryEntryIds.has(event.entryId))) return false;
  if (!matchesOptionalOne(event.recordId, input.recordIds) && !(event.recordId !== undefined && registryRecordIds.has(event.recordId))) return false;
  if (!matchesSetValue(event.status, input.statuses)) return false;
  if (!matchesSetValue(event.severity, input.severities)) return false;
  if (!matchesTime(event.timestamp, input.since, input.until)) return false;
  if (!matchesText(eventText(event), input.text)) return false;
  return true;
}

function relatedToImpact(
  artifact: FrontierInspectArtifact,
  entryIds: Set<string>,
  recordIds: Set<string>,
  nodes: Set<string>
): boolean {
  if (intersectsSet(artifact.entryIds, entryIds) || intersectsSet(artifact.recordIds, recordIds)) return true;
  for (const file of artifact.files) if (nodes.has('file:' + file)) return true;
  for (const path of artifact.paths) if (nodes.has('path:' + path)) return true;
  if (artifact.feature !== undefined && nodes.has('feature:' + artifact.feature)) return true;
  if (artifact.package !== undefined && nodes.has('package:' + artifact.package)) return true;
  return false;
}

function relatedEventToImpact(
  event: FrontierInspectEvent,
  entryIds: Set<string>,
  recordIds: Set<string>,
  nodes: Set<string>
): boolean {
  if (event.entryId !== undefined && entryIds.has(event.entryId)) return true;
  if (event.recordId !== undefined && recordIds.has(event.recordId)) return true;
  if (event.file !== undefined && nodes.has('file:' + event.file)) return true;
  if (event.path !== undefined && nodes.has('path:' + event.path)) return true;
  if (event.feature !== undefined && nodes.has('feature:' + event.feature)) return true;
  if (event.package !== undefined && nodes.has('package:' + event.package)) return true;
  return false;
}

function getBundleIndex(bundle: FrontierInspectBundle): FrontierInspectBundleIndex {
  const cached = bundleIndexes.get(bundle);
  if (cached !== undefined) return cached;
  const index: FrontierInspectBundleIndex = {
    registry: frontierRegistryIndex(bundle.graph),
    artifactsById: new Map(),
    eventsById: new Map(),
    artifactIdsByEntryId: new Map(),
    eventIdsByEntryId: new Map(),
    artifactIdsByRecordId: new Map(),
    eventIdsByRecordId: new Map()
  };
  for (const artifact of bundle.artifacts) {
    index.artifactsById.set(artifact.id, artifact);
    for (const entryId of artifact.entryIds) addMapSet(index.artifactIdsByEntryId, entryId, artifact.id);
    for (const recordId of artifact.recordIds) addMapSet(index.artifactIdsByRecordId, recordId, artifact.id);
  }
  for (const event of bundle.events) {
    index.eventsById.set(event.id, event);
    if (event.entryId !== undefined) addMapSet(index.eventIdsByEntryId, event.entryId, event.id);
    if (event.recordId !== undefined) addMapSet(index.eventIdsByRecordId, event.recordId, event.id);
  }
  bundleIndexes.set(bundle, index);
  return index;
}

function summarizeParts(
  registry: FrontierRegistryQueryResult,
  artifacts: readonly FrontierInspectArtifact[],
  events: readonly FrontierInspectEvent[]
): FrontierInspectSummary {
  return summarizeInspectBundle({
    kind: FRONTIER_INSPECT_BUNDLE_KIND,
    version: FRONTIER_INSPECT_BUNDLE_VERSION,
    generatedAt: 0,
    graph: createFrontierRegistryGraph({ entries: registry.entries, records: registry.records, edges: registry.edges }),
    artifacts: artifacts.map(cloneArtifact),
    events: events.map(cloneEvent),
    summary: emptySummary()
  });
}

function emptySummary(): FrontierInspectSummary {
  return {
    entryCount: 0,
    recordCount: 0,
    edgeCount: 0,
    artifactCount: 0,
    eventCount: 0,
    featureCount: 0,
    packageCount: 0,
    fileCount: 0,
    resourceCount: 0,
    errorCount: 0
  };
}

type MutableFeatureSummary = Omit<FrontierInspectFeatureSummary, 'entryCount' | 'recordCount' | 'artifactCount' | 'eventCount'> & {
  entryCount?: number;
  recordCount?: number;
  artifactCount?: number;
  eventCount?: number;
};

function getFeatureSummary(summaries: Map<string, MutableFeatureSummary>, id: string): MutableFeatureSummary {
  let summary = summaries.get(id);
  if (summary !== undefined) return summary;
  summary = {
    id,
    packages: [],
    tags: [],
    files: [],
    paths: [],
    resources: [],
    entries: [],
    records: [],
    artifacts: [],
    events: [],
    tests: [],
    benchmarks: [],
    errors: []
  };
  summaries.set(id, summary);
  return summary;
}

function finalizeFeatureSummary(summary: MutableFeatureSummary): FrontierInspectFeatureSummary {
  return {
    id: summary.id,
    entryCount: summary.entries.length,
    recordCount: summary.records.length,
    artifactCount: summary.artifacts.length,
    eventCount: summary.events.length,
    packages: summary.packages.sort(),
    tags: summary.tags.sort(),
    files: summary.files.sort(),
    paths: summary.paths.sort(),
    resources: summary.resources.sort(),
    entries: summary.entries.sort(),
    records: summary.records.sort(),
    artifacts: summary.artifacts.sort(),
    events: summary.events.sort(),
    tests: summary.tests.sort(),
    benchmarks: summary.benchmarks.sort(),
    errors: summary.errors.sort()
  };
}

function inferFeatureFromEntry(entry: FrontierRegistryEntry | undefined): string | undefined {
  if (entry === undefined) return undefined;
  if (entry.kind === 'feature') return entry.id;
  const parts = entry.id.split(/[.:/]/).filter(Boolean);
  return parts.length === 0 ? undefined : parts[0];
}

function collectImpactValues(
  registry: FrontierRegistryImpact,
  artifacts: readonly FrontierInspectArtifact[],
  events: readonly FrontierInspectEvent[],
  field: 'feature' | 'package'
): string[] {
  const values: string[] = [];
  for (const entry of registry.entries) {
    const value = field === 'feature' ? entry.feature : entry.package;
    if (value !== undefined) addUnique(values, value);
  }
  for (const artifact of artifacts) {
    const value = field === 'feature' ? artifact.feature : artifact.package;
    if (value !== undefined) addUnique(values, value);
  }
  for (const event of events) {
    const value = field === 'feature' ? event.feature : event.package;
    if (value !== undefined) addUnique(values, value);
  }
  return values.sort();
}

function collectImpactTags(
  registry: FrontierRegistryImpact,
  artifacts: readonly FrontierInspectArtifact[],
  events: readonly FrontierInspectEvent[]
): string[] {
  const values: string[] = [];
  for (const entry of registry.entries) for (const tag of entry.tags ?? []) addUnique(values, tag);
  for (const artifact of artifacts) for (const tag of artifact.tags) addUnique(values, tag);
  for (const event of events) for (const tag of event.tags) addUnique(values, tag);
  return values.sort();
}

function collectImpactFiles(
  registry: FrontierRegistryImpact,
  artifacts: readonly FrontierInspectArtifact[],
  events: readonly FrontierInspectEvent[]
): string[] {
  const values: string[] = [];
  for (const entry of registry.entries) for (const file of normalizeSourceFiles(entry)) addUnique(values, file);
  for (const artifact of artifacts) for (const file of artifact.files) addUnique(values, file);
  for (const event of events) if (event.file !== undefined) addUnique(values, event.file);
  return values.sort();
}

function collectImpactPaths(
  registry: FrontierRegistryImpact,
  artifacts: readonly FrontierInspectArtifact[],
  events: readonly FrontierInspectEvent[]
): string[] {
  const values: string[] = [];
  for (const entry of registry.entries) {
    for (const path of entry.reads ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
    for (const path of entry.writes ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
  }
  for (const record of registry.records) {
    for (const path of record.reads ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
    for (const path of record.writes ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
  }
  for (const artifact of artifacts) for (const path of artifact.paths) addUnique(values, path);
  for (const event of events) if (event.path !== undefined) addUnique(values, event.path);
  return values.sort();
}

function collectImpactResources(
  registry: FrontierRegistryImpact,
  artifacts: readonly FrontierInspectArtifact[],
  events: readonly FrontierInspectEvent[]
): string[] {
  const values: string[] = [];
  for (const entry of registry.entries) for (const resource of entry.touches ?? []) addUnique(values, resource);
  for (const artifact of artifacts) for (const resource of artifact.resources) addUnique(values, resource);
  for (const event of events) if (event.resource !== undefined) addUnique(values, event.resource);
  return values.sort();
}

function normalizeGraphLike(graph: FrontierRegistryGraph | FrontierRegistryGraphInput): FrontierRegistryGraph {
  if (isRegistryGraph(graph)) {
    return createFrontierRegistryGraph({
      entries: graph.entries,
      records: graph.records,
      edges: graph.edges,
      generatedAt: graph.generatedAt,
      metadata: graph.metadata
    });
  }
  return createFrontierRegistryGraph(graph);
}

function isRegistryGraph(value: unknown): value is FrontierRegistryGraph {
  if (typeof value !== 'object' || value === null) return false;
  const graph = value as Partial<FrontierRegistryGraph>;
  return graph.kind === 'frontier.registry.graph' &&
    graph.version === 1 &&
    Array.isArray(graph.entries) &&
    Array.isArray(graph.records) &&
    Array.isArray(graph.edges);
}

function normalizeSourceFiles(entry: FrontierRegistryEntry): string[] {
  if (entry.source === undefined) return [];
  const sources = Array.isArray(entry.source) ? entry.source : [entry.source];
  return sources.map((source) => String(source.file)).filter(Boolean);
}

function matchesIdFilters(id: string, exact: readonly string[] | undefined, general: readonly string[] | undefined): boolean {
  if (exact === undefined && general === undefined) return true;
  return (exact !== undefined && exact.includes(id)) || (general !== undefined && general.includes(id));
}

function matchesSetValue(value: string | undefined, expected: readonly string[] | undefined): boolean {
  return expected === undefined || (value !== undefined && expected.includes(value));
}

function matchesAny(values: readonly string[], expected: readonly string[] | undefined): boolean {
  if (expected === undefined) return true;
  for (const value of values) if (expected.includes(value)) return true;
  return false;
}

function matchesOptionalOne(value: string | undefined, expected: readonly string[] | undefined): boolean {
  return expected === undefined || (value !== undefined && expected.includes(value));
}

function matchesPathAny(values: readonly string[], expected: readonly FrontierRegistryPath[] | undefined): boolean {
  if (expected === undefined) return true;
  const normalized = expected.map((path) => normalizeFrontierRegistryPath(path));
  for (const value of values) if (normalized.includes(value)) return true;
  return false;
}

function matchesOptionalPath(value: string | undefined, expected: readonly FrontierRegistryPath[] | undefined): boolean {
  if (expected === undefined) return true;
  if (value === undefined) return false;
  return expected.map((path) => normalizeFrontierRegistryPath(path)).includes(value);
}

function matchesTime(value: number | undefined, since: FrontierInspectTimestamp | undefined, until: FrontierInspectTimestamp | undefined): boolean {
  if (since === undefined && until === undefined) return true;
  if (value === undefined) return false;
  const min = normalizeTimestamp(since);
  const max = normalizeTimestamp(until);
  return (min === undefined || value >= min) && (max === undefined || value <= max);
}

function matchesText(text: string, query: string | undefined): boolean {
  return query === undefined || text.toLowerCase().includes(query.toLowerCase());
}

function artifactText(artifact: FrontierInspectArtifact): string {
  return [
    artifact.id,
    artifact.kind,
    artifact.sourcePackage,
    artifact.package,
    artifact.feature,
    artifact.summary,
    artifact.tags.join(' '),
    artifact.files.join(' '),
    artifact.resources.join(' ')
  ].filter(Boolean).join(' ');
}

function eventText(event: FrontierInspectEvent): string {
  return [
    event.id,
    event.type,
    event.label,
    event.source,
    event.sourcePackage,
    event.package,
    event.feature,
    event.tags.join(' '),
    event.file,
    event.path,
    event.resource,
    event.selector,
    event.routeId,
    event.status,
    event.severity
  ].filter(Boolean).join(' ');
}

function cloneBundle(bundle: FrontierInspectBundle): FrontierInspectBundle {
  return createInspectBundle({
    id: bundle.id,
    generatedAt: bundle.generatedAt,
    graph: bundle.graph,
    artifacts: bundle.artifacts,
    events: bundle.events,
    metadata: bundle.metadata
  });
}

function cloneArtifact(artifact: FrontierInspectArtifact): FrontierInspectArtifact {
  return normalizeArtifact(artifact, 0);
}

function cloneEvent(event: FrontierInspectEvent): FrontierInspectEvent {
  return normalizeEvent(event, 0);
}

function cloneQuery(input: FrontierInspectQueryInput): FrontierInspectQueryInput {
  return { ...input };
}

function cloneJsonValue<T extends JsonValue>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function cloneJsonObject(value: JsonObject): JsonObject {
  return cloneJsonValue(value);
}

function toJsonValue(value: unknown): JsonValue {
  const converted = sanitizeUnknownJson(value, 10, 500);
  return converted === undefined ? null : converted;
}

function sanitizeUnknownJson(value: unknown, depth: number, entriesLeft: number): JsonValue | undefined {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (depth <= 0 || entriesLeft <= 0) return '[truncated]';
  if (Array.isArray(value)) {
    const out: JsonValue[] = [];
    for (let i = 0; i < value.length && i < entriesLeft; i++) {
      const next = sanitizeUnknownJson(value[i], depth - 1, entriesLeft - i - 1);
      if (next !== undefined) out[out.length] = next;
    }
    return out;
  }
  if (typeof value === 'object') {
    const out: JsonObject = {};
    let count = 0;
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      if (count >= entriesLeft) break;
      const next = sanitizeUnknownJson((value as Record<string, unknown>)[key], depth - 1, entriesLeft - count - 1);
      if (next !== undefined) out[key] = next;
      count++;
    }
    return out;
  }
  return undefined;
}

function sanitizeForJson(
  value: unknown,
  redactKeys: Set<string>,
  replacement: string,
  maxDepth: number,
  maxEntries: number,
  depth = 0,
  seen = new WeakSet<object>()
): unknown {
  if (value === null || typeof value !== 'object') return value;
  if (seen.has(value)) return '[circular]';
  if (depth >= maxDepth) return '[truncated]';
  seen.add(value);
  if (Array.isArray(value)) {
    const out = value.slice(0, maxEntries).map((item) => sanitizeForJson(item, redactKeys, replacement, maxDepth, maxEntries, depth + 1, seen));
    seen.delete(value);
    return out;
  }
  const out: Record<string, unknown> = {};
  let count = 0;
  for (const key of Object.keys(value as Record<string, unknown>).sort()) {
    if (count >= maxEntries) {
      out.__truncated__ = true;
      break;
    }
    out[key] = redactKeys.has(key.toLowerCase())
      ? replacement
      : sanitizeForJson((value as Record<string, unknown>)[key], redactKeys, replacement, maxDepth, maxEntries, depth + 1, seen);
    count++;
  }
  seen.delete(value);
  return out;
}

function normalizeTimestamp(value: FrontierInspectTimestamp | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeNonEmpty(value: string, label: string): string {
  const normalized = String(value);
  if (normalized.length === 0) throw new TypeError(label + ' must be a non-empty string');
  return normalized;
}

function uniqueStrings(values: readonly string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < values.length; i++) addUnique(out, String(values[i]));
  return out.sort();
}

function addUnique(values: string[], value: string): void {
  if (value.length !== 0 && !values.includes(value)) values[values.length] = value;
}

function unionArray(left: readonly string[] | undefined, right: readonly string[] | undefined): string[] | undefined {
  if (left === undefined && right === undefined) return undefined;
  return uniqueStrings((left ?? []).concat(right ?? []));
}

function intersectsSet(values: readonly string[], set: Set<string>): boolean {
  for (const value of values) if (set.has(value)) return true;
  return false;
}

function dedupeEvents(events: readonly FrontierInspectEvent[]): FrontierInspectEvent[] {
  const seen = new Set<string>();
  const out: FrontierInspectEvent[] = [];
  for (const event of events) {
    if (seen.has(event.id)) continue;
    seen.add(event.id);
    out[out.length] = cloneEvent(event);
  }
  return out;
}

function addMapSet(map: Map<string, Set<string>>, key: string, value: string): void {
  const existing = map.get(key);
  if (existing === undefined) map.set(key, new Set([value]));
  else existing.add(value);
}

function normalizeLimit(value: number | undefined): number {
  return value === undefined ? Number.POSITIVE_INFINITY : Math.max(0, Math.floor(value));
}

function hasRedactionOptions(options: FrontierInspectRedactionOptions): boolean {
  return options.redactKeys !== undefined ||
    options.replacement !== undefined ||
    options.maxDepth !== undefined ||
    options.maxEntries !== undefined;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortJson(value));
}

function sortJson(value: unknown): unknown {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(sortJson);
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>).sort()) {
    const next = (value as Record<string, unknown>)[key];
    if (next !== undefined) out[key] = sortJson(next);
  }
  return out;
}

function fnv1a32(text: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

void getBundleIndex;
