import assert from 'node:assert';
import {
  createInspectBundle,
  createInspectFeatureMap,
  createInspectProof,
  decodeInspectJsonl,
  encodeInspectJsonl,
  queryInspectBundle,
  redactInspectBundle,
  traceInspectImpact
} from '../dist/index.js';

const args = parseArgs(process.argv.slice(2));
const cases = readPositiveInt(args.cases, 300);
let seed = readPositiveInt(args.seed, 0x1a55ec7);

for (let i = 0; i < cases; i++) {
  const featureCount = randInt(1, 8);
  const entryCount = randInt(featureCount, featureCount * 8);
  const features = Array.from({ length: featureCount }, (_, index) => 'feature.' + index);
  const entries = [];
  const events = [];
  const artifacts = [];

  for (let j = 0; j < entryCount; j++) {
    const feature = pick(features);
    const id = feature + '.entry.' + j;
    entries.push({
      id,
      kind: pick(['action', 'query', 'effect', 'component', 'test']),
      feature,
      package: '@app/' + feature.replace('.', '-'),
      reads: ['state.' + feature + '.' + (j % 4)],
      writes: ['state.' + feature + '.out.' + (j % 3)],
      touches: ['route:/' + feature + '/' + j],
      tags: [pick(['ui', 'data', 'test', 'ai'])],
      source: { file: 'src/' + feature + '/' + j + '.ts' }
    });
    events.push({
      id: 'event.' + i + '.' + j,
      entryId: id,
      feature,
      path: 'state.' + feature + '.' + (j % 4),
      resource: 'route:/' + feature + '/' + j,
      status: chance(0.1) ? 'error' : 'changed',
      severity: chance(0.1) ? 'error' : 'info',
      value: { index: j, token: 'case-' + i + '-' + j }
    });
  }

  for (let j = 0; j < randInt(1, 12); j++) {
    const feature = pick(features);
    artifacts.push({
      id: 'artifact.' + i + '.' + j,
      kind: pick(['timeline', 'test', 'benchmark', 'migration']),
      sourcePackage: pick(['@shapeshift-labs/frontier-playwright', '@shapeshift-labs/frontier-migrations', '@app/tests']),
      feature,
      files: ['artifact/' + feature + '/' + j + '.json'],
      paths: ['state.' + feature + '.' + (j % 4)],
      resources: ['route:/' + feature + '/' + j],
      entryIds: entries.filter((entry) => entry.feature === feature).slice(0, 2).map((entry) => entry.id),
      tags: [feature, 'fuzz']
    });
  }

  const bundle = createInspectBundle({
    id: 'case.' + i,
    graph: { entries },
    artifacts,
    events
  });

  assert.strictEqual(bundle.summary.entryCount, entries.length);
  assert.ok(bundle.summary.featureCount >= 1);
  const feature = pick(features);
  const query = queryInspectBundle(bundle, { features: [feature] });
  assert.ok(query.registry.entries.every((entry) => entry.feature === feature));
  assert.ok(query.artifacts.every((artifact) => artifact.feature === feature));
  assert.ok(query.events.every((event) => event.feature === feature));

  const path = 'state.' + feature + '.0';
  const impact = traceInspectImpact(bundle, { paths: [path] });
  assert.strictEqual(impact.kind, 'frontier.inspect.impact');
  assert.ok(impact.paths.every((value) => value.startsWith('/')));

  const featureMap = createInspectFeatureMap(bundle);
  assert.ok(featureMap.features.length >= 1);

  const proof = createInspectProof(bundle);
  assert.match(proof.hash, /^[0-9a-f]{8}$/);

  const redacted = redactInspectBundle(bundle, { redactKeys: ['token'] });
  assert.ok(!JSON.stringify(redacted).includes('case-' + i + '-'));

  const decoded = decodeInspectJsonl(encodeInspectJsonl(redacted));
  assert.strictEqual(decoded.summary.entryCount, bundle.summary.entryCount);
  assert.strictEqual(decoded.summary.artifactCount, bundle.summary.artifactCount);
}

console.log(`frontier inspect fuzz passed: cases=${cases}`);

function rand() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 0x100000000;
}

function randInt(min, max) {
  return min + Math.floor(rand() * (max - min + 1));
}

function chance(probability) {
  return rand() < probability;
}

function pick(values) {
  return values[randInt(0, values.length - 1)];
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--cases') out.cases = argv[++i];
    else if (arg === '--seed') out.seed = argv[++i];
  }
  return out;
}

function readPositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}
