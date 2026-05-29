import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import {
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(__dirname, '..');
const repoRoot = path.basename(path.dirname(packageDir)) === 'packages'
  ? path.resolve(packageDir, '..', '..')
  : packageDir;
const args = parseArgs(process.argv.slice(2));
const entryCount = readPositiveInt(args.entries, 1200);
const rounds = readPositiveInt(args.rounds, 20);
const outPath = args.out ? path.resolve(repoRoot, args.out) : null;

const fixture = makeFixture(entryCount);
let bundle = createInspectBundle(fixture);
let jsonl = '';
let cursor = 0;
const features = Array.from(new Set(fixture.graph.entries.map((entry) => entry.feature)));
const paths = fixture.graph.entries.map((entry) => entry.reads[0]);

const rows = [
  measure('create-bundle-' + entryCount, 1, () => {
    bundle = createInspectBundle(fixture);
    return bundle.summary.entryCount + bundle.summary.eventCount;
  }),
  measure('query-feature-' + entryCount, 32, () => {
    const feature = features[cursor++ % features.length];
    return queryInspectBundle(bundle, { features: [feature] }).registry.entries.length;
  }),
  measure('query-resource-' + entryCount, 32, () => {
    const resource = 'route:/feature-' + (cursor++ % features.length) + '/detail';
    return queryInspectBundle(bundle, { resources: [resource] }).artifacts.length;
  }),
  measure('impact-path-' + entryCount, 2, () => {
    const pathValue = paths[cursor++ % paths.length];
    return traceInspectImpact(bundle, { paths: [pathValue] }).registry.entries.length;
  }),
  measure('feature-map-' + entryCount, 2, () => {
    return createInspectFeatureMap(bundle).features.length;
  }),
  measure('proof-' + entryCount, 4, () => {
    return createInspectProof(bundle).hash.length;
  }),
  measure('jsonl-encode-' + entryCount, 2, () => {
    jsonl = encodeInspectJsonl(bundle);
    return jsonl.length;
  }),
  measure('jsonl-decode-' + entryCount, 2, () => {
    return decodeInspectJsonl(jsonl).summary.entryCount;
  }),
  measure('redact-' + entryCount, 2, () => {
    return redactInspectBundle(bundle, { redactKeys: ['token'], maxDepth: 8 }).summary.eventCount;
  }),
  measure('report-' + entryCount, 1, () => {
    return createInspectReport(bundle, {
      queries: [{ id: 'feature-0', query: { features: ['feature-0'] } }],
      impact: { paths: ['state.feature-0.input'] },
      includeFeatureMap: true
    }).summary.entryCount;
  })
];

const report = {
  package: '@shapeshift-labs/frontier-inspect',
  version: readPackageVersion(),
  generatedAt: new Date().toISOString(),
  node: process.version,
  platform: process.platform + ' ' + process.arch,
  entryCount,
  rounds,
  rows
};

if (outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
}

console.log(report.package + ' package benchmark');
console.log('Node ' + report.node + ' on ' + report.platform + ', entries=' + entryCount + ', rounds=' + rounds);
console.log('These are Frontier-only package measurements, not competitor comparisons.');
console.log('');
console.log(padRight('Fixture', 30) + padLeft('Median', 12) + padLeft('p95', 12));
for (const row of rows) {
  console.log(padRight(row.fixture, 30) + padLeft(formatUs(row.medianUs), 12) + padLeft(formatUs(row.p95Us), 12));
}
if (outPath) console.log('\nwrote ' + path.relative(repoRoot, outPath));

function makeFixture(count) {
  const entries = [];
  const records = [];
  const artifacts = [];
  const events = [];
  const featureCount = Math.max(4, Math.floor(Math.sqrt(count)));
  for (let i = 0; i < count; i++) {
    const feature = 'feature-' + (i % featureCount);
    const id = feature + '.entry.' + i;
    entries[entries.length] = {
      id,
      kind: i % 7 === 0 ? 'test' : i % 5 === 0 ? 'query' : 'action',
      feature,
      package: '@app/' + feature,
      reads: ['state.' + feature + '.input'],
      writes: ['state.' + feature + '.output.' + (i % 5)],
      touches: ['route:/' + feature + '/detail'],
      calls: i > 0 ? [feature + '.entry.' + Math.max(0, i - featureCount)] : undefined,
      tags: [i % 2 === 0 ? 'ui' : 'data'],
      source: { file: 'src/' + feature + '/entry-' + i + '.ts' }
    };
    records[records.length] = {
      id: 'record.' + i,
      entryId: id,
      status: i % 31 === 0 ? 'error' : 'ok',
      reads: ['state.' + feature + '.input'],
      writes: ['state.' + feature + '.output.' + (i % 5)]
    };
    events[events.length] = {
      id: 'event.' + i,
      entryId: id,
      recordId: 'record.' + i,
      feature,
      package: '@app/' + feature,
      path: 'state.' + feature + '.output.' + (i % 5),
      resource: 'route:/' + feature + '/detail',
      status: i % 31 === 0 ? 'error' : 'changed',
      severity: i % 31 === 0 ? 'error' : 'info',
      value: { index: i, token: 'bench-token-' + i }
    };
  }
  for (let i = 0; i < featureCount; i++) {
    const feature = 'feature-' + i;
    artifacts[artifacts.length] = {
      id: 'artifact.timeline.' + feature,
      kind: 'timeline',
      sourcePackage: '@shapeshift-labs/frontier-playwright',
      feature,
      resources: ['route:/' + feature + '/detail'],
      paths: ['state.' + feature + '.output.0'],
      entryIds: entries.filter((entry) => entry.feature === feature).slice(0, 8).map((entry) => entry.id),
      events: [
        {
          id: 'artifact.event.' + feature,
          type: 'mark',
          feature,
          resource: 'route:/' + feature + '/detail',
          status: 'changed'
        }
      ]
    };
  }
  return {
    graph: { entries, records },
    artifacts,
    events
  };
}

function measure(fixture, batchSize, fn) {
  const values = [];
  let sink = 0;
  for (let round = 0; round < rounds; round++) {
    const started = performance.now();
    for (let i = 0; i < batchSize; i++) sink += fn();
    values[values.length] = ((performance.now() - started) * 1000) / batchSize;
  }
  if (sink === -1) console.log('sink=' + sink);
  values.sort((left, right) => left - right);
  return {
    fixture,
    medianUs: percentile(values, 0.5),
    p95Us: percentile(values, 0.95)
  };
}

function percentile(values, p) {
  return values[Math.min(values.length - 1, Math.floor((values.length - 1) * p))] ?? 0;
}

function formatUs(value) {
  if (value >= 1000) return (value / 1000).toFixed(2) + ' ms';
  return value.toFixed(2) + ' us';
}

function padRight(value, width) {
  return String(value).padEnd(width, ' ');
}

function padLeft(value, width) {
  return String(value).padStart(width, ' ');
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--entries') out.entries = argv[++i];
    else if (arg === '--rounds') out.rounds = argv[++i];
    else if (arg === '--out') out.out = argv[++i];
  }
  return out;
}

function readPositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function readPackageVersion() {
  return JSON.parse(fs.readFileSync(path.join(packageDir, 'package.json'), 'utf8')).version;
}
