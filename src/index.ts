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
export const FRONTIER_INSPECT_SEMANTIC_MERGE_EVIDENCE_KIND = 'frontier.inspect.semantic-merge-evidence';
export const FRONTIER_INSPECT_SEMANTIC_MERGE_EVIDENCE_VERSION = 1;
export const FRONTIER_INSPECT_BUNDLE_HEALTH_SUMMARY_KIND = 'frontier.inspect.bundle-health-summary';
export const FRONTIER_INSPECT_BUNDLE_HEALTH_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_DEFAULT_DRAIN_GATE_HEALTH_SUMMARY_KIND = 'frontier.inspect.default-drain-gate-health-summary';
export const FRONTIER_INSPECT_DEFAULT_DRAIN_GATE_HEALTH_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_AUTONOMOUS_MERGE_HEALTH_SUMMARY_KIND = 'frontier.inspect.autonomous-merge-health-summary';
export const FRONTIER_INSPECT_AUTONOMOUS_MERGE_HEALTH_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_MERGE_QUEUE_HEALTH_SUMMARY_KIND = 'frontier.inspect.merge-queue-health-summary';
export const FRONTIER_INSPECT_MERGE_QUEUE_HEALTH_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_CONTINUOUS_POOL_HEALTH_SUMMARY_KIND = 'frontier.inspect.continuous-pool-health-summary';
export const FRONTIER_INSPECT_CONTINUOUS_POOL_HEALTH_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_COORDINATOR_QUEUE_THROUGHPUT_SUMMARY_KIND = 'frontier.inspect.coordinator-queue-throughput-summary';
export const FRONTIER_INSPECT_COORDINATOR_QUEUE_THROUGHPUT_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_APPLIED_WORK_SUMMARY_KIND = 'frontier.inspect.applied-work-summary';
export const FRONTIER_INSPECT_APPLIED_WORK_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_DASHBOARD_SUMMARY_KIND = 'frontier.inspect.dashboard-summary';
export const FRONTIER_INSPECT_DASHBOARD_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_OPERATOR_DASHBOARD_SUMMARY_KIND = FRONTIER_INSPECT_DASHBOARD_SUMMARY_KIND;
export const FRONTIER_INSPECT_OPERATOR_DASHBOARD_SUMMARY_VERSION = FRONTIER_INSPECT_DASHBOARD_SUMMARY_VERSION;
export const FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_KIND = 'frontier.inspect.swarm-lifetime-summary';
export const FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_VERSION = 1;
export const FRONTIER_INSPECT_AUTONOMOUS_RUN_OUTCOME_SUMMARY_KIND = FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_KIND;
export const FRONTIER_INSPECT_AUTONOMOUS_RUN_OUTCOME_SUMMARY_VERSION = FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_VERSION;

export type FrontierInspectArtifactKind =
  | 'registry-graph'
  | 'timeline'
  | 'playwright-sample'
  | 'playwright-report'
  | 'event-log'
  | 'event-log-records'
  | 'route-manifest'
  | 'route-impact'
  | 'migration'
  | 'migration-report'
  | 'benchmark'
  | 'benchmark-report'
  | 'test'
  | 'semantic-merge-evidence'
  | 'telemetry'
  | 'log-records'
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

export interface FrontierInspectAutonomousMergeHealthSummary {
  kind: typeof FRONTIER_INSPECT_AUTONOMOUS_MERGE_HEALTH_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_AUTONOMOUS_MERGE_HEALTH_SUMMARY_VERSION;
  generatedAt: number;
  activeCoordinators: FrontierInspectAutonomousMergeHealthBucketSummary;
  openLanes: FrontierInspectAutonomousMergeHealthBucketSummary;
  terminalDecisions: FrontierInspectAutonomousMergeHealthTerminalDecisionSummary;
  reviewDebt: FrontierInspectAutonomousMergeHealthReviewDebtSummary;
  realHumanBlockers: FrontierInspectAutonomousMergeHealthHumanQuestionSummary;
  staleRerunCleanup: FrontierInspectAutonomousMergeHealthCleanupSummary;
  appliedThroughput: FrontierInspectAutonomousMergeHealthAppliedThroughputSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectMergeQueueHealthSummary {
  kind: typeof FRONTIER_INSPECT_MERGE_QUEUE_HEALTH_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_MERGE_QUEUE_HEALTH_SUMMARY_VERSION;
  generatedAt: number;
  queueDepthByMeaning: FrontierInspectSwarmLifetimeQueueDepthSummary;
  leaders: FrontierInspectAutonomousMergeHealthBucketSummary;
  deferredWork: FrontierInspectAutonomousMergeHealthReviewDebtSummary;
  promotions: FrontierInspectAutonomousMergeHealthAppliedThroughputSummary;
  terminalDecisions: FrontierInspectAutonomousMergeHealthTerminalDecisionSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectContinuousPoolHealthSummary {
  kind: typeof FRONTIER_INSPECT_CONTINUOUS_POOL_HEALTH_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_CONTINUOUS_POOL_HEALTH_SUMMARY_VERSION;
  generatedAt: number;
  activeWork: FrontierInspectContinuousPoolHealthActiveWorkSummary;
  coordinatorDrain: FrontierInspectContinuousPoolHealthCoordinatorDrainSummary;
  trueBlockers: FrontierInspectContinuousPoolHealthTrueBlockerSummary;
  belowTargetReasons: FrontierInspectContinuousPoolHealthBelowTargetSummary;
  doneOutput: FrontierInspectContinuousPoolHealthDoneOutputSummary;
  noise: FrontierInspectContinuousPoolHealthNoiseSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectCoordinatorQueueThroughputSummary {
  kind: typeof FRONTIER_INSPECT_COORDINATOR_QUEUE_THROUGHPUT_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_COORDINATOR_QUEUE_THROUGHPUT_SUMMARY_VERSION;
  generatedAt: number;
  throughput: FrontierInspectCoordinatorQueueThroughputThroughputSummary;
  bottlenecks: FrontierInspectCoordinatorQueueThroughputBottleneckSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectCoordinatorQueueThroughputThroughputSummary {
  activeAgents: FrontierInspectAutonomousMergeHealthBucketSummary;
  targetConcurrency: number;
  backlogCount: number;
  refillGap: number;
  appliedCount: number;
  committedCount: number;
  completedCount: number;
  usefulOutputCount: number;
}

export interface FrontierInspectCoordinatorQueueThroughputBottleneck {
  name: string;
  count: number;
}

export interface FrontierInspectCoordinatorQueueThroughputBottleneckSummary {
  reviewDrainPressure: number;
  reviewCount: number;
  rerunCount: number;
  conflictCount: number;
  humanQuestionCount: number;
  realBlockerCount: number;
  packageGateCount: number;
  suppressedAuditArtifactCount: number;
  primaryBottlenecks: FrontierInspectCoordinatorQueueThroughputBottleneck[];
}

export interface FrontierInspectAppliedWorkSummary {
  kind: typeof FRONTIER_INSPECT_APPLIED_WORK_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_APPLIED_WORK_SUMMARY_VERSION;
  generatedAt: number;
  activeWorkers: FrontierInspectAutonomousMergeHealthBucketSummary;
  appliedWork: FrontierInspectAppliedWorkOutcomeSummary;
  committedWork: FrontierInspectAppliedWorkOutcomeSummary;
  evidenceOnlyDoneWork: FrontierInspectAppliedWorkOutcomeSummary;
  coordinatorReview: FrontierInspectAutonomousMergeHealthReviewDebtSummary;
  trueBlockers: FrontierInspectAppliedWorkTrueBlockerSummary;
  staleRerun: FrontierInspectAppliedWorkStaleRerunSummary;
  successfulOutputCount: number;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectDashboardSummary {
  kind: typeof FRONTIER_INSPECT_DASHBOARD_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_DASHBOARD_SUMMARY_VERSION;
  generatedAt: number;
  epics: FrontierInspectFeatureMap;
  tasks: FrontierInspectAppliedWorkSummary;
  lanes: FrontierInspectAutonomousMergeHealthBucketSummary;
  activeAgents: FrontierInspectAutonomousMergeHealthBucketSummary;
  questions: FrontierInspectAutonomousMergeHealthHumanQuestionSummary;
  history: FrontierInspectSwarmLifetimeSummary;
  performance: FrontierInspectSwarmLifetimeModelPerformanceSummary;
  testing: FrontierInspectDefaultDrainGateHealthSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectBundleHealthCard {
  id: string;
  label: string;
  value: number;
  detail: string;
  status: 'ok' | 'info' | 'warning' | 'blocked' | 'unavailable';
  action: string;
  sourceFields: string[];
}

export interface FrontierInspectAutonomousMergeHealthBucketSummary {
  count: number;
  ids: string[];
  sources: string[];
}

export interface FrontierInspectAutonomousMergeHealthTerminalDecisionSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  statuses: string[];
}

export interface FrontierInspectAutonomousMergeHealthReviewDebtSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  coordinatorReviewCount: number;
  items: FrontierInspectAutonomousMergeHealthReviewDebtItem[];
}

export interface FrontierInspectAutonomousMergeHealthReviewDebtItem {
  id: string;
  reason?: string;
  owner?: string;
  ageMs?: number;
  terminalPath?: string;
  sources: string[];
}

export interface FrontierInspectAutonomousMergeHealthHumanQuestion {
  id: string;
  code: string;
  status?: string;
  owner?: string;
  surface?: string;
  missingAuthority?: string;
  question?: string;
  answerCode?: string;
  reason: string;
  sources: string[];
}

export interface FrontierInspectAutonomousMergeHealthHumanQuestionSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  reasons: string[];
  questions: FrontierInspectAutonomousMergeHealthHumanQuestion[];
}

export interface FrontierInspectAutonomousMergeHealthCleanupSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  staleCount: number;
  rerunCount: number;
}

export interface FrontierInspectAutonomousMergeHealthAppliedThroughputSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  appliedCount: number;
  committedCount: number;
}

export interface FrontierInspectBundleHealthBucketSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {}

export interface FrontierInspectBundleHealthHumanBlockerSummary extends FrontierInspectBundleHealthBucketSummary {
  reasons: string[];
}

export interface FrontierInspectBundleHealthSummary {
  kind: typeof FRONTIER_INSPECT_BUNDLE_HEALTH_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_BUNDLE_HEALTH_SUMMARY_VERSION;
  generatedAt: number;
  status: 'ok' | 'info' | 'warning' | 'blocked' | 'unavailable';
  headline: string;
  cards: FrontierInspectBundleHealthCard[];
  completeBundles: FrontierInspectBundleHealthBucketSummary;
  generatedPatches: FrontierInspectBundleHealthBucketSummary;
  missingPatch: FrontierInspectBundleHealthBucketSummary;
  missingBundle: FrontierInspectBundleHealthBucketSummary;
  noChangeDone: FrontierInspectBundleHealthBucketSummary;
  evidenceOnlyDone: FrontierInspectBundleHealthBucketSummary;
  failedGate: FrontierInspectBundleHealthBucketSummary;
  trueHumanBlockers: FrontierInspectBundleHealthHumanBlockerSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectDefaultDrainGateHealthCard extends FrontierInspectBundleHealthCard {}

export interface FrontierInspectDefaultDrainGateHealthBucketSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {}

export interface FrontierInspectDefaultDrainGateHealthHumanBlockerSummary extends FrontierInspectDefaultDrainGateHealthBucketSummary {
  reasons: string[];
}

export interface FrontierInspectDefaultDrainGateHealthGateSummary extends FrontierInspectDefaultDrainGateHealthBucketSummary {
  requiredCount: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
}

export interface FrontierInspectDefaultDrainGateHealthSummary {
  kind: typeof FRONTIER_INSPECT_DEFAULT_DRAIN_GATE_HEALTH_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_DEFAULT_DRAIN_GATE_HEALTH_SUMMARY_VERSION;
  generatedAt: number;
  status: 'ok' | 'info' | 'warning' | 'blocked' | 'unavailable';
  headline: string;
  cards: FrontierInspectDefaultDrainGateHealthCard[];
  candidatesWithGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  candidatesMissingGates: FrontierInspectDefaultDrainGateHealthBucketSummary;
  appliedAfterGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  failedGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  skippedRequiredGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  trueHumanBlockers: FrontierInspectDefaultDrainGateHealthHumanBlockerSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectContinuousPoolHealthActiveWorkSummary {
  activeAgents: FrontierInspectAutonomousMergeHealthBucketSummary;
  targetConcurrency: number;
  targetGap: number;
  backlogCount: number;
  refillGap: number;
}

export interface FrontierInspectContinuousPoolHealthCoordinatorDrainSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  reviewDrainPressure: number;
  reviewCount: number;
  rerunCount: number;
}

export interface FrontierInspectContinuousPoolHealthTrueBlockerSummary {
  conflictBlocks: FrontierInspectAutonomousMergeHealthBucketSummary;
  trueHumanQuestions: FrontierInspectAutonomousMergeHealthHumanQuestionSummary;
}

export interface FrontierInspectContinuousPoolHealthBelowTargetReasonSummary {
  id: string;
  label: string;
  count: number;
  ids: string[];
  sources: string[];
}

export interface FrontierInspectContinuousPoolHealthBelowTargetSummary {
  gap: number;
  reasons: FrontierInspectContinuousPoolHealthBelowTargetReasonSummary[];
  sources: string[];
}

export interface FrontierInspectContinuousPoolHealthDoneOutputSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  appliedCount: number;
  committedCount: number;
  completedCount: number;
}

export interface FrontierInspectContinuousPoolHealthNoiseSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  staleCount: number;
  rerunCount: number;
  staleRerunCount: number;
  staleRerunRate: number;
}

export interface FrontierInspectAppliedWorkOutcomeSummary extends FrontierInspectAutonomousMergeHealthBucketSummary {
  appliedCount?: number;
  committedCount?: number;
  evidenceOnlyCount?: number;
}

export interface FrontierInspectAppliedWorkTrueBlockerSummary {
  conflictBlocks: FrontierInspectAutonomousMergeHealthBucketSummary;
  trueHumanQuestions: FrontierInspectAutonomousMergeHealthHumanQuestionSummary;
}

export interface FrontierInspectAppliedWorkStaleRerunSummary extends FrontierInspectAutonomousMergeHealthCleanupSummary {
  staleRerunCount: number;
}

export interface FrontierInspectSwarmLifetimeSummary {
  kind: typeof FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_KIND;
  version: typeof FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_VERSION;
  generatedAt: number;
  live: FrontierInspectSwarmLifetimeLiveSummary;
  visibleOutcomeCount: number;
  suppressedAuditArtifactCount: number;
  usefulOutputCount: number;
  cost?: FrontierInspectSwarmLifetimeCostSummary;
  modelPerformance: FrontierInspectSwarmLifetimeModelPerformanceSummary;
  sourcesScanned: FrontierInspectSwarmLifetimeSourcesScannedSummary;
  archivedEvidence: FrontierInspectSummary;
}

export interface FrontierInspectSwarmLifetimeLiveSummary {
  activeAgents: FrontierInspectSwarmLifetimeLiveBucketSummary;
  runOutcomes: FrontierInspectSwarmLifetimeRunOutcomeSummary;
  queueDepthByMeaning: FrontierInspectSwarmLifetimeQueueDepthSummary;
  reviewDebt: FrontierInspectSwarmLifetimeReviewDebtSummary;
  trueHumanQuestions: FrontierInspectSwarmLifetimeHumanQuestionSummary;
  packageGates: FrontierInspectSwarmLifetimePackageGateSummary;
  suppressedAuditArtifacts: FrontierInspectSwarmLifetimeSuppressedAuditArtifactSummary;
}

export interface FrontierInspectSwarmLifetimeLiveBucketSummary {
  count: number;
  ids: string[];
  sources: string[];
}

export interface FrontierInspectSwarmLifetimeRunOutcomeSummary {
  completed: FrontierInspectSwarmLifetimeLiveBucketSummary;
  committedApplied: FrontierInspectSwarmLifetimeLiveBucketSummary;
  conflicts: FrontierInspectSwarmLifetimeLiveBucketSummary;
  reruns: FrontierInspectSwarmLifetimeLiveBucketSummary;
}

export interface FrontierInspectSwarmLifetimePackageGateSummary {
  count: number;
  ids: string[];
  sources: string[];
  states: string[];
  requiredCount: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
}

export interface FrontierInspectSwarmLifetimeSuppressedAuditArtifactSummary extends FrontierInspectSwarmLifetimeLiveBucketSummary {
  reasons: string[];
}

export interface FrontierInspectSwarmLifetimeQueueDepthSummary {
  activeWork: number;
  coordinatorReview: number;
  completedHistory: number;
  committedApplied: number;
  conflicts: number;
  rerunWork: number;
  packageGates: number;
  suppressedAuditArtifacts: number;
  realBlockers: number;
  humanQuestions: number;
}

export interface FrontierInspectSwarmLifetimeReviewDebtSummary {
  count: number;
  coordinatorReviewCount: number;
  rerunWorkCount: number;
  ids: string[];
  sources: string[];
}

export interface FrontierInspectSwarmLifetimeHumanQuestionSummary extends FrontierInspectSwarmLifetimeLiveBucketSummary {
  reasons: string[];
}

export interface FrontierInspectSwarmLifetimeCostSummary {
  known: boolean;
  inputTokens?: number;
  cachedInputTokens?: number;
  uncachedInputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
  sourceCount: number;
  sources: string[];
}

export interface FrontierInspectSwarmLifetimeSourcesScannedSummary {
  count: number;
  packages: string[];
  files: string[];
  resources: string[];
}

export interface FrontierInspectSwarmLifetimeRuntimeSummary {
  count: number;
  totalMs?: number;
  averageMs?: number;
  minMs?: number;
  maxMs?: number;
}

export interface FrontierInspectSwarmLifetimePerformanceSummaryBase {
  count: number;
  successCount: number;
  usefulOutputCount: number;
  rerunCount: number;
  staleCount: number;
  rejectCount: number;
  cheapSuccessCount: number;
  expensiveSuccessCount: number;
  wasteCount: number;
  escalationBenefitCount: number;
  successRate: number;
  usefulOutputRate: number;
  rerunRate: number;
  staleRate: number;
  rejectRate: number;
  cheapSuccessRate: number;
  expensiveSuccessRate: number;
  wasteRate: number;
  escalationBenefitRate: number;
  missingPricingCount: number;
  missingPricingReasons: string[];
  runtimeMs: FrontierInspectSwarmLifetimeRuntimeSummary;
  cost?: FrontierInspectSwarmLifetimeCostSummary;
}

export interface FrontierInspectSwarmLifetimePerformanceTaskKindSummary extends FrontierInspectSwarmLifetimePerformanceSummaryBase {
  model: string;
  computeTier: string;
  taskKind: string;
}

export interface FrontierInspectSwarmLifetimePerformanceComputeTierSummary extends FrontierInspectSwarmLifetimePerformanceSummaryBase {
  model: string;
  computeTier: string;
  byTaskKind: FrontierInspectSwarmLifetimePerformanceTaskKindSummary[];
}

export interface FrontierInspectSwarmLifetimePerformanceModelSummary extends FrontierInspectSwarmLifetimePerformanceSummaryBase {
  model: string;
  byComputeTier: FrontierInspectSwarmLifetimePerformanceComputeTierSummary[];
}

