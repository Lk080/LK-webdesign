module.exports = [
  { id: 'beauty', path: '/demos/beauty/', name: 'Beauty / Velune', components: { header: '.site-header', hero: '.hero', treatments: '#behandelingen', finder: '#jouw-ritueel', studio: '#studio', faq: '#vragen', footer: '.footer' }, cta: '.hero-actions .button', nav: '#navigation', menu: '.menu-toggle', menuBreakpoint: 760 },
  { id: 'lk', path: '/', name: 'LK Webdesign', components: { header: 'body > header', hero: '.hero', portfolio: '#voorbeelden', pricing: '#prijzen', contact: '#contact', footer: 'body > footer' }, cta: '.hero-actions .button', nav: '#main-nav' },
  { id: 'kelmora', path: '/demos/vakman/', name: 'Kelmora', components: { header: '.site-header', hero: '.hero', diensten: '#diensten', realisaties: '#realisaties', prijsindicatie: '#prijsindicatie', offerte: '#offerte', automation: '#automation', eindcta: '.end-cta', footer: '.site-footer' }, cta: '.hero .button.primary', nav: '#nav' },
];
