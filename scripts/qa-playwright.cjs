'use strict';
const { spawnSync } = require('node:child_process');
const { assertRunnable } = require('./qa-projects.cjs');
function main(args) {
  const index = args.indexOf('--site');
  if (index < 0 || !args[index + 1]) throw Error('Use --site <project-id>');
  const [ , site ] = args.splice(index, 2);
  assertRunnable(site);
  const result = spawnSync(process.execPath, ['node_modules/@playwright/test/cli.js', 'test', ...args], {
    stdio: 'inherit', env: { ...process.env, QA_SITE: site },
  });
  process.exitCode = result.status ?? 1;
}
if (require.main === module) { try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; } }
