// Walks every HTML file in dist/ and verifies that every in-page anchor
// reference has a matching element id on the page it resolves to.
//
// What it checks:
//   - <a href="#foo"> → same page must have an element with id="foo"
//   - <a href="/#foo"> (or href="/") → dist/index.html must have id="foo"
//   - <a href="/some/path#foo"> → dist/some/path.html must have id="foo"
//   - data-jump="foo" (our Header nav)                   → index.html id
//   - data-jump-tpl="T07" (Dismantled "Use template")    → index.html id="template-T07"
//   - data-triage-openclause="05"  → index.html id="clause-<slug>"
//       (Slug map mirrored from TriageModal's CLAUSE_SLUGS object.)
//   - data-triage-opentpl="T07"    → index.html id="template-T07"
//
// Exit code is non-zero if anything is broken, so you can wire this into CI
// or a pre-push hook.
//
// Run:   npm run check:anchors   (rebuilds dist first)

import { readdir, readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');
const distDir = path.join(root, 'dist');

// CLAUSE_SLUGS is derived from src/data/content.ts at runtime so this
// script and the CLAUSES array can never drift apart. Adding a new
// clause to content.ts is the only update required.
function readClauseSlugs() {
  const contentTs = readFileSync(path.join(root, 'src', 'data', 'content.ts'), 'utf-8');
  const clausesBlock = contentTs.match(/export const CLAUSES[\s\S]*?\n\];/);
  if (!clausesBlock) {
    throw new Error('check-anchors: failed to parse CLAUSES block from content.ts');
  }
  const out = {};
  const re = /n:\s*"(\d+)",\s*slug:\s*"([a-z0-9-]+)"/g;
  let m;
  while ((m = re.exec(clausesBlock[0])) !== null) {
    out[m[1]] = m[2];
  }
  return out;
}
const CLAUSE_SLUGS = readClauseSlugs();

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = path.join(dir, name);
    const s = await stat(p);
    if (s.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function collectIds(html) {
  // Match id="..." — tolerate single or double quotes, any order of attrs.
  const re = /\sid=["']([^"']+)["']/g;
  const ids = new Set();
  let m;
  while ((m = re.exec(html))) ids.add(m[1]);
  return ids;
}

function collectAnchorRefs(html) {
  const refs = [];
  const hrefRe = /\shref=["']([^"']+)["']/g;
  let m;
  while ((m = hrefRe.exec(html))) {
    const href = m[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (!href.includes('#')) continue;
    refs.push({ kind: 'href', raw: href });
  }
  const dataAttrs = [
    ['data-jump', 'index', (v) => v],
    ['data-jump-tpl', 'index', (v) => `template-${v}`],
    ['data-triage-opentpl', 'index', (v) => `template-${v}`],
    ['data-triage-openclause', 'index', (v) => {
      const slug = CLAUSE_SLUGS[v];
      return slug ? `clause-${slug}` : null;
    }],
  ];
  for (const [attr, target, toId] of dataAttrs) {
    const re = new RegExp(`\\s${attr}=["']([^"']+)["']`, 'g');
    let mm;
    while ((mm = re.exec(html))) {
      const id = toId(mm[1]);
      if (id) refs.push({ kind: 'data', attr, value: mm[1], targetId: id, target });
    }
  }
  return refs;
}

function relPathForHref(href, currentFile) {
  // Separate path and fragment
  const [rawPath, fragment] = href.split('#');
  if (!fragment) return null; // no anchor
  let targetFile = currentFile;
  if (rawPath === '' || rawPath === undefined) {
    // same-page anchor
    targetFile = currentFile;
  } else if (rawPath.startsWith('/')) {
    // absolute path within the site
    const trimmed = rawPath.replace(/^\//, '').replace(/\/$/, '');
    if (trimmed === '') targetFile = path.join(distDir, 'index.html');
    else targetFile = path.join(distDir, trimmed + '.html');
  } else {
    // relative path — resolve against current file's directory
    const dir = path.dirname(currentFile);
    const joined = path.resolve(dir, rawPath);
    const ext = path.extname(joined);
    targetFile = ext ? joined : joined + '.html';
  }
  return { targetFile, fragment };
}

async function main() {
  const files = (await walk(distDir)).sort();
  const cache = new Map(); // file → Set<id>

  async function idsFor(file) {
    if (!cache.has(file)) {
      try {
        const html = await readFile(file, 'utf8');
        cache.set(file, collectIds(html));
      } catch {
        cache.set(file, null);
      }
    }
    return cache.get(file);
  }

  const problems = [];

  for (const file of files) {
    const rel = path.relative(distDir, file);
    const html = await readFile(file, 'utf8');
    const refs = collectAnchorRefs(html);
    for (const ref of refs) {
      let targetFile;
      let fragment;
      if (ref.kind === 'href') {
        const resolved = relPathForHref(ref.raw, file);
        if (!resolved) continue;
        targetFile = resolved.targetFile;
        fragment = resolved.fragment;
        if (!fragment) continue;
      } else {
        // data-* attribute — target is always index.html in this project.
        targetFile = path.join(distDir, 'index.html');
        fragment = ref.targetId;
      }

      const ids = await idsFor(targetFile);
      if (ids === null) {
        problems.push(`[${rel}] → ${ref.kind === 'href' ? ref.raw : ref.attr + '=' + ref.value}: target file not found (${path.relative(distDir, targetFile)})`);
        continue;
      }
      if (!ids.has(fragment)) {
        problems.push(`[${rel}] → ${ref.kind === 'href' ? ref.raw : ref.attr + '=' + ref.value}: no element with id="${fragment}" in ${path.relative(distDir, targetFile)}`);
      }
    }
  }

  if (problems.length === 0) {
    console.log(`✓ anchor check passed — ${files.length} HTML files scanned, no broken in-page references.`);
    process.exit(0);
  } else {
    console.log(`✗ anchor check found ${problems.length} problem${problems.length === 1 ? '' : 's'}:`);
    for (const p of problems) console.log('  ' + p);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
