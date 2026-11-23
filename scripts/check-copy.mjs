#!/usr/bin/env node
// check-copy — lint public copy against the site's house style.
//
// Enforces the parts of the house style a machine can check, so copy can't quietly
// drift. Judgment calls (tone, logic, rhythm) are left to review; they print as WARN,
// never fail.
//
// ERROR (fails the build):
//   - em dash (—) anywhere in our own prose; spaced en dash ( – ) used as a dash
//   - words and phrases on the banned list below
// WARN (printed for review, does not fail):
//   - "not X, it's Y" / "not just / not only" contrast frames
//   - three or more very short sentences in a row (fragment stacks)
//   - exclamation marks, "honest/honestly", "simply", "genuinely"
//
// Exempt: anything inside quotation marks (verbatim source text is never edited),
// markdown blockquotes, code comments, and lines carrying `copy-ok` in a comment.
//
// Usage: node scripts/check-copy.mjs [--warn] [--summary] [path…]
//   --warn     also list every warning (default: count only)
//   --summary  per-file counts only

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const argv = process.argv.slice(2);
const showWarn = argv.includes('--warn');
const summary = argv.includes('--summary');
const explicit = argv.filter((a) => !a.startsWith('--'));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(astro|ts|md|mdx)$/.test(name)) out.push(p);
  }
  return out;
}
const files = explicit.length
  ? explicit.flatMap((p) => (statSync(join(ROOT, p)).isDirectory() ? walk(join(ROOT, p)) : [join(ROOT, p)]))
  : [...walk(join(ROOT, 'src')), join(ROOT, 'public/llms.txt'), join(ROOT, 'public/og-image.svg')].filter(existsSync);

