#!/usr/bin/env node
// check-counts — guard against hardcoded counts that should derive from
// content.ts constants (CLAUSES.length, TEMPLATES.length, ESCALATION.length).
//
// Why this exists: across one session we caught the phrase "18 clauses"
// hardcoded in five places when CLAUSES.length was 20. The single source
// of truth existed; consumers ignored it. Same pattern with "14 templates",
// "10-tier ladder", etc. When content grows or shrinks, these literals
// drift silently.
//
// How: parse content.ts to derive expected counts, then scan src/**/*.{astro,ts}
// for numeric literals adjacent to count-shaped phrases ("clauses",
// "templates", "ready-to-send", "-tier ladder", "ESCALATION tiers"). Fail
// when a literal mismatches the constant.
//
// Allowlist: lines containing the comment `// count-ok` are skipped.
// Use sparingly — if a literal is genuinely intentional (a quoted policy
// excerpt, a unit, a CSS measurement), the comment marks it safe.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const SRC = join(ROOT, 'src');
const CONTENT_TS = join(SRC, 'data', 'content.ts');

// Derive expected counts from content.ts. We don't import the file
// (would need ts-node or build step); we just count top-level array
// entries by their numbered marker.
function deriveCounts() {
  const src = readFileSync(CONTENT_TS, 'utf-8');
  const counts = {};
  // CLAUSES — count top-level objects by their `n: "NN"` marker.
  // Matches:  n: "01", slug: "..."  inside the CLAUSES array body.
  const clausesMatch = src.match(/export const CLAUSES[\s\S]*?\n\];/);
  if (clausesMatch) counts.clauses = (clausesMatch[0].match(/\n\s+n:\s*"\d+"/g) || []).length;
  const tplMatch = src.match(/export const TEMPLATES[\s\S]*?\n\];/);
  if (tplMatch) counts.templates = (tplMatch[0].match(/\n\s+\{\s*code:\s*"T\d+"/g) || []).length;
  const escMatch = src.match(/export const ESCALATION[\s\S]*?\n\];/);
  if (escMatch) counts.escalation = (escMatch[0].match(/\n\s+\{\s*tier:\s*\d+,/g) || []).length;
  const qhMatch = src.match(/export const QUICK_HITS[\s\S]*?\n\];/);
  if (qhMatch) counts.quick_hits = (qhMatch[0].match(/\n\s+\{\s*n:\s*"\d+"/g) || []).length;
  const faqMatch = src.match(/export const FAQ[\s\S]*?\n\];/);
  if (faqMatch) counts.faq = (faqMatch[0].match(/\n\s+\{\s*q:\s*"/g) || []).length;
  return counts;
}

// File walker — skip node_modules, .astro/ build cache, and hidden dirs.
function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.') || name === 'node_modules') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) yield* walk(full);
    else if (/\.(astro|ts|tsx|mjs)$/.test(name)) yield full;
  }
}

// Patterns to check. Each entry: regex looking for a *count* near a
// *noun phrase*, plus the constant whose .length should match.
//
// The regex captures the digits group; we compare it to the expected
// count and warn when they differ. Keep these patterns conservative —
// false positives erode trust in the check.
const PATTERNS = [
  // Examples that match: "20 clauses", "All 20 clauses", "{20} clauses dismantled"
  { re: /(\d{1,3})\s+clauses\b/gi, key: 'clauses' },
  { re: /(\d{1,3})\s+ready-to-send\b/gi, key: 'templates' },
  { re: /(\d{1,3})\s+email\s+templates\b/gi, key: 'templates' },
  { re: /(\d{1,3})-tier\s+(?:escalation|ladder)\b/gi, key: 'escalation' },
  { re: /(\d{1,3})\s+escalation\s+tiers\b/gi, key: 'escalation' },
  { re: /(\d{1,3})\s+quick\s+hits\b/gi, key: 'quick_hits' },
  { re: /(\d{1,3})\s+FAQ\s+entries\b/gi, key: 'faq' },
];

function main() {
  const expected = deriveCounts();
  const findings = [];

  for (const file of walk(SRC)) {
    // Skip content.ts itself — that's where the source-of-truth lives.
    if (file === CONTENT_TS) continue;
    const text = readFileSync(file, 'utf-8');
    const lines = text.split('\n');

    for (const { re, key } of PATTERNS) {
      // Regex is /g; reset state per file.
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(text)) !== null) {
        const literal = parseInt(m[1], 10);
        if (!Number.isFinite(literal)) continue;
        if (literal === expected[key]) continue;

        // Locate the line for the diagnostic.
        const idx = m.index;
        const before = text.slice(0, idx);
        const lineNo = (before.match(/\n/g) || []).length + 1;
        const lineText = lines[lineNo - 1] || '';
        // Allowlist
        if (/\/\/\s*count-ok|<!--\s*count-ok\s*-->/.test(lineText)) continue;

        findings.push({
          file: relative(ROOT, file),
          line: lineNo,
          literal,
          expected: expected[key],
          key,
          snippet: lineText.trim().slice(0, 140),
        });
      }
    }
  }

  if (findings.length === 0) {
    console.log(
      `✓ count check passed — no hardcoded counts drifting from content.ts ` +
      `(checked: ${Object.entries(expected).map(([k, v]) => `${k}=${v}`).join(', ')})`,
    );
    return;
  }

  console.error('✗ count drift detected:');
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  "${f.literal} ${f.key.replace('_',' ')}" — expected ${f.expected}`);
    console.error(`    ${f.snippet}`);
  }
  console.error('');
  console.error('Fix: replace the literal with the constant from src/data/content.ts');
  console.error('(e.g. {CLAUSES.length} in .astro, or `${CLAUSES.length}` in TS template strings).');
  console.error('If the literal is genuinely intentional, mark its line with // count-ok.');
  process.exit(1);
}

main();
