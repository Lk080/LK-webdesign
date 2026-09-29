module.exports = {
  origin: 'http://127.0.0.1:4173',
  sites: Object.values(require('./qa-projects.cjs').projects).map(p => ({ id: p.id, name: p.name, path: p.route, targets: p.qa.targets })),
  modes: {
    desktop: { formFactor: 'desktop', screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false } },
    mobile: { formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } },
  },
  resolvePage(id, requested) {
    const project = require('./qa-projects.cjs').assertRunnable(id);
    // Reuse foundation's owned-page discovery, including LK's frozen-demo exclusion.
    const pages = require('./qa-foundation.cjs').inspectProject(project).pages.flatMap(p => {
      const route = p.file.replace(/^docs/, '');
      return [route, route.replace(/\/index\.html$/, '/')];
    });
    const route = requested === undefined ? project.route : requested;
    if (!pages.includes(route)) throw Error('Lighthouse page must be an existing, project-owned HTML route');
    return route;
  },
};
