// Push URLs to the Wayback Machine via Save Page Now (SPN).
//
// Why: third-party version-insurance for every substantive content change.
// If a Takealot policy edits silently, or our own site goes down, or
// SAFLII shuffles a URL, the version we relied on at a specific date is
// recoverable from web.archive.org.
//
// Usage:
//   npm run archive                  -- archives the default URL list
//                                       (site key pages + Takealot policies)
//   npm run archive -- --all         -- archives every URL in the sitemap
//                                       plus the Takealot policy URLs
//   npm run archive -- <url> [<url>] -- archives just the URLs you pass
//   npm run archive -- --json         -- machine-readable output for piping
//                                        into citation file updates
//
// Notes:
// - SPN is rate-limited (~12 req/min per IP). The script paces requests at
//   ~6 seconds apart by default; bursts will get throttled regardless.
// - Each save returns a 302 redirect to the new web/<timestamp>/<url>
//   path. We capture the timestamp from the redirect Location header.
// - Failures (timeouts, 5xx, blocked by robots.txt at SPN) are reported
//   but don't abort the run — partial archival is better than nothing.

import { argv } from 'node:process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');

const SITE = 'https://takealotback.com';

// Default list — the highest-value pages whose continuity matters most.
const DEFAULT_URLS = [
  // Site canonical pages
  `${SITE}/`,
  `${SITE}/onus-of-proof`,
  `${SITE}/aedilitian-remedies`,
  `${SITE}/limits`,
  `${SITE}/citations`,
  // Site critical infrastructure
  `${SITE}/sitemap.xml`,
  `${SITE}/llms.txt`,
  `${SITE}/llms-full.txt`,
  `${SITE}/rss.xml`,
  // Highest-value citation pages
  `${SITE}/citations/statutes/cpa-2008`,
  `${SITE}/citations/statutes/cpa-regulations-2011`,
  `${SITE}/citations/cases/motus-wentzel-zasca-40-2021`,
  `${SITE}/citations/cases/cgso-voltex-zagpphc-309-2021`,
  `${SITE}/citations/policies/takealot-returns-2026-04-24`,
  `${SITE}/citations/policies/takealot-tcs-2026-04-24`,
  // External — Takealot's own current policy URLs (so we have a fresh
  // archival snapshot every time we refresh our policy citation files)
  'https://terms-and-policies.takealot.com/',
  'https://terms-and-policies.takealot.com/terms-conditions/',
];

const args = argv.slice(2);
const flagAll = args.includes('--all');
const flagJson = args.includes('--json');
const positional = args.filter((a) => !a.startsWith('--'));

async function urlsToArchive() {
  if (positional.length > 0) return positional;
  if (flagAll) return await loadAllSiteUrls();
  return DEFAULT_URLS;
}

async function loadAllSiteUrls() {
  // Prefer the live sitemap. After a deploy, takealotback.com/sitemap-0.xml
  // reflects exactly what's been shipped — and in CI this is the only
  // option (no `dist/` exists in the wayback workflow's checkout).
  // Fall back to a local dist build, then DEFAULT_URLS, in that order.
  const liveXml = await fetchLiveSitemap();
  const xml = liveXml ?? (await readLocalSitemap());
  if (!xml) return DEFAULT_URLS;
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (matches.length === 0) return DEFAULT_URLS;
  // Plus the Takealot live URLs we always want fresh snapshots of.
  return [...matches, 'https://terms-and-policies.takealot.com/', 'https://terms-and-policies.takealot.com/terms-conditions/'];
}

async function fetchLiveSitemap() {
  try {
    const r = await fetch('https://takealotback.com/sitemap-0.xml', {
      headers: { 'User-Agent': 'TakealotBack-archive-bot/1.0' },
      signal: AbortSignal.timeout(15_000),
    });
    if (!r.ok) return null;
    return await r.text();
  } catch { return null; }
}

async function readLocalSitemap() {
  try {
    return await readFile(path.join(root, 'dist', 'sitemap-0.xml'), 'utf8');
  } catch { return null; }
}

async function archive(url) {
  const saveUrl = `https://web.archive.org/save/${url}`;
  const startedAt = new Date().toISOString();

  // SPN frequently 429s the first request after ~12 req/min. Single shot
  // turns transient throttling into permanent misses for the run.
  // Retry on 429 with exponential backoff (12s, 24s, 48s) — capped at 3
  // retries so a single URL can't eat the whole job timeout.
  const maxAttempts = 4;
  let lastStatus = null;
  let lastErr = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(saveUrl, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(30_000),
        headers: {
          'User-Agent': 'TakealotBack-archive-bot/1.0 (+https://takealotback.com/)',
          'Accept': 'text/html',
        },
      });
      if (res.status === 302 || res.status === 301) {
        const loc = res.headers.get('location') || '';
        const m = loc.match(/\/web\/(\d{14})\//);
        const timestamp = m ? m[1] : null;
        return { url, status: 'ok', startedAt, archiveUrl: loc, timestamp, attempts: attempt };
      }
      if (res.status === 429) {
        lastStatus = 429;
        if (attempt < maxAttempts) {
          await sleep(12_000 * attempt);
          continue;
        }
        return { url, status: 'rate-limited', startedAt, httpStatus: 429, attempts: attempt };
      }
      // Other non-redirect responses — don't retry, they're typically deterministic.
      return { url, status: 'unexpected', startedAt, httpStatus: res.status, attempts: attempt };
    } catch (err) {
      lastErr = err;
      // Network / timeout errors — retry once or twice; SPN flakes happen.
      if (attempt < maxAttempts) {
        await sleep(6_000 * attempt);
        continue;
      }
      return { url, status: 'error', startedAt, error: String(err?.message || err), attempts: attempt };
    }
  }

  // Defensive — shouldn't reach here.
  return { url, status: 'error', startedAt, error: lastErr ? String(lastErr) : `unresolved status ${lastStatus}`, attempts: maxAttempts };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const urls = await urlsToArchive();
  if (!flagJson) {
    console.log(`Archiving ${urls.length} URL${urls.length === 1 ? '' : 's'} to the Wayback Machine.`);
    console.log(`Pacing requests ~6s apart to stay under SPN's rate limit.\n`);
  }

  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (!flagJson) process.stdout.write(`  [${i + 1}/${urls.length}] ${url}  ... `);
    const r = await archive(url);
    results.push(r);
    if (!flagJson) {
      if (r.status === 'ok' && r.timestamp) console.log(`✓ ${r.timestamp}`);
      else if (r.status === 'rate-limited') console.log('⏸ rate-limited');
      else if (r.status === 'error') console.log(`✗ ${r.error}`);
      else console.log(`? ${r.status}`);
    }
    if (i < urls.length - 1) await sleep(6000);
  }

  if (flagJson) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  const ok = results.filter((r) => r.status === 'ok').length;
  const failed = results.length - ok;
  console.log(`\n${ok} archived, ${failed} failed/rate-limited.`);
  if (failed > 0) {
    console.log('Re-run later for the failed ones; SPN sometimes throttles.');
  }
  console.log('\nPaste these into citation file frontmatter as `wayback_url_dated`:');
  for (const r of results) {
    if (r.status === 'ok' && r.timestamp) {
      console.log(`  ${r.url}`);
      console.log(`    https://web.archive.org/web/${r.timestamp}/${r.url}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
