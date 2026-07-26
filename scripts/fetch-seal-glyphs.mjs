import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/assets/glyphs/seal');

const glyphs = [
  { file: 'xiao', cp: 0x5b5d },
  { file: 'ti', cp: 0x608c },
  { file: 'zhong', cp: 0x5fe0 },
  { file: 'xin', cp: 0x4fe1 },
  { file: 'li', cp: 0x79ae },
  { file: 'yi', cp: 0x7fa9 },
  { file: 'lian', cp: 0x5ec9 },
  { file: 'chi', cp: 0x6065 },
];

function cleanSvg(raw) {
  let s = raw.trim();
  if (!s.startsWith('<svg')) {
    throw new Error(`Not an SVG (${s.slice(0, 60)})`);
  }
  if (/viewBox=/.test(s)) {
    s = s.replace(/viewBox="[^"]*"/, 'viewBox="0 0 300 300"');
  } else {
    s = s.replace(/<svg([^>]*)>/, '<svg$1 viewBox="0 0 300 300">');
  }
  s = s.replace(/\swidth="[^"]*"/, '');
  s = s.replace(/\sheight="[^"]*"/, '');
  s = s.replace(/\sxmlns:xlink="[^"]*"/, '');
  // Paths may be self-closing (<path .../>). Force fill=currentColor for theming via CSS mask or inline.
  s = s.replace(/<path\b([^>]*?)\s*\/>/g, (_m, attrs) => {
    const cleaned = attrs.replace(/\sfill="[^"]*"/, '');
    return `<path${cleaned} fill="currentColor"/>`;
  });
  s = s.replace(/<path\b([^>]*?)>/g, (_m, attrs) => {
    if (attrs.includes('fill="currentColor"')) return `<path${attrs}>`;
    const cleaned = attrs.replace(/\sfill="[^"]*"/, '');
    return `<path${cleaned} fill="currentColor">`;
  });
  return `${s}\n`;
}

fs.mkdirSync(outDir, { recursive: true });

const ua =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

for (const g of glyphs) {
  const hex = g.cp.toString(16);
  const bucket = g.cp & 0xff;
  const url = `https://font.hanyuguoxue.com/swjz3/svg/${bucket}/${hex}.svg`;
  const dest = path.join(outDir, `${g.file}.svg`);
  execFileSync(
    'curl.exe',
    ['-sL', '-A', ua, '-H', 'Referer: https://www.hanyuguoxue.com/shuowen/', url, '-o', dest],
    { stdio: 'inherit' },
  );
  const cleaned = cleanSvg(fs.readFileSync(dest, 'utf8'));
  fs.writeFileSync(dest, cleaned, 'utf8');
  console.log('wrote', path.basename(dest), cleaned.length);
}

fs.writeFileSync(
  path.join(outDir, 'ATTRIBUTION.txt'),
  [
    'Seal-script (小篆) glyph outlines sourced from 汉语国学 · 说文解字',
    'https://www.hanyuguoxue.com/shuowen/',
    'Hosted locally for the Journey to Great Harmony Intermediate (八德) puzzles.',
    '',
  ].join('\n'),
  'utf8',
);

console.log('done');
