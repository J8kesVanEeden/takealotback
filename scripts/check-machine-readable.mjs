#!/usr/bin/env node
// check-machine-readable: llms.txt, llms-full.txt and the JSON-LD on every
// page must match the site they describe, and their dates must move when the
// content moves.
//
// Why this exists: llms.txt used to be a hand-written file. It fell behind the
// site (wrong claims, missing clauses, templates and citations) and nothing
// noticed. The JSON-LD said pages were last modified on the date their source
// was fetched, even after the page itself was rewritten. Both are now
// generated; this check proves the output is complete and current.
//
// What it checks (reads dist/, so build first; `npm run check:machine-readable` does):
//   llms.txt       every site link resolves to a built page and anchor; every
//                  homepage section, clause, template, deep-dive page and
//                  citation is listed; the review date is LAST_REVIEWED; the
//                  scope sentence is there; no em dashes.
//   llms-full.txt  one heading per clause, template and FAQ entry; every
//                  deep-dive page; every citation; the scope sentence.
//   About          the homepage About section carries the same scope sentence.
//   JSON-LD        every page: parses, has Organization + WebSite, and its main
//                  entity has the right @type for the page, url = canonical,
//                  breadcrumb ends at the canonical, headline = the source title,
//                  valid dates (published <= modified <= today). Homepage: FAQ,
//                  clause and template counts match the data; every listed
//                  anchor exists. Citation pages: dateModified = the later of
//                  `retrieved` and `updated`.
//   Freshness      (needs git and origin/main; skipped in a shallow clone)
//                  a citation edited on this branch must carry a newer `updated`,
//                  a deep-dive page a newer `dateModified`, and an edit to
//                  content.ts or a homepage component a newer CONTENT_UPDATED.
//
// Run: npm run check:machine-readable

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://takealotback.com';
const errors = [];
const notes = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('✗ dist/ is missing. Run `npm run build` first (npm run check:machine-readable does).');
  process.exit(1);
}

// ── Sources ─────────────────────────────────────────────────────────────
const read = (p) => readFileSync(join(ROOT, p), 'utf-8');
const contentTs = read('src/data/content.ts');
const constant = (name) => contentTs.match(new RegExp(`export const ${name} = "([^"]*)"`))?.[1];
const iso = (d) => (d ?? '').replace(/\./g, '-');
const LAST_REVIEWED = iso(constant('LAST_REVIEWED'));
const CONTENT_UPDATED = iso(constant('CONTENT_UPDATED'));
const SCOPE_LAW = constant('SCOPE_LAW');
if (!LAST_REVIEWED || !CONTENT_UPDATED || !SCOPE_LAW) fail('content.ts', 'LAST_REVIEWED, CONTENT_UPDATED or SCOPE_LAW not found');

const data = JSON.parse(readFileSync(join(DIST, 'api', 'data.json'), 'utf-8'));
const clauses = data.clauses;
const templates = data.templates;
const faq = data.faq;

function frontmatter(file) {
  const m = readFileSync(file, 'utf-8').match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '').replace(/\\"/g, '"');
  }
  return out;
}

const deepDives = readdirSync(join(ROOT, 'src/content/pages'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: f.replace(/\.md$/, ''), file: `src/content/pages/${f}`, fm: frontmatter(join(ROOT, 'src/content/pages', f)) }));

const citDir = join(ROOT, 'src/content/citations');
const citationFolders = readdirSync(citDir).filter((d) => statSync(join(citDir, d)).isDirectory());
const citations = citationFolders.flatMap((g) =>
  readdirSync(join(citDir, g))
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({
      group: g,
      // Astro slugs are the lower-cased path without the extension.
      slug: `${g}/${f.replace(/\.md$/, '')}`.toLowerCase(),
      file: `src/content/citations/${g}/${f}`,
      fm: frontmatter(join(citDir, g, f)),
    })),
);

// Every citation folder needs a group in src/lib/site-index.ts, or its pages
// drop out of the citations index and both llms files.
const siteIndex = read('src/lib/site-index.ts');
for (const g of citationFolders) {
  if (!new RegExp(`name: '${g}'`).test(siteIndex)) fail('src/lib/site-index.ts', `citation folder "${g}" has no entry in CITATION_GROUPS`);
}

