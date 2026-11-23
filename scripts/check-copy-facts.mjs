#!/usr/bin/env node
// check-copy-facts — guard for copy rewrites: nothing legal may go missing.
//
// Why this exists: a copy edit may change the wording of any public sentence, but
// it must not change the facts. A rewrite is allowed to change the wording; it is not
// allowed to drop a statute section, a rand amount, a date, a year, a quote or a
// blockquoted extract. This script compares each public-copy file against a base
// git ref (default: main) and fails when a fact token present in the base file is
// absent from the working copy.
//
// It compares SETS per file, not counts: saying "s 56" once instead of twice is
// fine; losing "s 56" from a file entirely is not.
//
// Usage:  node scripts/check-copy-facts.mjs [--base <ref>] [--verbose]
// Allowlist: internal/facts-allow.txt (maintainer's copy, optional), one `path|token`
// per line, for losses that were checked and are intended (with a # reason).

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const args = process.argv.slice(2);
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'main';
const verbose = args.includes('--verbose');

const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });

// Public copy lives here.
const files = git('ls-files', 'src', 'public/llms.txt')
  .split('\n')
  .filter((f) => /\.(astro|ts|md|mdx|txt)$/.test(f));

const allowPath = join(ROOT, 'internal/facts-allow.txt');
const allow = new Set(
  existsSync(allowPath)
    ? readFileSync(allowPath, 'utf-8').split('\n').map((l) => l.replace(/\s+#.*$/, '').trim()).filter(Boolean)
    : [],
);

const norm = (s) => s.replace(/\\"/g, '"').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim();

function tokens(text, isCode) {
  const t = norm(text);
  const out = new Set();
  const add = (kind, v) => out.add(`${kind}:${v.replace(/\s+/g, ' ').trim()}`);
  // Statute sections: s 56, s 56(2), s 19(1)(b), ss 55-56, section 44
  for (const m of t.matchAll(/\b(?:ss?|sections?|reg(?:ulation)?s?|para(?:graph)?s?|clause)\s?\d+[A-Z]?(?:\(\w{1,4}\))*/gi)) {
    add('ref', m[0].replace(/^(sections?)\s?/i, 's ').replace(/^(\w+)\s?/, (x, w) => w.toLowerCase() + ' '));
  }
  // Rand amounts
  for (const m of t.matchAll(/R\s?\d[\d,\s]*(?:\.\d+)?(?:\s?(?:million|bn|billion|m)\b)?/g)) add('rand', m[0].replace(/\s/g, ''));
  // Percentages
  for (const m of t.matchAll(/\b\d+(?:\.\d+)?\s?%/g)) add('pct', m[0].replace(/\s/g, ''));
  // ISO and written dates, and years
  for (const m of t.matchAll(/\b\d{4}-\d{2}-\d{2}\b/g)) add('date', m[0]);
  for (const m of t.matchAll(/\b\d{1,2} (?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}\b/g)) add('date', m[0]);
  for (const m of t.matchAll(/\b(?:19|20)\d{2}\b/g)) add('year', m[0]);
  // Neutral citations: [2026] ZAGPJHC 386
  for (const m of t.matchAll(/\[\d{4}\] Z[A-Z]+ \d+/g)) add('cite', m[0]);
  // Quotes of 4+ words (verbatim source text must survive untouched)
  // In .ts/.astro every string literal is "…", so only escaped \"…\" and curly quotes count there.
  const qre = isCode ? /\\"((?:(?!\\").){20,}?)\\"|“([^”]{20,}?)”/g : /"([^"\n]{20,}?)"|“([^”]{20,}?)”/g;
  for (const m of text.matchAll(qre)) {
    const q = norm(m[1] ?? m[2]);
    if (q.split(' ').length >= 4) add('quote', q);
  }
  // Markdown blockquote lines
  for (const line of text.split('\n')) if (/^\s*>\s?\S/.test(line)) add('blockquote', norm(line.replace(/^\s*>\s?/, '')));
  return out;
}

let failures = 0;
let checked = 0;
for (const f of files) {
  let old;
  try { old = git('show', `${base}:${f}`); } catch { continue; } // new file
  const cur = existsSync(join(ROOT, f)) ? readFileSync(join(ROOT, f), 'utf-8') : '';
  if (old === cur) continue;
  checked++;
  const isCode = /\.(ts|astro)$/.test(f);
  const a = tokens(old, isCode);
  const b = tokens(cur, isCode);
  const lost = [...a].filter((x) => !b.has(x) && !allow.has(`${f}|${x}`));
  if (lost.length) {
    failures += lost.length;
    console.log(`\n✗ ${f} — ${lost.length} fact token(s) lost:`);
    for (const x of lost) console.log(`    ${x.length > 160 ? x.slice(0, 157) + '…' : x}`);
  } else if (verbose) console.log(`✓ ${f}`);
}

if (failures) {
  console.log(`\ncheck-copy-facts: ${failures} lost token(s) across changed files (base ${base}).`);
  console.log('Restore them, or if the loss is intended and checked, add `path|token  # reason` to facts-allow.txt.');
  process.exit(1);
}
console.log(`check-copy-facts: OK — ${checked} changed file(s) vs ${base}, no fact tokens lost.`);
