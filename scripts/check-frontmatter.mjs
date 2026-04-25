#!/usr/bin/env node
// check-frontmatter — every src/content/citations/**/*.md has the
// required minimum frontmatter, and any post-1995 citation has at
// least one URL field from the rendered whitelist.
//
// Why: the Astro content collection schema for citations uses
// `.passthrough()` so source-specific fields (case_number, judge,
// alternate_citations) survive validation. That's intentional — the
// metadata is genuinely heterogeneous. But the looseness means a
// citation can ship without `retrieved`, `used_in`, or any URL field
// at all, and Astro won't complain.
//
// This guard tightens just enough:
// - Required everywhere: `title`, `retrieved` (YYYY-MM-DD), `used_in`
// - For citations dated post-1995 (year ≥ 1995, or any year when no
//   year is parseable): require at least one URL field from the same
//   whitelist [...slug].astro renders.
// - For pre-1995 cases (Dibley 1951, Glaston 1977, etc.): URL-less is
//   acceptable — those judgments aren't online publicly. Their
//   `citation:` string IS the canonical reference.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const CITATIONS = join(ROOT, 'src', 'content', 'citations');

// Must match the urlFields whitelist in src/pages/citations/[...slug].astro.
// If you add a field there, add it here too — or [...slug].astro will
// render the URL but this check won't credit it as canonical.
const URL_FIELDS = [
  'primary_url',
  'secondary_url',
  'wayback_url',
  'wayback_url_dated',
  'wayback_url_earlier',
  'saflii_url',
  'saflii_pdf',
  'lawlibrary_url',
  'lawlibrary_s34',
  'wipo_lex',
  'cgso_pdf',
  'cgso_index',
  'nct_pdf',
  'pdf_url',
  'alternate_url',
  'commentary_url',
  'collections_concourt',
  'wikipedia_url',
  'popia_co_za',
  'portal_url',
  'press_release',
  'itu_url',
  'dtic_url',
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (name.endsWith('.md')) yield full;
  }
}

function check(md, file) {
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return ['no frontmatter'];
  const text = fm[1];
  const has = (key) => new RegExp(`^${key}:`, 'm').test(text);
  const issues = [];

  if (!has('title')) issues.push('missing title');

  // retrieved must exist and be YYYY-MM-DD.
  const retrievedLine = text.match(/^retrieved:\s*"?([^"\n]+)"?/m);
  if (!retrievedLine) issues.push('missing retrieved');
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(retrievedLine[1].trim().replace(/"/g, ''))) {
    issues.push(`retrieved not YYYY-MM-DD: ${retrievedLine[1]}`);
  }

  if (!has('used_in')) issues.push('missing used_in');

  // URL field required for post-1995 citations.
  const dateLine = text.match(/^date:\s*"?([^"\n]+)"?/m);
  let year = null;
  if (dateLine) {
    const yearMatch = dateLine[1].match(/(\d{4})/);
    if (yearMatch) year = parseInt(yearMatch[1], 10);
  }
  // No date or year ≥ 1995 → require URL.
  const requiresUrl = year === null || year >= 1995;
  if (requiresUrl) {
    const hasAnyUrl = URL_FIELDS.some((f) => has(f));
    if (!hasAnyUrl) {
      issues.push(`no URL field (${year ? `year ${year} is post-1995` : 'no parseable year'} so a canonical URL is required)`);
    }
  }

  return issues;
}

function main() {
  const findings = [];
  let total = 0;
  for (const file of walk(CITATIONS)) {
    total++;
    const md = readFileSync(file, 'utf-8');
    const issues = check(md, file);
    for (const i of issues) findings.push({ file: relative(ROOT, file), issue: i });
  }

  if (findings.length === 0) {
    console.log(`✓ frontmatter check passed — ${total} citation files all have the required minimum.`);
    return;
  }

  console.error('✗ citation frontmatter issues:');
  for (const f of findings) {
    console.error(`  ${f.file}`);
    console.error(`    ${f.issue}`);
  }
  console.error('');
  console.error('Fix: add the missing field. For pre-1995 cases (where no online URL exists),');
  console.error('keep the citation: string as the canonical reference and ensure date: starts with the year.');
  process.exit(1);
}

main();
