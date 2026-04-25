#!/usr/bin/env node
// check-live — post-deploy smoke test against the live site.
//
// Hits the dozen or so URLs that matter most, asserts each returns
// 200 with the right shape, and bails loudly on anything stale or
// drifted. Run after a deploy to confirm the edge is serving the build
// you just shipped (not a cached older version).
//
// Usage:
//   node scripts/check-live.mjs                    # default: takealotback.com
//   node scripts/check-live.mjs --base https://...  # any other origin (e.g. preview)
//
// What this catches that other checks don't:
// - Cloudflare Pages redeploy didn't finish before edge served stale HTML
// - _headers / _redirects rules aren't deployed correctly
// - JSON API endpoint regressed (different counts on live vs source)
// - RSS dropped items vs expected
// - Sitemap missing URLs

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');

// Args
const args = process.argv.slice(2);
const baseIdx = args.indexOf('--base');
const BASE = baseIdx >= 0 ? args[baseIdx + 1] : 'https://takealotback.com';

// Derive expected counts from local source so we can detect drift.
const contentTs = readFileSync(join(ROOT, 'src', 'data', 'content.ts'), 'utf-8');
const expected = {
  clauses: (contentTs.match(/export const CLAUSES[\s\S]*?\n\];/)?.[0].match(/\n\s+n:\s*"\d+"/g) || []).length,
  templates: (contentTs.match(/export const TEMPLATES[\s\S]*?\n\];/)?.[0].match(/\n\s+\{\s*code:\s*"T\d+"/g) || []).length,
  escalation: (contentTs.match(/export const ESCALATION[\s\S]*?\n\];/)?.[0].match(/\n\s+\{\s*tier:\s*\d+,/g) || []).length,
};

const findings = [];
function bug(msg) { findings.push(msg); }

async function fetchText(path, label) {
  const url = path.startsWith('http') ? path : BASE + path;
  const r = await fetch(url, { headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'check-live/1.0' } });
  if (r.status !== 200) bug(`${label} ${url} → ${r.status}`);
  return { res: r, body: await r.text() };
}

async function fetchJson(path, label) {
  const { res, body } = await fetchText(path, label);
  try { return { res, json: JSON.parse(body) }; }
  catch (e) { bug(`${label} not valid JSON: ${e.message}`); return { res, json: null }; }
}

async function main() {
  console.log(`smoke-testing ${BASE}`);

  // Status sweep — every key surface returns 200.
  const surfaces = [
    '/',
    '/onus-of-proof',
    '/aedilitian-remedies',
    '/limits',
    '/citations',
    '/citations/cases/motus-wentzel-zasca-40-2021',
    '/citations/statutes/cpa-2008',
    '/citations/regulators/cgso-contacts-2026-04-24',
    '/api/data.json',
    '/rss.xml',
    '/sitemap-index.xml',
    '/sitemap-0.xml',
    '/llms.txt',
    '/llms-full.txt',
    '/robots.txt',
    '/og-image.png',
    '/favicon.svg',
  ];
  await Promise.all(surfaces.map((p) => fetchText(p, '200')));

  // Home: JSON-LD types match expectations, hreflang present, canonical correct.
  const { body: home } = await fetchText('/', 'home');
  for (const t of ['Organization', 'WebSite', 'FAQPage', 'CollectionPage']) {
    if (!new RegExp(`"@type":"${t}"`).test(home)) bug(`home missing @type=${t}`);
  }
  if (!/hreflang="en-ZA"/.test(home)) bug('home missing hreflang en-ZA');
  if (!/<link rel="canonical" href="https:\/\/takealotback\.com\/"/.test(home)) bug('home canonical wrong');

  // API parity — counts on live match counts derived from source.
  const { json: api } = await fetchJson('/api/data.json', 'api');
  if (api) {
    if (api.counts?.clauses !== expected.clauses) bug(`api clauses=${api.counts?.clauses}, expected ${expected.clauses}`);
    if (api.counts?.templates !== expected.templates) bug(`api templates=${api.counts?.templates}, expected ${expected.templates}`);
    if (api.counts?.escalation_tiers !== expected.escalation) bug(`api escalation=${api.counts?.escalation_tiers}, expected ${expected.escalation}`);
  }

  // RSS — ≥ deep dives + expected citation count.
  const { body: rss } = await fetchText('/rss.xml', 'rss');
  const rssItems = (rss.match(/<item>/g) || []).length;
  // 3 deep dives + 32 citations is the current shape; allow ≥ that.
  if (rssItems < 35) bug(`rss items=${rssItems}, expected ≥35`);

  // Sitemap — should reference sitemap-0.xml (index pattern).
  const { body: sitemapIdx } = await fetchText('/sitemap-index.xml', 'sitemap-index');
  if (!/sitemap-0\.xml/.test(sitemapIdx)) bug('sitemap-index missing sitemap-0.xml ref');

  const { body: sitemap0 } = await fetchText('/sitemap-0.xml', 'sitemap-0');
  const sitemapUrls = (sitemap0.match(/<loc>/g) || []).length;
  // Pages: home + 3 deep dives + /citations + 32 citation pages = 37
  const expectedSitemap = 1 + 3 + 1 + 32;
  if (sitemapUrls < expectedSitemap) bug(`sitemap urls=${sitemapUrls}, expected ≥${expectedSitemap}`);

  // Redirect spot-check — trailing slash + .html legacy URLs go 301.
  for (const path of ['/onus-of-proof.html', '/citations/', '/citations/cases/']) {
    const r = await fetch(BASE + path, { redirect: 'manual', headers: { 'Cache-Control': 'no-cache' } });
    if (r.status !== 301) bug(`${path} expected 301, got ${r.status}`);
  }

  // Done.
  if (findings.length === 0) {
    console.log(`✓ live-site smoke test passed — ${surfaces.length} surfaces 200, ${rssItems} RSS items, ${sitemapUrls} sitemap URLs, API counts match source.`);
    return;
  }

  console.error('✗ live-site issues:');
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}

main().catch((e) => {
  console.error('smoke test runtime error:', e.message);
  process.exit(2);
});
