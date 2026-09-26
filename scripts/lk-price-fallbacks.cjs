'use strict';
// Generate/check no-JS price fallbacks from the same net source as the browser.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {}, document: { querySelectorAll: () => [] }, Intl, URLSearchParams };
vm.runInNewContext(fs.readFileSync(path.join(root, 'docs/commercial.js'), 'utf8'), context);
const commercial = context.window.LKCommercial;
let changed = false;
for (const file of ['index.html', 'aanpak.html']) {
  const target = path.join(root, 'docs', file);
  const source = fs.readFileSync(target, 'utf8');
  const output = source.replace(/(data-price(-incl)?="([a-z]+)">)[^<]*/g, (_, prefix, incl, key) => prefix + (incl ? commercial.inclusivePrice(key) : commercial.price(key)));
  if (source !== output) {
    changed = true;
    if (process.argv.includes('--write')) fs.writeFileSync(target, output);
    else console.error(`Outdated price fallback: ${file}`);
  }
}
if (changed && !process.argv.includes('--write')) process.exitCode = 1;
