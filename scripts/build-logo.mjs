// Renders public/favicon.svg → public/logo.png at 512×512 on opaque
// background, suitable for the Organization.logo entry in JSON-LD.
//
// Why a separate logo.png from the favicon: Google's rich-card spec
// requires raster (PNG/JPEG) for `Organization.logo`. Square fits the
// widest range of CMSes and search-result rendering. 512×512 is a
// common upper bound — Google scales down for any consumer.
//
// Run once locally after editing favicon.svg:  npm run build:logo
// The PNG is committed to the repo so Cloudflare Pages doesn't need
// sharp at build time.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const svgPath = path.join(root, 'public', 'favicon.svg');
const pngPath = path.join(root, 'public', 'logo.png');

const svg = await readFile(svgPath);

const png = await sharp(svg, { density: 600 })
  .resize(512, 512, { fit: 'contain', background: '#121311' })
  .png({ compressionLevel: 9, quality: 92 })
  .toBuffer();

await writeFile(pngPath, png);

console.log(`logo.png written → ${pngPath} (${png.byteLength.toLocaleString()} bytes, 512×512)`);
