#!/usr/bin/env node
// check-public: this repository is public. Fail on anything that should not be in it.
//
// Checks, in order:
//   1. Paths: every tracked file sits under an allowed path (site source, citations,
//      scripts, CI config, the docs the site links to). Anything else fails.
//   2. No tracked symlinks.
//   3. Credentials: common token and private-key formats.
//   4. Maintainer denylist: phrases, names and paths that stay out of the public repo,
//      checked in every tracked file and, with --commits or in CI, in commit messages
//      and the PR title and body. The list is not stored in this repository: it comes
//      from the PUBLIC_DENYLIST environment variable (an Actions secret in CI) or from the
//      maintainer's local copy. Without it the check fails, so it never passes by default.
//
// Usage: node scripts/check-public.mjs [--commits <git-range>]
//   In GitHub Actions it reads the event payload itself (PR title, body, commit range).

import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync, lstatSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const argv = process.argv.slice(2);
const fail = [];

// ── 1. Allowed paths ────────────────────────────────────────────────────────
const ALLOWED = [
  /^src\//, /^public\//, /^scripts\//, /^citations\//, /^\.github\//,
  /^\.husky\/pre-push$/,
  /^(?:\.gitignore|\.htmlvalidate\.json|\.pa11yci\.json|astro\.config\.mjs|package\.json|package-lock\.json|tsconfig\.json|wrangler\.jsonc)$/,
  /^(?:README\.md|OPERATIONS\.md|LICENSE|CONTENT-LICENSE\.md)$/,
];
const files = git('ls-files', '-z').split('\0').filter(Boolean);
for (const f of files) {
  if (!ALLOWED.some((re) => re.test(f))) fail.push(`path not allowed in the public repo: ${f}`);
  const p = join(ROOT, f);
  if (existsSync(p) && lstatSync(p).isSymbolicLink()) fail.push(`tracked symlink: ${f}`);
}

// ── Denylist ───────────────────────────────────────────────────────────────
function loadList() {
  if (process.env.PUBLIC_DENYLIST && process.env.PUBLIC_DENYLIST.trim()) return process.env.PUBLIC_DENYLIST;
  const candidates = [join(ROOT, 'internal', 'public-denylist.txt')];
  try {
    // From a second checkout of this repo, look beside the main checkout as well.
    const common = resolve(ROOT, git('rev-parse', '--git-common-dir').trim());
    candidates.push(join(dirname(common), 'internal', 'public-denylist.txt'));
  } catch {}
  for (const c of candidates) if (existsSync(c)) return readFileSync(c, 'utf8');
  return null;
}
const raw = loadList();
const deny = [];
const allow = [];
if (raw === null) {
  fail.push('maintainer denylist not found (PUBLIC_DENYLIST secret or local copy); refusing to pass without it');
} else {
  // Errors name the line number only: CI logs are public and must never show a rule.
  raw.split('\n').forEach((line, n) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return;
    const m = t.match(/^(deny|allow)\s+(.+)$/i);
    if (!m) { fail.push(`denylist: unreadable line ${n + 1}`); return; }
    try {
      if (m[1].toLowerCase() === 'deny') deny.push(new RegExp(m[2].trim(), 'i'));
      else {
        const [pathRe, ...rest] = m[2].trim().split(/\s+/);
        allow.push([new RegExp(pathRe), new RegExp(rest.join(' '), 'i')]);
      }
    } catch {
      fail.push(`denylist: invalid pattern on line ${n + 1}`);
    }
  });
  if (!deny.length) fail.push('denylist is empty; refusing to pass');
}

// ── 3. Credentials (public formats) ─────────────────────────────────────────
const CREDS = [
  /ghp_[A-Za-z0-9]{30,}/, /github_pat_[A-Za-z0-9_]{30,}/, /gh[ousr]_[A-Za-z0-9]{30,}/,
  /sk-[A-Za-z0-9_-]{20,}/, /AKIA[0-9A-Z]{16}/, /xox[bpas]-[A-Za-z0-9-]{10,}/,
  /AIza[0-9A-Za-z_-]{35}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
];

function scanText(label, text, path = null) {
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    for (const re of CREDS) if (re.test(line)) fail.push(`${label}:${i + 1}: looks like a credential`);
    for (const re of deny) {
      if (!re.test(line)) continue;
      if (path && allow.some(([p, w]) => p.test(path) && w.source === re.source)) continue;
      // CI logs are public: there, print the location and rule number only.
      const shown = process.env.CI ? '' : `  [${line.match(re)[0]}]`;
      fail.push(`${label}:${i + 1}: matches denylist rule ${deny.indexOf(re) + 1}${shown}`);
    }
  });
}

// ── 4a. Tracked files ───────────────────────────────────────────────────────
for (const f of files) {
  const p = join(ROOT, f);
  if (!existsSync(p) || lstatSync(p).isSymbolicLink()) continue;
  const buf = readFileSync(p);
  if (buf.includes(0)) continue; // binary
  scanText(f, buf.toString('utf8'), f);
}

// ── 4b. Commit messages, PR title and body ──────────────────────────────────
const stripTrailers = (msg) => msg.split('\n').filter((l) => !/^co-authored-by:/i.test(l.trim())).join('\n');
function scanCommits(range) {
  const out = git('log', '--format=%H%x00%B%x01', range);
  for (const rec of out.split('\x01')) {
    const [sha, body] = rec.replace(/^\n/, '').split('\x00');
    if (!sha) continue;
    scanText(`commit ${sha.slice(0, 7)}`, stripTrailers(body || ''));
  }
}
let range = null;
const ci = argv.indexOf('--commits');
if (ci !== -1) range = argv[ci + 1];
if (process.env.GITHUB_EVENT_PATH && existsSync(process.env.GITHUB_EVENT_PATH)) {
  const ev = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  if (ev.pull_request) {
    scanText('PR title', ev.pull_request.title || '');
    scanText('PR body', ev.pull_request.body || '');
    scanText('PR branch name', ev.pull_request.head?.ref || '');
    range = `${ev.pull_request.base.sha}..${ev.pull_request.head.sha}`;
  } else if (ev.after) {
    // A normal push checks the new commits. A forced push, a new branch, or a
    // "before" commit that no longer exists checks the whole history instead.
    let known = false;
    if (ev.before && !/^0+$/.test(ev.before) && !ev.forced) {
      try { git('cat-file', '-e', `${ev.before}^{commit}`); known = true; } catch {}
    }
    range = known ? `${ev.before}..${ev.after}` : ev.after;
  }
}
if (range) scanCommits(range);

// ── Report ──────────────────────────────────────────────────────────────────
if (fail.length) {
  console.error(`✗ public-repo check failed (${fail.length}):`);
  for (const f of fail) console.error('  ' + f);
  process.exit(1);
}
console.log(`✓ public-repo check passed: ${files.length} tracked files${range ? `, commits ${range}` : ''}, ${deny.length} denylist rules.`);
