module.exports = {
  origin: 'http://127.0.0.1:4173',
  sites: [{ id: 'automotive', name: 'Automotive / AVREN', path: '/demos/automotive/' }, { id: 'beauty', name: 'Beauty / Velune', path: '/demos/beauty/' }, { id: 'lk', name: 'LK Webdesign', path: '/' }, { id: 'kelmora', name: 'Kelmora', path: '/demos/vakman/' }],
  targets: { performance: 90, accessibility: 95, 'best-practices': 95, seo: 95 },
  modes: {
    desktop: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false } },
    mobile: { formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } },
  },
};
