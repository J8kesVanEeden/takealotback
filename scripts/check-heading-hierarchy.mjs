#!/usr/bin/env node
// check-heading-hierarchy — every dist/**/*.html has exactly one <h1>
// and never skips heading levels (no h2 → h4 jumps).
//
// Why: AboutSection had an <h2> followed immediately by <h4> sub-heads
// for ~6 months. Screen readers expect h2 → h3, not h2 → h4. Visually
// fine, structurally broken. No automated gate caught it.
//
// What "skip" means here: a heading at level N is a skip if the
// preceding heading on the page is at level < N - 1. The first heading
// on the page can be any level (usually h1); the rule starts applying
// from heading #2 onwards.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const DIST = join(ROOT, 'dist');

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (name.endsWith('.html')) yield full;
  }
}

function check(html) {
  // Pull every heading tag in document order.
  const matches = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)];
  const issues = [];
  let h1Count = 0;
  let prev = 0;
  for (const m of matches) {
    const level = parseInt(m[1], 10);
    if (level === 1) h1Count++;
    if (prev > 0 && level > prev + 1) {
      const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
      issues.push(`h${level} after h${prev} (skip): "${text}"`);
    }
    prev = level;
  }
  if (h1Count !== 1) issues.unshift(`expected exactly 1 <h1>, found ${h1Count}`);
  return issues;
}

function main() {
  const findings = [];
  let total = 0;
  for (const file of walk(DIST)) {
    total++;
    const html = readFileSync(file, 'utf-8');
    const issues = check(html);
    for (const i of issues) findings.push({ file: relative(ROOT, file), issue: i });
  }

  if (findings.length === 0) {
    console.log(`✓ heading-hierarchy check passed — ${total} HTML files all have exactly one h1 and no level skips.`);
    return;
  }

  console.error('✗ heading hierarchy issues:');
  for (const f of findings) {
    console.error(`  ${f.file}`);
    console.error(`    ${f.issue}`);
  }
  console.error('');
  console.error('Fix: promote the offending heading to the next-deeper allowed level (e.g. <h4> → <h3>).');
  console.error('If a long page genuinely needs no <h1>, that is itself a structural issue — every HTML page should have one.');
  process.exit(1);
}

main();
