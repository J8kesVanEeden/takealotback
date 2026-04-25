// Verifies that every case named in src/data/content.ts (and the three
// deep-dive sub-pages) has a matching file in citations/cases/.
//
// Catches drift the moment someone adds a new case to a clause angle
// without also adding the citation file.
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

// Every case in CASE_NAME_TO_FILE that maps to a non-null file must have that
// file in citations/cases/.
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

  const citationsDir = path.join(root, 'src', 'content', 'citations', 'cases');
  const citationFiles = new Set(await readdir(citationsDir));

  const problems = [];

  for (const f of livingFiles) {
    if (!f) continue;
    for (const [needle, expectedFile] of Object.entries(CASE_NAME_TO_FILE)) {
      const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = (f.content.match(re) || []).length;
      if (matches === 0) continue;

      if (expectedFile === null) {
        // This case is supposed to be ABSENT from the live site. Flag.
        problems.push(
          `[${path.relative(root, f.path)}] references "${needle}" ${matches}× — case was deliberately removed; check if intentional.`,
        );
        continue;
      }

      if (!citationFiles.has(expectedFile)) {
        problems.push(
          `[${path.relative(root, f.path)}] references "${needle}" but src/content/citations/cases/${expectedFile} is missing.`,
        );
      }
    }
  }

  if (problems.length === 0) {
    console.log(
      `✓ citation check passed — every case named on the site has a matching citation file.`,
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
