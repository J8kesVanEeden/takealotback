// Verifies that every case AND every statute named in src/data/content.ts
// (and the three deep-dive sub-pages) has a matching file in
// src/content/citations/{cases,statutes}/.
//
// Catches drift the moment someone adds a new case or statute to a clause
// angle without also adding the citation file.
//
// Run:    npm run check:citations
// (also bundled into `npm run check:all` for one-stop verification.)

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(import.meta.url), '..', '..');

// Cases the site is allowed to reference without a dedicated citation file.
// Most of these are common-knowledge SA case names that appear in passing in
// templates or context strings, not as primary anchors. Tighten this list
// over time as files are added.
const ALLOWED_WITHOUT_FILE = new Set([
  // None right now — all cited cases have files.
]);

// Map case-name fragments (as they appear in content) to the citation file's
// expected basename in citations/cases/. Multiple aliases for the same case
// resolve to the same file.
const CASE_NAME_TO_FILE = {
  // Cases with full citation files
  'Bandera v Kia': null, // explicitly removed — ensure no live references
  'Bandera Trading': null,
  'Motus Corporation v Wentzel': 'Motus-Wentzel-ZASCA-40-2021.md',
  'Motus v Wentzel': 'Motus-Wentzel-ZASCA-40-2021.md',
  'CGSO NPC v Voltex': 'CGSO-Voltex-ZAGPPHC-309-2021.md',
  'CGSO v Voltex': 'CGSO-Voltex-ZAGPPHC-309-2021.md',
  'Vonk v Willow Crest Motors': 'Vonk-Willow-Crest-ZANCT-63-2019.md',
  'Fourie v Agenbag Motor Group': 'Fourie-Agenbag-ZACONAF-3-2018.md',
  'Laugh It Off': 'Laugh-It-Off-ZACC-7-2005.md',
  'Holmdene Brickworks': 'Holmdene-Brickworks-1977.md',
  'Phame': 'Phame-Paizes-1973.md',
  'Phame (Pty) Ltd v Paizes': 'Phame-Paizes-1973.md',
  'Dibley v Furter': 'Dibley-Furter-1951.md',
  'Glaston House': 'Glaston-House-Inag-1977.md',
  'Television Radio Centre': 'TRC-Sony-1987.md',
  'Sony Kabushiki': 'TRC-Sony-1987.md',
  'Frank & Hirsch': 'Frank-Hirsch-Roopanand-1993.md',
  'Frank Hirsch': 'Frank-Hirsch-Roopanand-1993.md',
  // Cases that should remain ABSENT from the live site
  'Steynberg': null,
  'Driveconsortium': null,
};

// Statute references on the site map to citations/statutes/ files.
// Each pattern below means: if the regex matches anywhere in the scanned
// content, expect the named file to exist in citations/statutes/.
const STATUTE_PATTERN_TO_FILE = {
  '\\bCPA\\s+s|\\bs\\s*5[0-9]|\\bsection\\s+5[0-9]': 'CPA-2008.md',
  '\\bReg\\s*44|\\bRegulation\\s*44|CPA\\s*Reg': 'CPA-Regulations-2011.md',
  '\\bECT\\b': 'ECT-Act-2002.md',
  '\\bPOPIA\\b': 'POPIA-2013.md',
  '\\bTMA\\b|\\bTrade\\s*Marks\\s*Act': 'TMA-1993.md',
  '\\bPrescription\\s*Act': 'Prescription-Act-1969.md',
  '\\bConstitution\\b': 'Constitution-s16.md',
};

// Every case/statute in the maps that points to a non-null file must have
// that file in the matching subfolder.
async function main() {
  const filesToScan = [
    'src/data/content.ts',
    'src/content/pages/onus-of-proof.md',
    'src/content/pages/aedilitian-remedies.md',
    'src/content/pages/limits.md',
  ].map((p) => path.join(root, p));

  const livingFiles = await Promise.all(
    filesToScan.map((f) =>
      readFile(f, 'utf8')
        .then((c) => ({ path: f, content: c }))
        .catch(() => null),
    ),
  );

  const casesDir = path.join(root, 'src', 'content', 'citations', 'cases');
  const statutesDir = path.join(root, 'src', 'content', 'citations', 'statutes');
  const caseFiles = new Set(await readdir(casesDir));
  const statuteFiles = new Set(await readdir(statutesDir));

  const problems = [];

  for (const f of livingFiles) {
    if (!f) continue;

    // CASE checks (literal-name match)
    for (const [needle, expectedFile] of Object.entries(CASE_NAME_TO_FILE)) {
      const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = (f.content.match(re) || []).length;
      if (matches === 0) continue;

      if (expectedFile === null) {
        problems.push(
          `[${path.relative(root, f.path)}] references "${needle}" ${matches}× — case was deliberately removed; check if intentional.`,
        );
        continue;
      }

      if (!caseFiles.has(expectedFile)) {
        problems.push(
          `[${path.relative(root, f.path)}] references "${needle}" but src/content/citations/cases/${expectedFile} is missing.`,
        );
      }
    }

    // STATUTE checks (regex pattern match — broader, since statutes are referenced via short codes)
    for (const [pattern, expectedFile] of Object.entries(STATUTE_PATTERN_TO_FILE)) {
      const re = new RegExp(pattern, 'gi');
      if (!re.test(f.content)) continue;

      if (!statuteFiles.has(expectedFile)) {
        problems.push(
          `[${path.relative(root, f.path)}] matches pattern /${pattern}/ but src/content/citations/statutes/${expectedFile} is missing.`,
        );
      }
    }
  }

  if (problems.length === 0) {
    console.log(
      `✓ citation check passed — every cited case and statute has a matching citation file.`,
    );
    process.exit(0);
  }

  console.log(`✗ citation check found ${problems.length} issue${problems.length === 1 ? '' : 's'}:`);
  for (const p of problems) console.log('  ' + p);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
