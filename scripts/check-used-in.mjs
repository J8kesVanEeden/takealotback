#!/usr/bin/env node
// check-used-in — every citation file's used_in: lines must resolve to
// a non-null destination via the shared resolver in
// src/lib/used-in-link.mjs.
//
// Why: across one session we caught 11 used_in: lines (across 7 citation
// files) that the resolver couldn't match — bare CLAUSES, full statute
// names, path-style xrefs, component names. The "Used on the site" panel
// would render those entries as plain text with no jump-back link.
// Adding patterns to the resolver was easy; *knowing* something was
// unmatched was the hard part.
//
// This script imports the exact same resolver the page uses, so we can't
// diverge: if a frontmatter line doesn't link in production, the build
// fails here.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { usedInLink } from '../src/lib/used-in-link.mjs';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const CITATIONS = join(ROOT, 'src', 'content', 'citations');

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (name.endsWith('.md')) yield full;
  }
}

// Extract used_in: list from YAML frontmatter. Lightweight: assumes the
// project's frontmatter convention (one entry per `- "..."` line under a
// `used_in:` key). No full YAML parser needed.
function extractUsedIn(md) {
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return [];
  const text = fm[1];
  const start = text.search(/^used_in:\s*$/m);
  if (start === -1) return [];
  const after = text.slice(start);
  const lines = [];
  for (const line of after.split('\n').slice(1)) {
    const m = line.match(/^\s+-\s+"([^"]*)"\s*$/);
    if (m) lines.push(m[1]);
    else if (line.match(/^\S/)) break; // hit next top-level key
  }
  return lines;
}

function main() {
  const findings = [];
  let total = 0;
  for (const file of walk(CITATIONS)) {
    const md = readFileSync(file, 'utf-8');
    const lines = extractUsedIn(md);
    for (const line of lines) {
      total++;
      if (usedInLink(line) === null) {
        findings.push({ file: relative(ROOT, file), line });
      }
    }
  }

  if (findings.length === 0) {
    console.log(`✓ used_in check passed — every used_in: line across ${total} entries resolves to an on-site destination.`);
    return;
  }

  console.error('✗ used_in entries with no resolver match:');
  for (const f of findings) {
    console.error(`  ${f.file}`);
    console.error(`    "${f.line}"`);
  }
  console.error('');
  console.error('Fix: add a regex to src/lib/used-in-link.mjs that matches the line, or rewrite the line to');
  console.error('reference a known shape (CLAUSES[N] (slug), TEMPLATES, ../cases/X.md, ComponentName, etc.).');
  process.exit(1);
}

main();
