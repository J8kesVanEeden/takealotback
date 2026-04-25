#!/usr/bin/env node
// check-source-chip-coverage — every clause + template renders ≥ 1 source
// chip (the linkable citation pills under each clause/template).
//
// Why: across one session, eight of sixteen templates rendered NO source
// chips because their bodies used full statute names ("Consumer Protection
// Act") while citation-links.ts only matched abbreviations ("CPA"). Adding
// patterns was easy — but with no automated coverage gate, content that
// drifts away from the abbreviated forms goes unnoticed until somebody
// audits the live HTML.
//
// This guard parses dist/index.html and asserts that every clause and
// every template element contains at least one `tb-srcchips__link` node.
// FAQ items are not asserted because not every Q+A naturally cites
// statute (intentional — FAQ chips render only when scanForCitations
// matches the answer text).
//
// Runs after build (check:all already runs build via check:anchors), so
// dist/index.html is guaranteed fresh.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const HTML_PATH = join(ROOT, 'dist', 'index.html');

function main() {
  const html = readFileSync(HTML_PATH, 'utf-8');
  const findings = [];

  // Clauses — split the Dismantled section by `<div ... data-clause`
  // wrappers (each clause has exactly one). Stop at the start of the
  // Templates section.
  const dismantledStart = html.indexOf('id="dismantled"');
  const templatesStart = html.indexOf('id="templates"');
  const dismantledBlock = html.substring(dismantledStart, templatesStart);
  const clauseParts = dismantledBlock
    .split(/(?=<div [^>]*data-clause)/)
    .filter((p) => /^<div [^>]*data-clause/.test(p));
  for (const part of clauseParts) {
    const idMatch = part.match(/id="(clause-[a-z0-9-]+)"/);
    if (!idMatch) continue;
    if (!/tb-srcchips__link/.test(part)) {
      findings.push({ kind: 'clause', id: idMatch[1] });
    }
  }

  // Templates — split the Templates section by id="template-TNN" wrapper.
  const lawStart = html.indexOf('id="law"');
  const templatesBlock = html.substring(templatesStart, lawStart);
  const tplParts = templatesBlock
    .split(/(?=id="template-T\d+")/)
    .filter((p) => /^id="template-T\d+"/.test(p));
  for (const part of tplParts) {
    const idMatch = part.match(/id="(template-T\d+)"/);
    if (!idMatch) continue;
    if (!/tb-srcchips__link/.test(part)) {
      findings.push({ kind: 'template', id: idMatch[1] });
    }
  }

  if (findings.length === 0) {
    console.log(
      `✓ source-chip coverage check passed — every clause (${clauseParts.length}) and every template (${tplParts.length}) renders at least one citation chip.`,
    );
    return;
  }

  console.error('✗ clauses/templates missing source chips:');
  for (const f of findings) {
    console.error(`  ${f.kind}: ${f.id}`);
  }
  console.error('');
  console.error('Fix: add a regex to src/lib/citation-links.ts that matches a phrase actually present');
  console.error('in the affected clause angles or template body, OR rewrite the content so it cites');
  console.error('a statute name the resolver recognises.');
  process.exit(1);
}

main();
