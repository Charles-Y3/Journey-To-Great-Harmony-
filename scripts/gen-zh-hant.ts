// Build-time script: collects every Simplified Chinese string authored in
// the app's content/UI data, converts each to Traditional Chinese via
// opencc-js, and writes a flat lookup table consumed at runtime by
// src/i18n/L.ts. Run with `npm run gen:i18n` whenever content changes.
//
// opencc-js is a devDependency only — its ~1MB conversion dictionary never
// ships to the browser; just the resulting (much smaller) flat map does.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as OpenCC from 'opencc-js';

import { TIMELINE } from '../src/data/timeline';
import { TOPICS } from '../src/data/knowledgeTree';
import { CHALLENGES } from '../src/data/challenges';
import { QUOTES } from '../src/data/quotes';
import { CARDS } from '../src/data/cards';
import { ADVISOR_WISDOM } from '../src/data/advisorWisdom';
import { BADGES } from '../src/data/badges';
import { REGIONS } from '../src/data/journeyMap';
import { WORLD_STAGES, BUILDINGS } from '../src/data/world';
import { PEERS } from '../src/data/peers';
import { GLYPHS } from '../src/data/glyphs';
import { TURNING_POINTS } from '../src/data/turningPoints';
import { CHANGELOG } from '../src/data/changelog';
import { SEASONAL_VIRTUES } from '../src/data/seasons';
import { RANKS, FOREST_STAGES } from '../src/engine/progression';
import { UI } from '../src/i18n/strings';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const CJK = /[㐀-鿿豈-﫿]/;

/** Recursively collect every full string value that contains CJK text. */
function collect(value: unknown, out: Set<string>): void {
  if (typeof value === 'string') {
    if (CJK.test(value)) out.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const v of value) collect(v, out);
    return;
  }
  if (value && typeof value === 'object') {
    for (const v of Object.values(value as Record<string, unknown>)) collect(v, out);
  }
}

const found = new Set<string>();
for (const root_ of [
  TIMELINE,
  TOPICS,
  CHALLENGES,
  QUOTES,
  CARDS,
  BADGES,
  REGIONS,
  WORLD_STAGES,
  BUILDINGS,
  PEERS,
  GLYPHS,
  TURNING_POINTS,
  CHANGELOG,
  SEASONAL_VIRTUES,
  RANKS,
  FOREST_STAGES,
  UI,
  ADVISOR_WISDOM,
]) {
  collect(root_, found);
}

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });
const map: Record<string, string> = {};
for (const s of found) {
  const converted = converter(s);
  if (converted !== s) map[s] = converted;
}

const outPath = path.join(root, 'src/i18n/zhHant.generated.json');
fs.writeFileSync(outPath, JSON.stringify(map), 'utf8');
console.log(`gen-zh-hant: wrote ${Object.keys(map).length} entries (of ${found.size} unique zh strings scanned) -> ${path.relative(root, outPath)}`);
