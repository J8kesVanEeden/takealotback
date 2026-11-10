#!/usr/bin/env node
// check-a11y — pa11y-ci accessibility audit against a sample of pages.
//
// pa11y-ci uses puppeteer (bundled chromium) so it works in CI and on
// any dev machine without depending on system Chrome version. Runs both
// axe-core and HTML CodeSniffer rule sets behind the scenes — broader
// coverage than either alone.
//
// html-validate's a11y preset (.htmlvalidate.json) is the cheap layer
// (60% of common a11y bugs without a real browser). pa11y-ci is the
// deep layer that catches what html-validate can't see — toggle-button
// SSR state (the round-71 class), color contrast, focus-visible
// coverage, etc.
//
// We sample 8 pages covering every unique component template — running
// against all 38 pages would multiply runtime by ~5 with diminishing
// return.
//
// Spins up `astro preview` first so pa11y has a live origin; tears it
// down on exit.

import { spawn, execFileSync } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import { existsSync, readdirSync, rmSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const PORT = 4332;

// Pre-flight: make sure the Chrome build puppeteer expects is actually on
// disk. In CI `npm ci` triggers puppeteer's download, so this is a no-op
// there. But a local cache can go stale — a puppeteer bump changes the
// pinned build, or ~/.cache/puppeteer gets cleared — and pa11y-ci then
// dies with a raw puppeteer-core stack trace that halts the whole
// `check:all` chain. Self-heal by installing the pinned build once;
// fall back to a clear, actionable message if that fails.
//
// "On disk" has to mean "launches", not just "the executable file exists".
// Seen 2026-11-10 on macOS with Node 26: `puppeteer browsers install`
// downloaded the full 173 MB zip but its extractor stopped after ~448 KB,
// leaving the Chrome executable in place with its Framework missing. An
// existsSync() check passes on that, and pa11y-ci then dies on dlopen.
// So: test-launch, and if the install is broken, re-extract the cached
// zip with the OS's own tool (ditto on macOS, unzip elsewhere).
// Launch the probe with the same Chrome args pa11y-ci uses (.pa11yci.json →
// defaults.chromeLaunchConfig). CI's Linux runner needs --no-sandbox; a probe
// without it fails there even though pa11y itself would launch fine.
function pa11yLaunchArgs() {
  try {
    const cfg = JSON.parse(readFileSync(new URL('../.pa11yci.json', import.meta.url), 'utf8'));
    return cfg?.defaults?.chromeLaunchConfig?.args ?? [];
  } catch {
    return [];
  }
}

async function canLaunch(puppeteer) {
  try {
    const browser = await puppeteer.launch({ headless: true, args: pa11yLaunchArgs() });
    await browser.close();
    return true;
  } catch {
    return false;
  }
}

function reextractFromCachedZip(executablePath) {
  // executablePath: <cache>/chrome/<platform>-<ver>/chrome-<plat>/…/<binary>
  const parts = executablePath.split(path.sep);
  const chromeIdx = parts.lastIndexOf('chrome');
  if (chromeIdx < 0 || chromeIdx + 1 >= parts.length) return false;
  const cacheDir = parts.slice(0, chromeIdx + 1).join(path.sep);
  const buildDir = path.join(cacheDir, parts[chromeIdx + 1]);
  const version = parts[chromeIdx + 1].split('-').slice(1).join('-');
  const zip = readdirSync(cacheDir).find((f) => f.endsWith('.zip') && f.startsWith(version));
  if (!zip) return false;
  rmSync(buildDir, { recursive: true, force: true });
  mkdirSync(buildDir, { recursive: true });
  const zipPath = path.join(cacheDir, zip);
  if (process.platform === 'darwin') {
    execFileSync('ditto', ['-x', '-k', zipPath, buildDir], { stdio: 'inherit' });
  } else {
    execFileSync('unzip', ['-q', '-o', zipPath, '-d', buildDir], { stdio: 'inherit' });
  }
  return true;
}

function fail() {
  console.error('\n✗ Could not get a working Chrome for the accessibility check.');
  console.error('  Run this once, then retry `npm run check:a11y`:');
  console.error('    npx puppeteer browsers install chrome');
  console.error('  If Chrome still won\'t launch, delete ~/.cache/puppeteer/chrome/<platform>-<version>/');
  console.error('  and extract the cached .zip next to it into that folder (macOS: ditto -x -k <zip> <folder>).\n');
  process.exit(1);
}

async function ensureChrome() {
  let puppeteer;
  let executablePath;
  try {
    puppeteer = (await import('puppeteer')).default;
    executablePath = puppeteer.executablePath();
  } catch {
    return; // puppeteer not resolvable — let pa11y-ci surface its own error
  }

  if (executablePath && existsSync(executablePath) && (await canLaunch(puppeteer))) return;

  if (!executablePath || !existsSync(executablePath)) {
    console.log('Chrome for the a11y check is missing — installing it once (this can take a minute)…');
    try {
      execFileSync('npx', ['puppeteer', 'browsers', 'install', 'chrome'], { stdio: 'inherit' });
    } catch {
      fail();
    }
    if (await canLaunch(puppeteer)) return;
  }

  console.log('Chrome for the a11y check is installed but won\'t launch — trying to re-extract it from the cached download…');
  try {
    if (reextractFromCachedZip(executablePath) && (await canLaunch(puppeteer))) return;
  } catch {
    // fall through
  }
  // The probe can be wrong about an environment it doesn't understand; don't
  // block on it. Let pa11y-ci run and surface its own error if Chrome really
  // is broken.
  console.warn('⚠ Could not confirm Chrome launches; running pa11y-ci anyway. If it fails on dlopen, see the fix below.');
  console.warn('  delete ~/.cache/puppeteer/chrome/<platform>-<version>/ and extract the cached .zip next to it into that folder (macOS: ditto -x -k <zip> <folder>).');
}

await ensureChrome();

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

let ready = false;
server.stdout.on('data', (buf) => { if (/127\.0\.0\.1:/.test(buf.toString())) ready = true; });
server.stderr.on('data', () => {});

async function shutdown(code) {
  try { server.kill('SIGTERM'); } catch {}
  await sleep(50);
  try { server.kill('SIGKILL'); } catch {}
  process.exit(code);
}
process.on('SIGINT', () => shutdown(130));
process.on('SIGTERM', () => shutdown(143));

const start = Date.now();
while (!ready && Date.now() - start < 15000) await sleep(150);
if (!ready) {
  console.error('preview server did not start within 15s');
  await shutdown(1);
}

// Run pa11y-ci as a child; inherit its exit code.
const pa11y = spawn('npx', ['pa11y-ci', '--config', '.pa11yci.json'], {
  stdio: 'inherit',
});
pa11y.on('exit', async (code) => {
  await shutdown(code ?? 0);
});
