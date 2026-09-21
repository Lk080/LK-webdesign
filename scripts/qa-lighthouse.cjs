const fs = require('node:fs/promises');
const path = require('node:path');
const { spawn } = require('node:child_process');
const net = require('node:net');
const config = require('./lighthouse.config.cjs');
const root = path.resolve(__dirname, '..');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.join(root, '.cache/ms-playwright');
process.env.TMPDIR = path.join(root, '.cache/tmp');
async function main() {
  const selected = process.argv[2];
  if (selected && !config.sites.some(s => s.id === selected)) throw new Error('Gebruik: node scripts/qa-lighthouse.cjs [lk|kelmora]');
  await fs.mkdir(process.env.TMPDIR, { recursive: true });
  // Fail if occupied: never audit an unrelated process on the QA port.
  await new Promise((resolve, reject) => { const s = net.createServer(); s.once('error', reject); s.listen(4173, '127.0.0.1', () => s.close(resolve)); });
  const server = spawn(process.execPath, ['scripts/qa-server.cjs'], { cwd: root, stdio: ['ignore', 'pipe', 'inherit'] });
  let browser;
  const stop = () => { browser?.close().catch(() => {}); server.kill('SIGTERM'); };
  process.once('SIGINT', stop); process.once('SIGTERM', stop);
  const runDir = path.join(root, 'test-results/lighthouse', new Date().toISOString().replace(/[:.]/g, '-'));
  await fs.mkdir(runDir, { recursive: true });
  const summaries = [];
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('QA server startup timeout')), 10000);
      server.once('error', e => { clearTimeout(timer); reject(e); });
      server.once('exit', code => { clearTimeout(timer); reject(new Error(`QA server exited: ${code}`)); });
      server.stdout.once('data', () => { clearTimeout(timer); resolve(); });
    });
    const [{ default: lighthouse }, { default: puppeteer }, { default: desktop }] = await Promise.all([
      import('lighthouse'), import('puppeteer-core'), import('lighthouse/core/config/desktop-config.js'),
    ]);
    const executablePath = require('playwright').chromium.executablePath();
    await fs.access(executablePath);
    for (const site of config.sites.filter(s => !selected || s.id === selected)) {
      for (const [mode, settings] of Object.entries(config.modes)) {
        const dir = path.join(runDir, site.id, mode);
        await fs.mkdir(dir, { recursive: true });
        const profile = await fs.mkdtemp(path.join(process.env.TMPDIR, 'lighthouse-'));
        const blocked = [], failedRequests = [];
        console.log(`Lighthouse: ${site.name} ${mode}`);
        try {
          browser = await puppeteer.launch({ executablePath, headless: true, userDataDir: profile, args: ['--no-first-run', '--disable-background-networking'] });
          const page = await browser.newPage();
          await page.setRequestInterception(true);
          page.on('request', request => {
            const url = new URL(request.url());
            if (url.hostname === 'formspree.io' || url.hostname.endsWith('.formspree.io') || !['GET', 'HEAD', 'OPTIONS'].includes(request.method())) {
              blocked.push({ url: request.url(), method: request.method() });
              void request.abort('blockedbyclient');
            } else void request.continue();
          });
          page.on('requestfailed', request => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));
          const result = await lighthouse(config.origin + site.path, { output: ['html', 'json'], logLevel: 'error' }, {
            extends: 'lighthouse:default',
            settings: { ...(mode === 'desktop' ? desktop.settings : {}), ...settings,
              onlyCategories: Object.keys(config.targets), throttlingMethod: 'simulate',
              blockedUrlPatterns: ['*formspree.io*'], },
          }, page);
          if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError || 'No Lighthouse result'));
          const { lhr } = result;
          await fs.writeFile(path.join(dir, 'report.html'), result.report[0]);
          await fs.writeFile(path.join(dir, 'report.json'), result.report[1]);
          const summary = { website: site.name, mode, url: lhr.finalDisplayedUrl, lighthouseVersion: lhr.lighthouseVersion,
            browser: await browser.version(), node: process.version, settings: lhr.configSettings,
            scores: Object.fromEntries(Object.entries(lhr.categories).map(([key, c]) => [key, { score: Math.round(c.score * 100), target: config.targets[key], met: c.score * 100 >= config.targets[key] }])),
            metrics: Object.fromEntries(['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map(id => [id, { value: lhr.audits[id].numericValue, unit: lhr.audits[id].numericUnit, display: lhr.audits[id].displayValue }])),
            findings: Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1).map(a => ({ id: a.id, title: a.title, score: a.score, display: a.displayValue, description: a.description, savings: a.metricSavings, details: a.details })),
            warnings: lhr.runWarnings, blocked, failedRequests,
            limitations: 'Local single-run diagnostic, simulated throttling; QA server no-store/uncompressed; real external fonts/network allowed except Formspree and non-read requests; not proven production performance.',
          };
          summaries.push(summary);
          await fs.writeFile(path.join(dir, 'summary.json'), JSON.stringify(summary, null, 2));
          console.log(JSON.stringify({ website: site.name, mode, scores: summary.scores, metrics: summary.metrics }));
        } finally { if (browser) { await browser.close(); browser = undefined; } await fs.rm(profile, { recursive: true, force: true }); }
      }
    }
  } finally {
    stop(); process.removeListener('SIGINT', stop); process.removeListener('SIGTERM', stop);
    await fs.writeFile(path.join(runDir, 'summary.json'), JSON.stringify(summaries, null, 2));
    console.log(`Reports: ${runDir}`);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