// ── Built pages ─────────────────────────────────────────────────────────
const pageCache = new Map();
function pageFor(path) {
  // "/" → index.html, "/limits" → limits.html, "/citations/x/y" → citations/x/y.html
  const clean = path.replace(/\/$/, '') || '/index';
  const candidates = [join(DIST, `${clean}.html`), join(DIST, clean, 'index.html'), join(DIST, clean)];
  const file = candidates.find((c) => existsSync(c) && statSync(c).isFile());
  if (!file) return null;
  if (!pageCache.has(file)) pageCache.set(file, readFileSync(file, 'utf-8'));
  return pageCache.get(file);
}
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const home = pageFor('/');
const homeSections = [...home.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]);
const decode = (s) =>
  s.replace(/<[^>]+>/g, '').replace(/&#39;|&#x27;|&apos;/g, "'").replace(/&quot;|&#34;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

// Does a takealotback.com URL resolve to a built page (and anchor)?
function checkSiteUrl(where, url) {
  const u = new URL(url);
  const html = pageFor(u.pathname);
  if (html === null) return fail(where, `${url} has no built page`);
  if (u.hash && !ids(html).has(decodeURIComponent(u.hash.slice(1)))) fail(where, `${url}: no element with id "${u.hash.slice(1)}"`);
}

// ── llms.txt ────────────────────────────────────────────────────────────
const llms = readFileSync(join(DIST, 'llms.txt'), 'utf-8');
{
  const W = 'llms.txt';
  if (!/^# \S/.test(llms)) fail(W, 'must start with an H1');
  if (!/\n> \S/.test(llms)) fail(W, 'missing the > summary line');
  if (llms.includes('—')) fail(W, 'contains an em dash');
  if (!llms.includes(`last reviewed on ${LAST_REVIEWED}`)) fail(W, `review date is not LAST_REVIEWED (${LAST_REVIEWED})`);
  if (!llms.includes(SCOPE_LAW)) fail(W, 'missing the SCOPE_LAW sentence');
  const links = [...llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
  for (const url of links) if (url.startsWith(SITE)) checkSiteUrl(W, url);
  const listed = new Set(links);
  for (const id of homeSections) if (!listed.has(`${SITE}/#${id}`)) fail(W, `homepage section #${id} is not listed`);
  for (const c of clauses) if (!listed.has(`${SITE}/#clause-${c.slug}`)) fail(W, `clause ${c.n} (${c.slug}) is not listed`);
  for (const t of templates) if (!listed.has(`${SITE}/#template-${t.code}`)) fail(W, `template ${t.code} is not listed`);
  for (const p of deepDives) if (!listed.has(`${SITE}/${p.slug}`)) fail(W, `deep-dive page /${p.slug} is not listed`);
  for (const c of citations) if (!listed.has(`${SITE}/citations/${c.slug}`)) fail(W, `citation /citations/${c.slug} is not listed`);
}

// ── llms-full.txt ───────────────────────────────────────────────────────
{
  const W = 'llms-full.txt';
  const full = readFileSync(join(DIST, 'llms-full.txt'), 'utf-8');
  if (full.includes('—')) notes.push('llms-full.txt carries em dashes (they come from quoted source text in content.ts)');
  if (!full.includes(SCOPE_LAW)) fail(W, 'missing the SCOPE_LAW sentence');
  const count = (re) => (full.match(re) || []).length;
  if (count(/^### Clause \d+: /gm) !== clauses.length) fail(W, `clause headings ${count(/^### Clause \d+: /gm)} != ${clauses.length} clauses`);
  if (count(/^### T\d+: /gm) !== templates.length) fail(W, `template headings ${count(/^### T\d+: /gm)} != ${templates.length} templates`);
  for (const f of faq) if (!full.includes(`### ${f.q}`)) fail(W, `FAQ "${f.q.slice(0, 50)}" missing`);
  for (const p of deepDives) if (!full.includes(`URL: ${SITE}/${p.slug}`)) fail(W, `deep-dive /${p.slug} missing`);
  for (const c of citations) if (!full.includes(`${SITE}/citations/${c.slug}`)) fail(W, `citation /citations/${c.slug} missing`);
}

// ── About section says the same as the llms files ───────────────────────
{
  const about = home.match(/<section[^>]*id="about"[\s\S]*?<\/section>/)?.[0] ?? '';
  if (!decode(about).includes(SCOPE_LAW)) fail('index.html #about', 'does not contain the SCOPE_LAW sentence');
}

// ── JSON-LD on every page ───────────────────────────────────────────────
const TYPE_BY_GROUP = Object.fromEntries(
  [...read('src/lib/schema.ts').matchAll(/^\s+(\w+): '(\w+)',$/gm)].filter((m) => citationFolders.includes(m[1])).map((m) => [m[1], m[2]]),
);
const today = new Date().toISOString().slice(0, 10);
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const fmBySlug = new Map(citations.map((c) => [c.slug, c]));
const deepBySlug = new Map(deepDives.map((p) => [p.slug, p]));

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : f.endsWith('.html') ? [f] : [];
  });
}

function checkDates(W, e) {
  for (const k of ['datePublished', 'dateModified']) {
    if (e[k] !== undefined && !ISO.test(e[k])) fail(W, `${e['@type']}.${k} "${e[k]}" is not YYYY-MM-DD`);
    if (e[k] && e[k] > today) fail(W, `${e['@type']}.${k} ${e[k]} is in the future`);
  }
  if (e.datePublished && e.dateModified && e.datePublished > e.dateModified) fail(W, `${e['@type']} datePublished ${e.datePublished} is after dateModified ${e.dateModified}`);
}

let pagesChecked = 0;
for (const file of walk(DIST)) {
  const W = relative(DIST, file);
  const html = readFileSync(file, 'utf-8');
  const blocks = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { blocks.push(JSON.parse(m[1])); } catch (err) { fail(W, `JSON-LD does not parse: ${err.message}`); }
  }
  pagesChecked++;
  const byType = (t) => blocks.filter((b) => b['@type'] === t);
  for (const t of ['Organization', 'WebSite']) if (byType(t).length !== 1) fail(W, `expected one ${t} block, found ${byType(t).length}`);
  blocks.forEach((b) => checkDates(W, b));

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const crumbs = byType('BreadcrumbList')[0];
  if (crumbs) {
    const last = crumbs.itemListElement.at(-1);
    if (last?.item !== canonical) fail(W, `breadcrumb ends at ${last?.item}, canonical is ${canonical}`);
    crumbs.itemListElement.forEach((c, i) => { if (c.position !== i + 1) fail(W, 'breadcrumb positions out of order'); });
  }

  const path = `/${W.replace(/\.html$/, '').replace(/(^|\/)index$/, '')}`;
  if (path === '/') {
    const [faqPage] = byType('FAQPage');
    const [col] = byType('CollectionPage');
    const [tplList] = byType('ItemList');
    if (!faqPage || !col || !tplList) { fail(W, 'homepage needs FAQPage, CollectionPage and ItemList'); continue; }
    if (faqPage.mainEntity.length !== faq.length) fail(W, `FAQPage has ${faqPage.mainEntity.length} questions, the site has ${faq.length}`);
    faqPage.mainEntity.forEach((q, i) => { if (q.name !== faq[i]?.q) fail(W, `FAQPage question ${i + 1} differs from the FAQ data`); });
    const expectItems = clauses.length + templates.length;
    if (col.mainEntity.numberOfItems !== expectItems || col.mainEntity.itemListElement.length !== expectItems) fail(W, `CollectionPage lists ${col.mainEntity.itemListElement.length} items (numberOfItems ${col.mainEntity.numberOfItems}), expected ${expectItems}`);
    for (const it of col.mainEntity.itemListElement) checkSiteUrl(W, it.url);
    if (tplList.numberOfItems !== templates.length || tplList.itemListElement.length !== templates.length) fail(W, `templates ItemList has ${tplList.itemListElement.length}, the site has ${templates.length}`);
    const wantModified = [LAST_REVIEWED, CONTENT_UPDATED].sort().pop();
    if (col.dateModified !== wantModified) fail(W, `CollectionPage dateModified ${col.dateModified}, expected ${wantModified} (later of LAST_REVIEWED and CONTENT_UPDATED)`);
    if (col.url !== canonical) fail(W, `CollectionPage url ${col.url} != canonical ${canonical}`);
  } else if (path === '/citations') {
    const [col] = byType('CollectionPage');
    if (!col) { fail(W, 'needs a CollectionPage'); continue; }
    if (col.hasPart.length !== citations.length) fail(W, `CollectionPage hasPart ${col.hasPart.length}, there are ${citations.length} citations`);
    for (const p of col.hasPart) checkSiteUrl(W, p.url);
    if (col.url !== canonical) fail(W, `url ${col.url} != canonical ${canonical}`);
  } else if (path.startsWith('/citations/')) {
    const slug = path.slice('/citations/'.length);
    const c = fmBySlug.get(slug);
    if (!c) { fail(W, 'built citation page with no source file'); continue; }
    const want = TYPE_BY_GROUP[c.group] ?? 'Article';
    const [main] = byType(want);
    if (!main) { fail(W, `expected a ${want} block`); continue; }
    if (main.url !== canonical || main.mainEntityOfPage !== canonical) fail(W, `${want} url ${main.url} != canonical ${canonical}`);
    if (main.headline !== c.fm.title) fail(W, `headline "${main.headline}" != title "${c.fm.title}" in ${c.file}`);
    const dates = [c.fm.retrieved, c.fm.updated].map(iso).filter((d) => ISO.test(d)).sort();
    const wantMod = dates.pop() ?? LAST_REVIEWED;
    if (main.dateModified !== wantMod) fail(W, `dateModified ${main.dateModified}, expected ${wantMod} (later of retrieved and updated)`);
  } else if (deepBySlug.has(path.slice(1))) {
    const p = deepBySlug.get(path.slice(1));
    const [main] = byType('Article');
    if (!main) { fail(W, 'expected an Article block'); continue; }
    if (main.url !== canonical) fail(W, `Article url ${main.url} != canonical ${canonical}`);
    if (main.headline !== p.fm.title) fail(W, `headline "${main.headline}" != title "${p.fm.title}"`);
    const wantMod = [iso(p.fm.dateModified), LAST_REVIEWED].filter((d) => ISO.test(d)).sort().pop();
    if (main.dateModified !== wantMod) fail(W, `dateModified ${main.dateModified}, expected ${wantMod}`);
  } else if (path !== '/404') {
    fail(W, 'page type unknown to check-machine-readable: add a case for it');
  }
}

// ── Freshness: dates must move when content moves ───────────────────────
function git(...a) {
  return execFileSync('git', a, { cwd: ROOT, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}
let base = null;
try {
  if (git('rev-parse', '--is-shallow-repository') === 'true') throw new Error('shallow');
  git('rev-parse', '--verify', 'origin/main');
  base = git('merge-base', 'HEAD', 'origin/main');
} catch {
  notes.push('freshness check skipped (no origin/main or a shallow clone); it runs locally and in the pre-push hook');
}
if (base) {
  const baseDate = git('show', '-s', '--format=%cs', base);
  const changed = new Set(
    [...git('diff', '--name-only', base, '--', 'src').split('\n'), ...git('ls-files', '--others', '--exclude-standard', 'src').split('\n')].filter(Boolean),
  );
  const fieldAt = (ref, file, key) => {
    try { return frontmatterText(git('show', `${ref}:${file}`))[key]; } catch { return undefined; }
  };
  // Fresh = moved on this branch, or already today's date (a second edit on
  // the day of the last bump), and never older than the branch point.
  const fresh = (now, before) =>
    now && ISO.test(iso(now)) && iso(now) >= baseDate && (iso(now) !== iso(before ?? '') || iso(now) === today);
  for (const c of citations) {
    if (!changed.has(c.file)) continue;
    const before = fieldAt(base, c.file, 'updated');
    const retrievedNow = iso(c.fm.retrieved);
    if (!fresh(c.fm.updated, before) && !(retrievedNow >= baseDate && retrievedNow !== iso(fieldAt(base, c.file, 'retrieved') ?? ''))) {
      fail(c.file, `edited since ${baseDate} but \`updated:\` is still ${c.fm.updated ?? '(none)'}. Set it to the date of the edit`);
    }
  }
  for (const p of deepDives) {
    if (!changed.has(p.file)) continue;
    if (!fresh(p.fm.dateModified, fieldAt(base, p.file, 'dateModified'))) fail(p.file, `edited since ${baseDate} but \`dateModified:\` is still ${p.fm.dateModified ?? '(none)'}. Set it to the date of the edit`);
  }
  const homeFiles = [...changed].filter((f) => f === 'src/data/content.ts' || /^src\/components\/[^/]+\.astro$/.test(f));
  if (homeFiles.length) {
    let before;
    try { before = git('show', `${base}:src/data/content.ts`).match(/export const CONTENT_UPDATED = "([^"]*)"/)?.[1]; } catch {}
    if (!fresh(CONTENT_UPDATED, before)) fail('src/data/content.ts', `homepage files changed since ${baseDate} (${homeFiles.join(', ')}) but CONTENT_UPDATED is still ${CONTENT_UPDATED}. Set it to the date of the edit`);
  }
}
function frontmatterText(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (m) for (const line of m[1].split('\n')) { const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/); if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, ''); }
  return out;
}

// ── Report ──────────────────────────────────────────────────────────────
for (const n of notes) console.log(`  note: ${n}`);
if (errors.length) {
  console.error(`✗ machine-readable check: ${errors.length} problem(s)`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`✓ machine-readable check passed: llms.txt, llms-full.txt and JSON-LD on ${pagesChecked} pages match the site (${clauses.length} clauses, ${templates.length} templates, ${faq.length} FAQ, ${deepDives.length} deep dives, ${citations.length} citations).`);
