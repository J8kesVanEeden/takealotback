// Renders public/og-image.svg → public/og-image.png at 1200×630.
//
// Run once locally after editing the SVG:  npm run build:og
// The PNG is committed to the repo so Cloudflare Pages doesn't need sharp.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const svgPath = path.join(root, 'public', 'og-image.svg');
const pngPath = path.join(root, 'public', 'og-image.png');

const svg = await readFile(svgPath);

const png = await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'contain', background: '#F3F1EC' })
  .png({ compressionLevel: 9, quality: 92 })
  .toBuffer();

await writeFile(pngPath, png);

console.log(`og-image.png written → ${pngPath} (${png.byteLength.toLocaleString()} bytes)`);