export interface FrontierInspectSwarmLifetimeModelPerformanceSummary extends FrontierInspectSwarmLifetimePerformanceSummaryBase {
  modelCount: number;
  computeTierCount: number;
  taskKindCount: number;
  byModel: FrontierInspectSwarmLifetimePerformanceModelSummary[];
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

export interface FrontierInspectRouteManifestLike {
  kind?: string;
  version?: number;
  generatedAt?: FrontierInspectTimestamp;
  routes?: readonly FrontierInspectRouteEntryLike[];
  transitions?: readonly FrontierInspectRouteTransitionLike[];
  diagnostics?: readonly FrontierInspectDiagnosticLike[];
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectRouteEntryLike {
  id: string;
  kind?: string;
  resource?: string;
  pattern?: string;
  parentId?: string;
  title?: string;
  feature?: string;
  owner?: string;
  package?: string;
  source?: FrontierInspectSourceLike | readonly FrontierInspectSourceLike[];
  reads?: readonly FrontierRegistryPath[];
  writes?: readonly FrontierRegistryPath[];
  loads?: readonly (string | FrontierInspectDescriptorLike)[];
  emits?: readonly string[];
  guards?: readonly (string | FrontierInspectDescriptorLike)[];
  tags?: readonly string[];
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectRouteTransitionLike {
  id?: string;
  from?: string | readonly string[];
  to: string;
  kind?: string;
  reads?: readonly FrontierRegistryPath[];
  writes?: readonly FrontierRegistryPath[];
  loads?: readonly (string | FrontierInspectDescriptorLike)[];
  emits?: readonly string[];
  guards?: readonly (string | FrontierInspectDescriptorLike)[];
  tags?: readonly string[];
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectRouteImpactLike {
  kind?: string;
  version?: number;
  seeds?: readonly string[];
  routeIds?: readonly string[];
  transitionIds?: readonly string[];
  routes?: readonly FrontierInspectRouteEntryLike[];
  transitions?: readonly FrontierInspectRouteTransitionLike[];
  resources?: readonly string[];
  paths?: readonly string[];
  reads?: readonly string[];
  writes?: readonly string[];
  loads?: readonly string[];
  guards?: readonly string[];
  emits?: readonly string[];
  files?: readonly string[];
  features?: readonly string[];
  packages?: readonly string[];
  tags?: readonly string[];
  [key: string]: unknown;
}

export interface FrontierInspectMigrationReportLike {
  kind?: string;
  registryId?: string;
  source?: string;
  plugin?: string;
  api?: string;
  actor?: string;
  fromVersion?: string | number;
  toVersion?: string | number;
  targetVersion?: string | number;
  changed?: boolean;
  dryRun?: boolean;
  stepCount?: number;
  steps?: readonly FrontierInspectMigrationStepLike[];
  warnings?: readonly FrontierInspectDiagnosticLike[];
  elapsedMs?: number;
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectMigrationStepLike {
  id: string;
  from?: string | number;
  to?: string | number;
  direction?: string;
  checksum?: string;
  reads?: readonly FrontierRegistryPath[];
  writes?: readonly FrontierRegistryPath[];
  elapsedMs?: number;
  [key: string]: unknown;
}

export interface FrontierInspectDiagnosticLike {
  severity?: FrontierInspectEventSeverity;
  code?: string;
  message?: string;
  routeId?: string;
  transitionId?: string;
  stepId?: string;
  path?: FrontierRegistryPath;
  detail?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectLogRecordLike {
  time?: number;
  observedTime?: number;
  level?: string;
  severityNumber?: number;
  name?: string;
  message?: string;
  traceId?: string;
  spanId?: string;
  parentSpanId?: string;
  durationMs?: number;
  resource?: Record<string, unknown>;
  scope?: string;
  attributes?: Record<string, unknown>;
  telemetry?: Record<string, unknown>;
  patch?: Record<string, unknown>;
  crdt?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface FrontierInspectEventLogRecordLike {
  offset?: number;
  timestamp?: number;
  key?: string;
  value?: unknown;
  headers?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface FrontierInspectBenchmarkReportLike {
  package?: string;
  version?: string;
  generatedAt?: FrontierInspectTimestamp;
  entryCount?: number;
  rounds?: number;
  rows?: readonly FrontierInspectBenchmarkRowLike[];
  [key: string]: unknown;
}

export interface FrontierInspectBenchmarkRowLike {
  fixture?: string;
  name?: string;
  medianUs?: number;
  p95Us?: number;
  status?: string;
  [key: string]: unknown;
}

export type FrontierInspectSemanticMergeDecision =
  | 'accepted'
  | 'rejected'
  | 'needs-review'
  | 'conflict'
  | 'merged'
  | string;

export type FrontierInspectSemanticMergeStatus = 'ok' | 'changed' | 'pending' | 'error' | string;

export interface FrontierInspectSemanticMergeEvidenceLike {
  kind?: string;
  version?: number;
  id?: string;
  generatedAt?: FrontierInspectTimestamp;
  mergeId?: string;
  bundleId?: string;
  source?: string;
  sourcePackage?: string;
  feature?: string;
  package?: string;
  summary?: string;
  changedPaths?: readonly FrontierRegistryPath[];
  paths?: readonly FrontierRegistryPath[];
  changedFiles?: readonly string[];
  files?: readonly string[];
  semanticRegions?: readonly FrontierInspectSemanticRegionLike[];
  regions?: readonly FrontierInspectSemanticRegionLike[];
  decision?: FrontierInspectSemanticMergeDecision;
  status?: FrontierInspectSemanticMergeStatus;
  proofLinks?: readonly FrontierInspectProofLinkLike[];
  proofs?: readonly FrontierInspectProofLinkLike[];
  tags?: readonly string[];
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectSemanticRegionLike {
  id?: string;
  kind?: string;
  label?: string;
  file?: string;
  path?: FrontierRegistryPath;
  symbol?: string;
  startLine?: number;
  startColumn?: number;
  endLine?: number;
  endColumn?: number;
  feature?: string;
  package?: string;
  owner?: string;
  reads?: readonly FrontierRegistryPath[];
  writes?: readonly FrontierRegistryPath[];
  tags?: readonly string[];
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectSemanticRegion {
  id: string;
  kind: string;
  label?: string;
  file?: string;
  path?: string;
  symbol?: string;
  startLine?: number;
  startColumn?: number;
  endLine?: number;
  endColumn?: number;
  feature?: string;
  package?: string;
  owner?: string;
  reads: string[];
  writes: string[];
  tags: string[];
  metadata?: JsonObject;
}

export interface FrontierInspectProofLinkLike {
  id?: string;
  kind?: string;
  label?: string;
  href?: string;
  uri?: string;
  url?: string;
  path?: string;
  hash?: string;
  status?: FrontierInspectSemanticMergeStatus;
  metadata?: unknown;
  [key: string]: unknown;
}

export interface FrontierInspectProofLink {
  id: string;
  kind?: string;
  label?: string;
  href?: string;
  path?: string;
  hash?: string;
  status?: string;
  metadata?: JsonObject;
}

export interface FrontierInspectSourceLike {
  file: string;
  line?: number;
  column?: number;
  symbol?: string;
  exportName?: string;
  package?: string;
}

export interface FrontierInspectDescriptorLike {
  id?: string;
  kind?: string;
  resource?: string;
  reads?: readonly FrontierRegistryPath[];
  metadata?: unknown;
  [key: string]: unknown;
}

interface FrontierInspectBundleIndex {
  registry: FrontierRegistryIndex;
  artifactsById: Map<string, FrontierInspectArtifact>;
  eventsById: Map<string, FrontierInspectEvent>;
  artifactOrder: Map<string, number>;
  eventOrder: Map<string, number>;
  artifactIdsByKind: Map<string, Set<string>>;
  artifactIdsBySourcePackage: Map<string, Set<string>>;
  artifactIdsByPackage: Map<string, Set<string>>;
  artifactIdsByFeature: Map<string, Set<string>>;
  artifactIdsByTag: Map<string, Set<string>>;
  artifactIdsByFile: Map<string, Set<string>>;
  artifactIdsByPath: Map<string, Set<string>>;
  artifactIdsByResource: Map<string, Set<string>>;
  artifactIdsByEntryId: Map<string, Set<string>>;
  eventIdsByEntryId: Map<string, Set<string>>;
  artifactIdsByRecordId: Map<string, Set<string>>;
  eventIdsByRecordId: Map<string, Set<string>>;
  eventIdsBySourcePackage: Map<string, Set<string>>;
  eventIdsByPackage: Map<string, Set<string>>;
  eventIdsByFeature: Map<string, Set<string>>;
  eventIdsByTag: Map<string, Set<string>>;
  eventIdsByFile: Map<string, Set<string>>;
  eventIdsByPath: Map<string, Set<string>>;
  eventIdsByResource: Map<string, Set<string>>;
  eventIdsByStatus: Map<string, Set<string>>;
  eventIdsBySeverity: Map<string, Set<string>>;
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

export function createInspectArtifactFromRouteManifest(
  manifest: FrontierInspectRouteManifestLike,
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'graph' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const entries = routeEntriesFromManifest(manifest, options);
  const diagnostics = eventsFromDiagnostics(manifest.diagnostics ?? [], 'route', options);
  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:route-manifest',
    kind: 'route-manifest',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-route',
    timestamp: options.timestamp ?? manifest.generatedAt,
    tags: uniqueStrings((options.tags ?? []).concat(['route'])),
    graph: { entries },
    files: unionArray(options.files, filesFromRouteManifest(manifest)),
    paths: unionArray(options.paths?.map((path) => normalizeFrontierRegistryPath(path)), pathsFromRouteManifest(manifest)),
    resources: unionArray(options.resources, resourcesFromRouteManifest(manifest)),
    events: diagnostics,
    data: toJsonValue({
      kind: manifest.kind ?? 'frontier.route.manifest',
      version: manifest.version,
      routeCount: manifest.routes?.length ?? 0,
      transitionCount: manifest.transitions?.length ?? 0,
      diagnosticCount: manifest.diagnostics?.length ?? 0
    }),
    metadata: mergeMetadata(options.metadata, manifest.metadata)
  }, 0);
}

export function createInspectArtifactFromRouteImpact(
  impact: FrontierInspectRouteImpactLike,
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'graph' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const manifest: FrontierInspectRouteManifestLike = {
    routes: impact.routes ?? [],
    transitions: impact.transitions ?? []
  };
  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:route-impact',
    kind: 'route-impact',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-route',
    feature: options.feature ?? singletonOrUndefined(impact.features),
    package: options.package ?? singletonOrUndefined(impact.packages),
    tags: uniqueStrings((options.tags ?? []).concat(impact.tags ?? [], ['route-impact'])),
    graph: { entries: routeEntriesFromManifest(manifest, options) },
    files: unionArray(options.files, impact.files),
    paths: unionArray(options.paths?.map((path) => normalizeFrontierRegistryPath(path)), impact.paths),
    resources: unionArray(options.resources, impact.resources),
    entryIds: unionArray(options.entryIds, (impact.routeIds ?? []).concat(impact.transitionIds ?? [])),
    data: toJsonValue({
      kind: impact.kind ?? 'frontier.route.impact',
      version: impact.version,
      seeds: impact.seeds ?? [],
      routeIds: impact.routeIds ?? [],
      transitionIds: impact.transitionIds ?? [],
      reads: impact.reads ?? [],
      writes: impact.writes ?? [],
      loads: impact.loads ?? [],
      guards: impact.guards ?? [],
      emits: impact.emits ?? []
    })
  }, 0);
}

export function createInspectArtifactFromMigrationReport(
  report: FrontierInspectMigrationReportLike,
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'graph' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const steps = report.steps ?? [];
  const entries: FrontierRegistryEntry[] = steps.map((step) => ({
    id: String(step.id),
    kind: 'migration',
    package: options.package ?? options.sourcePackage ?? '@shapeshift-labs/frontier-migrations',
    feature: options.feature,
    reads: step.reads,
    writes: step.writes,
    tags: uniqueStrings((options.tags ?? []).concat(['migration'])),
    metadata: toJsonObject({
      from: step.from,
      to: step.to,
      direction: step.direction,
      checksum: step.checksum,
      elapsedMs: step.elapsedMs
    })
  }));
  const records: FrontierRegistryRecord[] = steps.map((step) => ({
    id: 'migration-step:' + step.id,
    entryId: String(step.id),
    kind: 'migration',
    status: report.dryRun === true ? 'pending' : 'ok',
    durationMs: step.elapsedMs,
    reads: step.reads,
    writes: step.writes
  }));
  const events = steps.map((step, index) => normalizeEvent({
    id: 'migration:' + step.id,
    type: 'migration-step',
    source: 'migration',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-migrations',
    entryId: String(step.id),
    recordId: 'migration-step:' + step.id,
    feature: options.feature,
    package: options.package ?? options.sourcePackage ?? '@shapeshift-labs/frontier-migrations',
    tags: options.tags,
    status: report.changed === true ? 'changed' : 'ok',
    value: toJsonValue(step)
  }, index)).concat(
    eventsFromDiagnostics(report.warnings ?? [], 'migration', options)
      .map((event, index) => normalizeEvent(event, steps.length + index))
  );
  const paths = uniqueStrings(steps.flatMap((step) => (step.reads ?? []).concat(step.writes ?? []).map((path) => normalizeFrontierRegistryPath(path))));
  const migrationResource = 'migration:' + String(report.registryId ?? 'registry') + ':' +
    String(report.fromVersion ?? 'unknown') + '->' + String(report.toVersion ?? report.targetVersion ?? 'unknown');
  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:migration:' + String(report.registryId ?? 'registry'),
    kind: 'migration-report',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-migrations',
    tags: uniqueStrings((options.tags ?? []).concat(report.dryRun === true ? ['migration', 'dry-run'] : ['migration'])),
    graph: { entries, records },
    paths: unionArray(options.paths?.map((path) => normalizeFrontierRegistryPath(path)), paths),
    resources: unionArray(options.resources, [migrationResource]),
    events,
    data: toJsonValue({
      kind: report.kind ?? 'frontier.migration.report',
      registryId: report.registryId,
      source: report.source,
      plugin: report.plugin,
      api: report.api,
      actor: report.actor,
      fromVersion: report.fromVersion,
      toVersion: report.toVersion,
      targetVersion: report.targetVersion,
      changed: report.changed,
      dryRun: report.dryRun,
      stepCount: report.stepCount ?? steps.length,
      warningCount: report.warnings?.length ?? 0,
      elapsedMs: report.elapsedMs
    }),
    metadata: mergeMetadata(options.metadata, report.metadata)
  }, 0);
}

export function createInspectArtifactFromLogRecords(
  records: readonly FrontierInspectLogRecordLike[],
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const events = records.map((record, index) => eventFromLogRecord(record, index, options));
  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:log-records',
    kind: 'log-records',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-logging',
    tags: uniqueStrings((options.tags ?? []).concat(['telemetry', 'logging'])),
    files: unionArray(options.files, events.map((event) => event.file).filter(isString)),
    paths: unionArray(options.paths?.map((path) => normalizeFrontierRegistryPath(path)), events.map((event) => event.path).filter(isString)),
    resources: unionArray(options.resources, events.map((event) => event.resource).filter(isString)),
    events,
    data: toJsonValue({ recordCount: records.length })
  }, 0);
}

export function createInspectArtifactFromEventLog(
  records: readonly FrontierInspectEventLogRecordLike[],
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const events = records.map((record, index) => eventFromEventLogRecord(record, index, options));
  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:event-log',
    kind: 'event-log-records',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-event-log',
    tags: uniqueStrings((options.tags ?? []).concat(['event-log'])),
    paths: unionArray(options.paths?.map((path) => normalizeFrontierRegistryPath(path)), events.map((event) => event.path).filter(isString)),
    resources: unionArray(options.resources, events.map((event) => event.resource).filter(isString)),
    events,
    data: toJsonValue({ recordCount: records.length })
  }, 0);
}

export function createInspectArtifactFromBenchmarkReport(
  report: FrontierInspectBenchmarkReportLike,
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const rows = report.rows ?? [];
  const events = rows.map((row, index) => normalizeEvent({
    id: 'benchmark:' + String(row.fixture ?? row.name ?? index),
    type: 'benchmark',
    source: 'benchmark',
    sourcePackage: options.sourcePackage,
    feature: options.feature,
    package: options.package ?? report.package,
    tags: options.tags,
    status: row.status ?? 'ok',
    value: toJsonValue(row)
  }, index));
  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:benchmark:' + String(report.package ?? 'package'),
    kind: 'benchmark-report',
    sourcePackage: options.sourcePackage ?? String(report.package ?? '@shapeshift-labs/frontier'),
    package: options.package ?? report.package,
    timestamp: options.timestamp ?? report.generatedAt,
    tags: uniqueStrings((options.tags ?? []).concat(['benchmark'])),
    events,
    data: toJsonValue({
      package: report.package,
      version: report.version,
      entryCount: report.entryCount,
      rounds: report.rounds,
      rowCount: rows.length
    })
  }, 0);
}

