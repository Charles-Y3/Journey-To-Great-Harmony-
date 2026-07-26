import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../src/assets/glyphs/seal');

/** Rough path bbox from numeric pairs in `d` (enough for these single-path seals). */
function pathBBox(d) {
  const nums = [...d.matchAll(/-?\d*\.?\d+/g)].map((m) => Number(m[0]));
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i + 1];
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  if (!Number.isFinite(minX)) throw new Error('No coordinates in path');
  return { minX, minY, maxX, maxY };
}

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.svg'))) {
  const dest = path.join(dir, file);
  let s = fs.readFileSync(dest, 'utf8');
  const m = s.match(/d="([^"]+)"/);
  if (!m) throw new Error(`No path in ${file}`);
  const { minX, minY, maxX, maxY } = pathBBox(m[1]);
  const w = maxX - minX;
  const h = maxY - minY;
  const padX = w * 0.03;
  const padY = h * 0.03;
  const vbX = minX - padX;
  const vbY = minY - padY;
  const vbW = w + padX * 2;
  const vbH = h + padY * 2;
  const viewBox = `${vbX.toFixed(2)} ${vbY.toFixed(2)} ${vbW.toFixed(2)} ${vbH.toFixed(2)}`;
  s = s.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`);
  fs.writeFileSync(dest, s, 'utf8');
  console.log(file, `viewBox ${vbW.toFixed(0)}×${vbH.toFixed(0)}`);
}
