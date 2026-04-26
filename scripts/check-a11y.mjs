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

import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4332;

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
