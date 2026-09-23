'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { loadRun } = require('./qa-run.cjs');
try {
  const [directory, project, check] = process.argv.slice(2);
  if (!directory || !project || !['functional','smoke','axe','visual'].includes(check)) throw Error('Usage: <run-directory> <project> <check>');
  const { dir } = loadRun(directory, project);
  const report = path.join(dir, check + '-html');
  if (!fs.existsSync(path.join(report, 'index.html'))) throw Error('This run has no requested HTML report');
  const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js','show-report',report], { stdio:'inherit' });
  process.exitCode = result.status ?? 1;
} catch (error) { console.error(error.message); process.exitCode = 1; }
