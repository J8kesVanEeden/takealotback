// Renders public/og-image.svg → public/og-image.png at 1200×630.
//
// Run locally after editing the SVG or when counts change:  npm run build:og
// The PNG is committed to the repo so Cloudflare Pages doesn't need sharp.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const svgPath = path.join(root, 'public', 'og-image.svg');
const pngPath = path.join(root, 'public', 'og-image.png');

// Keep the counts on the card in step with content.ts. In Nov 2026 the card still said
// "20 clauses / 16 templates" when the site had 24 and 23; check:counts now guards it too.
const content = await readFile(path.join(root, 'src', 'data', 'content.ts'), 'utf-8');
const block = (name) => content.match(new RegExp(`export const ${name}[\\s\\S]*?\\n\\];`))?.[0] ?? '';
const clauses = (block('CLAUSES').match(/\n\s+n:\s*"\d+"/g) || []).length;
const templates = (block('TEMPLATES').match(/\n\s+\{\s*code:\s*"T\d+"/g) || []).length;
const tiers = (block('ESCALATION').match(/\n\s+\{\s*tier:\s*\d+,/g) || []).length;
let svgText = (await readFile(svgPath, 'utf-8'))
  .replace(/\d+ CLAUSES/, `${clauses} CLAUSES`)
  .replace(/\d+ READY-TO-SEND TEMPLATES/, `${templates} READY-TO-SEND TEMPLATES`)
  .replace(/\d+-TIER ESCALATION/, `${tiers}-TIER ESCALATION`);
await writeFile(svgPath, svgText);
const svg = Buffer.from(svgText);

const png = await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'contain', background: '#F3F1EC' })
  .png({ compressionLevel: 9, quality: 92 })
  .toBuffer();

await writeFile(pngPath, png);

console.log(`og-image.png written → ${pngPath} (${png.byteLength.toLocaleString()} bytes)`);