export function createInspectArtifactFromSemanticMergeEvidence(
  evidence: FrontierInspectSemanticMergeEvidenceLike,
  options: Omit<FrontierInspectArtifactInput, 'kind' | 'graph' | 'events' | 'data'> = {}
): FrontierInspectArtifact {
  const sourcePackage = options.sourcePackage ?? evidence.sourcePackage ?? '@shapeshift-labs/frontier-inspect';
  const evidenceId = normalizeNonEmpty(String(evidence.id ?? evidence.mergeId ?? options.id ?? 'semantic-merge-evidence'), 'semantic merge evidence id');
  const mergeEntryId = 'semantic-merge:' + evidenceId;
  const mergeRecordId = 'semantic-merge-record:' + evidenceId;
  const decision = evidence.decision === undefined ? undefined : String(evidence.decision);
  const status = String(evidence.status ?? 'pending');
  const regions = normalizeSemanticMergeRegions(evidence.semanticRegions ?? evidence.regions ?? [], evidence, options);
  const proofLinks = normalizeSemanticMergeProofLinks(evidence.proofLinks ?? evidence.proofs ?? []);
  const changedPaths = semanticMergeChangedPaths(evidence, regions);
  const changedFiles = semanticMergeFiles(evidence, regions);
  const proofResources = proofLinks.map(semanticMergeProofResource).filter(isString);
  const resourceId = 'semantic-merge:' + evidenceId;
  const tags = uniqueStrings((options.tags ?? []).concat(evidence.tags ?? [], ['semantic-merge']));

  const entries: FrontierRegistryEntry[] = [{
    id: mergeEntryId,
    kind: 'semantic-merge-evidence',
    description: options.summary ?? evidence.summary,
    package: options.package ?? evidence.package ?? sourcePackage,
    feature: options.feature ?? evidence.feature,
    source: changedFiles.length === 0 ? undefined : changedFiles.map((file) => ({ file })),
    writes: changedPaths.length === 0 ? undefined : changedPaths,
    touches: uniqueStrings([resourceId].concat(proofResources)),
    tags: uniqueStrings(tags.concat(decision ?? '', status)),
    metadata: toJsonObject({
      bundleId: evidence.bundleId,
      decision,
      mergeId: evidence.mergeId,
      proofLinks,
      regionIds: regions.map((region) => region.id),
      status
    })
  }];
  for (let i = 0; i < regions.length; i++) {
    entries[entries.length] = semanticMergeRegionEntry(regions[i], mergeEntryId, evidence, options, sourcePackage);
  }

  const records: FrontierRegistryRecord[] = [{
    id: mergeRecordId,
    entryId: mergeEntryId,
    kind: 'semantic-merge-evidence',
    status,
    writes: changedPaths.length === 0 ? undefined : changedPaths,
    affected: regions.map((region) => 'entry:' + region.id),
    metadata: toJsonObject({
      decision,
      proofLinks,
      status
    })
  }];
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    const writes = semanticRegionWrites(region);
    records[records.length] = {
      id: 'semantic-region-record:' + region.id,
      entryId: region.id,
      kind: region.kind,
      status,
      reads: region.reads.length === 0 ? undefined : region.reads,
      writes: writes.length === 0 ? undefined : writes,
      affected: proofResources,
      metadata: toJsonObject({
        decision,
        status
      })
    };
  }

  const events = semanticMergeEvents(evidence, {
    changedFiles,
    changedPaths,
    decision,
    mergeEntryId,
    mergeRecordId,
    proofLinks,
    regions,
    resourceId,
    sourcePackage,
    status,
    tags,
    options
  });

  return normalizeArtifact({
    ...options,
    id: options.id ?? 'artifact:semantic-merge:' + evidenceId,
    kind: 'semantic-merge-evidence',
    sourcePackage,
    feature: options.feature ?? evidence.feature,
    package: options.package ?? evidence.package ?? sourcePackage,
    summary: options.summary ?? evidence.summary,
    timestamp: options.timestamp ?? evidence.generatedAt,
    tags,
    files: unionArray(options.files, changedFiles),
    paths: unionArray(options.paths?.map((path) => normalizeFrontierRegistryPath(path)), changedPaths),
    resources: unionArray(options.resources, [resourceId].concat(proofResources)),
    graph: { entries, records },
    events,
    data: toJsonValue({
      kind: evidence.kind ?? FRONTIER_INSPECT_SEMANTIC_MERGE_EVIDENCE_KIND,
      version: evidence.version ?? FRONTIER_INSPECT_SEMANTIC_MERGE_EVIDENCE_VERSION,
      id: evidence.id,
      mergeId: evidence.mergeId,
      bundleId: evidence.bundleId,
      source: evidence.source,
      decision,
      status,
      changedPaths,
      changedFiles,
      semanticRegions: regions,
      proofLinks,
      regionCount: regions.length,
      proofLinkCount: proofLinks.length
    }),
    metadata: mergeMetadata(options.metadata, evidence.metadata)
  }, 0);
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
  const index = getBundleIndex(bundle);
  const artifactCandidates = candidateArtifacts(bundle, index, input);
  const eventCandidates = candidateEvents(bundle, index, input);
  const artifacts: FrontierInspectArtifact[] = [];
  const events: FrontierInspectEvent[] = [];

  for (let i = 0; i < artifactCandidates.length; i++) {
    const artifact = artifactCandidates[i];
    if (matchesArtifact(artifact, input, registryEntryIds, registryRecordIds)) {
      artifacts[artifacts.length] = cloneArtifact(artifact);
      if (artifacts.length >= limit) break;
    }
  }
  for (let i = 0; i < eventCandidates.length; i++) {
    const event = eventCandidates[i];
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
  const registry = getBundleIndex(bundle).registry;
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
    if (artifact.kind === 'benchmark' || artifact.kind === 'benchmark-report') addUnique(summary.benchmarks, artifact.id);
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

export function createInspectSwarmLifetimeSummary(bundle: FrontierInspectBundle): FrontierInspectSwarmLifetimeSummary {
  const observations = collectSwarmLifetimeObservations(bundle);
  const activeAgents = collectSwarmLifetimeBucket(observations.active, {
    id: (observation) => extractSwarmLifetimeAgentId(observation) ?? observation.id
  });
  const runOutcomes = collectSwarmLifetimeRunOutcomes(observations);
  const humanQuestions = collectSwarmLifetimeHumanQuestions(observations.humanQuestions);
  const reviewDebt = collectSwarmLifetimeReviewDebt(observations.review, observations.rerun);
  const packageGates = collectSwarmLifetimePackageGates(observations.packageGateObservations);
  const suppressedAuditArtifacts = collectSwarmLifetimeSuppressedAuditArtifacts(observations.suppressedAuditArtifacts);
  const modelPerformance = collectSwarmLifetimeModelPerformance(observations);
  const queueDepthByMeaning = {
    activeWork: activeAgents.count,
    coordinatorReview: observations.review.length,
    completedHistory: runOutcomes.completed.count + runOutcomes.committedApplied.count,
    committedApplied: runOutcomes.committedApplied.count,
    conflicts: runOutcomes.conflicts.count,
    rerunWork: observations.rerun.length,
    packageGates: packageGates.count,
    suppressedAuditArtifacts: suppressedAuditArtifacts.count,
    realBlockers: observations.blocked.length,
    humanQuestions: humanQuestions.count
  };
  const cost = modelPerformance.cost ?? collectSwarmLifetimeCost(observations.costCandidates);
  const visibleOutcomeCount = runOutcomes.completed.count + runOutcomes.committedApplied.count;
  return {
    kind: FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_KIND,
    version: FRONTIER_INSPECT_SWARM_LIFETIME_SUMMARY_VERSION,
    generatedAt: Date.now(),
    live: {
      activeAgents,
      runOutcomes,
      queueDepthByMeaning,
      reviewDebt,
      trueHumanQuestions: humanQuestions,
      packageGates,
      suppressedAuditArtifacts
    },
    visibleOutcomeCount,
    suppressedAuditArtifactCount: suppressedAuditArtifacts.count,
    usefulOutputCount: visibleOutcomeCount,
    cost,
    modelPerformance,
    sourcesScanned: collectSwarmLifetimeSourcesScanned(bundle),
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

export function createInspectAutonomousRunOutcomeSummary(bundle: FrontierInspectBundle): FrontierInspectSwarmLifetimeSummary {
  return createInspectSwarmLifetimeSummary(bundle);
}

export function createInspectAutonomousMergeHealthSummary(bundle: FrontierInspectBundle): FrontierInspectAutonomousMergeHealthSummary {
  const observations = collectAutonomousMergeHealthObservations(bundle);
  const components = collapseAutonomousMergeHealthObservations(observations);
  const latestObservations = components.map((component) => component.latest);

  const activeCoordinators = collectAutonomousMergeHealthBucket(
    latestObservations.filter((observation) => looksLikeAutonomousMergeHealthActiveCoordinator(observation)),
    {
      id: (observation) => observation.coordinatorId ?? observation.id
    }
  );

  const openLaneObservations = latestObservations.filter((observation) => {
    const lane = extractAutonomousMergeHealthLane(observation);
    return lane !== undefined && !looksLikeAutonomousMergeHealthTerminalDecision(observation);
  });

  const terminalDecisions = collectAutonomousMergeHealthTerminalDecisions(
    latestObservations.filter((observation) => looksLikeAutonomousMergeHealthTerminalDecision(observation))
  );
  const reviewDebt = collectAutonomousMergeHealthReviewDebt(
    latestObservations.filter((observation) => looksLikeAutonomousMergeHealthCoordinatorReview(observation)),
    bundle.generatedAt
  );
  const realHumanBlockers = collectAutonomousMergeHealthHumanQuestions(
    latestObservations.filter((observation) => looksLikeAutonomousMergeHealthHumanQuestion(observation))
  );
  const staleRerunCleanup = collectAutonomousMergeHealthCleanup(
    latestObservations.filter((observation) => looksLikeAutonomousMergeHealthCleanup(observation))
  );
  const appliedThroughput = collectAutonomousMergeHealthAppliedThroughput(
    latestObservations.filter((observation) => looksLikeAutonomousMergeHealthApplied(observation))
  );

  return {
    kind: FRONTIER_INSPECT_AUTONOMOUS_MERGE_HEALTH_SUMMARY_KIND,
    version: FRONTIER_INSPECT_AUTONOMOUS_MERGE_HEALTH_SUMMARY_VERSION,
    generatedAt: Date.now(),
    activeCoordinators,
    openLanes: collectAutonomousMergeHealthBucket(openLaneObservations, {
      id: (observation) => extractAutonomousMergeHealthLane(observation) ?? observation.id
    }),
    terminalDecisions,
    reviewDebt,
    realHumanBlockers,
    staleRerunCleanup,
    appliedThroughput,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

export function createInspectMergeQueueHealthSummary(bundle: FrontierInspectBundle): FrontierInspectMergeQueueHealthSummary {
  const autonomousMergeHealth = createInspectAutonomousMergeHealthSummary(bundle);
  const swarmLifetime = createInspectSwarmLifetimeSummary(bundle);

  return {
    kind: FRONTIER_INSPECT_MERGE_QUEUE_HEALTH_SUMMARY_KIND,
    version: FRONTIER_INSPECT_MERGE_QUEUE_HEALTH_SUMMARY_VERSION,
    generatedAt: Date.now(),
    queueDepthByMeaning: swarmLifetime.live.queueDepthByMeaning,
    leaders: autonomousMergeHealth.activeCoordinators,
    deferredWork: autonomousMergeHealth.reviewDebt,
    promotions: autonomousMergeHealth.appliedThroughput,
    terminalDecisions: autonomousMergeHealth.terminalDecisions,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

export function createInspectContinuousPoolHealthSummary(bundle: FrontierInspectBundle): FrontierInspectContinuousPoolHealthSummary {
  const latestObservations = collapseAutonomousMergeHealthObservations(collectAutonomousMergeHealthObservations(bundle)).map((component) => component.latest);
  const activeObservations = latestObservations.filter((observation) => looksLikeContinuousPoolActiveWork(observation));
  const backlogObservations = latestObservations.filter((observation) => looksLikeContinuousPoolBacklog(observation));
  const reviewObservations = latestObservations.filter((observation) => looksLikeAutonomousMergeHealthCoordinatorReview(observation));
  const rerunObservations = latestObservations.filter((observation) => looksLikeContinuousPoolRerun(observation));
  const conflictObservations = latestObservations.filter((observation) => looksLikeContinuousPoolConflictBlock(observation));
  const humanQuestionObservations = latestObservations.filter((observation) => looksLikeAutonomousMergeHealthHumanQuestion(observation));
  const appliedObservations = latestObservations.filter((observation) => looksLikeContinuousPoolApplied(observation));
  const noiseObservations = latestObservations.filter((observation) => looksLikeAutonomousMergeHealthStale(observation) || looksLikeContinuousPoolRerun(observation));
  const targetConcurrency = extractContinuousPoolTargetConcurrency(latestObservations);
  const activeAgents = collectAutonomousMergeHealthBucket(activeObservations, {
    id: (observation) => extractContinuousPoolAgentId(observation) ?? observation.id
  });
  const targetGap = Math.max(0, targetConcurrency - activeAgents.count);
  const backlogCount = collectAutonomousMergeHealthBucket(backlogObservations).count;
  const refillGap = backlogCount > 0 ? Math.max(0, targetConcurrency - activeAgents.count) : 0;
  const reviewCount = reviewObservations.length;
  const rerunCount = rerunObservations.length;
  const staleCount = noiseObservations.filter((observation) => looksLikeAutonomousMergeHealthStale(observation)).length;
  const conflictBlocks = collectAutonomousMergeHealthBucket(conflictObservations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  const trueHumanQuestions = collectAutonomousMergeHealthHumanQuestions(humanQuestionObservations);
  const appliedCount = appliedObservations.filter((observation) => observation.status !== undefined && /^applied$/i.test(observation.status)).length;
  const committedCount = appliedObservations.filter((observation) => observation.status !== undefined && /^committed$/i.test(observation.status)).length;
  const noiseBucket = collectAutonomousMergeHealthBucket(noiseObservations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  const noiseObservationCount = latestObservations.length;
  const belowTargetReasons = collectContinuousPoolBelowTargetReasons(latestObservations, reviewObservations, targetGap, backlogCount);

  return {
    kind: FRONTIER_INSPECT_CONTINUOUS_POOL_HEALTH_SUMMARY_KIND,
    version: FRONTIER_INSPECT_CONTINUOUS_POOL_HEALTH_SUMMARY_VERSION,
    generatedAt: Date.now(),
    activeWork: {
      activeAgents,
      targetConcurrency,
      targetGap,
      backlogCount,
      refillGap
    },
    coordinatorDrain: {
      ...collectAutonomousMergeHealthBucket(reviewObservations, {
        id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
      }),
      reviewDrainPressure: reviewCount + rerunCount,
      reviewCount,
      rerunCount
    },
    trueBlockers: {
      conflictBlocks,
      trueHumanQuestions
    },
    belowTargetReasons,
    doneOutput: {
      ...collectAutonomousMergeHealthBucket(appliedObservations, {
        id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
      }),
      appliedCount,
      committedCount,
      completedCount: appliedCount + committedCount
    },
    noise: {
      ...noiseBucket,
      staleCount,
      rerunCount,
      staleRerunCount: staleCount + rerunCount,
      staleRerunRate: rateForCount(staleCount + rerunCount, noiseObservationCount)
    },
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

function collectContinuousPoolBelowTargetReasons(
  observations: readonly AutonomousMergeHealthObservation[],
  reviewObservations: readonly AutonomousMergeHealthObservation[],
  targetGap: number,
  backlogCount: number
): FrontierInspectContinuousPoolHealthBelowTargetSummary {
  if (targetGap <= 0) {
    return {
      gap: 0,
      reasons: [],
      sources: []
    };
  }

  const reasons: FrontierInspectContinuousPoolHealthBelowTargetReasonSummary[] = [];
  const addReason = (reason: FrontierInspectContinuousPoolHealthBelowTargetReasonSummary): void => {
    if (reason.count <= 0) return;
    reasons[reasons.length] = reason;
  };

  if (backlogCount === 0) {
    addReason({
      id: 'no-backlog',
      label: 'No backlog',
      count: 1,
      ids: ['no-backlog'],
      sources: ['activeWork.backlogCount', 'activeWork.targetGap']
    });
  }

  const reviewBucket = collectAutonomousMergeHealthBucket(reviewObservations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  addReason({
    id: 'review-reserved',
    label: 'Review reserved',
    count: reviewBucket.count,
    ids: reviewBucket.ids,
    sources: reviewBucket.sources
  });

  addReason(createContinuousPoolBelowTargetReasonBucket(
    'quota',
    'Quota',
    observations.filter((observation) => looksLikeContinuousPoolQuotaPressure(observation))
  ));
  addReason(createContinuousPoolBelowTargetReasonBucket(
    'cpu',
    'CPU',
    observations.filter((observation) => looksLikeContinuousPoolCpuPressure(observation))
  ));
  addReason(createContinuousPoolBelowTargetReasonBucket(
    'dirty-checkout',
    'Dirty checkout',
    observations.filter((observation) => looksLikeContinuousPoolDirtyCheckout(observation))
  ));
  addReason(createContinuousPoolBelowTargetReasonBucket(
    'lock-contention',
    'Lock contention',
    observations.filter((observation) => looksLikeContinuousPoolLockContention(observation))
  ));

  return {
    gap: targetGap,
    reasons,
    sources: uniqueStrings(reasons.flatMap((reason) => reason.sources))
  };
}

function createContinuousPoolBelowTargetReasonBucket(
  id: string,
  label: string,
  observations: readonly AutonomousMergeHealthObservation[]
): FrontierInspectContinuousPoolHealthBelowTargetReasonSummary {
  const bucket = collectAutonomousMergeHealthBucket(observations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  return {
    id,
    label,
    count: bucket.count,
    ids: bucket.ids,
    sources: bucket.sources
  };
}

export function createInspectCoordinatorQueueThroughputSummary(bundle: FrontierInspectBundle): FrontierInspectCoordinatorQueueThroughputSummary {
  const continuousPoolHealth = createInspectContinuousPoolHealthSummary(bundle);
  const swarmLifetime = createInspectSwarmLifetimeSummary(bundle);
  const bottlenecks = collectCoordinatorQueueThroughputBottlenecks(continuousPoolHealth, swarmLifetime);

  return {
    kind: FRONTIER_INSPECT_COORDINATOR_QUEUE_THROUGHPUT_SUMMARY_KIND,
    version: FRONTIER_INSPECT_COORDINATOR_QUEUE_THROUGHPUT_SUMMARY_VERSION,
    generatedAt: Date.now(),
    throughput: {
      activeAgents: continuousPoolHealth.activeWork.activeAgents,
      targetConcurrency: continuousPoolHealth.activeWork.targetConcurrency,
      backlogCount: continuousPoolHealth.activeWork.backlogCount,
      refillGap: continuousPoolHealth.activeWork.refillGap,
      appliedCount: continuousPoolHealth.doneOutput.appliedCount,
      committedCount: continuousPoolHealth.doneOutput.committedCount,
      completedCount: continuousPoolHealth.doneOutput.completedCount,
      usefulOutputCount: swarmLifetime.usefulOutputCount
    },
    bottlenecks,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

function collectCoordinatorQueueThroughputBottlenecks(
  continuousPoolHealth: FrontierInspectContinuousPoolHealthSummary,
  swarmLifetime: FrontierInspectSwarmLifetimeSummary
): FrontierInspectCoordinatorQueueThroughputBottleneckSummary {
  return {
    reviewDrainPressure: continuousPoolHealth.coordinatorDrain.reviewDrainPressure,
    reviewCount: continuousPoolHealth.coordinatorDrain.reviewCount,
    rerunCount: continuousPoolHealth.coordinatorDrain.rerunCount,
    conflictCount: continuousPoolHealth.trueBlockers.conflictBlocks.count,
    humanQuestionCount: continuousPoolHealth.trueBlockers.trueHumanQuestions.count,
    realBlockerCount: swarmLifetime.live.queueDepthByMeaning.realBlockers,
    packageGateCount: swarmLifetime.live.queueDepthByMeaning.packageGates,
    suppressedAuditArtifactCount: swarmLifetime.live.queueDepthByMeaning.suppressedAuditArtifacts,
    primaryBottlenecks: rankCoordinatorQueueThroughputBottlenecks([
      { name: 'backlog', count: continuousPoolHealth.activeWork.backlogCount },
      { name: 'coordinator-drain', count: continuousPoolHealth.coordinatorDrain.reviewDrainPressure },
      { name: 'conflicts', count: continuousPoolHealth.trueBlockers.conflictBlocks.count },
      { name: 'human-questions', count: continuousPoolHealth.trueBlockers.trueHumanQuestions.count },
      { name: 'real-blockers', count: swarmLifetime.live.queueDepthByMeaning.realBlockers },
      { name: 'package-gates', count: swarmLifetime.live.queueDepthByMeaning.packageGates },
      { name: 'suppressed-audit-artifacts', count: swarmLifetime.live.queueDepthByMeaning.suppressedAuditArtifacts }
    ])
  };
}

function rankCoordinatorQueueThroughputBottlenecks(
  bottlenecks: readonly FrontierInspectCoordinatorQueueThroughputBottleneck[]
): FrontierInspectCoordinatorQueueThroughputBottleneck[] {
  return bottlenecks
    .filter((bottleneck) => bottleneck.count > 0)
    .slice()
    .sort((left, right) => {
      if (right.count !== left.count) return right.count - left.count;
      return left.name.localeCompare(right.name);
    });
}

export function createInspectAppliedWorkSummary(bundle: FrontierInspectBundle): FrontierInspectAppliedWorkSummary {
  const latestObservations = collapseAutonomousMergeHealthObservations(collectAutonomousMergeHealthObservations(bundle)).map((component) => component.latest);
  const activeObservations = latestObservations.filter((observation) => looksLikeContinuousPoolActiveWork(observation));
  const appliedObservations = latestObservations.filter((observation) => looksLikeAppliedWorkApplied(observation));
  const committedObservations = latestObservations.filter((observation) => looksLikeAppliedWorkCommitted(observation));
  const evidenceOnlyObservations = latestObservations.filter((observation) => looksLikeAppliedWorkEvidenceOnly(observation));
  const reviewObservations = latestObservations.filter((observation) => looksLikeAutonomousMergeHealthCoordinatorReview(observation));
  const conflictObservations = latestObservations.filter((observation) => looksLikeContinuousPoolConflictBlock(observation));
  const humanQuestionObservations = latestObservations.filter((observation) => looksLikeAutonomousMergeHealthHumanQuestion(observation));
  const staleObservations = latestObservations.filter((observation) => looksLikeAutonomousMergeHealthStale(observation));
  const rerunObservations = latestObservations.filter((observation) => looksLikeContinuousPoolRerun(observation));
  const staleRerunObservations = staleObservations.concat(rerunObservations);
  const activeWorkers = collectAutonomousMergeHealthBucket(activeObservations, {
    id: (observation) => extractContinuousPoolAgentId(observation) ?? observation.id
  });
  const appliedWork = {
    ...collectAutonomousMergeHealthBucket(appliedObservations, {
      id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
    }),
    appliedCount: appliedObservations.length
  };
  const committedWork = {
    ...collectAutonomousMergeHealthBucket(committedObservations, {
      id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
    }),
    committedCount: committedObservations.length
  };
  const evidenceOnlyDoneWork = {
    ...collectAutonomousMergeHealthBucket(evidenceOnlyObservations, {
      id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
    }),
    evidenceOnlyCount: evidenceOnlyObservations.length
  };
  const coordinatorReview = collectAutonomousMergeHealthReviewDebt(reviewObservations, bundle.generatedAt);
  const staleRerun = {
    ...collectAutonomousMergeHealthBucket(staleRerunObservations, {
      id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
    }),
    staleCount: staleObservations.length,
    rerunCount: rerunObservations.length,
    staleRerunCount: staleRerunObservations.length
  };
  const conflictBlocks = collectAutonomousMergeHealthBucket(conflictObservations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  const trueHumanQuestions = collectAutonomousMergeHealthHumanQuestions(humanQuestionObservations);
  const successfulOutputCount = appliedWork.appliedCount + committedWork.committedCount + evidenceOnlyDoneWork.evidenceOnlyCount;
  return {
    kind: FRONTIER_INSPECT_APPLIED_WORK_SUMMARY_KIND,
    version: FRONTIER_INSPECT_APPLIED_WORK_SUMMARY_VERSION,
    generatedAt: Date.now(),
    activeWorkers,
    appliedWork,
    committedWork,
    evidenceOnlyDoneWork,
    coordinatorReview,
    trueBlockers: {
      conflictBlocks,
      trueHumanQuestions
    },
    staleRerun,
    successfulOutputCount,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

export function createInspectDashboardSummary(bundle: FrontierInspectBundle): FrontierInspectDashboardSummary {
  const featureMap = createInspectFeatureMap(bundle);
  const appliedWork = createInspectAppliedWorkSummary(bundle);
  const autonomousMergeHealth = createInspectAutonomousMergeHealthSummary(bundle);
  const continuousPoolHealth = createInspectContinuousPoolHealthSummary(bundle);
  const swarmLifetime = createInspectSwarmLifetimeSummary(bundle);
  const testing = createInspectDefaultDrainGateHealthSummary(bundle);

  return {
    kind: FRONTIER_INSPECT_DASHBOARD_SUMMARY_KIND,
    version: FRONTIER_INSPECT_DASHBOARD_SUMMARY_VERSION,
    generatedAt: Date.now(),
    epics: featureMap,
    tasks: appliedWork,
    lanes: autonomousMergeHealth.openLanes,
    activeAgents: continuousPoolHealth.activeWork.activeAgents,
    questions: continuousPoolHealth.trueBlockers.trueHumanQuestions,
    history: swarmLifetime,
    performance: swarmLifetime.modelPerformance,
    testing,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

export const createInspectOperatorDashboardSummary = createInspectDashboardSummary;

export function createInspectBundleHealthSummary(bundle: FrontierInspectBundle): FrontierInspectBundleHealthSummary {
  const observations = collapseBundleHealthObservations(collectBundleHealthObservations(bundle)).map((component) => component.latest);
  const classifiedObservations = observations.map((observation) => ({
    observation,
    meaning: classifyBundleHealthMeaning(observation)
  }));
  const completeBundles = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'complete-bundle').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const generatedPatches = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'generated-patch').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const missingPatch = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'missing-patch').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const missingBundle = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'missing-bundle').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const noChangeDone = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'no-change-done').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const evidenceOnlyDone = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'evidence-only-done').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const failedGate = collectBundleHealthBucket(classifiedObservations.filter((entry) => entry.meaning === 'failed-gate').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const trueHumanBlockers = collectBundleHealthHumanBlockers(classifiedObservations.filter((entry) => entry.meaning === 'true-human-blocker').map((entry) => entry.observation), {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const healthyCount = completeBundles.count + generatedPatches.count + noChangeDone.count + evidenceOnlyDone.count;
  const warningCount = missingPatch.count + missingBundle.count + failedGate.count;
  const status: FrontierInspectBundleHealthSummary['status'] = trueHumanBlockers.count > 0
    ? 'blocked'
    : warningCount > 0
      ? 'warning'
      : healthyCount > 0
        ? generatedPatches.count > 0 || evidenceOnlyDone.count > 0
          ? 'info'
          : 'ok'
        : 'ok';

  return {
    kind: FRONTIER_INSPECT_BUNDLE_HEALTH_SUMMARY_KIND,
    version: FRONTIER_INSPECT_BUNDLE_HEALTH_SUMMARY_VERSION,
    generatedAt: Date.now(),
    status,
    headline: createBundleHealthHeadline({
      status,
      completeBundles,
      generatedPatches,
      missingPatch,
      missingBundle,
      noChangeDone,
      evidenceOnlyDone,
      failedGate,
      trueHumanBlockers
    }),
    cards: createInspectBundleHealthCards({
      completeBundles,
      generatedPatches,
      missingPatch,
      missingBundle,
      noChangeDone,
      evidenceOnlyDone,
      failedGate,
      trueHumanBlockers
    }),
    completeBundles,
    generatedPatches,
    missingPatch,
    missingBundle,
    noChangeDone,
    evidenceOnlyDone,
    failedGate,
    trueHumanBlockers,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

export function createInspectDefaultDrainGateHealthSummary(bundle: FrontierInspectBundle): FrontierInspectDefaultDrainGateHealthSummary {
  const observations = collapseBundleHealthObservations(collectBundleHealthObservations(bundle)).map((component) => component.latest);
  const trueHumanBlockerObservations = observations.filter((observation) => looksLikeBundleHealthHumanBlocker(observation));
  const failedGateObservations = observations.filter((observation) => looksLikeDefaultDrainGateFailedGate(observation));
  const skippedRequiredGateObservations = observations.filter((observation) => looksLikeDefaultDrainGateSkippedRequiredGate(observation));
  const appliedAfterGateObservations = observations.filter((observation) => looksLikeDefaultDrainGateAppliedAfterGates(observation));
  const candidatesWithGateObservations = observations.filter((observation) => looksLikeDefaultDrainGateCandidateWithGates(observation));
  const candidatesMissingGateObservations = observations.filter((observation) => looksLikeDefaultDrainGateCandidateMissingGates(observation));

  const candidatesWithGates = collectDefaultDrainGateGateSummary(candidatesWithGateObservations);
  const candidatesMissingGates = collectBundleHealthBucket(candidatesMissingGateObservations, {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  const appliedAfterGates = collectDefaultDrainGateGateSummary(appliedAfterGateObservations);
  const failedGates = collectDefaultDrainGateGateSummary(failedGateObservations);
  const skippedRequiredGates = collectDefaultDrainGateGateSummary(skippedRequiredGateObservations);
  const trueHumanBlockers = collectBundleHealthHumanBlockers(trueHumanBlockerObservations, {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });

  const configurationIssueCount = candidatesMissingGates.count + failedGates.count + skippedRequiredGates.count;
  const gateBackedCount = appliedAfterGates.count + failedGates.count + skippedRequiredGates.count;
  const status: FrontierInspectDefaultDrainGateHealthSummary['status'] = trueHumanBlockers.count > 0
    ? 'blocked'
    : configurationIssueCount > 0
      ? 'warning'
      : gateBackedCount > 0
        ? 'info'
        : candidatesWithGates.count > 0
          ? 'ok'
          : 'ok';

  return {
    kind: FRONTIER_INSPECT_DEFAULT_DRAIN_GATE_HEALTH_SUMMARY_KIND,
    version: FRONTIER_INSPECT_DEFAULT_DRAIN_GATE_HEALTH_SUMMARY_VERSION,
    generatedAt: Date.now(),
    status,
    headline: createDefaultDrainGateHealthHeadline({
      status,
      candidatesWithGates,
      candidatesMissingGates,
      appliedAfterGates,
      failedGates,
      skippedRequiredGates,
      trueHumanBlockers
    }),
    cards: createInspectDefaultDrainGateHealthCards({
      candidatesWithGates,
      candidatesMissingGates,
      appliedAfterGates,
      failedGates,
      skippedRequiredGates,
      trueHumanBlockers
    }),
    candidatesWithGates,
    candidatesMissingGates,
    appliedAfterGates,
    failedGates,
    skippedRequiredGates,
    trueHumanBlockers,
    archivedEvidence: summarizeInspectBundle(bundle)
  };
}

interface BundleHealthObservation {
  id: string;
  text: string;
  sources: string[];
  payloads: unknown[];
  files: string[];
  resources: string[];
  kind?: string;
  status?: string;
  bundlePath?: string;
  patchPath?: string;
  jobId?: string;
  taskId?: string;
  decisionId?: string;
  changedPaths: string[];
  outputKind?: string;
  terminalClassification?: string;
  disposition?: string;
  gatesPassed?: boolean;
  order: number;
}

function createBundleHealthObservation(input: {
  id: string;
  kind?: string;
  textParts: readonly (string | undefined)[];
  payloads: readonly unknown[];
  sources: readonly string[];
  files?: readonly string[];
  resources?: readonly string[];
  status?: string;
  bundlePath?: string;
  patchPath?: string;
  jobId?: string;
  taskId?: string;
  decisionId?: string;
  changedPaths?: readonly string[];
  outputKind?: string;
  terminalClassification?: string;
  disposition?: string;
  gatesPassed?: boolean;
  order: number;
}): BundleHealthObservation {
  return {
    id: input.id,
    text: input.textParts.filter(Boolean).join(' '),
    sources: [...input.sources].sort(),
    payloads: [...input.payloads],
    files: uniqueStrings(input.files ?? []),
    resources: uniqueStrings(input.resources ?? []),
    kind: input.kind,
    status: input.status,
    bundlePath: input.bundlePath,
    patchPath: input.patchPath,
    jobId: input.jobId,
    taskId: input.taskId,
    decisionId: input.decisionId,
    changedPaths: uniqueStrings(input.changedPaths ?? []),
    outputKind: input.outputKind,
    terminalClassification: input.terminalClassification,
    disposition: input.disposition,
    gatesPassed: input.gatesPassed,
    order: input.order
  };
}

function bundleHealthObservationFromArtifact(artifact: FrontierInspectArtifact, order: number): BundleHealthObservation {
  const payloads: unknown[] = [];
  if (artifact.data !== undefined) payloads[payloads.length] = artifact.data;
  if (artifact.metadata !== undefined) payloads[payloads.length] = artifact.metadata;
  const bundlePath = firstBundleHealthStringField(payloads, ['bundlePath', 'mergePath', 'bundle', 'merge']) ?? inferBundleHealthPathFromFiles(artifact.files, 'bundle');
  const patchPath = firstBundleHealthStringField(payloads, ['patchPath', 'patch', 'changesPatch']) ?? inferBundleHealthPathFromFiles(artifact.files, 'patch');
  const changedPaths = extractSwarmLifetimeStringArrayField(payloads, ['changedPaths', 'paths', 'writes', 'targets']);
  const outputKind = firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']);
  const terminalClassification = firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']);
  const disposition = firstBundleHealthStringField(payloads, ['disposition']);
  return createBundleHealthObservation({
    id: artifact.id,
    kind: artifact.kind,
    textParts: [
      artifact.id,
      artifact.kind,
      artifact.summary,
      artifact.sourcePackage,
      artifact.package,
      artifact.feature,
      artifact.tags.join(' '),
      artifact.files.join(' '),
      artifact.resources.join(' '),
      firstBundleHealthStringField(payloads, ['status', 'state', 'phase', 'resultStatus', 'outcome']),
      outputKind,
      terminalClassification,
      disposition,
      bundlePath,
      patchPath,
      firstBundleHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(artifact.sourcePackage, artifact.package, artifact.files, artifact.resources),
    files: artifact.files,
    resources: artifact.resources,
    status: extractSwarmLifetimeStatus(payloads),
    bundlePath,
    patchPath,
    jobId: firstBundleHealthStringField(payloads, ['jobId']),
    taskId: firstBundleHealthStringField(payloads, ['taskId']),
    decisionId: firstBundleHealthStringField(payloads, ['decisionId']),
    changedPaths,
    outputKind,
    terminalClassification,
    disposition,
    gatesPassed: firstBundleHealthBooleanField(payloads, ['gatesPassed', 'gatePassed', 'finalGateOk', 'verificationOk', 'checksPassed']),
    order
  });
}

function bundleHealthObservationFromEvent(event: FrontierInspectEvent, order: number): BundleHealthObservation {
  const payloads: unknown[] = [];
  if (event.value !== undefined) payloads[payloads.length] = event.value;
  if (event.metadata !== undefined) payloads[payloads.length] = event.metadata;
  const bundlePath = firstBundleHealthStringField(payloads, ['bundlePath', 'mergePath', 'bundle', 'merge']) ?? inferBundleHealthPathFromFiles([event.file, event.path].filter(isString), 'bundle');
  const patchPath = firstBundleHealthStringField(payloads, ['patchPath', 'patch', 'changesPatch']) ?? inferBundleHealthPathFromFiles([event.file, event.path].filter(isString), 'patch');
  return createBundleHealthObservation({
    id: event.id,
    kind: event.type,
    textParts: [
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
      event.status,
      event.severity,
      firstBundleHealthStringField(payloads, ['status', 'state', 'phase', 'resultStatus', 'outcome']),
      firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']),
      firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']),
      firstBundleHealthStringField(payloads, ['disposition']),
      bundlePath,
      patchPath,
      firstBundleHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(event.sourcePackage, event.package, [event.file], [event.resource, event.path, event.routeId, event.selector]),
    files: [event.file].filter(isString),
    resources: [event.resource, event.path, event.routeId, event.selector].filter(isString),
    status: event.status ?? extractSwarmLifetimeStatus(payloads),
    bundlePath,
    patchPath,
    jobId: firstBundleHealthStringField(payloads, ['jobId']),
    taskId: firstBundleHealthStringField(payloads, ['taskId']),
    decisionId: firstBundleHealthStringField(payloads, ['decisionId']),
    changedPaths: extractSwarmLifetimeStringArrayField(payloads, ['changedPaths', 'paths', 'writes', 'targets']),
    outputKind: firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']),
    terminalClassification: firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']),
    disposition: firstBundleHealthStringField(payloads, ['disposition']),
    gatesPassed: firstBundleHealthBooleanField(payloads, ['gatesPassed', 'gatePassed', 'finalGateOk', 'verificationOk', 'checksPassed']),
    order
  });
}

function bundleHealthObservationFromEntry(entry: FrontierRegistryEntry, order: number): BundleHealthObservation {
  const payloads = [entry.metadata];
  return createBundleHealthObservation({
    id: entry.id,
    kind: entry.kind,
    textParts: [
      entry.id,
      entry.kind,
      entry.description,
      entry.package,
      entry.feature,
      (entry.tags ?? []).join(' '),
      normalizeSourceFiles(entry).join(' '),
      (entry.touches ?? []).join(' '),
      (entry.reads ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (entry.writes ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      firstBundleHealthStringField(payloads, ['status', 'state', 'phase', 'resultStatus', 'outcome']),
      firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']),
      firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']),
      firstBundleHealthStringField(payloads, ['disposition']),
      firstBundleHealthStringField(payloads, ['bundlePath', 'mergePath', 'bundle', 'merge']),
      firstBundleHealthStringField(payloads, ['patchPath', 'patch', 'changesPatch']),
      firstBundleHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(entry.package, undefined, normalizeSourceFiles(entry), entry.touches),
    files: normalizeSourceFiles(entry),
    resources: entry.touches ?? [],
    status: extractSwarmLifetimeStatus(payloads),
    bundlePath: firstBundleHealthStringField(payloads, ['bundlePath', 'mergePath', 'bundle', 'merge']) ?? inferBundleHealthPathFromFiles(normalizeSourceFiles(entry), 'bundle'),
    patchPath: firstBundleHealthStringField(payloads, ['patchPath', 'patch', 'changesPatch']) ?? inferBundleHealthPathFromFiles(normalizeSourceFiles(entry), 'patch'),
    jobId: firstBundleHealthStringField(payloads, ['jobId']),
    taskId: firstBundleHealthStringField(payloads, ['taskId']),
    decisionId: firstBundleHealthStringField(payloads, ['decisionId']),
    changedPaths: extractSwarmLifetimeStringArrayField(payloads, ['changedPaths', 'paths', 'writes', 'targets']),
    outputKind: firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']),
    terminalClassification: firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']),
    disposition: firstBundleHealthStringField(payloads, ['disposition']),
    gatesPassed: firstBundleHealthBooleanField(payloads, ['gatesPassed', 'gatePassed', 'finalGateOk', 'verificationOk', 'checksPassed']),
    order
  });
}

function bundleHealthObservationFromRecord(record: FrontierRegistryRecord, order: number): BundleHealthObservation {
  const payloads = [record.metadata];
  return createBundleHealthObservation({
    id: record.id,
    kind: record.kind,
    textParts: [
      record.id,
      record.kind,
      record.status,
      record.error,
      record.entryId,
      record.durationMs === undefined ? undefined : String(record.durationMs),
      (record.reads ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (record.writes ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      firstBundleHealthStringField(payloads, ['status', 'state', 'phase', 'resultStatus', 'outcome']),
      firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']),
      firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']),
      firstBundleHealthStringField(payloads, ['disposition']),
      firstBundleHealthStringField(payloads, ['bundlePath', 'mergePath', 'bundle', 'merge']),
      firstBundleHealthStringField(payloads, ['patchPath', 'patch', 'changesPatch']),
      firstBundleHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(undefined, undefined, [], []),
    files: [],
    resources: [],
    status: record.status ?? extractSwarmLifetimeStatus(payloads),
    bundlePath: firstBundleHealthStringField(payloads, ['bundlePath', 'mergePath', 'bundle', 'merge']),
    patchPath: firstBundleHealthStringField(payloads, ['patchPath', 'patch', 'changesPatch']),
    jobId: firstBundleHealthStringField(payloads, ['jobId']),
    taskId: firstBundleHealthStringField(payloads, ['taskId']),
    decisionId: firstBundleHealthStringField(payloads, ['decisionId']),
    changedPaths: extractSwarmLifetimeStringArrayField(payloads, ['changedPaths', 'paths', 'writes', 'targets']),
    outputKind: firstBundleHealthStringField(payloads, ['outputKind', 'kind', 'type']),
    terminalClassification: firstBundleHealthStringField(payloads, ['terminalClassification', 'terminal', 'classification']),
    disposition: firstBundleHealthStringField(payloads, ['disposition']),
    gatesPassed: firstBundleHealthBooleanField(payloads, ['gatesPassed', 'gatePassed', 'finalGateOk', 'verificationOk', 'checksPassed']),
    order
  });
}

function collectBundleHealthObservations(bundle: FrontierInspectBundle): BundleHealthObservation[] {
  const observations: BundleHealthObservation[] = [];
  for (let i = 0; i < bundle.artifacts.length; i++) addUniqueObservation(observations, bundleHealthObservationFromArtifact(bundle.artifacts[i], observations.length));
  for (let i = 0; i < bundle.events.length; i++) addUniqueObservation(observations, bundleHealthObservationFromEvent(bundle.events[i], observations.length));
  for (let i = 0; i < bundle.graph.entries.length; i++) addUniqueObservation(observations, bundleHealthObservationFromEntry(bundle.graph.entries[i], observations.length));
  for (let i = 0; i < bundle.graph.records.length; i++) addUniqueObservation(observations, bundleHealthObservationFromRecord(bundle.graph.records[i], observations.length));
  return observations;
}

function collapseBundleHealthObservations(
  observations: readonly BundleHealthObservation[]
): Array<{ latest: BundleHealthObservation }> {
  const byKey = new Map<string, BundleHealthObservation>();
  for (const observation of observations) {
    const key = bundleHealthObservationKey(observation);
    const current = byKey.get(key);
    if (current === undefined || current.order <= observation.order) byKey.set(key, observation);
  }
  return Array.from(byKey.values(), (latest) => ({ latest }));
}

function bundleHealthObservationKey(observation: BundleHealthObservation): string {
  return [
    observation.decisionId,
    observation.jobId,
    observation.taskId,
    observation.bundlePath,
    observation.patchPath,
    observation.id
  ].find((value) => value !== undefined && value !== '') ?? observation.id;
}

function collectBundleHealthBucket(
  observations: readonly BundleHealthObservation[],
  options: {
    id?: (observation: BundleHealthObservation) => string | undefined;
  } = {}
): FrontierInspectBundleHealthBucketSummary {
  const ids: string[] = [];
  const sources: string[] = [];
  for (const observation of observations) {
    const id = options.id?.(observation) ?? observation.id;
    if (id !== undefined && id !== '') addUnique(ids, id);
    for (const source of observation.sources) addUnique(sources, source);
  }
  return {
    count: ids.length,
    ids: ids.sort(),
    sources: sources.sort()
  };
}

function collectBundleHealthHumanBlockers(
  observations: readonly BundleHealthObservation[],
  options: {
    id?: (observation: BundleHealthObservation) => string | undefined;
  } = {}
): FrontierInspectBundleHealthHumanBlockerSummary {
  const bucket = collectBundleHealthBucket(observations, options);
  return {
    ...bucket,
    reasons: uniqueStrings(observations.flatMap((observation) => extractBundleHealthHumanBlockerReasons(observation)))
  };
}

function createInspectBundleHealthCards(input: {
  completeBundles: FrontierInspectBundleHealthBucketSummary;
  generatedPatches: FrontierInspectBundleHealthBucketSummary;
  missingPatch: FrontierInspectBundleHealthBucketSummary;
  missingBundle: FrontierInspectBundleHealthBucketSummary;
  noChangeDone: FrontierInspectBundleHealthBucketSummary;
  evidenceOnlyDone: FrontierInspectBundleHealthBucketSummary;
  failedGate: FrontierInspectBundleHealthBucketSummary;
  trueHumanBlockers: FrontierInspectBundleHealthHumanBlockerSummary;
}): FrontierInspectBundleHealthCard[] {
  return [
    {
      id: 'complete-bundles',
      label: 'Complete bundles',
      value: input.completeBundles.count,
      detail: `${formatBundleHealthCount(input.completeBundles.count, 'complete bundle')} with patch and bundle evidence`,
      status: input.completeBundles.count > 0 ? 'ok' : 'ok',
      action: 'Review the bundles that landed cleanly.',
      sourceFields: ['completeBundles.count', 'completeBundles.ids']
    },
    {
      id: 'generated-patches',
      label: 'Generated patches',
      value: input.generatedPatches.count,
      detail: `${formatBundleHealthCount(input.generatedPatches.count, 'generated patch')} from evidence or projection output`,
      status: input.generatedPatches.count > 0 ? 'info' : 'ok',
      action: 'Inspect the generated patch outputs and their evidence.',
      sourceFields: ['generatedPatches.count', 'generatedPatches.ids']
    },
    {
      id: 'missing-patch',
      label: 'Missing patch',
      value: input.missingPatch.count,
      detail: `${formatBundleHealthCount(input.missingPatch.count, 'bundle')} is missing a patch artifact`,
      status: input.missingPatch.count > 0 ? 'warning' : 'ok',
      action: 'Regenerate the missing patch or rerun the worker.',
      sourceFields: ['missingPatch.count', 'missingPatch.ids']
    },
    {
      id: 'missing-bundle',
      label: 'Missing bundle',
      value: input.missingBundle.count,
      detail: `${formatBundleHealthCount(input.missingBundle.count, 'patch')} is missing a merge bundle`,
      status: input.missingBundle.count > 0 ? 'warning' : 'ok',
      action: 'Collect or regenerate the missing merge bundle.',
      sourceFields: ['missingBundle.count', 'missingBundle.ids']
    },
    {
      id: 'no-change-done',
      label: 'No-change done',
      value: input.noChangeDone.count,
      detail: `${formatBundleHealthCount(input.noChangeDone.count, 'no-change result')} finished cleanly`,
      status: input.noChangeDone.count > 0 ? 'ok' : 'ok',
      action: 'No follow-up is needed unless the no-change result looks unexpected.',
      sourceFields: ['noChangeDone.count', 'noChangeDone.ids']
    },
    {
      id: 'evidence-only-done',
      label: 'Evidence-only done',
      value: input.evidenceOnlyDone.count,
      detail: `${formatBundleHealthCount(input.evidenceOnlyDone.count, 'evidence-only result')} finished without a patch`,
      status: input.evidenceOnlyDone.count > 0 ? 'info' : 'ok',
      action: 'Use the evidence-only output as the terminal result.',
      sourceFields: ['evidenceOnlyDone.count', 'evidenceOnlyDone.ids']
    },
    {
      id: 'failed-gate',
      label: 'Failed gate',
      value: input.failedGate.count,
      detail: `${formatBundleHealthCount(input.failedGate.count, 'bundle')} failed a required gate`,
      status: input.failedGate.count > 0 ? 'warning' : 'ok',
      action: 'Rerun the failing gates or inspect the failure logs.',
      sourceFields: ['failedGate.count', 'failedGate.ids']
    },
    {
      id: 'true-human-blockers',
      label: 'True human blockers',
      value: input.trueHumanBlockers.count,
      detail: `${formatBundleHealthCount(input.trueHumanBlockers.count, 'explicit human question')} needs authority or policy input`,
      status: input.trueHumanBlockers.count > 0 ? 'blocked' : 'ok',
      action: 'Escalate only the questions that truly need human authority.',
      sourceFields: ['trueHumanBlockers.count', 'trueHumanBlockers.ids', 'trueHumanBlockers.reasons']
    }
  ];
}

function createBundleHealthHeadline(input: {
  status: 'ok' | 'info' | 'warning' | 'blocked' | 'unavailable';
  completeBundles: FrontierInspectBundleHealthBucketSummary;
  generatedPatches: FrontierInspectBundleHealthBucketSummary;
  missingPatch: FrontierInspectBundleHealthBucketSummary;
  missingBundle: FrontierInspectBundleHealthBucketSummary;
  noChangeDone: FrontierInspectBundleHealthBucketSummary;
  evidenceOnlyDone: FrontierInspectBundleHealthBucketSummary;
  failedGate: FrontierInspectBundleHealthBucketSummary;
  trueHumanBlockers: FrontierInspectBundleHealthHumanBlockerSummary;
}): string {
  const healthyCount = input.completeBundles.count + input.generatedPatches.count + input.noChangeDone.count + input.evidenceOnlyDone.count;
  const issueCount = input.missingPatch.count + input.missingBundle.count + input.failedGate.count + input.trueHumanBlockers.count;
  if (healthyCount === 0 && issueCount === 0) return 'No bundle health evidence found.';
  if (input.status === 'blocked') {
    return `${formatBundleHealthCount(input.trueHumanBlockers.count, 'true human blocker')} and ${formatBundleHealthCount(input.failedGate.count, 'failed gate')} need attention.`;
  }
  if (input.status === 'warning') {
    return `${formatBundleHealthCount(healthyCount, 'healthy bundle state')} plus ${formatBundleHealthCount(issueCount, 'bundle health issue')}.`;
  }
  if (input.generatedPatches.count > 0 || input.evidenceOnlyDone.count > 0) {
    return `${formatBundleHealthCount(healthyCount, 'healthy bundle state')} and ${formatBundleHealthCount(input.generatedPatches.count + input.evidenceOnlyDone.count, 'terminal evidence result')}.`;
  }
  return `${formatBundleHealthCount(healthyCount, 'healthy bundle state')} ready for dashboard review.`;
}

function createInspectDefaultDrainGateHealthCards(input: {
  candidatesWithGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  candidatesMissingGates: FrontierInspectDefaultDrainGateHealthBucketSummary;
  appliedAfterGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  failedGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  skippedRequiredGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  trueHumanBlockers: FrontierInspectDefaultDrainGateHealthHumanBlockerSummary;
}): FrontierInspectDefaultDrainGateHealthCard[] {
  return [
    {
      id: 'candidates-with-gates',
      label: 'Candidates with gates',
      value: input.candidatesWithGates.count,
      detail: `${formatBundleHealthCount(input.candidatesWithGates.count, 'candidate')} carry ${formatBundleHealthCount(input.candidatesWithGates.requiredCount, 'required gate')}`,
      status: input.candidatesWithGates.count > 0 ? 'info' : 'ok',
      action: 'Review the gate-backed candidates and their gate coverage.',
      sourceFields: ['candidatesWithGates.count', 'candidatesWithGates.ids', 'candidatesWithGates.requiredCount', 'candidatesWithGates.passedCount', 'candidatesWithGates.failedCount', 'candidatesWithGates.skippedCount']
    },
    {
      id: 'candidates-missing-gates',
      label: 'Candidates missing gates',
      value: input.candidatesMissingGates.count,
      detail: `${formatBundleHealthCount(input.candidatesMissingGates.count, 'candidate')} have no gate evidence and need configuration review`,
      status: input.candidatesMissingGates.count > 0 ? 'warning' : 'ok',
      action: 'Add the missing gate evidence or revise the candidate configuration.',
      sourceFields: ['candidatesMissingGates.count', 'candidatesMissingGates.ids']
    },
    {
      id: 'failed-gates',
      label: 'Failed gates',
      value: input.failedGates.count,
      detail: `${formatBundleHealthCount(input.failedGates.failedCount, 'failed gate')} across ${formatBundleHealthCount(input.failedGates.count, 'candidate')}`,
      status: input.failedGates.count > 0 ? 'warning' : 'ok',
      action: 'Inspect the failing gate logs and rerun the affected candidates.',
      sourceFields: ['failedGates.count', 'failedGates.ids', 'failedGates.failedCount']
    },
    {
      id: 'applied-after-gates',
      label: 'Applied after gates',
      value: input.appliedAfterGates.count,
      detail: `${formatBundleHealthCount(input.appliedAfterGates.count, 'candidate')} resolved successfully after gates`,
      status: input.appliedAfterGates.count > 0 ? 'info' : 'ok',
      action: 'Surface the gate-backed candidates that landed cleanly.',
      sourceFields: ['appliedAfterGates.count', 'appliedAfterGates.ids', 'appliedAfterGates.requiredCount', 'appliedAfterGates.passedCount', 'appliedAfterGates.failedCount', 'appliedAfterGates.skippedCount']
    },
    {
      id: 'skipped-required-gates',
      label: 'Skipped required gates',
      value: input.skippedRequiredGates.count,
      detail: `${formatBundleHealthCount(input.skippedRequiredGates.skippedCount, 'skipped required gate')} across ${formatBundleHealthCount(input.skippedRequiredGates.count, 'candidate')}`,
      status: input.skippedRequiredGates.count > 0 ? 'warning' : 'ok',
      action: 'Restore the skipped required gates before treating the result as healthy.',
      sourceFields: ['skippedRequiredGates.count', 'skippedRequiredGates.ids', 'skippedRequiredGates.requiredCount', 'skippedRequiredGates.skippedCount']
    },
    {
      id: 'true-human-blockers',
      label: 'True human blockers',
      value: input.trueHumanBlockers.count,
      detail: `${formatBundleHealthCount(input.trueHumanBlockers.count, 'explicit human question')} needs authority or policy input`,
      status: input.trueHumanBlockers.count > 0 ? 'blocked' : 'ok',
      action: 'Escalate only the decisions that explicitly need human authority.',
      sourceFields: ['trueHumanBlockers.count', 'trueHumanBlockers.ids', 'trueHumanBlockers.reasons']
    }
  ];
}

function createDefaultDrainGateHealthHeadline(input: {
  status: 'ok' | 'info' | 'warning' | 'blocked' | 'unavailable';
  candidatesWithGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  candidatesMissingGates: FrontierInspectDefaultDrainGateHealthBucketSummary;
  appliedAfterGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  failedGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  skippedRequiredGates: FrontierInspectDefaultDrainGateHealthGateSummary;
  trueHumanBlockers: FrontierInspectDefaultDrainGateHealthHumanBlockerSummary;
}): string {
  const configIssueCount = input.candidatesMissingGates.count + input.failedGates.count + input.skippedRequiredGates.count;
  const gateBackedCount = input.appliedAfterGates.count + input.failedGates.count + input.skippedRequiredGates.count;
  if (input.candidatesWithGates.count === 0 && configIssueCount === 0 && input.trueHumanBlockers.count === 0) {
    return 'No default drain gate health evidence found.';
  }
  if (input.status === 'blocked') {
    return `${formatBundleHealthCount(input.trueHumanBlockers.count, 'true human blocker')} and ${formatBundleHealthCount(configIssueCount, 'gate configuration issue')} need attention.`;
  }
  if (configIssueCount > 0) {
    const parts: string[] = [];
    if (input.appliedAfterGates.count > 0) {
      parts.push(`${formatBundleHealthCount(input.appliedAfterGates.count, 'applied after gate candidate')}`);
    }
    if (input.candidatesMissingGates.count > 0) {
      parts.push(`${formatBundleHealthCount(input.candidatesMissingGates.count, 'missing-gate candidate')}`);
    }
    if (input.failedGates.count > 0) {
      parts.push(`${formatBundleHealthCount(input.failedGates.count, 'failed gate candidate')}`);
    }
    if (input.skippedRequiredGates.count > 0) {
      parts.push(`${formatBundleHealthCount(input.skippedRequiredGates.count, 'skipped required gate candidate')}`);
    }
    return `${parts.join(', ')} need attention.`;
  }
  if (gateBackedCount > 0) {
    return `${formatBundleHealthCount(input.appliedAfterGates.count, 'applied after gate candidate')} ready for dashboard review.`;
  }
  if (input.candidatesWithGates.count > 0) {
    return `${formatBundleHealthCount(input.candidatesWithGates.count, 'candidate with gates')} ready for dashboard review.`;
  }
  return 'No default drain gate health evidence found.';
}

function collectDefaultDrainGateGateSummary(
  observations: readonly BundleHealthObservation[]
): FrontierInspectDefaultDrainGateHealthGateSummary {
  const bucket = collectBundleHealthBucket(observations, {
    id: (observation) => extractBundleHealthSubjectId(observation) ?? observation.id
  });
  let requiredCount = 0;
  let passedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;
  for (const observation of observations) {
    const stats = collectDefaultDrainGateRecordStats(observation);
    requiredCount += stats.requiredCount;
    passedCount += stats.passedCount;
    failedCount += stats.failedCount;
    skippedCount += stats.skippedCount;
  }
  return {
    ...bucket,
    requiredCount,
    passedCount,
    failedCount,
    skippedCount
  };
}

function collectDefaultDrainGateRecordStats(observation: BundleHealthObservation): {
  requiredCount: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  hasGateEvidence: boolean;
} {
  const records = collectDefaultDrainGateRecords(observation);
  let requiredCount = 0;
  let passedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;
  for (const gate of records) {
    if (gate.required === true) requiredCount++;
    if (gate.state === 'passed') passedCount++;
    else if (gate.state === 'failed') failedCount++;
    else if (gate.state === 'skipped') skippedCount++;
  }
  return {
    requiredCount,
    passedCount,
    failedCount,
    skippedCount,
    hasGateEvidence: records.length > 0 || observation.gatesPassed !== undefined
  };
}

function collectDefaultDrainGateRecords(observation: BundleHealthObservation): SwarmLifetimeGateRecord[] {
  const records: SwarmLifetimeGateRecord[] = [];
  const seen = new Set<string>();
  for (const payload of observation.payloads) {
    collectDefaultDrainGateRecordsFromValue(payload, records, seen);
  }
  return records;
}

function collectDefaultDrainGateRecordsFromValue(
  value: unknown,
  records: SwarmLifetimeGateRecord[],
  seen: Set<string>
): void {
  if (!isRecord(value)) return;
  const gateSources = [value.finalGateSummary, value.gateSummary, value.verification];
  for (const source of gateSources) {
    if (!isRecord(source)) continue;
    const directGate = extractSwarmLifetimeGateRecord(source);
    if (directGate !== undefined) addDefaultDrainGateRecord(records, seen, directGate);
    const nestedGates = source.gates;
    if (Array.isArray(nestedGates)) {
      for (const gate of nestedGates) {
        const nestedGate = extractSwarmLifetimeGateRecord(gate);
        if (nestedGate !== undefined) addDefaultDrainGateRecord(records, seen, nestedGate);
      }
    }
  }
  const directGates = value.gates;
  if (Array.isArray(directGates)) {
    for (const gate of directGates) {
      const nestedGate = extractSwarmLifetimeGateRecord(gate);
      if (nestedGate !== undefined) addDefaultDrainGateRecord(records, seen, nestedGate);
    }
  }
}

function addDefaultDrainGateRecord(
  records: SwarmLifetimeGateRecord[],
  seen: Set<string>,
  gate: SwarmLifetimeGateRecord
): void {
  const key = `${gate.id}|${gate.state ?? ''}|${String(gate.required ?? '')}`;
  if (seen.has(key)) return;
  seen.add(key);
  records[records.length] = gate;
}

function looksLikeDefaultDrainGateCandidateWithGates(observation: BundleHealthObservation): boolean {
  const stats = collectDefaultDrainGateRecordStats(observation);
  if (stats.hasGateEvidence) return true;
  return looksLikeDefaultDrainGateFailedGate(observation) || looksLikeDefaultDrainGateSkippedRequiredGate(observation) || looksLikeDefaultDrainGateAppliedAfterGates(observation);
}

function looksLikeDefaultDrainGateAppliedAfterGates(observation: BundleHealthObservation): boolean {
  if (looksLikeBundleHealthHumanBlocker(observation)) return false;
  const stateText = bundleHealthStateText(observation);
  const stats = collectDefaultDrainGateRecordStats(observation);
  if (!stats.hasGateEvidence) return false;
  if (observation.gatesPassed === false) return false;
  return /(?:applied[-\s]?after[-\s]?gate|applied|committed|complete|completed|generated[-\s]?patch|admitted[-\s]?merge[-\s]?bundle|admitted[-\s]?evidence[-\s]?json|accepted|resolved|success)/i.test(stateText);
}

function looksLikeDefaultDrainGateFailedGate(observation: BundleHealthObservation): boolean {
  if (looksLikeBundleHealthHumanBlocker(observation)) return false;
  const stateText = bundleHealthStateText(observation);
  const stats = collectDefaultDrainGateRecordStats(observation);
  if (observation.gatesPassed === false) return true;
  return stats.failedCount > 0 || /(?:failed[-\s]?gate|gate[-\s]?failed|test[-\s]?fail|verification[-\s]?required|failed[-\s]?(?:evidence|apply)|stale[-\s]?patch|rejected|error\b)/i.test(stateText);
}

function looksLikeDefaultDrainGateSkippedRequiredGate(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  const stats = collectDefaultDrainGateRecordStats(observation);
  return (stats.requiredCount > 0 && stats.skippedCount > 0) || /(?:skipped[-\s]?required|required[-\s]?gate.*skipped|skipped.*required[-\s]?gate|gate[-\s]?skipped)/i.test(stateText);
}

function looksLikeDefaultDrainGateCandidateMissingGates(observation: BundleHealthObservation): boolean {
  if (looksLikeBundleHealthHumanBlocker(observation)) return false;
  if (looksLikeDefaultDrainGateFailedGate(observation)) return false;
  if (looksLikeDefaultDrainGateSkippedRequiredGate(observation)) return false;
  if (looksLikeDefaultDrainGateAppliedAfterGates(observation)) return false;
  const stateText = bundleHealthStateText(observation);
  const stats = collectDefaultDrainGateRecordStats(observation);
  if (stats.hasGateEvidence) return false;
  return /(?:applied|committed|complete|completed|done|generated[-\s]?patch|admitted[-\s]?merge[-\s]?bundle|admitted[-\s]?evidence[-\s]?json|accepted|resolved|passed)/i.test(stateText);
}

type BundleHealthMeaning =
  | 'complete-bundle'
  | 'generated-patch'
  | 'missing-patch'
  | 'missing-bundle'
  | 'no-change-done'
  | 'evidence-only-done'
  | 'failed-gate'
  | 'true-human-blocker'
  | 'unknown';

function classifyBundleHealthMeaning(observation: BundleHealthObservation): BundleHealthMeaning {
  if (looksLikeBundleHealthHumanBlocker(observation)) return 'true-human-blocker';
  if (looksLikeBundleHealthFailedGate(observation)) return 'failed-gate';
  if (looksLikeBundleHealthNoChangeDone(observation)) return 'no-change-done';
  if (looksLikeBundleHealthEvidenceOnlyDone(observation)) return 'evidence-only-done';
  if (looksLikeBundleHealthGeneratedPatch(observation)) return 'generated-patch';
  if (looksLikeBundleHealthCompleteBundle(observation)) return 'complete-bundle';
  if (looksLikeBundleHealthMissingPatch(observation)) return 'missing-patch';
  if (looksLikeBundleHealthMissingBundle(observation)) return 'missing-bundle';
  return 'unknown';
}

function extractBundleHealthSubjectId(observation: BundleHealthObservation): string | undefined {
  if (observation.decisionId !== undefined) return observation.decisionId;
  if (observation.jobId !== undefined) return observation.jobId;
  if (observation.taskId !== undefined) return observation.taskId;
  if (observation.bundlePath !== undefined) return observation.bundlePath;
  if (observation.patchPath !== undefined) return observation.patchPath;
  return observation.id;
}

function looksLikeBundleHealthHumanBlocker(observation: BundleHealthObservation): boolean {
  return extractBundleHealthHumanBlockerContract(observation) !== undefined;
}

function looksLikeBundleHealthFailedGate(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  if (/\b(human[-\s]?(blocked|question))\b/.test(stateText)) return false;
  if (observation.gatesPassed === false) return true;
  return /(?:failed[-\s]?gate|gate[-\s]?failed|test[-\s]?fail|verification[-\s]?required|failed[-\s]?(?:evidence|apply)|stale[-\s]?patch|rejected|failed\b|error\b)/i.test(stateText);
}

function looksLikeBundleHealthNoChangeDone(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  return /(?:done[-\s]?no[-\s]?change|no[-\s]?change|unchanged|same|baseline)/i.test(stateText);
}

function looksLikeBundleHealthEvidenceOnlyDone(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  if (/(?:evidence[-\s]?only|discovery[-\s]?only|record[-\s]?only)/i.test(stateText)) return observation.changedPaths.length > 0 || !looksLikeBundleHealthNoChangeDone(observation);
  return false;
}

function looksLikeBundleHealthGeneratedPatch(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  return /(?:admitted[-\s]?evidence[-\s]?json|evidence[-\s]?json|generated[-\s]?patch|patch[-\s]?only)/i.test(stateText);
}

function looksLikeBundleHealthCompleteBundle(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  if (/(?:admitted[-\s]?merge[-\s]?bundle|complete[-\s]?merge[-\s]?bundle|merge[-\s]?bundle|complete[-\s]?bundle)/i.test(stateText)) return true;
  return bundleHealthHasBundle(observation) && bundleHealthHasPatch(observation);
}

function looksLikeBundleHealthMissingPatch(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  if (/(?:missing[-\s]?patch|missing[-\s]?evidence)/i.test(stateText)) return true;
  return bundleHealthHasBundle(observation) && !bundleHealthHasPatch(observation);
}

function looksLikeBundleHealthMissingBundle(observation: BundleHealthObservation): boolean {
  const stateText = bundleHealthStateText(observation);
  if (/(?:missing[-\s]?bundle|stale[-\s]?patch)/i.test(stateText)) return true;
  return bundleHealthHasPatch(observation) && !bundleHealthHasBundle(observation);
}

function bundleHealthStateText(observation: BundleHealthObservation): string {
  return [
    observation.status,
    observation.outputKind,
    observation.terminalClassification,
    observation.disposition,
    observation.kind,
    observation.text
  ].filter((value): value is string => typeof value === 'string' && value !== '').join(' ').toLowerCase();
}

function bundleHealthHasBundle(observation: BundleHealthObservation): boolean {
  if (observation.bundlePath !== undefined) return true;
  return observation.files.some((file) => /(?:^|\/)(?:merge(?:-bundle)?|bundle)\.json$/i.test(file));
}

function bundleHealthHasPatch(observation: BundleHealthObservation): boolean {
  if (observation.patchPath !== undefined) return true;
  return observation.files.some((file) => /(?:^|\/)changes\.patch$/i.test(file) || /\.patch$/i.test(file));
}

function extractBundleHealthHumanBlockerReasons(observation: BundleHealthObservation): string[] {
  const contract = extractBundleHealthHumanBlockerContract(observation);
  return contract === undefined ? [] : [contract.reason];
}

function extractBundleHealthHumanBlockerContract(observation: BundleHealthObservation): FrontierInspectAutonomousMergeHealthHumanQuestion | undefined {
  for (const payload of observation.payloads) {
    for (const key of ['reason', 'question', 'summary', 'message']) {
      const raw = extractSwarmLifetimeStringField(payload, [key]);
      const contract = parseAutonomousMergeHealthHumanQuestionContractLine(raw);
      if (contract !== undefined) return contract;
    }
  }

  const textIndex = observation.text.indexOf('human-question:');
  if (textIndex !== -1) {
    const contract = parseAutonomousMergeHealthHumanQuestionContractLine(observation.text.slice(textIndex));
    if (contract !== undefined) return contract;
  }

  return undefined;
}

function inferBundleHealthPathFromFiles(files: readonly string[] | undefined, kind: 'bundle' | 'patch'): string | undefined {
  if (files === undefined) return undefined;
  for (const file of files) {
    if (kind === 'bundle' && /(?:^|\/)(?:merge(?:-bundle)?|bundle)\.json$/i.test(file)) return file;
    if (kind === 'patch' && /(?:^|\/)changes\.patch$/i.test(file)) return file;
  }
  return undefined;
}

function firstBundleHealthStringField(payloads: readonly unknown[], keys: readonly string[]): string | undefined {
  return firstSwarmLifetimeStringField(payloads, keys);
}

function firstBundleHealthBooleanField(payloads: readonly unknown[], keys: readonly string[]): boolean | undefined {
  for (const payload of payloads) {
    const value = extractBundleHealthBooleanField(payload, keys);
    if (value !== undefined) return value;
  }
  return undefined;
}

function extractBundleHealthBooleanField(value: unknown, keys: readonly string[]): boolean | undefined {
  if (!isRecord(value)) return undefined;
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'boolean') return raw;
    if (typeof raw === 'number') {
      if (raw === 1) return true;
      if (raw === 0) return false;
    }
    if (typeof raw === 'string') {
      if (/^(true|yes|ok|passed|pass|clean)$/i.test(raw)) return true;
      if (/^(false|no|failed|fail|blocked|error)$/i.test(raw)) return false;
    }
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        const nested = extractBundleHealthBooleanField(item, keys);
        if (nested !== undefined) return nested;
      }
      continue;
    }
    if (isRecord(child)) {
      const nested = extractBundleHealthBooleanField(child, keys);
      if (nested !== undefined) return nested;
    }
  }
  return undefined;
}

function formatBundleHealthCount(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`;
}

function addUniqueObservation(observations: BundleHealthObservation[], observation: BundleHealthObservation): void {
  observations[observations.length] = observation;
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

function routeEntriesFromManifest(
  manifest: FrontierInspectRouteManifestLike,
  options: Pick<FrontierInspectArtifactInput, 'feature' | 'package' | 'sourcePackage' | 'tags'>
): FrontierRegistryEntry[] {
  const entries: FrontierRegistryEntry[] = [];
  for (const route of manifest.routes ?? []) {
    entries[entries.length] = {
      id: String(route.id),
      kind: route.kind ?? 'route',
      description: route.title,
      package: route.package ?? options.package ?? options.sourcePackage,
      feature: route.feature ?? options.feature,
      owner: route.owner,
      source: normalizeSourceLike(route.source),
      reads: route.reads,
      writes: route.writes,
      dependsOn: route.parentId === undefined ? undefined : [String(route.parentId)],
      touches: uniqueStrings([route.resource, route.pattern, route.id].filter(isString)),
      handles: descriptorsToStrings(route.guards),
      produces: descriptorsToStrings(route.loads),
      emits: route.emits,
      tags: uniqueStrings((options.tags ?? []).concat(route.tags ?? [])),
      metadata: toJsonObject(route.metadata)
    };
  }
  for (let i = 0; i < (manifest.transitions ?? []).length; i++) {
    const transition = (manifest.transitions ?? [])[i];
    entries[entries.length] = {
      id: transition.id ?? 'transition:' + i + ':' + transition.to,
      kind: transition.kind ?? 'transition',
      package: options.package ?? options.sourcePackage,
      feature: options.feature,
      reads: transition.reads,
      writes: transition.writes,
      dependsOn: transition.from === undefined
        ? undefined
        : Array.isArray(transition.from) ? transition.from.map(String) : [String(transition.from)],
      touches: [String(transition.to)],
      handles: descriptorsToStrings(transition.guards),
      produces: descriptorsToStrings(transition.loads),
      emits: transition.emits,
      tags: uniqueStrings((options.tags ?? []).concat(transition.tags ?? [])),
      metadata: toJsonObject(transition.metadata)
    };
  }
  return entries;
}

function resourcesFromRouteManifest(manifest: FrontierInspectRouteManifestLike): string[] {
  const values: string[] = [];
  for (const route of manifest.routes ?? []) {
    if (route.resource !== undefined) addUnique(values, route.resource);
    if (route.pattern !== undefined) addUnique(values, route.pattern);
    addUnique(values, route.id);
    for (const load of route.loads ?? []) {
      const resource = descriptorResource(load);
      if (resource !== undefined) addUnique(values, resource);
    }
  }
  for (const transition of manifest.transitions ?? []) {
    addUnique(values, transition.to);
    for (const from of Array.isArray(transition.from) ? transition.from : transition.from === undefined ? [] : [transition.from]) {
      addUnique(values, String(from));
    }
    for (const load of transition.loads ?? []) {
      const resource = descriptorResource(load);
      if (resource !== undefined) addUnique(values, resource);
    }
  }
  return values.sort();
}

function pathsFromRouteManifest(manifest: FrontierInspectRouteManifestLike): string[] {
  const values: string[] = [];
  for (const route of manifest.routes ?? []) {
    for (const path of route.reads ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
    for (const path of route.writes ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
    for (const guard of route.guards ?? []) for (const path of descriptorReads(guard)) addUnique(values, normalizeFrontierRegistryPath(path));
  }
  for (const transition of manifest.transitions ?? []) {
    for (const path of transition.reads ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
    for (const path of transition.writes ?? []) addUnique(values, normalizeFrontierRegistryPath(path));
    for (const guard of transition.guards ?? []) for (const path of descriptorReads(guard)) addUnique(values, normalizeFrontierRegistryPath(path));
  }
  return values.sort();
}

function filesFromRouteManifest(manifest: FrontierInspectRouteManifestLike): string[] {
  const values: string[] = [];
  for (const route of manifest.routes ?? []) for (const file of sourceLikeFiles(route.source)) addUnique(values, file);
  return values.sort();
}

function eventsFromDiagnostics(
  diagnostics: readonly FrontierInspectDiagnosticLike[],
  source: string,
  options: Pick<FrontierInspectArtifactInput, 'sourcePackage' | 'feature' | 'package' | 'tags'>
): FrontierInspectEventInput[] {
  return diagnostics.map((diagnostic, index) => ({
    id: source + ':diagnostic:' + index + ':' + String(diagnostic.code ?? diagnostic.stepId ?? diagnostic.routeId ?? diagnostic.transitionId ?? 'issue'),
    type: source + '.diagnostic',
    label: diagnostic.message,
    source,
    sourcePackage: options.sourcePackage,
    feature: options.feature,
    package: options.package ?? options.sourcePackage,
    tags: options.tags,
    path: diagnostic.path,
    routeId: diagnostic.routeId,
    severity: diagnostic.severity ?? 'warning',
    status: diagnostic.severity === 'error' ? 'error' : 'pending',
    value: toJsonValue(diagnostic)
  }));
}

function eventFromLogRecord(
  record: FrontierInspectLogRecordLike,
  index: number,
  options: Pick<FrontierInspectArtifactInput, 'sourcePackage' | 'feature' | 'package' | 'tags'>
): FrontierInspectEvent {
  const attributes = record.attributes ?? {};
  const resource = record.resource ?? {};
  const telemetry = record.telemetry ?? {};
  const level = String(record.level ?? 'info');
  return normalizeEvent({
    id: 'log:' + (record.traceId ?? record.spanId ?? record.name ?? index) + ':' + index,
    type: record.name ?? 'log',
    label: record.message,
    timestamp: record.time,
    source: 'logging',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-logging',
    entryId: stringField(attributes, telemetry, resource, ['entryId', 'entry.id', 'frontier.entry']),
    recordId: stringField(attributes, telemetry, resource, ['recordId', 'record.id', 'frontier.record']),
    feature: stringField(attributes, telemetry, resource, ['feature', 'frontier.feature']) ?? options.feature,
    package: stringField(attributes, telemetry, resource, ['package', 'frontier.package']) ?? options.package ?? options.sourcePackage,
    tags: uniqueStrings((options.tags ?? []).concat(level, record.scope ?? '', stringArrayField(attributes, 'tags'))),
    file: stringField(attributes, telemetry, resource, ['file', 'source.file']),
    path: stringField(attributes, telemetry, resource, ['path', 'state.path']),
    resource: stringField(attributes, telemetry, resource, ['resource', 'route', 'url']),
    routeId: stringField(attributes, telemetry, resource, ['routeId', 'route.id']),
    severity: logLevelToSeverity(level),
    status: level === 'error' || level === 'fatal' ? 'error' : 'ok',
    value: toJsonValue(record),
    metadata: toJsonObject({
      traceId: record.traceId,
      spanId: record.spanId,
      parentSpanId: record.parentSpanId,
      durationMs: record.durationMs
    })
  }, index);
}

function eventFromEventLogRecord(
  record: FrontierInspectEventLogRecordLike,
  index: number,
  options: Pick<FrontierInspectArtifactInput, 'sourcePackage' | 'feature' | 'package' | 'tags'>
): FrontierInspectEvent {
  const headers = record.headers ?? {};
  const value = isRecord(record.value) ? record.value : {};
  const metadata = isRecord(value.metadata) ? value.metadata : {};
  const eventType = stringField(value, headers, metadata, ['kind', 'type']) ?? 'event-log-record';
  return normalizeEvent({
    id: 'event-log:' + String(record.offset ?? index),
    type: eventType,
    label: record.key,
    timestamp: record.timestamp,
    source: 'event-log',
    sourcePackage: options.sourcePackage ?? '@shapeshift-labs/frontier-event-log',
    entryId: stringField(headers, value, metadata, ['entryId', 'entry.id']),
    recordId: stringField(headers, value, metadata, ['recordId', 'record.id']),
    feature: stringField(headers, value, metadata, ['feature']) ?? options.feature,
    package: stringField(headers, value, metadata, ['package']) ?? options.package ?? options.sourcePackage,
    tags: uniqueStrings((options.tags ?? []).concat('event-log', stringArrayField(headers, 'tags'))),
    path: stringField(headers, value, metadata, ['path']),
    resource: stringField(headers, value, metadata, ['resource', 'route']),
    severity: stringField(headers, value, metadata, ['severity']),
    status: stringField(headers, value, metadata, ['status']) ?? 'ok',
    value: toJsonValue(record.value),
    metadata: toJsonObject({ offset: record.offset, key: record.key, headers: record.headers })
  }, index);
}

interface SemanticMergeEventContext {
  changedFiles: string[];
  changedPaths: string[];
  decision: string | undefined;
  mergeEntryId: string;
  mergeRecordId: string;
  options: Pick<FrontierInspectArtifactInput, 'feature' | 'package'>;
  proofLinks: FrontierInspectProofLink[];
  regions: FrontierInspectSemanticRegion[];
  resourceId: string;
  sourcePackage: string;
  status: string;
  tags: string[];
}

function normalizeSemanticMergeRegions(
  regions: readonly FrontierInspectSemanticRegionLike[],
  evidence: Pick<FrontierInspectSemanticMergeEvidenceLike, 'feature' | 'package'>,
  options: Pick<FrontierInspectArtifactInput, 'feature' | 'package'>
): FrontierInspectSemanticRegion[] {
  const out: FrontierInspectSemanticRegion[] = [];
  for (let i = 0; i < regions.length; i++) {
    const region = regions[i];
    const path = region.path === undefined ? undefined : normalizeFrontierRegistryPath(region.path);
    const normalized: FrontierInspectSemanticRegion = {
      id: normalizeNonEmpty(String(region.id ?? semanticRegionFallbackId(region, i)), 'semantic region id'),
      kind: String(region.kind ?? 'semantic-region'),
      label: region.label === undefined ? undefined : String(region.label),
      file: region.file === undefined ? undefined : String(region.file),
      path,
      symbol: region.symbol === undefined ? undefined : String(region.symbol),
      startLine: normalizeOptionalNumber(region.startLine),
      startColumn: normalizeOptionalNumber(region.startColumn),
      endLine: normalizeOptionalNumber(region.endLine),
      endColumn: normalizeOptionalNumber(region.endColumn),
      feature: region.feature === undefined ? evidence.feature ?? options.feature : String(region.feature),
      package: region.package === undefined ? evidence.package ?? options.package : String(region.package),
      owner: region.owner === undefined ? undefined : String(region.owner),
      reads: uniqueStrings((region.reads ?? []).map((read) => normalizeFrontierRegistryPath(read))),
      writes: uniqueStrings((region.writes ?? []).map((write) => normalizeFrontierRegistryPath(write))),
      tags: uniqueStrings(region.tags ?? []),
      metadata: toJsonObject(region.metadata)
    };
    out[out.length] = normalized;
  }
  return out;
}

function semanticRegionFallbackId(region: FrontierInspectSemanticRegionLike, index: number): string {
  const parts = [
    region.file,
    region.symbol,
    region.path === undefined ? undefined : normalizeFrontierRegistryPath(region.path),
    region.label
  ].filter(isString);
  return parts.length === 0 ? 'semantic-region:' + index : 'semantic-region:' + parts.join('#');
}

function normalizeSemanticMergeProofLinks(links: readonly FrontierInspectProofLinkLike[]): FrontierInspectProofLink[] {
  const out: FrontierInspectProofLink[] = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = firstString(link.href, link.uri, link.url);
    const path = link.path === undefined ? undefined : String(link.path);
    out[out.length] = {
      id: normalizeNonEmpty(String(link.id ?? link.hash ?? href ?? path ?? 'proof:' + i), 'semantic merge proof link id'),
      kind: link.kind === undefined ? undefined : String(link.kind),
      label: link.label === undefined ? undefined : String(link.label),
      href,
      path,
      hash: link.hash === undefined ? undefined : String(link.hash),
      status: link.status === undefined ? undefined : String(link.status),
      metadata: toJsonObject(link.metadata)
    };
  }
  return out;
}

function semanticMergeChangedPaths(
  evidence: Pick<FrontierInspectSemanticMergeEvidenceLike, 'changedPaths' | 'paths'>,
  regions: readonly FrontierInspectSemanticRegion[]
): string[] {
  const paths: string[] = [];
  for (const path of evidence.changedPaths ?? []) addUnique(paths, normalizeFrontierRegistryPath(path));
  for (const path of evidence.paths ?? []) addUnique(paths, normalizeFrontierRegistryPath(path));
  for (const region of regions) {
    if (region.path !== undefined) addUnique(paths, region.path);
    for (const write of region.writes) addUnique(paths, write);
  }
  return paths.sort();
}

function semanticMergeFiles(
  evidence: Pick<FrontierInspectSemanticMergeEvidenceLike, 'changedFiles' | 'files'>,
  regions: readonly FrontierInspectSemanticRegion[]
): string[] {
  const files: string[] = [];
  for (const file of evidence.changedFiles ?? []) addUnique(files, String(file));
  for (const file of evidence.files ?? []) addUnique(files, String(file));
  for (const region of regions) if (region.file !== undefined) addUnique(files, region.file);
  return files.sort();
}

function semanticMergeRegionEntry(
  region: FrontierInspectSemanticRegion,
  mergeEntryId: string,
  evidence: Pick<FrontierInspectSemanticMergeEvidenceLike, 'feature' | 'package' | 'tags'>,
  options: Pick<FrontierInspectArtifactInput, 'feature' | 'package' | 'tags'>,
  sourcePackage: string
): FrontierRegistryEntry {
  const writes = semanticRegionWrites(region);
  return {
    id: region.id,
    kind: region.kind,
    description: region.label,
    package: region.package ?? evidence.package ?? options.package ?? sourcePackage,
    feature: region.feature ?? evidence.feature ?? options.feature,
    owner: region.owner,
    source: semanticMergeRegionSource(region),
    reads: region.reads.length === 0 ? undefined : region.reads,
    writes: writes.length === 0 ? undefined : writes,
    dependsOn: [mergeEntryId],
    touches: uniqueStrings(['semantic-region:' + region.id].concat(region.symbol === undefined ? [] : ['symbol:' + region.symbol])),
    tags: uniqueStrings((options.tags ?? []).concat(evidence.tags ?? [], region.tags, ['semantic-region'])),
    metadata: mergeMetadata(toJsonObject({
      endColumn: region.endColumn,
      endLine: region.endLine,
      path: region.path,
      startColumn: region.startColumn,
      startLine: region.startLine,
      symbol: region.symbol
    }), region.metadata)
  };
}

function semanticMergeRegionSource(region: FrontierInspectSemanticRegion): FrontierRegistryEntry['source'] | undefined {
  if (region.file === undefined) return undefined;
  return normalizeSourceLike({
    file: region.file,
    line: region.startLine,
    column: region.startColumn,
    symbol: region.symbol,
    package: region.package
  });
}

function semanticRegionWrites(region: FrontierInspectSemanticRegion): string[] {
  const writes = region.writes.slice();
  if (region.path !== undefined) addUnique(writes, region.path);
  return writes.sort();
}

function semanticMergeProofResource(link: FrontierInspectProofLink): string {
  return link.href ?? link.path ?? link.hash ?? link.id;
}

function semanticMergeEvents(
  evidence: FrontierInspectSemanticMergeEvidenceLike,
  context: SemanticMergeEventContext
): FrontierInspectEventInput[] {
  const events: FrontierInspectEventInput[] = [{
    id: context.resourceId + ':decision',
    type: 'semantic-merge',
    label: evidence.summary,
    source: evidence.source ?? 'semantic-merge',
    sourcePackage: context.sourcePackage,
    entryId: context.mergeEntryId,
    recordId: context.mergeRecordId,
    feature: context.options.feature ?? evidence.feature,
    package: context.options.package ?? evidence.package ?? context.sourcePackage,
    tags: context.tags,
    path: context.changedPaths[0],
    resource: context.resourceId,
    status: context.status,
    value: toJsonValue({
      changedFiles: context.changedFiles,
      changedPaths: context.changedPaths,
      decision: context.decision,
      proofLinks: context.proofLinks,
      semanticRegions: context.regions,
      status: context.status
    }),
    metadata: toJsonObject({
      bundleId: evidence.bundleId,
      kind: evidence.kind ?? FRONTIER_INSPECT_SEMANTIC_MERGE_EVIDENCE_KIND,
      mergeId: evidence.mergeId,
      version: evidence.version ?? FRONTIER_INSPECT_SEMANTIC_MERGE_EVIDENCE_VERSION
    })
  }];

  for (let i = 0; i < context.regions.length; i++) {
    const region = context.regions[i];
    const writes = semanticRegionWrites(region);
    events[events.length] = {
      id: 'semantic-region:' + region.id,
      type: 'semantic-region',
      label: region.label,
      source: evidence.source ?? 'semantic-merge',
      sourcePackage: context.sourcePackage,
      entryId: region.id,
      recordId: 'semantic-region-record:' + region.id,
      feature: region.feature ?? context.options.feature ?? evidence.feature,
      package: region.package ?? context.options.package ?? evidence.package ?? context.sourcePackage,
      tags: uniqueStrings(context.tags.concat(region.tags)),
      file: region.file,
      path: region.path ?? writes[0] ?? region.reads[0],
      resource: 'semantic-region:' + region.id,
      status: context.status,
      value: toJsonValue(region)
    };
  }

  for (let i = 0; i < context.proofLinks.length; i++) {
    const proof = context.proofLinks[i];
    events[events.length] = {
      id: context.resourceId + ':proof:' + proof.id,
      type: 'semantic-merge.proof',
      label: proof.label,
      source: evidence.source ?? 'semantic-merge',
      sourcePackage: context.sourcePackage,
      entryId: context.mergeEntryId,
      recordId: context.mergeRecordId,
      feature: context.options.feature ?? evidence.feature,
      package: context.options.package ?? evidence.package ?? context.sourcePackage,
      tags: context.tags,
      resource: semanticMergeProofResource(proof),
      status: proof.status ?? context.status,
      value: toJsonValue(proof)
    };
  }
  return events;
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
    artifactOrder: new Map(),
    eventOrder: new Map(),
    artifactIdsByKind: new Map(),
    artifactIdsBySourcePackage: new Map(),
    artifactIdsByPackage: new Map(),
    artifactIdsByFeature: new Map(),
    artifactIdsByTag: new Map(),
    artifactIdsByFile: new Map(),
    artifactIdsByPath: new Map(),
    artifactIdsByResource: new Map(),
    artifactIdsByEntryId: new Map(),
    eventIdsByEntryId: new Map(),
    artifactIdsByRecordId: new Map(),
    eventIdsByRecordId: new Map(),
    eventIdsBySourcePackage: new Map(),
    eventIdsByPackage: new Map(),
    eventIdsByFeature: new Map(),
    eventIdsByTag: new Map(),
    eventIdsByFile: new Map(),
    eventIdsByPath: new Map(),
    eventIdsByResource: new Map(),
    eventIdsByStatus: new Map(),
    eventIdsBySeverity: new Map()
  };
  for (let i = 0; i < bundle.artifacts.length; i++) {
    const artifact = bundle.artifacts[i];
    index.artifactsById.set(artifact.id, artifact);
    index.artifactOrder.set(artifact.id, i);
    addMapSet(index.artifactIdsByKind, artifact.kind, artifact.id);
    if (artifact.sourcePackage !== undefined) addMapSet(index.artifactIdsBySourcePackage, artifact.sourcePackage, artifact.id);
    if (artifact.package !== undefined) addMapSet(index.artifactIdsByPackage, artifact.package, artifact.id);
    if (artifact.feature !== undefined) addMapSet(index.artifactIdsByFeature, artifact.feature, artifact.id);
    for (const tag of artifact.tags) addMapSet(index.artifactIdsByTag, tag, artifact.id);
    for (const file of artifact.files) addMapSet(index.artifactIdsByFile, file, artifact.id);
    for (const path of artifact.paths) addMapSet(index.artifactIdsByPath, path, artifact.id);
    for (const resource of artifact.resources) addMapSet(index.artifactIdsByResource, resource, artifact.id);
    for (const entryId of artifact.entryIds) addMapSet(index.artifactIdsByEntryId, entryId, artifact.id);
    for (const recordId of artifact.recordIds) addMapSet(index.artifactIdsByRecordId, recordId, artifact.id);
  }
  for (let i = 0; i < bundle.events.length; i++) {
    const event = bundle.events[i];
    index.eventsById.set(event.id, event);
    index.eventOrder.set(event.id, i);
    if (event.sourcePackage !== undefined) addMapSet(index.eventIdsBySourcePackage, event.sourcePackage, event.id);
    if (event.package !== undefined) addMapSet(index.eventIdsByPackage, event.package, event.id);
    if (event.feature !== undefined) addMapSet(index.eventIdsByFeature, event.feature, event.id);
    for (const tag of event.tags) addMapSet(index.eventIdsByTag, tag, event.id);
    if (event.file !== undefined) addMapSet(index.eventIdsByFile, event.file, event.id);
    if (event.path !== undefined) addMapSet(index.eventIdsByPath, event.path, event.id);
    if (event.resource !== undefined) addMapSet(index.eventIdsByResource, event.resource, event.id);
    if (event.status !== undefined) addMapSet(index.eventIdsByStatus, event.status, event.id);
    if (event.severity !== undefined) addMapSet(index.eventIdsBySeverity, event.severity, event.id);
    if (event.entryId !== undefined) addMapSet(index.eventIdsByEntryId, event.entryId, event.id);
    if (event.recordId !== undefined) addMapSet(index.eventIdsByRecordId, event.recordId, event.id);
  }
  bundleIndexes.set(bundle, index);
  return index;
}

function candidateArtifacts(
  bundle: FrontierInspectBundle,
  index: FrontierInspectBundleIndex,
  input: FrontierInspectQueryInput
): FrontierInspectArtifact[] {
  let ids: Set<string> | undefined;
  ids = intersectCandidate(ids, idsFromExact(index.artifactsById, unionArray(input.artifactIds, input.ids)));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByKind, input.artifactKinds));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsBySourcePackage, input.sourcePackages));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByPackage, input.packages));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByFeature, input.features));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByTag, input.tags));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByFile, input.files));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByPath, input.paths?.map((path) => normalizeFrontierRegistryPath(path))));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByResource, input.resources));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByEntryId, input.entryIds));
  ids = intersectCandidate(ids, idsFromMap(index.artifactIdsByRecordId, input.recordIds));
  if (ids === undefined) return bundle.artifacts;
  return materializeCandidates(ids, index.artifactsById, index.artifactOrder);
}

function candidateEvents(
  bundle: FrontierInspectBundle,
  index: FrontierInspectBundleIndex,
  input: FrontierInspectQueryInput
): FrontierInspectEvent[] {
  let ids: Set<string> | undefined;
  ids = intersectCandidate(ids, idsFromExact(index.eventsById, unionArray(input.eventIds, input.ids)));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsBySourcePackage, input.sourcePackages));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByPackage, input.packages));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByFeature, input.features));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByTag, input.tags));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByFile, input.files));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByPath, input.paths?.map((path) => normalizeFrontierRegistryPath(path))));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByResource, input.resources));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByEntryId, input.entryIds));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByRecordId, input.recordIds));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsByStatus, input.statuses));
  ids = intersectCandidate(ids, idsFromMap(index.eventIdsBySeverity, input.severities));
  if (ids === undefined) return bundle.events;
  return materializeCandidates(ids, index.eventsById, index.eventOrder);
}

function idsFromExact<T>(map: Map<string, T>, values: readonly string[] | undefined): Set<string> | undefined {
  if (values === undefined) return undefined;
  const out = new Set<string>();
  for (const value of values) if (map.has(String(value))) out.add(String(value));
  return out;
}

function idsFromMap(map: Map<string, Set<string>>, values: readonly string[] | undefined): Set<string> | undefined {
  if (values === undefined) return undefined;
  const out = new Set<string>();
  for (const value of values) {
    const bucket = map.get(String(value));
    if (bucket !== undefined) for (const id of bucket) out.add(id);
  }
  return out;
}

function intersectCandidate(left: Set<string> | undefined, right: Set<string> | undefined): Set<string> | undefined {
  if (right === undefined) return left;
  if (left === undefined) return right;
  const out = new Set<string>();
  for (const value of left) if (right.has(value)) out.add(value);
  return out;
}

function materializeCandidates<T>(ids: Set<string>, map: Map<string, T>, order: Map<string, number>): T[] {
  const rows: Array<{ id: string; value: T }> = [];
  for (const id of ids) {
    const value = map.get(id);
    if (value !== undefined) rows[rows.length] = { id, value };
  }
  rows.sort((left, right) => (order.get(left.id) ?? 0) - (order.get(right.id) ?? 0));
  return rows.map((row) => row.value);
}

interface AutonomousMergeHealthObservation extends SwarmLifetimeObservation {
  lane?: string;
  jobId?: string;
  taskId?: string;
  decisionId?: string;
  queueItemIds: string[];
  coordinatorId?: string;
  order: number;
  timestamp?: number;
}

interface AutonomousMergeHealthComponent {
  subjectId: string;
  aliases: string[];
  observations: AutonomousMergeHealthObservation[];
  latest: AutonomousMergeHealthObservation;
}

function collectAutonomousMergeHealthObservations(bundle: FrontierInspectBundle): AutonomousMergeHealthObservation[] {
  const observations: AutonomousMergeHealthObservation[] = [];
  let order = 0;
  for (const artifact of bundle.artifacts) observations[observations.length] = autonomousMergeHealthObservationFromArtifact(artifact, order++);
  for (const event of bundle.events) observations[observations.length] = autonomousMergeHealthObservationFromEvent(event, order++);
  for (const entry of bundle.graph.entries) observations[observations.length] = autonomousMergeHealthObservationFromEntry(entry, order++);
  for (const record of bundle.graph.records) observations[observations.length] = autonomousMergeHealthObservationFromRecord(record, order++);
  return observations.filter((observation) => observation !== undefined);
}

function collapseAutonomousMergeHealthObservations(
  observations: readonly AutonomousMergeHealthObservation[]
): AutonomousMergeHealthComponent[] {
  const components: AutonomousMergeHealthComponent[] = [];
  const componentByAlias = new Map<string, AutonomousMergeHealthComponent>();

  for (const observation of observations) {
    const aliases = autonomousMergeHealthObservationAliases(observation);
    let component: AutonomousMergeHealthComponent | undefined;
    for (const alias of aliases) {
      const existing = componentByAlias.get(alias);
      if (existing !== undefined) {
        component = existing;
        break;
      }
    }
    if (component === undefined) {
      component = {
        subjectId: aliases[0] ?? observation.id,
        aliases: [],
        observations: [],
        latest: observation
      };
      components[components.length] = component;
    }
    component.observations[component.observations.length] = observation;
    if (compareAutonomousMergeHealthObservationOrder(observation, component.latest) > 0) component.latest = observation;
    for (const alias of aliases) {
      componentByAlias.set(alias, component);
      addUnique(component.aliases, alias);
    }
  }

  return components.sort((left, right) => compareAutonomousMergeHealthObservationOrder(left.latest, right.latest));
}

function autonomousMergeHealthObservationAliases(observation: AutonomousMergeHealthObservation): string[] {
  return uniqueStrings([
    ...observation.queueItemIds,
    observation.taskId,
    observation.jobId,
    observation.decisionId,
    observation.id
  ].filter(isString));
}

function compareAutonomousMergeHealthObservationOrder(
  left: AutonomousMergeHealthObservation,
  right: AutonomousMergeHealthObservation
): number {
  if (left.timestamp !== undefined && right.timestamp !== undefined && left.timestamp !== right.timestamp) {
    return left.timestamp - right.timestamp;
  }
  return left.order - right.order;
}

function createAutonomousMergeHealthObservation(input: {
  id: string;
  kind?: string;
  textParts: readonly (string | undefined)[];
  payloads: readonly unknown[];
  sources: readonly string[];
  status?: string;
  lane?: string;
  jobId?: string;
  taskId?: string;
  decisionId?: string;
  queueItemIds?: readonly string[];
  coordinatorId?: string;
  timestamp?: number;
  order: number;
}): AutonomousMergeHealthObservation {
  return {
    id: input.id,
    text: input.textParts.filter(Boolean).join(' '),
    kind: input.kind,
    sources: [...input.sources].sort(),
    payloads: [...input.payloads],
    status: input.status,
    lane: input.lane,
    jobId: input.jobId,
    taskId: input.taskId,
    decisionId: input.decisionId,
    queueItemIds: uniqueStrings(input.queueItemIds ?? []),
    coordinatorId: input.coordinatorId,
    order: input.order,
    ...(input.timestamp !== undefined ? { timestamp: input.timestamp } : {})
  };
}

function autonomousMergeHealthObservationFromArtifact(artifact: FrontierInspectArtifact, order: number): AutonomousMergeHealthObservation {
  const payloads: unknown[] = [];
  if (artifact.data !== undefined) payloads[payloads.length] = artifact.data;
  if (artifact.metadata !== undefined) payloads[payloads.length] = artifact.metadata;
  return createAutonomousMergeHealthObservation({
    id: artifact.id,
    kind: artifact.kind,
    textParts: [
      artifact.id,
      artifact.kind,
      artifact.summary,
      artifact.sourcePackage,
      artifact.package,
      artifact.feature,
      artifact.tags.join(' '),
      artifact.files.join(' '),
      artifact.resources.join(' '),
      artifact.entryIds.join(' '),
      artifact.recordIds.join(' '),
      firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
      firstAutonomousMergeHealthStringField(payloads, ['status', 'state', 'phase', 'resultStatus', 'outcome']),
      firstAutonomousMergeHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(artifact.sourcePackage, artifact.package, artifact.files, artifact.resources),
    status: extractSwarmLifetimeStatus(payloads),
    lane: firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
    jobId: firstAutonomousMergeHealthStringField(payloads, ['jobId']),
    taskId: firstAutonomousMergeHealthStringField(payloads, ['taskId']),
    decisionId: firstAutonomousMergeHealthStringField(payloads, ['decisionId']),
    queueItemIds: extractAutonomousMergeHealthQueueItemIds(payloads),
    coordinatorId: extractAutonomousMergeHealthCoordinatorId(payloads),
    timestamp: artifact.timestamp,
    order
  });
}

function autonomousMergeHealthObservationFromEvent(event: FrontierInspectEvent, order: number): AutonomousMergeHealthObservation {
  const payloads: unknown[] = [];
  if (event.value !== undefined) payloads[payloads.length] = event.value;
  if (event.metadata !== undefined) payloads[payloads.length] = event.metadata;
  return createAutonomousMergeHealthObservation({
    id: event.id,
    kind: event.type,
    textParts: [
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
      event.severity,
      firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
      firstAutonomousMergeHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(event.sourcePackage, event.package, [event.file], [event.resource, event.path, event.routeId, event.selector]),
    status: event.status ?? extractSwarmLifetimeStatus(payloads),
    lane: firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
    jobId: firstAutonomousMergeHealthStringField(payloads, ['jobId']),
    taskId: firstAutonomousMergeHealthStringField(payloads, ['taskId']),
    decisionId: firstAutonomousMergeHealthStringField(payloads, ['decisionId']),
    queueItemIds: extractAutonomousMergeHealthQueueItemIds(payloads),
    coordinatorId: extractAutonomousMergeHealthCoordinatorId(payloads),
    timestamp: event.timestamp,
    order
  });
}

function autonomousMergeHealthObservationFromEntry(entry: FrontierRegistryEntry, order: number): AutonomousMergeHealthObservation {
  const payloads = [entry.metadata];
  return createAutonomousMergeHealthObservation({
    id: entry.id,
    kind: entry.kind,
    textParts: [
      entry.id,
      entry.kind,
      entry.description,
      entry.package,
      entry.feature,
      (entry.tags ?? []).join(' '),
      normalizeSourceFiles(entry).join(' '),
      (entry.touches ?? []).join(' '),
      (entry.reads ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (entry.writes ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (entry.dependsOn ?? []).join(' '),
      firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
      firstAutonomousMergeHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(entry.package, undefined, normalizeSourceFiles(entry), entry.touches),
    status: extractSwarmLifetimeStatus(payloads),
    lane: firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
    jobId: firstAutonomousMergeHealthStringField(payloads, ['jobId']),
    taskId: firstAutonomousMergeHealthStringField(payloads, ['taskId']),
    decisionId: firstAutonomousMergeHealthStringField(payloads, ['decisionId']),
    queueItemIds: extractAutonomousMergeHealthQueueItemIds(payloads),
    coordinatorId: extractAutonomousMergeHealthCoordinatorId(payloads),
    order
  });
}

function autonomousMergeHealthObservationFromRecord(record: FrontierRegistryRecord, order: number): AutonomousMergeHealthObservation {
  const payloads = [record.metadata];
  return createAutonomousMergeHealthObservation({
    id: record.id,
    kind: record.kind,
    textParts: [
      record.id,
      record.kind,
      record.status,
      record.error,
      record.entryId,
      record.durationMs === undefined ? undefined : String(record.durationMs),
      (record.reads ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (record.writes ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
      firstAutonomousMergeHealthStringField(payloads, ['jobId', 'taskId', 'decisionId'])
    ],
    payloads,
    sources: collectSwarmLifetimeSources(undefined, undefined, [], []),
    status: record.status ?? extractSwarmLifetimeStatus(payloads),
    lane: firstAutonomousMergeHealthStringField(payloads, ['lane', 'queueLane', 'scope', 'queue']),
    jobId: firstAutonomousMergeHealthStringField(payloads, ['jobId']),
    taskId: firstAutonomousMergeHealthStringField(payloads, ['taskId']),
    decisionId: firstAutonomousMergeHealthStringField(payloads, ['decisionId']),
    queueItemIds: extractAutonomousMergeHealthQueueItemIds(payloads),
    coordinatorId: extractAutonomousMergeHealthCoordinatorId(payloads),
    order
  });
}

function firstAutonomousMergeHealthStringField(payloads: readonly unknown[], keys: readonly string[]): string | undefined {
  for (const payload of payloads) {
    const value = extractSwarmLifetimeStringField(payload, keys);
    if (value !== undefined) return value;
  }
  return undefined;
}

function extractAutonomousMergeHealthQueueItemIds(payloads: readonly unknown[]): string[] {
  const ids: string[] = [];
  for (const payload of payloads) {
    for (const id of extractSwarmLifetimeStringArrayField(payload, ['queueItemIds', 'queueItemId', 'queueIds', 'queueItems'])) addUnique(ids, id);
  }
  return ids;
}

function extractAutonomousMergeHealthCoordinatorId(payloads: readonly unknown[]): string | undefined {
  return firstAutonomousMergeHealthStringField(payloads, ['coordinatorId', 'coordinator', 'ownerId', 'owner', 'agentId', 'workerId', 'leaseId']);
}

function extractAutonomousMergeHealthLane(observation: AutonomousMergeHealthObservation): string | undefined {
  if (observation.lane !== undefined) return observation.lane;
  return firstAutonomousMergeHealthStringField(observation.payloads, ['lane', 'queueLane', 'scope', 'queue']);
}

function collectAutonomousMergeHealthBucket(
  observations: readonly AutonomousMergeHealthObservation[],
  options: {
    id?: (observation: AutonomousMergeHealthObservation) => string | undefined;
  } = {}
): FrontierInspectAutonomousMergeHealthBucketSummary {
  const ids: string[] = [];
  const sources: string[] = [];
  for (const observation of observations) {
    const id = options.id?.(observation) ?? observation.id;
    if (id !== undefined && id !== '') addUnique(ids, id);
    for (const source of observation.sources) addUnique(sources, source);
  }
  return {
    count: ids.length,
    ids: ids.sort(),
    sources: sources.sort()
  };
}

function collectAutonomousMergeHealthTerminalDecisions(
  observations: readonly AutonomousMergeHealthObservation[]
): FrontierInspectAutonomousMergeHealthTerminalDecisionSummary {
  const bucket = collectAutonomousMergeHealthBucket(observations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  const statuses = uniqueStrings(observations.map((observation) => observation.status ?? 'unknown'));
  return {
    ...bucket,
    statuses
  };
}

function collectAutonomousMergeHealthReviewDebt(
  observations: readonly AutonomousMergeHealthObservation[],
  generatedAt: number
): FrontierInspectAutonomousMergeHealthReviewDebtSummary {
  const bucket = collectAutonomousMergeHealthBucket(observations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  const items = collectAutonomousMergeHealthReviewDebtItems(observations, generatedAt);
  return {
    ...bucket,
    coordinatorReviewCount: bucket.count,
    items
  };
}

function collectAutonomousMergeHealthReviewDebtItems(
  observations: readonly AutonomousMergeHealthObservation[],
  generatedAt: number
): FrontierInspectAutonomousMergeHealthReviewDebtItem[] {
  return observations.map((observation) => ({
    id: extractAutonomousMergeHealthDecisionId(observation) ?? observation.id,
    reason: extractAutonomousMergeHealthReviewDebtReason(observation) ?? observation.status ?? observation.kind,
    owner: extractAutonomousMergeHealthReviewDebtOwner(observation),
    ageMs: extractAutonomousMergeHealthReviewDebtAgeMs(observation, generatedAt),
    terminalPath: extractAutonomousMergeHealthReviewDebtTerminalPath(observation),
    sources: [...observation.sources].sort()
  })).sort(compareAutonomousMergeHealthReviewDebtItems);
}

function compareAutonomousMergeHealthReviewDebtItems(
  left: FrontierInspectAutonomousMergeHealthReviewDebtItem,
  right: FrontierInspectAutonomousMergeHealthReviewDebtItem
): number {
  const leftAge = left.ageMs ?? -1;
  const rightAge = right.ageMs ?? -1;
  if (leftAge !== rightAge) return rightAge - leftAge;
  const reasonCompare = compareAutonomousMergeHealthReviewDebtStrings(left.reason, right.reason);
  if (reasonCompare !== 0) return reasonCompare;
  const ownerCompare = compareAutonomousMergeHealthReviewDebtStrings(left.owner, right.owner);
  if (ownerCompare !== 0) return ownerCompare;
  const terminalPathCompare = compareAutonomousMergeHealthReviewDebtStrings(left.terminalPath, right.terminalPath);
  if (terminalPathCompare !== 0) return terminalPathCompare;
  return left.id.localeCompare(right.id);
}

function compareAutonomousMergeHealthReviewDebtStrings(left: string | undefined, right: string | undefined): number {
  if (left === undefined && right === undefined) return 0;
  if (left === undefined) return 1;
  if (right === undefined) return -1;
  return left.localeCompare(right);
}

function extractAutonomousMergeHealthReviewDebtReason(observation: AutonomousMergeHealthObservation): string | undefined {
  return firstAutonomousMergeHealthStringField(observation.payloads, ['reason', 'summary', 'message', 'question', 'description', 'title']);
}

function extractAutonomousMergeHealthReviewDebtOwner(observation: AutonomousMergeHealthObservation): string | undefined {
  return firstAutonomousMergeHealthStringField(observation.payloads, ['owner', 'ownerId', 'coordinator', 'coordinatorId', 'reviewer', 'reviewerId', 'agentId', 'workerId', 'assignee', 'assigneeId', 'leaseId']);
}

function extractAutonomousMergeHealthReviewDebtAgeMs(
  observation: AutonomousMergeHealthObservation,
  generatedAt: number
): number | undefined {
  if (observation.timestamp !== undefined) return Math.max(0, generatedAt - observation.timestamp);
  const explicitAge = firstSwarmLifetimeNumberField(observation.payloads, ['ageMs', 'age', 'elapsedMs', 'durationMs']);
  if (explicitAge !== undefined) return Math.max(0, Math.floor(explicitAge));
  const createdAt = firstSwarmLifetimeNumberField(observation.payloads, ['createdAt', 'openedAt', 'timestamp', 'startedAt', 'generatedAt']);
  if (createdAt !== undefined) return Math.max(0, generatedAt - createdAt);
  return undefined;
}

function extractAutonomousMergeHealthReviewDebtTerminalPath(observation: AutonomousMergeHealthObservation): string | undefined {
  const payloadPath = firstAutonomousMergeHealthStringField(observation.payloads, ['terminalPath', 'patchPath', 'bundlePath', 'changedPath', 'path', 'file', 'resource', 'surface', 'routeId', 'selector']);
  if (payloadPath !== undefined) return payloadPath;
  for (const source of observation.sources) {
    if (source.startsWith('file:')) return source.slice('file:'.length);
    if (source.startsWith('resource:')) return source.slice('resource:'.length);
    if (source.startsWith('path:')) return source.slice('path:'.length);
  }
  if (observation.lane !== undefined) return observation.lane;
  return undefined;
}

function collectAutonomousMergeHealthHumanQuestions(
  observations: readonly AutonomousMergeHealthObservation[]
): FrontierInspectAutonomousMergeHealthHumanQuestionSummary {
  const questions: FrontierInspectAutonomousMergeHealthHumanQuestion[] = [];
  for (const observation of observations) {
    const question = extractAutonomousMergeHealthHumanQuestionContract(observation);
    if (question === undefined) continue;
    questions[questions.length] = {
      ...question,
      id: extractAutonomousMergeHealthQuestionId(observation) ?? question.id,
      status: observation.status,
      sources: observation.sources.slice().sort()
    };
  }
  const bucket = collectAutonomousMergeHealthBucket(observations, {
    id: (observation) => extractAutonomousMergeHealthQuestionId(observation) ?? observation.id
  });
  const reasons = uniqueStrings(questions.map((question) => question.reason));
  return {
    ...bucket,
    reasons,
    questions: questions.sort((left, right) => left.code.localeCompare(right.code))
  };
}

function collectAutonomousMergeHealthCleanup(
  observations: readonly AutonomousMergeHealthObservation[]
): FrontierInspectAutonomousMergeHealthCleanupSummary {
  const bucket = collectAutonomousMergeHealthBucket(observations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  let staleCount = 0;
  let rerunCount = 0;
  for (const observation of observations) {
    if (looksLikeAutonomousMergeHealthStale(observation)) staleCount++;
    if (looksLikeAutonomousMergeHealthRerun(observation)) rerunCount++;
  }
  return {
    ...bucket,
    staleCount,
    rerunCount
  };
}

function collectAutonomousMergeHealthAppliedThroughput(
  observations: readonly AutonomousMergeHealthObservation[]
): FrontierInspectAutonomousMergeHealthAppliedThroughputSummary {
  const bucket = collectAutonomousMergeHealthBucket(observations, {
    id: (observation) => extractAutonomousMergeHealthDecisionId(observation) ?? observation.id
  });
  let appliedCount = 0;
  let committedCount = 0;
  for (const observation of observations) {
    if (observation.status !== undefined && /^applied$/i.test(observation.status)) appliedCount++;
    if (observation.status !== undefined && /^committed$/i.test(observation.status)) committedCount++;
  }
  return {
    ...bucket,
    appliedCount,
    committedCount
  };
}

function extractAutonomousMergeHealthDecisionId(observation: AutonomousMergeHealthObservation): string | undefined {
  if (observation.decisionId !== undefined) return observation.decisionId;
  const queueItemIds = observation.queueItemIds;
  if (queueItemIds.length > 0) return queueItemIds[0];
  for (const payload of observation.payloads) {
    const value = extractSwarmLifetimeStringField(payload, ['decisionId', 'decision', 'taskId', 'jobId', 'id']);
    if (value !== undefined) return value;
  }
  return observation.decisionId ?? observation.taskId ?? observation.jobId;
}

function extractAutonomousMergeHealthHumanQuestionContract(observation: SwarmLifetimeObservation): FrontierInspectAutonomousMergeHealthHumanQuestion | undefined {
  for (const payload of observation.payloads) {
    for (const key of ['reason', 'question', 'summary', 'message']) {
      const raw = extractSwarmLifetimeStringField(payload, [key]);
      const contract = parseAutonomousMergeHealthHumanQuestionContractLine(raw);
      if (contract !== undefined) return contract;
    }
  }

  const textIndex = observation.text.indexOf('human-question:');
  if (textIndex !== -1) {
    const contract = parseAutonomousMergeHealthHumanQuestionContractLine(observation.text.slice(textIndex));
    if (contract !== undefined) return contract;
  }

  return undefined;
}

function extractAutonomousMergeHealthQuestionId(observation: SwarmLifetimeObservation): string | undefined {
  for (const payload of observation.payloads) {
    const value = extractSwarmLifetimeStringField(payload, ['questionId', 'questionCode', 'decisionId', 'jobId', 'taskId', 'queueItemId', 'id']);
    if (value !== undefined) return value;
  }
  return undefined;
}

function parseAutonomousMergeHealthHumanQuestionContractLine(
  raw: string | undefined
): FrontierInspectAutonomousMergeHealthHumanQuestion | undefined {
  if (raw === undefined) return undefined;
  const text = raw.trim();
  if (!text.startsWith('human-question:')) return undefined;
  const match = text.match(
    /^human-question:\s*owner=([^;]+);\s*surface=([^;]+);\s*missing-authority=([^;]+);\s*question=([^;]+);\s*answer-code=([^;]+)\s*$/
  );
  if (match === null) return undefined;
  return {
    id: 'human-question:' + fnv1a32(text),
    code: text,
    owner: match[1].trim(),
    surface: match[2].trim(),
    missingAuthority: match[3].trim(),
    question: match[4].trim(),
    answerCode: match[5].trim(),
    reason: text,
    sources: []
  };
}

function extractAutonomousMergeHealthHumanQuestionReasons(observation: AutonomousMergeHealthObservation): string[] {
  const contract = extractAutonomousMergeHealthHumanQuestionContract(observation);
  return contract === undefined ? [] : [contract.reason];
}

function looksLikeAutonomousMergeHealthActiveCoordinator(observation: AutonomousMergeHealthObservation): boolean {
  const coordinatorId = observation.coordinatorId ?? extractAutonomousMergeHealthCoordinatorId(observation.payloads);
  if (coordinatorId === undefined) return false;
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(active|running|leased|working|in-?progress|inflight)$/.test(status)) return true;
  if (/\b(active|running|leased|working|in[- ]progress|inflight)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'lifecycle'], /^(active|running|leased|working|in-?progress|inflight)$/i));
}

function looksLikeAutonomousMergeHealthTerminalDecision(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(applied|committed|rejected|skipped|recorded|accepted|resolved|completed|done|passed|checked)$/i.test(status)) return true;
  if (/\b(applied|committed|rejected|skipped|recorded|accepted|resolved|completed|done|passed|checked)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(applied|committed|rejected|skipped|recorded|accepted|resolved|completed|done|passed|checked)$/i));
}

function looksLikeAutonomousMergeHealthApplied(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(applied|committed)$/i.test(status)) return true;
  if (/\b(applied|committed)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(applied|committed)$/i));
}

function looksLikeAutonomousMergeHealthCoordinatorReview(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(review|needs-review|coordinator-review|merge-review|pending-review|needs-port|escalated)$/i.test(status)) return true;
  if (/\b(coordinator review|needs review|merge review|pending review|needs port|escalated)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(review|needs-review|coordinator-review|merge-review|pending-review|needs-port|escalated)$/i));
}

function looksLikeAutonomousMergeHealthRerun(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(rerun|stale-against-head|stale)$/i.test(status)) return true;
  if (/\b(rerun|stale-against-head|stale|rebase)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(rerun|stale-against-head|stale)$/i));
}

function looksLikeAutonomousMergeHealthStale(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(stale-against-head|stale)$/i.test(status)) return true;
  if (/\b(stale-against-head|stale|rebase)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(stale-against-head|stale)$/i)
    || hasSwarmLifetimeStringArrayField(payload, ['wasteFlags', 'wasteReasons', 'flags'], /(?:stale|rerun|rebase)/i)
  );
}

function looksLikeAutonomousMergeHealthCleanup(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(rerun|stale-against-head|stale|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)$/i.test(status)) return true;
  if (/\b(rerun|stale-against-head|stale|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap|rebase)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(rerun|stale-against-head|stale|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)$/i)
  );
}

function looksLikeAutonomousMergeHealthHumanQuestion(observation: AutonomousMergeHealthObservation): boolean {
  return extractAutonomousMergeHealthHumanQuestionContract(observation) !== undefined;
}

function looksLikeContinuousPoolActiveWork(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(active|running|leased|working|in-?progress|inflight)$/i.test(status)) return true;
  if (/\b(active|running|leased|working|in[- ]progress|inflight)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'lifecycle'], /^(active|running|leased|working|in-?progress|inflight)$/i));
}

function looksLikeContinuousPoolBacklog(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(queued|pending|backlog|waiting|ready|open|unstarted|runnable)$/i.test(status)) return true;
  if (/\b(queued|pending|backlog|waiting|ready|open|unstarted|runnable)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(queued|pending|backlog|waiting|ready|open|unstarted|runnable)$/i));
}

function looksLikeContinuousPoolConflictBlock(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(conflict|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)$/i.test(status)) return true;
  if (/\b(conflict|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(conflict|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)$/i));
}

function looksLikeContinuousPoolApplied(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(applied|committed)$/i.test(status)) return true;
  if (/\b(applied|committed)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(applied|committed)$/i));
}

function looksLikeContinuousPoolRerun(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^rerun$/i.test(status)) return true;
  if (/\brerun\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^rerun$/i));
}

function looksLikeContinuousPoolQuotaPressure(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(quota|quota-exhausted|quota-blocked|budget-exhausted|escalation-budget-exhausted|expensive-tier-saturated|at-capacity)$/i.test(status)) return true;
  if (/\b(quota|budget|capacity|limit|saturated)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['backpressureReason', 'reason', 'status', 'state', 'phase', 'kind', 'type'], /(?:quota|budget|capacity|limit|saturated|budget-exhausted|escalation-budget-exhausted|expensive-tier-saturated|at-capacity)/i)
  );
}

function looksLikeContinuousPoolCpuPressure(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(cpu|cpu-pressure|cpu-saturated|cpu-bound|overloaded)$/i.test(status)) return true;
  if (/\b(cpu|cpu[- ]?pressure|overloaded|throttled|saturated|high load|cpu load)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type', 'pressure'], /(?:cpu|overloaded|throttled|saturated|high load|load)/i)
    || firstSwarmLifetimeNumberField([payload], ['cpuPressure', 'cpuPressureScore', 'load', 'utilization']) !== undefined
  );
}

function looksLikeContinuousPoolDirtyCheckout(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(dirty-worktree|dirty-checkout|dirty checkout|collect-only)$/i.test(status)) return true;
  if (/\b(dirty[- ]?worktree|dirty[- ]?checkout|dirty paths?|collect[- ]only)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['skippedReason', 'reason', 'status', 'state', 'phase', 'kind', 'type'], /(?:dirty-worktree|dirty[- ]?checkout|dirty paths?|collect[- ]only)/i)
  );
}

function looksLikeContinuousPoolLockContention(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(lock-contention|lock-contended|contention|lock-blocked)$/i.test(status)) return true;
  if (/\b(lock[- ]?contention|contention|lock[- ]?blocked|lease contention|lock wait)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['reason', 'status', 'state', 'phase', 'kind', 'type'], /(?:lock[- ]?contention|contention|lock[- ]?blocked|lease contention|lock wait)/i)
  );
}

function looksLikeAppliedWorkCommitted(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(committed)$/i.test(status)) return true;
  if (/\b(committed)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(committed)$/i));
}

function looksLikeAppliedWorkApplied(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(applied)$/i.test(status)) return true;
  if (/\b(applied)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(applied)$/i));
}

function looksLikeAppliedWorkEvidenceOnly(observation: AutonomousMergeHealthObservation): boolean {
  const status = observation.status?.toLowerCase();
  if (status !== undefined && /^(evidence-only|discovery-only|record-only|skipped)$/i.test(status)) return true;
  if (/\b(evidence-only|discovery-only|record-only|skipped)\b/.test(observation.text.toLowerCase())) return true;
  return observation.payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type', 'disposition'], /^(evidence-only|discovery-only|record-only|skipped)$/i));
}

function extractContinuousPoolTargetConcurrency(observations: readonly AutonomousMergeHealthObservation[]): number {
  for (const observation of observations) {
    const targetConcurrency = firstSwarmLifetimeNumberField(observation.payloads, [
      'targetConcurrency',
      'desiredConcurrency',
      'concurrencyTarget',
      'targetCount',
      'targetWorkers',
      'targetAgents',
      'poolSize'
    ]);
    if (targetConcurrency !== undefined) return Math.max(0, Math.floor(targetConcurrency));
  }
  return 0;
}

function extractContinuousPoolAgentId(observation: AutonomousMergeHealthObservation): string | undefined {
  const direct = firstAutonomousMergeHealthStringField(observation.payloads, ['agentId', 'workerId', 'coordinatorId', 'leaseId', 'ownerId', 'owner', 'sessionId']);
  if (direct !== undefined) return direct;
  return extractAutonomousMergeHealthCoordinatorId(observation.payloads);
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

type SwarmLifetimeMeaning =
  | 'active'
  | 'review'
  | 'rerun'
  | 'conflict'
  | 'blocked'
  | 'committed-applied'
  | 'completed'
  | 'package-gate'
  | 'human-question'
  | 'suppressed-audit'
  | 'unknown';

interface SwarmLifetimeObservation {
  id: string;
  text: string;
  sources: string[];
  payloads: unknown[];
  kind?: string;
  status?: string;
}

interface SwarmLifetimeObservations {
  active: SwarmLifetimeObservation[];
  review: SwarmLifetimeObservation[];
  rerun: SwarmLifetimeObservation[];
  conflicts: SwarmLifetimeObservation[];
  blocked: SwarmLifetimeObservation[];
  committedApplied: SwarmLifetimeObservation[];
  completed: SwarmLifetimeObservation[];
  packageGateObservations: SwarmLifetimeObservation[];
  suppressedAuditArtifacts: SwarmLifetimeObservation[];
  humanQuestions: SwarmLifetimeObservation[];
  costCandidates: SwarmLifetimeObservation[];
}

function collectSwarmLifetimeObservations(bundle: FrontierInspectBundle): SwarmLifetimeObservations {
  const observations: SwarmLifetimeObservations = {
    active: [],
    review: [],
    rerun: [],
    conflicts: [],
    blocked: [],
    committedApplied: [],
    completed: [],
    packageGateObservations: [],
    suppressedAuditArtifacts: [],
    humanQuestions: [],
    costCandidates: []
  };
  for (const artifact of bundle.artifacts) addSwarmLifetimeObservation(observations, swarmObservationFromArtifact(artifact));
  for (const event of bundle.events) addSwarmLifetimeObservation(observations, swarmObservationFromEvent(event));
  for (const entry of bundle.graph.entries) addSwarmLifetimeObservation(observations, swarmObservationFromEntry(entry));
  for (const record of bundle.graph.records) addSwarmLifetimeObservation(observations, swarmObservationFromRecord(record));
  return observations;
}

function addSwarmLifetimeObservation(
  observations: SwarmLifetimeObservations,
  observation: SwarmLifetimeObservation | undefined
): void {
  if (observation === undefined) return;
  const meaning = classifySwarmLifetimeMeaning(observation);
  observations.costCandidates[observations.costCandidates.length] = observation;
  if (meaning === 'active') observations.active[observations.active.length] = observation;
  else if (meaning === 'review') observations.review[observations.review.length] = observation;
  else if (meaning === 'rerun') observations.rerun[observations.rerun.length] = observation;
  else if (meaning === 'conflict') observations.conflicts[observations.conflicts.length] = observation;
  else if (meaning === 'blocked') observations.blocked[observations.blocked.length] = observation;
  else if (meaning === 'committed-applied') observations.committedApplied[observations.committedApplied.length] = observation;
  else if (meaning === 'human-question') observations.humanQuestions[observations.humanQuestions.length] = observation;
  else if (meaning === 'completed') observations.completed[observations.completed.length] = observation;
  else if (meaning === 'package-gate') observations.packageGateObservations[observations.packageGateObservations.length] = observation;
  else if (meaning === 'suppressed-audit') observations.suppressedAuditArtifacts[observations.suppressedAuditArtifacts.length] = observation;
}

function collectSwarmLifetimeRunOutcomes(
  observations: SwarmLifetimeObservations
): FrontierInspectSwarmLifetimeRunOutcomeSummary {
  return {
    completed: collectSwarmLifetimeBucket(observations.completed),
    committedApplied: collectSwarmLifetimeBucket(observations.committedApplied),
    conflicts: collectSwarmLifetimeBucket(observations.conflicts),
    reruns: collectSwarmLifetimeBucket(observations.rerun)
  };
}

function classifySwarmLifetimeMeaning(observation: SwarmLifetimeObservation): SwarmLifetimeMeaning {
  const text = observation.text.toLowerCase();
  if (looksLikeTrueHumanQuestion(text, observation.status, observation.payloads)) return 'human-question';
  if (looksLikeSuppressedAuditArtifact(text, observation.kind, observation.status, observation.payloads)) return 'suppressed-audit';
  if (looksLikePackageGate(text, observation.kind, observation.status, observation.payloads)) return 'package-gate';
  if (looksLikeActiveWork(text, observation.status, observation.payloads)) return 'active';
  if (looksLikeCoordinatorReview(text, observation.status, observation.payloads)) return 'review';
  if (looksLikeRerunWork(text, observation.status, observation.payloads)) return 'rerun';
  if (looksLikeConflictWork(text, observation.status, observation.payloads)) return 'conflict';
  if (looksLikeCommittedApplied(text, observation.status, observation.payloads)) return 'committed-applied';
  if (looksLikeCompletedHistory(text, observation.status, observation.payloads)) return 'completed';
  if (looksLikeBlockedWork(text, observation.status, observation.payloads)) return 'blocked';
  return 'unknown';
}

function looksLikeTrueHumanQuestion(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  void status;
  return payloads.some((payload) => parseAutonomousMergeHealthHumanQuestionContractLine(extractSwarmLifetimeStringField(payload, ['reason', 'question', 'summary', 'message'])) !== undefined)
    || (/human-question:/.test(text) ? parseAutonomousMergeHealthHumanQuestionContractLine(text.slice(text.indexOf('human-question:'))) !== undefined : false);
}

function looksLikeSuppressedAuditArtifact(
  text: string,
  kind: string | undefined,
  status: string | undefined,
  payloads: readonly unknown[]
): boolean {
  if (kind !== undefined && /(?:audit|collection|intermediate|record-only|discovery|snapshot|archive)/i.test(kind)) return true;
  if (status !== undefined && /^(stale-against-head|record-only|discovery|audit|intermediate)$/i.test(status)) return true;
  if (/\b(?:audit|collection|intermediate|record-only|discovery|suppressed)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['kind', 'phase', 'state', 'status', 'summary', 'reason'], /(?:stale-against-head|record-only|discovery|audit|intermediate|collection|suppressed)/i));
}

function looksLikePackageGate(
  text: string,
  kind: string | undefined,
  status: string | undefined,
  payloads: readonly unknown[]
): boolean {
  if (kind !== undefined && /(?:gate|verification|check)/i.test(kind)) return true;
  if (status !== undefined && /^(passed|failed|skipped)$/i.test(status)) {
    return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['package', 'packageName', 'packageId', 'packagePath', 'name', 'gate'], /package/i));
  }
  if (!/\bpackage\b/.test(text) || !/\bgate\b/.test(text)) return false;
  return payloads.some((payload) => collectSwarmLifetimeGateRecords(payload).length > 0);
}

function looksLikeActiveWork(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(active|running|leased|working|in-?progress|inflight)$/.test(status.toLowerCase())) return true;
  if (/\b(active|running|leased|working|in[- ]progress|inflight)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'lifecycle'], /^(active|running|leased|working|in-?progress|inflight)$/i));
}

function looksLikeCoordinatorReview(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(review|needs-review|coordinator-review|merge-review|pending-review)$/i.test(status)) return true;
  if (/\b(coordinator review|needs review|merge review|pending review|review)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(review|needs-review|coordinator-review|merge-review|pending-review)$/i));
}

function looksLikeRerunWork(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(rerun|stale-against-head|stale)$/i.test(status)) return true;
  if (/\b(rerun|stale-against-head|stale|rebase)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(rerun|stale-against-head|stale)$/i));
}

function looksLikeConflictWork(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(conflict|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)$/i.test(status)) return true;
  if (/\b(conflict|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(conflict|conflict-blocked|merge-conflict|textual-conflict|semantic-overlap)$/i));
}

function looksLikeCommittedApplied(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(applied|committed)$/i.test(status)) return true;
  if (/\b(applied|committed)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(applied|committed)$/i));
}

function looksLikeCompletedHistory(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(ok|changed|rejected|skipped|recorded|accepted|resolved|completed|done|passed)$/i.test(status)) return true;
  if (/\b(ok|changed|rejected|skipped|recorded|accepted|resolved|completed|done|passed)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(ok|changed|rejected|skipped|recorded|accepted|resolved|completed|done|passed)$/i));
}

function looksLikeBlockedWork(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(blocked|failed|error)$/i.test(status)) return true;
  if (/\b(blocked|failed|error)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(blocked|failed|error)$/i));
}

function swarmObservationFromArtifact(artifact: FrontierInspectArtifact): SwarmLifetimeObservation {
  const payloads: unknown[] = [];
  if (artifact.data !== undefined) payloads[payloads.length] = artifact.data;
  if (artifact.metadata !== undefined) payloads[payloads.length] = artifact.metadata;
  return {
    id: artifact.id,
    text: [
      artifact.id,
      artifact.kind,
      artifact.summary,
      artifact.sourcePackage,
      artifact.package,
      artifact.feature,
      artifact.tags.join(' '),
      artifact.files.join(' '),
      artifact.resources.join(' '),
      artifact.entryIds.join(' '),
      artifact.recordIds.join(' ')
    ].filter(Boolean).join(' '),
    kind: artifact.kind,
    sources: collectSwarmLifetimeSources(artifact.sourcePackage, artifact.package, artifact.files, artifact.resources),
    payloads,
    status: extractSwarmLifetimeStatus(payloads)
  };
}

function swarmObservationFromEvent(event: FrontierInspectEvent): SwarmLifetimeObservation {
  const payloads: unknown[] = [];
  if (event.value !== undefined) payloads[payloads.length] = event.value;
  if (event.metadata !== undefined) payloads[payloads.length] = event.metadata;
  const text = [
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
  return {
    id: event.id,
    text,
    kind: event.type,
    sources: collectSwarmLifetimeSources(event.sourcePackage, event.package, [event.file], [event.resource, event.path, event.routeId, event.selector]),
    payloads,
    status: event.status ?? extractSwarmLifetimeStatus(payloads)
  };
}

function swarmObservationFromEntry(entry: FrontierRegistryEntry): SwarmLifetimeObservation {
  const payloads = [entry.metadata];
  return {
    id: entry.id,
    text: [
      entry.id,
      entry.kind,
      entry.description,
      entry.package,
      entry.feature,
      (entry.tags ?? []).join(' '),
      normalizeSourceFiles(entry).join(' '),
      (entry.touches ?? []).join(' '),
      (entry.reads ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (entry.writes ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (entry.dependsOn ?? []).join(' ')
    ].filter(Boolean).join(' '),
    kind: entry.kind,
    sources: collectSwarmLifetimeSources(entry.package, undefined, normalizeSourceFiles(entry), entry.touches),
    payloads,
    status: extractSwarmLifetimeStatus(payloads)
  };
}

function swarmObservationFromRecord(record: FrontierRegistryRecord): SwarmLifetimeObservation {
  const payloads = [record.metadata];
  return {
    id: record.id,
    text: [
      record.id,
      record.kind,
      record.status,
      record.error,
      record.entryId,
      record.durationMs === undefined ? undefined : String(record.durationMs),
      (record.reads ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' '),
      (record.writes ?? []).map((path) => normalizeFrontierRegistryPath(path)).join(' ')
    ].filter(Boolean).join(' '),
    kind: record.kind,
    sources: collectSwarmLifetimeSources(undefined, undefined, [], []),
    payloads,
    status: record.status ?? extractSwarmLifetimeStatus(payloads)
  };
}

function collectSwarmLifetimeSources(
  sourcePackage: string | undefined,
  packageName: string | undefined,
  files: readonly (string | undefined)[] | undefined,
  resources: readonly (string | undefined)[] | undefined
): string[] {
  const values: string[] = [];
  if (sourcePackage !== undefined) addUnique(values, 'package:' + sourcePackage);
  if (packageName !== undefined) addUnique(values, 'package:' + packageName);
  for (const file of files ?? []) if (file !== undefined && file !== '') addUnique(values, 'file:' + file);
  for (const resource of resources ?? []) if (resource !== undefined && resource !== '') addUnique(values, 'resource:' + resource);
  return values.sort();
}

function extractSwarmLifetimeStatus(payloads: readonly unknown[]): string | undefined {
  for (let i = 0; i < payloads.length; i++) {
    const value = extractSwarmLifetimeStringField(payloads[i], ['status', 'state', 'resultStatus', 'outcome', 'lifecycle', 'phase']);
    if (value !== undefined) return value;
  }
  return undefined;
}

function extractSwarmLifetimeStringField(value: unknown, keys: readonly string[]): string | undefined {
  if (!isRecord(value)) return undefined;
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'string' && raw !== '') return raw;
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        const nested = extractSwarmLifetimeStringField(item, keys);
        if (nested !== undefined) return nested;
      }
      continue;
    }
    if (isRecord(child)) {
      const nested = extractSwarmLifetimeStringField(child, keys);
      if (nested !== undefined) return nested;
    }
  }
  return undefined;
}

function hasSwarmLifetimeStringField(
  value: unknown,
  keys: readonly string[],
  matcher: RegExp
): boolean {
  if (!isRecord(value)) return false;
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'string' && matcher.test(raw)) return true;
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) if (hasSwarmLifetimeStringField(item, keys, matcher)) return true;
      continue;
    }
    if (isRecord(child) && hasSwarmLifetimeStringField(child, keys, matcher)) return true;
  }
  return false;
}

function collectSwarmLifetimeBucket(
  observations: readonly SwarmLifetimeObservation[],
  options: {
    id?: (observation: SwarmLifetimeObservation) => string | undefined;
  } = {}
): FrontierInspectSwarmLifetimeLiveBucketSummary {
  const ids: string[] = [];
  const sources: string[] = [];
  for (const observation of observations) {
    const id = options.id?.(observation) ?? observation.id;
    if (id !== undefined && id !== '') addUnique(ids, id);
    for (const source of observation.sources) addUnique(sources, source);
  }
  return {
    count: ids.length,
    ids: ids.sort(),
    sources: sources.sort()
  };
}

function extractSwarmLifetimeAgentId(observation: SwarmLifetimeObservation): string | undefined {
  for (const payload of observation.payloads) {
    const value = extractSwarmLifetimeStringField(payload, ['agentId', 'workerId', 'jobId', 'taskId', 'leaseId', 'runId']);
    if (value !== undefined) return value;
  }
  return undefined;
}

function collectSwarmLifetimeHumanQuestions(
  observations: readonly SwarmLifetimeObservation[]
): FrontierInspectSwarmLifetimeHumanQuestionSummary {
  const bucket = collectSwarmLifetimeBucket(observations, {
    id: (observation) => extractSwarmLifetimeQuestionId(observation) ?? observation.id
  });
  const reasons = uniqueStrings(observations.flatMap((observation) => extractSwarmLifetimeQuestionReasons(observation)));
  return {
    ...bucket,
    reasons
  };
}

function extractSwarmLifetimeQuestionId(observation: SwarmLifetimeObservation): string | undefined {
  for (const payload of observation.payloads) {
    const value = extractSwarmLifetimeStringField(payload, ['questionId', 'decisionId', 'jobId', 'taskId', 'queueItemId', 'id']);
    if (value !== undefined) return value;
  }
  return undefined;
}

function extractSwarmLifetimeQuestionReasons(observation: SwarmLifetimeObservation): string[] {
  const contract = extractAutonomousMergeHealthHumanQuestionContract(observation);
  return contract === undefined ? [] : [contract.reason];
}

function collectSwarmLifetimePackageGates(
  observations: readonly SwarmLifetimeObservation[]
): FrontierInspectSwarmLifetimePackageGateSummary {
  const ids: string[] = [];
  const sources: string[] = [];
  const states: string[] = [];
  let requiredCount = 0;
  let passedCount = 0;
  let failedCount = 0;
  let skippedCount = 0;
  const seen = new Set<string>();
  for (const observation of observations) {
    for (const payload of observation.payloads) {
      const gates = collectSwarmLifetimeGateRecords(payload);
      if (gates.length === 0) continue;
      for (const gate of gates) {
        const key = observation.id + '|' + gate.id + '|' + (gate.state ?? '') + '|' + String(gate.required ?? '');
        if (seen.has(key)) continue;
        seen.add(key);
        addUnique(ids, gate.id);
        for (const source of observation.sources) addUnique(sources, source);
        if (gate.state !== undefined) addUnique(states, gate.state);
        if (gate.required === true) requiredCount++;
        if (gate.state === 'passed') passedCount++;
        else if (gate.state === 'failed') failedCount++;
        else if (gate.state === 'skipped') skippedCount++;
      }
    }
  }
  return {
    count: ids.length,
    ids: ids.sort(),
    sources: sources.sort(),
    states: states.sort(),
    requiredCount,
    passedCount,
    failedCount,
    skippedCount
  };
}

function collectSwarmLifetimeSuppressedAuditArtifacts(
  observations: readonly SwarmLifetimeObservation[]
): FrontierInspectSwarmLifetimeSuppressedAuditArtifactSummary {
  const bucket = collectSwarmLifetimeBucket(observations);
  const reasons = uniqueStrings(observations.flatMap((observation) => extractSwarmLifetimeSuppressedAuditReasons(observation)));
  return {
    ...bucket,
    reasons
  };
}

function extractSwarmLifetimeSuppressedAuditReasons(observation: SwarmLifetimeObservation): string[] {
  const reasons: string[] = [];
  if (observation.kind !== undefined) addUnique(reasons, observation.kind);
  if (observation.status !== undefined) addUnique(reasons, observation.status);
  for (const payload of observation.payloads) {
    const directReason = extractSwarmLifetimeStringField(payload, ['reason', 'summary', 'message', 'kind', 'status', 'state']);
    if (directReason !== undefined) addUnique(reasons, directReason);
  }
  return reasons;
}

function collectSwarmLifetimeReviewDebt(
  review: readonly SwarmLifetimeObservation[],
  rerun: readonly SwarmLifetimeObservation[]
): FrontierInspectSwarmLifetimeReviewDebtSummary {
  const ids = uniqueStrings(review.concat(rerun).map((observation) => observation.id));
  const sources = uniqueStrings(review.concat(rerun).flatMap((observation) => observation.sources));
  return {
    count: review.length + rerun.length,
    coordinatorReviewCount: review.length,
    rerunWorkCount: rerun.length,
    ids,
    sources
  };
}

interface SwarmLifetimeGateRecord {
  id: string;
  state?: string;
  required?: boolean;
}

function collectSwarmLifetimeGateRecords(value: unknown): SwarmLifetimeGateRecord[] {
  const records: SwarmLifetimeGateRecord[] = [];
  collectSwarmLifetimeGateRecordsInto(value, records);
  return records;
}

function collectSwarmLifetimeGateRecordsInto(value: unknown, records: SwarmLifetimeGateRecord[]): void {
  if (!isRecord(value)) return;
  const gateSources = [
    value,
    value.finalGateSummary,
    value.gateSummary,
    value.verification,
    value.gates
  ];
  for (const source of gateSources) {
    if (!isRecord(source)) continue;
    const directGate = extractSwarmLifetimeGateRecord(source);
    if (directGate !== undefined) records[records.length] = directGate;
    const nestedGates = source.gates;
    if (Array.isArray(nestedGates)) {
      for (const gate of nestedGates) {
        const nestedGate = extractSwarmLifetimeGateRecord(gate);
        if (nestedGate !== undefined) records[records.length] = nestedGate;
      }
    }
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) collectSwarmLifetimeGateRecordsInto(item, records);
      continue;
    }
    if (isRecord(child)) collectSwarmLifetimeGateRecordsInto(child, records);
  }
}

function extractSwarmLifetimeGateRecord(value: unknown): SwarmLifetimeGateRecord | undefined {
  if (!isRecord(value)) return undefined;
  const id = extractSwarmLifetimeStringField(value, ['id', 'name', 'gate', 'label', 'title']);
  const state = extractSwarmLifetimeStringField(value, ['status', 'state', 'resultStatus', 'outcome', 'phase']);
  const required = extractSwarmLifetimeBooleanField(value, ['required', 'mandatory']);
  if (id === undefined && state === undefined && required === undefined) return undefined;
  return {
    id: id ?? state ?? 'gate',
    state,
    required
  };
}

function extractSwarmLifetimeBooleanField(value: unknown, keys: readonly string[]): boolean | undefined {
  if (!isRecord(value)) return undefined;
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'boolean') return raw;
    if (typeof raw === 'string') {
      if (/^(true|yes|required|required-gate|mandatory)$/i.test(raw)) return true;
      if (/^(false|no|optional)$/i.test(raw)) return false;
    }
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        const nested = extractSwarmLifetimeBooleanField(item, keys);
        if (nested !== undefined) return nested;
      }
      continue;
    }
    if (isRecord(child)) {
      const nested = extractSwarmLifetimeBooleanField(child, keys);
      if (nested !== undefined) return nested;
    }
  }
  return undefined;
}

function collectSwarmLifetimeCost(observations: readonly SwarmLifetimeObservation[]): FrontierInspectSwarmLifetimeCostSummary | undefined {
  let known = false;
  const sources: string[] = [];
  let inputTokens: number | undefined;
  let cachedInputTokens: number | undefined;
  let uncachedInputTokens: number | undefined;
  let outputTokens: number | undefined;
  let totalTokens: number | undefined;
  let estimatedCostUsd: number | undefined;

  for (const observation of observations) {
    for (const payload of observation.payloads) {
      const metrics = extractSwarmLifetimeCostMetrics(payload);
      if (metrics === undefined) continue;
      known = true;
      for (const source of observation.sources) addUnique(sources, source);
      inputTokens = sumOptionalNumbers(inputTokens, metrics.inputTokens);
      cachedInputTokens = sumOptionalNumbers(cachedInputTokens, metrics.cachedInputTokens);
      uncachedInputTokens = sumOptionalNumbers(uncachedInputTokens, metrics.uncachedInputTokens);
      outputTokens = sumOptionalNumbers(outputTokens, metrics.outputTokens);
      totalTokens = sumOptionalNumbers(totalTokens, metrics.totalTokens);
      estimatedCostUsd = sumOptionalNumbers(estimatedCostUsd, metrics.estimatedCostUsd);
    }
  }

  if (!known) return undefined;
  return {
    known,
    inputTokens,
    cachedInputTokens,
    uncachedInputTokens,
    outputTokens,
    totalTokens,
    estimatedCostUsd,
    sourceCount: sources.length,
    sources: sources.sort()
  };
}

function collectSwarmLifetimeModelPerformance(
  observations: SwarmLifetimeObservations
): FrontierInspectSwarmLifetimeModelPerformanceSummary {
  const samples = collectSwarmLifetimePerformanceSamples(observations);
  const root = createSwarmLifetimePerformanceAggregate();
  const byModel = new Map<string, MutableSwarmLifetimePerformanceModelSummary>();
  const modelKeys = new Set<string>();
  const computeTierKeys = new Set<string>();
  const taskKindKeys = new Set<string>();

  for (const sample of samples) {
    mergeSwarmLifetimePerformanceAggregate(root, sample);
    const modelSummary = getMutableSwarmLifetimePerformanceModelSummary(byModel, sample.model);
    mergeSwarmLifetimePerformanceAggregate(modelSummary, sample);
    modelKeys.add(sample.model);

    const computeTierKey = sample.model + '|' + sample.computeTier;
    const computeTierSummary = getMutableSwarmLifetimePerformanceComputeTierSummary(modelSummary.byComputeTier, sample.computeTier);
    computeTierSummary.model = sample.model;
    mergeSwarmLifetimePerformanceAggregate(computeTierSummary, sample);
    computeTierKeys.add(computeTierKey);

    const taskKindKey = computeTierKey + '|' + sample.taskKind;
    const taskKindSummary = getMutableSwarmLifetimePerformanceTaskKindSummary(computeTierSummary.byTaskKind, sample.taskKind);
    taskKindSummary.model = sample.model;
    taskKindSummary.computeTier = sample.computeTier;
    mergeSwarmLifetimePerformanceAggregate(taskKindSummary, sample);
    taskKindKeys.add(taskKindKey);
  }

  return {
    ...finalizeSwarmLifetimePerformanceSummary(root),
    modelCount: modelKeys.size,
    computeTierCount: computeTierKeys.size,
    taskKindCount: taskKindKeys.size,
    byModel: Array.from(byModel.values())
      .sort((left, right) => left.model.localeCompare(right.model))
      .map((summary) => finalizeSwarmLifetimePerformanceModelSummary(summary))
  };
}

interface SwarmLifetimePerformanceSample {
  model: string;
  computeTier: string;
  taskKind: string;
  sources: string[];
  runtimeMs?: number;
  inputTokens?: number;
  cachedInputTokens?: number;
  uncachedInputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
  usefulOutput: boolean;
  rerun: boolean;
  stale: boolean;
  reject: boolean;
  cheapSuccess: boolean;
  expensiveSuccess: boolean;
  escalationBenefit: boolean;
  missingPricingReason?: string;
}

interface MutableSwarmLifetimePerformanceAggregate {
  count: number;
  successCount: number;
  usefulOutputCount: number;
  rerunCount: number;
  staleCount: number;
  rejectCount: number;
  cheapSuccessCount: number;
  expensiveSuccessCount: number;
  escalationBenefitCount: number;
  missingPricingCount: number;
  missingPricingReasons: string[];
  runtimeCount: number;
  runtimeTotalMs?: number;
  runtimeMinMs?: number;
  runtimeMaxMs?: number;
  costKnownCount: number;
  inputTokens?: number;
  cachedInputTokens?: number;
  uncachedInputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
  sources: string[];
}

interface MutableSwarmLifetimePerformanceTaskKindSummary extends MutableSwarmLifetimePerformanceAggregate {
  model: string;
  computeTier: string;
  taskKind: string;
}

interface MutableSwarmLifetimePerformanceComputeTierSummary extends MutableSwarmLifetimePerformanceAggregate {
  model: string;
  computeTier: string;
  byTaskKind: Map<string, MutableSwarmLifetimePerformanceTaskKindSummary>;
}

interface MutableSwarmLifetimePerformanceModelSummary extends MutableSwarmLifetimePerformanceAggregate {
  model: string;
  byComputeTier: Map<string, MutableSwarmLifetimePerformanceComputeTierSummary>;
}

function collectSwarmLifetimePerformanceSamples(
  observations: SwarmLifetimeObservations
): SwarmLifetimePerformanceSample[] {
  const samples: SwarmLifetimePerformanceSample[] = [];
  for (const observation of observations.costCandidates) {
    const sample = collectSwarmLifetimePerformanceSample(observation);
    if (sample !== undefined) samples[samples.length] = sample;
  }
  return samples;
}

function collectSwarmLifetimePerformanceSample(observation: SwarmLifetimeObservation): SwarmLifetimePerformanceSample | undefined {
  const payloads = observation.payloads;
  const model = firstSwarmLifetimeStringField(payloads, ['modelId', 'model', 'pricingModel']);
  const computeTier = firstSwarmLifetimeStringField(payloads, ['computeTier', 'serviceTier', 'tier', 'compute']);
  const rawTaskKind = firstSwarmLifetimeStringField(payloads, ['taskKind', 'workKind', 'kind']);
  const taskKind = rawTaskKind !== undefined && !isSwarmLifetimeGenericTaskKind(rawTaskKind) ? rawTaskKind : undefined;
  const runtimeMs = firstSwarmLifetimeNumberField(payloads, ['runtimeMs', 'runtime_ms', 'durationMs', 'duration_ms']);
  const inputTokens = firstSwarmLifetimeNumberField(payloads, ['inputTokens', 'input_tokens', 'promptTokens', 'prompt_tokens']);
  const cachedInputTokens = firstSwarmLifetimeNumberField(payloads, ['cachedInputTokens', 'cached_input_tokens', 'inputCachedTokens', 'input_cached_tokens', 'promptCachedTokens', 'prompt_cached_tokens']);
  const uncachedInputTokens = firstSwarmLifetimeNumberField(payloads, ['uncachedInputTokens', 'uncached_input_tokens', 'inputUncachedTokens', 'input_uncached_tokens']);
  const outputTokens = firstSwarmLifetimeNumberField(payloads, ['outputTokens', 'output_tokens', 'completionTokens', 'completion_tokens']);
  const totalTokens = firstSwarmLifetimeNumberField(payloads, ['totalTokens', 'total_tokens']);
  const explicitEstimatedCostUsd = firstSwarmLifetimeNumberField(payloads, ['estimatedCostUsd', 'estimated_cost_usd', 'totalCost', 'total_cost']);
  const hasPricing = hasSwarmLifetimePricing(payloads);
  const pricing = readSwarmLifetimePricing(payloads);
  const normalizedUsage = normalizeSwarmLifetimeUsage({
    inputTokens,
    cachedInputTokens,
    uncachedInputTokens,
    outputTokens,
    totalTokens
  });
  let estimatedCostUsd = explicitEstimatedCostUsd;
  if (estimatedCostUsd === undefined && pricing !== undefined) {
    estimatedCostUsd = estimateSwarmLifetimeUsageCost(normalizedUsage, pricing);
  }
  const usefulOutput = looksLikeSwarmLifetimeUsefulOutput(observation.text, observation.status, payloads);
  const rerun = looksLikeRerunWork(observation.text, observation.status, payloads);
  const stale = looksLikeSwarmLifetimeStale(observation.text, observation.status, payloads);
  const reject = looksLikeSwarmLifetimeReject(observation.text, observation.status, payloads);
  const wasteFlags = uniqueStrings(payloads.flatMap((payload) => extractSwarmLifetimeStringArrayField(payload, ['wasteFlags', 'wasteFlags', 'wasteReasons', 'flags'])));
  const hasWasteSignals = rerun || stale || reject || wasteFlags.length > 0;
  const hasPerformanceSignal =
    model !== undefined ||
    computeTier !== undefined ||
    taskKind !== undefined ||
    runtimeMs !== undefined ||
    normalizedUsage.inputTokens !== undefined ||
    normalizedUsage.cachedInputTokens !== undefined ||
    normalizedUsage.uncachedInputTokens !== undefined ||
    normalizedUsage.outputTokens !== undefined ||
    normalizedUsage.totalTokens !== undefined ||
    estimatedCostUsd !== undefined ||
    hasPricing ||
    wasteFlags.length > 0;
  const missingPricingReason = (estimatedCostUsd === undefined && (hasPricing || normalizedUsage.inputTokens !== undefined || normalizedUsage.outputTokens !== undefined || runtimeMs !== undefined))
    ? (hasPricing ? 'missing-token-usage' : 'missing-pricing')
    : undefined;
  if (!hasPerformanceSignal) {
    return undefined;
  }
  const costKnown = estimatedCostUsd !== undefined;
  const cheapSuccess = usefulOutput && costKnown && !hasWasteSignals;
  const expensiveSuccess = usefulOutput && !cheapSuccess;
  return {
    model: model ?? 'unknown',
    computeTier: computeTier ?? 'unknown',
    taskKind: taskKind ?? 'unknown',
    sources: observation.sources,
    runtimeMs,
    ...normalizedUsage,
    ...(estimatedCostUsd !== undefined ? { estimatedCostUsd } : {}),
    usefulOutput,
    rerun,
    stale,
    reject,
    cheapSuccess,
    expensiveSuccess,
    escalationBenefit: usefulOutput && hasWasteSignals,
    ...(missingPricingReason ? { missingPricingReason } : {})
  };
}

function firstSwarmLifetimeStringField(payloads: readonly unknown[], keys: readonly string[]): string | undefined {
  for (const payload of payloads) {
    const value = extractSwarmLifetimeStringField(payload, keys);
    if (value !== undefined) return value;
  }
  return undefined;
}

function firstSwarmLifetimeNumberField(payloads: readonly unknown[], keys: readonly string[]): number | undefined {
  for (const payload of payloads) {
    const value = extractSwarmLifetimeNumberField(payload, keys);
    if (value !== undefined) return value;
  }
  return undefined;
}

function isSwarmLifetimeGenericTaskKind(value: string): boolean {
  return /^(agent-usage|audit|collection(?:-row)?|coordinator-gate|decision|event|frontier\..*|gate|human-question|package-gate|telemetry|worker-run|worker-result)$/i.test(value);
}

function extractSwarmLifetimeStringArrayField(value: unknown, keys: readonly string[]): string[] {
  if (!isRecord(value)) return [];
  const values: string[] = [];
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'string' && raw !== '') addUnique(values, raw);
    else if (Array.isArray(raw)) {
      for (const item of raw) {
        if (typeof item === 'string' && item !== '') addUnique(values, item);
      }
    }
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        if (isRecord(item)) {
          for (const nested of extractSwarmLifetimeStringArrayField(item, keys)) addUnique(values, nested);
        }
      }
      continue;
    }
    if (isRecord(child)) {
      for (const nested of extractSwarmLifetimeStringArrayField(child, keys)) addUnique(values, nested);
    }
  }
  return values;
}

interface SwarmLifetimeUsageTotals {
  inputTokens?: number;
  cachedInputTokens?: number;
  uncachedInputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}

function normalizeSwarmLifetimeUsage(input: SwarmLifetimeUsageTotals): SwarmLifetimeUsageTotals {
  let inputTokens = input.inputTokens;
  let cachedInputTokens = input.cachedInputTokens;
  let uncachedInputTokens = input.uncachedInputTokens;
  const outputTokens = input.outputTokens;
  let totalTokens = input.totalTokens;

  if (inputTokens === undefined && (cachedInputTokens !== undefined || uncachedInputTokens !== undefined)) {
    inputTokens = (cachedInputTokens || 0) + (uncachedInputTokens || 0);
  }
  if (uncachedInputTokens === undefined && inputTokens !== undefined && cachedInputTokens !== undefined) {
    uncachedInputTokens = Math.max(0, inputTokens - cachedInputTokens);
  }
  if (totalTokens === undefined && (inputTokens !== undefined || outputTokens !== undefined)) {
    totalTokens = (inputTokens || 0) + (outputTokens || 0);
  }

  return {
    ...(inputTokens !== undefined ? { inputTokens } : {}),
    ...(cachedInputTokens !== undefined ? { cachedInputTokens } : {}),
    ...(uncachedInputTokens !== undefined ? { uncachedInputTokens } : {}),
    ...(outputTokens !== undefined ? { outputTokens } : {}),
    ...(totalTokens !== undefined ? { totalTokens } : {})
  };
}

interface SwarmLifetimePricingInput {
  currency?: string;
  inputCostPerUnit?: number;
  cachedInputCostPerUnit?: number;
  outputCostPerUnit?: number;
  unitTokens?: number;
}

function hasSwarmLifetimePricing(payloads: readonly unknown[]): boolean {
  return readSwarmLifetimePricing(payloads) !== undefined;
}

function readSwarmLifetimePricing(payloads: readonly unknown[]): SwarmLifetimePricingInput | undefined {
  for (const payload of payloads) {
    if (!isRecord(payload)) continue;
    const candidates = [payload, payload.pricing, payload.cost, payload.modelPricing];
    for (const candidate of candidates) {
      if (!isRecord(candidate)) continue;
      const currency = firstSwarmLifetimeStringField([candidate], ['currency']);
      const inputCostPerUnit = firstSwarmLifetimeNumberField([candidate], ['inputCostPerUnit', 'input_cost_per_unit']);
      const cachedInputCostPerUnit = firstSwarmLifetimeNumberField([candidate], ['cachedInputCostPerUnit', 'cached_input_cost_per_unit']);
      const outputCostPerUnit = firstSwarmLifetimeNumberField([candidate], ['outputCostPerUnit', 'output_cost_per_unit']);
      const unitTokens = firstSwarmLifetimeNumberField([candidate], ['unitTokens', 'unit_tokens']);
      if (
        currency !== undefined ||
        inputCostPerUnit !== undefined ||
        cachedInputCostPerUnit !== undefined ||
        outputCostPerUnit !== undefined ||
        unitTokens !== undefined
      ) {
        return {
          ...(currency !== undefined ? { currency } : {}),
          ...(inputCostPerUnit !== undefined ? { inputCostPerUnit } : {}),
          ...(cachedInputCostPerUnit !== undefined ? { cachedInputCostPerUnit } : {}),
          ...(outputCostPerUnit !== undefined ? { outputCostPerUnit } : {}),
          ...(unitTokens !== undefined ? { unitTokens } : {})
        };
      }
    }
  }
  return undefined;
}

function estimateSwarmLifetimeUsageCost(
  usage: SwarmLifetimeUsageTotals,
  pricing: SwarmLifetimePricingInput
): number | undefined {
  const unitTokens = pricing.unitTokens && pricing.unitTokens > 0 ? pricing.unitTokens : 1;
  const inputTokens = usage.inputTokens;
  const cachedInputTokens = usage.cachedInputTokens;
  const uncachedInputTokens = usage.uncachedInputTokens ?? (
    inputTokens !== undefined && cachedInputTokens !== undefined ? Math.max(0, inputTokens - cachedInputTokens) : undefined
  );
  const outputTokens = usage.outputTokens;
  const inputCostPerUnit = pricing.inputCostPerUnit;
  const cachedInputCostPerUnit = pricing.cachedInputCostPerUnit;
  const outputCostPerUnit = pricing.outputCostPerUnit;
  let inputCost: number | undefined;
  let cachedInputCost: number | undefined;
  let uncachedInputCost: number | undefined;
  let outputCost: number | undefined;

  if (cachedInputTokens !== undefined && cachedInputCostPerUnit !== undefined) {
    cachedInputCost = (cachedInputTokens * cachedInputCostPerUnit) / unitTokens;
  }
  if (uncachedInputTokens !== undefined && inputCostPerUnit !== undefined) {
    uncachedInputCost = (uncachedInputTokens * inputCostPerUnit) / unitTokens;
  } else if (cachedInputTokens === undefined && inputTokens !== undefined && inputCostPerUnit !== undefined) {
    inputCost = (inputTokens * inputCostPerUnit) / unitTokens;
  }
  if (cachedInputCost !== undefined || uncachedInputCost !== undefined) {
    inputCost = (cachedInputCost || 0) + (uncachedInputCost || 0);
  }
  if (outputTokens !== undefined && outputCostPerUnit !== undefined) {
    outputCost = (outputTokens * outputCostPerUnit) / unitTokens;
  }
  const totalCost = sumOptionalNumbers(inputCost, outputCost);
  return totalCost === undefined ? undefined : roundUsd(totalCost);
}

function looksLikeSwarmLifetimeUsefulOutput(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(ok|changed|skipped|recorded|accepted|resolved|completed|done|passed|applied|committed|success)$/i.test(status)) return true;
  if (/\b(ok|changed|skipped|recorded|accepted|resolved|completed|done|passed|applied|committed|success)\b/.test(text)) return true;
  return payloads.some((payload) => hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(ok|changed|skipped|recorded|accepted|resolved|completed|done|passed|applied|committed|success)$/i));
}

function looksLikeSwarmLifetimeStale(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(stale-against-head|stale)$/i.test(status)) return true;
  if (/\b(stale-against-head|stale|rebase)\b/.test(text)) return true;
  return payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['status', 'state', 'phase', 'kind', 'type'], /^(stale-against-head|stale)$/i)
    || hasSwarmLifetimeStringArrayField(payload, ['wasteFlags', 'wasteReasons', 'flags'], /(?:stale|rerun|rebase)/i)
  );
}

function looksLikeSwarmLifetimeReject(text: string, status: string | undefined, payloads: readonly unknown[]): boolean {
  if (status !== undefined && /^(rejected|blocked|failed|error)$/i.test(status)) return true;
  if (/\b(rejected|blocked|failed|error)\b/.test(text)) return true;
  return payloads.some((payload) =>
    hasSwarmLifetimeStringField(payload, ['status', 'state', 'resultStatus', 'outcome'], /^(rejected|blocked|failed|error)$/i)
    || hasSwarmLifetimeStringArrayField(payload, ['wasteFlags', 'wasteReasons', 'flags'], /(?:rejected|blocked|failed|error)/i)
  );
}

function hasSwarmLifetimeStringArrayField(
  value: unknown,
  keys: readonly string[],
  matcher: RegExp
): boolean {
  if (!isRecord(value)) return false;
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'string' && matcher.test(raw)) return true;
    if (Array.isArray(raw)) {
      for (const item of raw) if (typeof item === 'string' && matcher.test(item)) return true;
    }
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        if (isRecord(item) && hasSwarmLifetimeStringArrayField(item, keys, matcher)) return true;
        if (typeof item === 'string' && matcher.test(item)) return true;
      }
      continue;
    }
    if (isRecord(child) && hasSwarmLifetimeStringArrayField(child, keys, matcher)) return true;
  }
  return false;
}

interface MutableSwarmLifetimePerformanceSummary extends MutableSwarmLifetimePerformanceAggregate {
  byModel: Map<string, MutableSwarmLifetimePerformanceModelSummary>;
}

function createSwarmLifetimePerformanceAggregate(): MutableSwarmLifetimePerformanceSummary {
  return {
    count: 0,
    successCount: 0,
    usefulOutputCount: 0,
    rerunCount: 0,
    staleCount: 0,
    rejectCount: 0,
    cheapSuccessCount: 0,
    expensiveSuccessCount: 0,
    escalationBenefitCount: 0,
    missingPricingCount: 0,
    missingPricingReasons: [],
    runtimeCount: 0,
    costKnownCount: 0,
    sources: [],
    byModel: new Map<string, MutableSwarmLifetimePerformanceModelSummary>()
  };
}

function getMutableSwarmLifetimePerformanceModelSummary(
  byModel: Map<string, MutableSwarmLifetimePerformanceModelSummary>,
  model: string
): MutableSwarmLifetimePerformanceModelSummary {
  let summary = byModel.get(model);
  if (summary !== undefined) return summary;
  summary = {
    ...createSwarmLifetimePerformanceAggregate(),
    model,
    byComputeTier: new Map<string, MutableSwarmLifetimePerformanceComputeTierSummary>()
  };
  byModel.set(model, summary);
  return summary;
}

function getMutableSwarmLifetimePerformanceComputeTierSummary(
  byComputeTier: Map<string, MutableSwarmLifetimePerformanceComputeTierSummary>,
  computeTier: string
): MutableSwarmLifetimePerformanceComputeTierSummary {
  let summary = byComputeTier.get(computeTier);
  if (summary !== undefined) return summary;
  summary = {
    ...createSwarmLifetimePerformanceAggregate(),
    model: 'unknown',
    computeTier,
    byTaskKind: new Map<string, MutableSwarmLifetimePerformanceTaskKindSummary>()
  };
  byComputeTier.set(computeTier, summary);
  return summary;
}

function getMutableSwarmLifetimePerformanceTaskKindSummary(
  byTaskKind: Map<string, MutableSwarmLifetimePerformanceTaskKindSummary>,
  taskKind: string
): MutableSwarmLifetimePerformanceTaskKindSummary {
  let summary = byTaskKind.get(taskKind);
  if (summary !== undefined) return summary;
  summary = {
    ...createSwarmLifetimePerformanceAggregate(),
    model: 'unknown',
    computeTier: 'unknown',
    taskKind
  };
  byTaskKind.set(taskKind, summary);
  return summary;
}

function mergeSwarmLifetimePerformanceAggregate(
  aggregate: MutableSwarmLifetimePerformanceAggregate,
  sample: SwarmLifetimePerformanceSample
): void {
  aggregate.count++;
  if (sample.usefulOutput) {
    aggregate.successCount++;
    aggregate.usefulOutputCount++;
    if (sample.cheapSuccess) aggregate.cheapSuccessCount++;
    if (sample.expensiveSuccess) aggregate.expensiveSuccessCount++;
    if (sample.escalationBenefit) aggregate.escalationBenefitCount++;
  }
  if (sample.rerun) aggregate.rerunCount++;
  if (sample.stale) aggregate.staleCount++;
  if (sample.reject) aggregate.rejectCount++;
  if (sample.missingPricingReason !== undefined) {
    aggregate.missingPricingCount++;
    addUnique(aggregate.missingPricingReasons, sample.missingPricingReason);
  }
  if (sample.runtimeMs !== undefined) {
    aggregate.runtimeCount++;
    aggregate.runtimeTotalMs = sumOptionalNumbers(aggregate.runtimeTotalMs, sample.runtimeMs);
    aggregate.runtimeMinMs = aggregate.runtimeMinMs === undefined ? sample.runtimeMs : Math.min(aggregate.runtimeMinMs, sample.runtimeMs);
    aggregate.runtimeMaxMs = aggregate.runtimeMaxMs === undefined ? sample.runtimeMs : Math.max(aggregate.runtimeMaxMs, sample.runtimeMs);
  }
  if (sample.estimatedCostUsd !== undefined) {
    aggregate.costKnownCount++;
    aggregate.estimatedCostUsd = sumOptionalNumbers(aggregate.estimatedCostUsd, sample.estimatedCostUsd);
  }
  aggregate.inputTokens = sumOptionalNumbers(aggregate.inputTokens, sample.inputTokens);
  aggregate.cachedInputTokens = sumOptionalNumbers(aggregate.cachedInputTokens, sample.cachedInputTokens);
  aggregate.uncachedInputTokens = sumOptionalNumbers(aggregate.uncachedInputTokens, sample.uncachedInputTokens);
  aggregate.outputTokens = sumOptionalNumbers(aggregate.outputTokens, sample.outputTokens);
  aggregate.totalTokens = sumOptionalNumbers(aggregate.totalTokens, sample.totalTokens);
  for (const source of sample.sources) addUnique(aggregate.sources, source);
}

function finalizeSwarmLifetimePerformanceSummary(
  aggregate: MutableSwarmLifetimePerformanceAggregate
): FrontierInspectSwarmLifetimePerformanceSummaryBase {
  const wasteCount = Math.max(0, aggregate.count - aggregate.usefulOutputCount);
  return {
    count: aggregate.count,
    successCount: aggregate.successCount,
    usefulOutputCount: aggregate.usefulOutputCount,
    rerunCount: aggregate.rerunCount,
    staleCount: aggregate.staleCount,
    rejectCount: aggregate.rejectCount,
    cheapSuccessCount: aggregate.cheapSuccessCount,
    expensiveSuccessCount: aggregate.expensiveSuccessCount,
    wasteCount,
    escalationBenefitCount: aggregate.escalationBenefitCount,
    successRate: rateForCount(aggregate.successCount, aggregate.count),
    usefulOutputRate: rateForCount(aggregate.usefulOutputCount, aggregate.count),
    rerunRate: rateForCount(aggregate.rerunCount, aggregate.count),
    staleRate: rateForCount(aggregate.staleCount, aggregate.count),
    rejectRate: rateForCount(aggregate.rejectCount, aggregate.count),
    cheapSuccessRate: rateForCount(aggregate.cheapSuccessCount, aggregate.count),
    expensiveSuccessRate: rateForCount(aggregate.expensiveSuccessCount, aggregate.count),
    wasteRate: rateForCount(wasteCount, aggregate.count),
    escalationBenefitRate: rateForCount(aggregate.escalationBenefitCount, aggregate.count),
    missingPricingCount: aggregate.missingPricingCount,
    missingPricingReasons: aggregate.missingPricingReasons.sort(),
    runtimeMs: finalizeSwarmLifetimeRuntimeSummary(aggregate),
    cost: finalizeSwarmLifetimeCostSummary(aggregate)
  };
}

function finalizeSwarmLifetimePerformanceModelSummary(
  aggregate: MutableSwarmLifetimePerformanceModelSummary
): FrontierInspectSwarmLifetimePerformanceModelSummary {
  return {
    model: aggregate.model,
    ...finalizeSwarmLifetimePerformanceSummary(aggregate),
    byComputeTier: Array.from(aggregate.byComputeTier.values())
      .sort((left, right) => left.computeTier.localeCompare(right.computeTier))
      .map((summary) => finalizeSwarmLifetimePerformanceComputeTierSummary(summary))
  };
}

function finalizeSwarmLifetimePerformanceComputeTierSummary(
  aggregate: MutableSwarmLifetimePerformanceComputeTierSummary
): FrontierInspectSwarmLifetimePerformanceComputeTierSummary {
  return {
    model: aggregate.model,
    computeTier: aggregate.computeTier,
    ...finalizeSwarmLifetimePerformanceSummary(aggregate),
    byTaskKind: Array.from(aggregate.byTaskKind.values())
      .sort((left, right) => left.taskKind.localeCompare(right.taskKind))
      .map((summary) => finalizeSwarmLifetimePerformanceTaskKindSummary(summary))
  };
}

function finalizeSwarmLifetimePerformanceTaskKindSummary(
  aggregate: MutableSwarmLifetimePerformanceTaskKindSummary
): FrontierInspectSwarmLifetimePerformanceTaskKindSummary {
  return {
    model: aggregate.model,
    computeTier: aggregate.computeTier,
    taskKind: aggregate.taskKind,
    ...finalizeSwarmLifetimePerformanceSummary(aggregate)
  };
}

function finalizeSwarmLifetimeRuntimeSummary(
  aggregate: MutableSwarmLifetimePerformanceAggregate
): FrontierInspectSwarmLifetimeRuntimeSummary {
  if (aggregate.runtimeCount === 0) return { count: 0 };
  return {
    count: aggregate.runtimeCount,
    totalMs: aggregate.runtimeTotalMs,
    averageMs: aggregate.runtimeTotalMs === undefined ? undefined : aggregate.runtimeTotalMs / aggregate.runtimeCount,
    minMs: aggregate.runtimeMinMs,
    maxMs: aggregate.runtimeMaxMs
  };
}

function finalizeSwarmLifetimeCostSummary(
  aggregate: MutableSwarmLifetimePerformanceAggregate
): FrontierInspectSwarmLifetimeCostSummary | undefined {
  const hasAnyCostData =
    aggregate.inputTokens !== undefined ||
    aggregate.cachedInputTokens !== undefined ||
    aggregate.uncachedInputTokens !== undefined ||
    aggregate.outputTokens !== undefined ||
    aggregate.totalTokens !== undefined ||
    aggregate.estimatedCostUsd !== undefined ||
    aggregate.costKnownCount > 0;
  if (!hasAnyCostData) return undefined;
  return {
    known: aggregate.costKnownCount > 0,
    ...(aggregate.inputTokens !== undefined ? { inputTokens: aggregate.inputTokens } : {}),
    ...(aggregate.cachedInputTokens !== undefined ? { cachedInputTokens: aggregate.cachedInputTokens } : {}),
    ...(aggregate.uncachedInputTokens !== undefined ? { uncachedInputTokens: aggregate.uncachedInputTokens } : {}),
    ...(aggregate.outputTokens !== undefined ? { outputTokens: aggregate.outputTokens } : {}),
    ...(aggregate.totalTokens !== undefined ? { totalTokens: aggregate.totalTokens } : {}),
    ...(aggregate.estimatedCostUsd !== undefined ? { estimatedCostUsd: roundUsd(aggregate.estimatedCostUsd) } : {}),
    sourceCount: aggregate.sources.length,
    sources: aggregate.sources.sort()
  };
}

function roundUsd(value: number): number {
  const rounded = Math.round((value + Number.EPSILON) * 1_000_000_000_000) / 1_000_000_000_000;
  return Object.is(rounded, -0) ? 0 : rounded;
}

function rateForCount(count: number, total: number): number {
  return total === 0 ? 0 : count / total;
}

interface SwarmLifetimeCostMetrics {
  inputTokens?: number;
  cachedInputTokens?: number;
  uncachedInputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  estimatedCostUsd?: number;
}

function extractSwarmLifetimeCostMetrics(value: unknown): SwarmLifetimeCostMetrics | undefined {
  if (!isRecord(value)) return undefined;
  const metrics: SwarmLifetimeCostMetrics = {};
  const directSources = [value, value.usage, value.cost, value.tokens, value.telemetry];
  for (const source of directSources) {
    if (!isRecord(source)) continue;
    const inputTokens = extractSwarmLifetimeNumberField(source, ['inputTokens', 'input_tokens', 'promptTokens', 'prompt_tokens']);
    const cachedInputTokens = extractSwarmLifetimeNumberField(source, ['cachedInputTokens', 'cached_input_tokens', 'inputCachedTokens', 'input_cached_tokens', 'promptCachedTokens', 'prompt_cached_tokens']);
    const uncachedInputTokens = extractSwarmLifetimeNumberField(source, ['uncachedInputTokens', 'uncached_input_tokens', 'inputUncachedTokens', 'input_uncached_tokens']);
    const outputTokens = extractSwarmLifetimeNumberField(source, ['outputTokens', 'output_tokens', 'completionTokens', 'completion_tokens']);
    const totalTokens = extractSwarmLifetimeNumberField(source, ['totalTokens', 'total_tokens']);
    const estimatedCostUsd = extractSwarmLifetimeNumberField(source, ['estimatedCostUsd', 'estimated_cost_usd', 'costUsd', 'usd']);
    if (
      inputTokens !== undefined ||
      cachedInputTokens !== undefined ||
      uncachedInputTokens !== undefined ||
      outputTokens !== undefined ||
      totalTokens !== undefined ||
      estimatedCostUsd !== undefined
    ) {
      if (inputTokens !== undefined) metrics.inputTokens = inputTokens;
      if (cachedInputTokens !== undefined) metrics.cachedInputTokens = cachedInputTokens;
      if (uncachedInputTokens !== undefined) metrics.uncachedInputTokens = uncachedInputTokens;
      if (outputTokens !== undefined) metrics.outputTokens = outputTokens;
      if (totalTokens !== undefined) metrics.totalTokens = totalTokens;
      if (estimatedCostUsd !== undefined) metrics.estimatedCostUsd = estimatedCostUsd;
      return metrics;
    }
  }
  return undefined;
}

function extractSwarmLifetimeNumberField(value: unknown, keys: readonly string[]): number | undefined {
  if (!isRecord(value)) return undefined;
  for (const key of keys) {
    const raw = value[key];
    if (typeof raw === 'number' && Number.isFinite(raw)) return raw;
    if (typeof raw === 'string' && raw.trim() !== '' && Number.isFinite(Number(raw))) return Number(raw);
  }
  for (const key of Object.keys(value)) {
    const child = value[key];
    if (Array.isArray(child)) {
      for (const item of child) {
        const nested = extractSwarmLifetimeNumberField(item, keys);
        if (nested !== undefined) return nested;
      }
      continue;
    }
    if (isRecord(child)) {
      const nested = extractSwarmLifetimeNumberField(child, keys);
      if (nested !== undefined) return nested;
    }
  }
  return undefined;
}

function sumOptionalNumbers(left: number | undefined, right: number | undefined): number | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  return left + right;
}

function collectSwarmLifetimeSourcesScanned(bundle: FrontierInspectBundle): FrontierInspectSwarmLifetimeSourcesScannedSummary {
  const packages = new Set<string>();
  const files = new Set<string>();
  const resources = new Set<string>();
  for (const entry of bundle.graph.entries) {
    if (entry.package !== undefined) packages.add(entry.package);
    for (const source of normalizeSourceFiles(entry)) files.add(source);
    for (const touch of entry.touches ?? []) resources.add(touch);
  }
  for (const artifact of bundle.artifacts) {
    if (artifact.sourcePackage !== undefined) packages.add(artifact.sourcePackage);
    if (artifact.package !== undefined) packages.add(artifact.package);
    for (const file of artifact.files) files.add(file);
    for (const resource of artifact.resources) resources.add(resource);
  }
  for (const event of bundle.events) {
    if (event.sourcePackage !== undefined) packages.add(event.sourcePackage);
    if (event.package !== undefined) packages.add(event.package);
    if (event.file !== undefined) files.add(event.file);
    if (event.resource !== undefined) resources.add(event.resource);
  }
  return {
    count: packages.size + files.size + resources.size,
    packages: Array.from(packages).sort(),
    files: Array.from(files).sort(),
    resources: Array.from(resources).sort()
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

function toJsonObject(value: unknown): JsonObject | undefined {
  if (value === undefined) return undefined;
  const converted = toJsonValue(value);
  return isRecord(converted) && !Array.isArray(converted) ? converted as JsonObject : undefined;
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

function normalizeOptionalNumber(value: unknown): number | undefined {
  if (value === undefined) return undefined;
  const number = Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function normalizeNonEmpty(value: string, label: string): string {
  const normalized = String(value);
  if (normalized.length === 0) throw new TypeError(label + ' must be a non-empty string');
  return normalized;
}

function normalizeSourceLike(
  source: FrontierInspectSourceLike | readonly FrontierInspectSourceLike[] | undefined
): FrontierRegistryEntry['source'] | undefined {
  if (source === undefined) return undefined;
  const sources = Array.isArray(source) ? source : [source];
  const normalized = sources
    .filter((entry) => entry !== undefined && typeof entry.file === 'string' && entry.file.length !== 0)
    .map((entry) => ({
      file: entry.file,
      line: entry.line,
      column: entry.column,
      symbol: entry.symbol,
      exportName: entry.exportName,
      package: entry.package
    }));
  if (normalized.length === 0) return undefined;
  return Array.isArray(source) ? normalized : normalized[0];
}

function sourceLikeFiles(source: FrontierInspectSourceLike | readonly FrontierInspectSourceLike[] | undefined): string[] {
  if (source === undefined) return [];
  const sources = Array.isArray(source) ? source : [source];
  return uniqueStrings(sources.map((entry) => entry.file).filter(isString));
}

function descriptorsToStrings(values: readonly (string | FrontierInspectDescriptorLike)[] | undefined): string[] | undefined {
  if (values === undefined) return undefined;
  return uniqueStrings(values.map((value) => typeof value === 'string' ? value : String(value.id ?? value.resource ?? value.kind ?? 'descriptor')));
}

function descriptorResource(value: string | FrontierInspectDescriptorLike): string | undefined {
  return typeof value === 'string' ? value : value.resource ?? value.id;
}

function descriptorReads(value: string | FrontierInspectDescriptorLike): readonly FrontierRegistryPath[] {
  return typeof value === 'string' ? [] : value.reads ?? [];
}

function singletonOrUndefined(values: readonly string[] | undefined): string | undefined {
  return values !== undefined && values.length === 1 ? values[0] : undefined;
}

function mergeMetadata(left: JsonObject | undefined, right: unknown): JsonObject | undefined {
  const converted = toJsonObject(right);
  if (left === undefined) return converted;
  if (converted === undefined) return left;
  return { ...converted, ...left };
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

function isString(value: unknown): value is string {
  return typeof value === 'string' && value.length !== 0;
}

function firstString(...values: readonly unknown[]): string | undefined {
  for (const value of values) if (isString(value)) return value;
  return undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringField(
  first: Record<string, unknown>,
  second: Record<string, unknown>,
  third: Record<string, unknown>,
  keys: readonly string[]
): string | undefined {
  for (const key of keys) {
    const value = fieldValue(first, key) ?? fieldValue(second, key) ?? fieldValue(third, key);
    if (typeof value === 'string' && value.length !== 0) return value;
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return undefined;
}

function fieldValue(record: Record<string, unknown>, key: string): unknown {
  if (Object.prototype.hasOwnProperty.call(record, key)) return record[key];
  const parts = key.split('.');
  let current: unknown = record;
  for (const part of parts) {
    if (!isRecord(current)) return undefined;
    current = current[part];
  }
  return current;
}

function stringArrayField(record: Record<string, unknown>, key: string): string[] {
  const value = fieldValue(record, key);
  if (!Array.isArray(value)) return [];
  return value.map(String).filter(Boolean);
}

function logLevelToSeverity(level: string): FrontierInspectEventSeverity {
  if (level === 'fatal' || level === 'error') return 'error';
  if (level === 'warn') return 'warning';
  if (level === 'trace' || level === 'debug') return 'debug';
  return 'info';
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