// ── Banned list ─────────────────────────────────────────────────────────────
// Each entry: [regex, label]. Word-boundaried, case-insensitive.
const BANNED = [
  // Overused vocabulary
  [/\bdelv(?:e|es|ed|ing)\b/i, 'delve'],
  [/\btapestry\b/i, 'tapestry'],
  [/\btestament to\b/i, 'testament to'],
  [/\bpivotal\b/i, 'pivotal'],
  [/\bcrucial(?:ly)?\b/i, 'crucial'],
  [/\b(?:legal |consumer |regulatory |evolving )?landscape\b/i, 'landscape'],
  [/\bnavigat(?:e|es|ing)\b/i, 'navigate'],
  [/\brobust\b/i, 'robust'],
  [/\bseamless(?:ly)?\b/i, 'seamless'],
  [/\bleverag(?:e|es|ed|ing)\b/i, 'leverage'],
  [/\bunderscor(?:e|es|ed|ing)\b/i, 'underscore'],
  [/\bshowcas(?:e|es|ed|ing)\b/i, 'showcase'],
  [/\bvibrant\b/i, 'vibrant'],
  [/\bintricat(?:e|ies)\b/i, 'intricate'],
  [/\brealm\b/i, 'realm'],
  [/\bfoster(?:s|ed|ing)?\b/i, 'foster'],
  [/\bgarner(?:s|ed|ing)?\b/i, 'garner'],
  [/\bboasts?\b/i, 'boast'],
  [/\bmeticulous(?:ly)?\b/i, 'meticulous'],
  [/\bcomprehensive\b/i, 'comprehensive'],
  [/\bempower(?:s|ed|ing|ment)?\b/i, 'empower'],
  [/\bunlock(?:s|ed|ing)? (?:your|the (?:full|power|potential|secrets?))\b/i, 'unlock (metaphor)'],
  [/\belevat(?:e|es|ing)\b/i, 'elevate'],
  [/\bever-(?:evolving|changing)\b/i, 'ever-evolving'],
  [/\bgame[- ]changer\b/i, 'game-changer'],
  [/\bin the heart of\b/i, 'in the heart of'],
  [/\benduring\b/i, 'enduring'],
  [/\binterplay\b/i, 'interplay'],
  [/\bmultifaceted\b/i, 'multifaceted'],
  [/\bnuanced?\b/i, 'nuance'],
  [/\bholistic\b/i, 'holistic'],
  [/\bstreamlin(?:e|ed|ing)\b/i, 'streamline'],
  [/\barsenal\b/i, 'arsenal'],
  // Transitions / signposting
  [/(?:^|[.!?]\s+|["'`>]\s*)(?:Moreover|Furthermore|Additionally|Notably|Importantly|Ultimately|Crucially|Indeed),/, 'sentence-opening transition'],
  [/\bit(?:'s| is) worth (?:noting|mentioning|remembering)\b/i, "it's worth noting"],
  [/\bit(?:'s| is) important to (?:note|remember|understand)\b/i, "it's important to note"],
  [/(?:^|[.!?]\s+|["'`>]\s*)In (?:conclusion|summary|short|essence),/, 'summary signpost'],
  [/\bat the end of the day\b/i, 'at the end of the day'],
  [/\bhere(?:'s| is) the (?:thing|kicker|catch|deal)\b/i, "here's the thing"],
  [/\blet(?:'s| us) (?:dive|unpack|break (?:it|this) down)\b/i, "let's dive in"],
  [/\bthe bottom line\b/i, 'the bottom line'],
  [/\b(?:the |key )?take-?aways?\b/i, 'takeaway'],
  [/(?:^|["'`>\s])Lesson:/, 'Lesson: label'],
  [/\bthe short answer\b/i, 'the short answer'],
  [/\bin today's\b/i, "in today's…"],
  [/\bwhether you(?:'re| are)\b/i, "whether you're…"],
  [/\bmore than just\b/i, 'more than just'],
  [/\bplays? a (?:key|vital|crucial|significant|pivotal) role\b/i, 'plays a key role'],
  [/\bserves? as a\b/i, 'serves as a'],
  [/\bstands? as a\b/i, 'stands as a'],
  [/\b(?:a|the) (?:single )?most (?:useful|important|powerful) (?:fact|thing|tool)\b/i, 'superlative hype'],
  [/\bfrom (?:\w+ ){1,3}to (?:\w+ ){1,3}and everything in between\b/i, 'from X to Y'],
];

const WARNS = [
  [/\b(?:is|are|was|were)n't (?:just|only|merely|about)\b/i, "isn't just / isn't about"],
  [/\bnot (?:just|only|merely) /i, 'not just / not only'],
  [/\bit(?:'s| is) not (?:about )?[^.;:]{1,40}[,;] it(?:'s| is)\b/i, "it's not X, it's Y"],
  [/\bhonest(?:ly)?\b/i, 'honest/honestly'],
  [/\bsimply\b/i, 'simply'],
  [/\bgenuine(?:ly)?\b/i, 'genuinely'],
  [/![\s"']*$|!\s+[A-Z]/, 'exclamation mark'],
  [/\brather than\b/i, 'Y rather than X'],
  [/\bdoes not by itself\b|\bshould not be confused\b/i, 'corrective framing'],
  [/,\s(?:ensuring|highlighting|underscoring|emphasi[sz]ing|reflecting|showcasing|cementing)\b/i, 'trailing -ing significance clause'],
  [/(?:^|["'`>\s])(?:Practical advice|Why it matters|Key point|Bottom line|In practice):/, 'announcing label'],
  [/’|‘/, 'curly apostrophe/quote in our prose'],
  [/\b(?:matters|quietly|clearer|steady|dependable|prioriti[sz]e|universally|practical)\b/i, 'overused word (fine alone, not in clusters)'],
];

// ── Strip exempt text, keeping line numbers ────────────────────────────────
const blank = (s) => s.replace(/[^\n]/g, ' ');
function strip(text, file) {
  let t = text;
  const isCode = /\.(ts|astro|mjs|svg)$/.test(file);
  // HTML comments and block comments
  t = t.replace(/<!--[\s\S]*?-->/g, blank).replace(/\/\*[\s\S]*?\*\//g, blank);
  // Line comments (not URLs)
  t = t.replace(/(^|[\s;{}(),])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)));
  // Quotes: in code only escaped \"…\" and curly quotes; in markdown straight quotes too
  if (isCode) t = t.replace(/\\"(?:(?!\\")[^\n])*\\"/g, blank).replace(/“[^”\n]*”/g, blank);
  else {
    // Markdown front matter: `key: "value"` is YAML, not a quote. Lint the value, but blank
    // escaped quotes inside it. `used_in:` list items are provenance paths (the page renders
    // them with the dash swapped out), so they're skipped.
    const fm = t.match(/^---\n[\s\S]*?\n---\n/);
    let head = '';
    let body = t;
    if (fm) {
      head = fm[0]
        .replace(/^\s+-\s+".*$/gm, blank)
        .replace(/\\"(?:(?!\\")[^\n])*\\"/g, blank)
        .replace(/“[^”\n]*”/g, blank);
      body = t.slice(fm[0].length);
    }
    body = body.replace(/"[^"\n]*"/g, blank).replace(/“[^”\n]*”/g, blank);
    t = head + body;
  }
  // Markdown blockquotes
  t = t.replace(/^\s*>.*$/gm, blank);
  // Front-matter keys that hold URLs/paths, not prose
  t = t.replace(/^(?:primary_url|wayback_url\w*|url|pdf_url|source_url|archive_url)\s*:.*$/gm, blank);
  return t;
}

let errors = 0;
let warns = 0;
const perFile = [];
for (const abs of files) {
  const rel = relative(ROOT, abs);
  const raw = readFileSync(abs, 'utf-8');
  const rawLines = raw.split('\n');
  const lines = strip(raw, rel).split('\n');
  const fileErr = [];
  const fileWarn = [];
  lines.forEach((line, i) => {
    if (/copy-ok/.test(rawLines[i])) return;
    if (/—|&mdash;|&#8212;|\\u2014/.test(line)) fileErr.push([i + 1, 'em dash']);
    if (/\s(?:–|&ndash;|&#8211;|\\u2013)\s/.test(line)) fileErr.push([i + 1, 'spaced en dash']);
    for (const [re, label] of BANNED) if (re.test(line)) fileErr.push([i + 1, label]);
    for (const [re, label] of WARNS) if (re.test(line)) fileWarn.push([i + 1, label]);
    // Markdown heading in Title Case (3+ capitalised words after the first, ignoring short words)
    const h = line.match(/^#{2,6}\s+(.+)$/);
    if (h) {
      const words = h[1].split(/\s+/).slice(1).filter((w) => /^[A-Za-z]{4,}$/.test(w));
      if (words.length >= 2 && words.every((w) => /^[A-Z]/.test(w))) fileWarn.push([i + 1, 'title-case heading']);
    }
    // Uniform rhythm: 5+ sentences on one line/paragraph, all 8–20 words
    {
      const ss = line.split(/(?<=[.!?])\s+(?=[A-Z])/).map((s) => s.trim().split(/\s+/).length);
      if (ss.length >= 5 && ss.every((n) => n >= 8 && n <= 20)) fileWarn.push([i + 1, 'uniform sentence length']);
    }
    // Fragment stack: 3+ consecutive sentences of ≤4 words
    const sentences = line.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
    let run = 0;
    for (const s of sentences) {
      run = s.split(/\s+/).length <= 4 && /[.!?]$/.test(s) ? run + 1 : 0;
      if (run === 3) { fileWarn.push([i + 1, 'fragment stack']); break; }
    }
  });
  errors += fileErr.length;
  warns += fileWarn.length;
  if (fileErr.length || fileWarn.length) perFile.push([rel, fileErr, fileWarn]);
}

perFile.sort((a, b) => b[1].length - a[1].length);
for (const [rel, e, w] of perFile) {
  if (summary) { console.log(`${String(e.length).padStart(5)} err ${String(w.length).padStart(4)} warn  ${rel}`); continue; }
  if (!e.length && !showWarn) continue;
  console.log(`\n${rel}`);
  for (const [n, l] of e) console.log(`  ✗ ${n}: ${l}`);
  if (showWarn) for (const [n, l] of w) console.log(`  · ${n}: ${l}`);
}
console.log(`\ncheck-copy: ${errors} error(s), ${warns} warning(s) across ${files.length} files.`);
if (errors) {
  console.log('See the banned list in scripts/check-copy.mjs. Quoted source text is exempt; mark a deliberate exception with a `copy-ok` comment.');
  process.exit(1);
}
