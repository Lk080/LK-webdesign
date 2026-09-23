module.exports = {
  origin: 'http://127.0.0.1:4173',
  sites: Object.values(require('./qa-projects.cjs').projects).map(p => ({ id: p.id, name: p.name, path: p.route, targets: p.qa.targets })),
  modes: {
    desktop: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false } },
    mobile: { formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } },
  },
};
