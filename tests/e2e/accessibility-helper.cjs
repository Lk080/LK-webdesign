const AxeBuilder = require('@axe-core/playwright').default;
const axe = require('axe-core');
const fs = require('node:fs/promises');
const { expect } = require('./fixtures.cjs');
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'];
// Explicitly include legacy duplicate-ID checks as requested, even when disabled by default.
const rules = [...new Set([...axe.getRules(tags).map(rule => rule.ruleId), 'duplicate-id', 'duplicate-id-active', 'duplicate-id-aria'])];
async function scanAccessibility(page, testInfo, website, state) {
  await page.evaluate(() => document.fonts.ready);
  const results = await new AxeBuilder({ page }).withRules(rules).analyze();
  const report = {
    metadata: { ...testInfo.config.metadata, check: 'axe' },
    website, viewport: testInfo.project.name, state, axeVersion: results.testEngine.version,
    counts: Object.fromEntries(['critical', 'serious', 'moderate', 'minor'].map(impact => [impact, results.violations.filter(v => v.impact === impact).length])),
    violations: results.violations.map(v => ({
      impact: v.impact, ruleId: v.id, explanation: v.help, description: v.description,
      helpUrl: v.helpUrl, nodeCount: v.nodes.length,
      nodes: v.nodes.map(n => ({ selector: n.target, element: n.html, explanation: n.failureSummary })),
    })),
    incomplete: results.incomplete,
    rulesChecked: rules,
  };
  const output = testInfo.outputPath(`axe-${state}.json`);
  await fs.writeFile(output, JSON.stringify(report, null, 2));
  await testInfo.attach(`axe-${state}`, { path: output, contentType: 'application/json' });
  await testInfo.attach(`axe-raw-${state}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
  console.log(`AXE ${website} | ${testInfo.project.name} | ${state}: ${JSON.stringify(report.counts)}`);
  for (const violation of report.violations) {
    const message = `${website} | ${testInfo.project.name} | ${state} | ${violation.impact} | ${violation.ruleId} | ${violation.explanation} | ${violation.nodeCount} nodes | ${violation.nodes.map(n => n.selector.join(' ')).join('; ')} | ${violation.helpUrl}`;
    console.log(message);
    testInfo.annotations.push({ type: `axe-${violation.impact}`, description: message });
  }
  return report;
}
function assertAccessibility(reports) {
  const blocking = reports.flatMap(r => r.violations.filter(v => ['critical', 'serious'].includes(v.impact)).map(v => ({ website: r.website, viewport: r.viewport, state: r.state, ...v })));
  expect(blocking, 'Critical/serious Axe violations; see axe attachments for all severities and incomplete checks').toEqual([]);
}
module.exports = { scanAccessibility, assertAccessibility };
