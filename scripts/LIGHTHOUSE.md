# Lighthouse-diagnose

Workflow en gerichte uitvoering: [LK Development Standard V2](../LK-DEVELOPMENT-STANDARD.md).

Vanuit de projectroot:

- `npm run qa:lighthouse`: beide websites, desktop en mobiel.
- `npm run qa:lighthouse:lk`: alleen LK, beide modes.
- `npm run qa:lighthouse:kelmora`: alleen Kelmora, beide modes.

Geen installatie nodig. De runner gebruikt de bestaande Lighthouse- en
Playwright-pakketten en Lighthouse's bestaande puppeteer-core dependency.
De Playwright Chromium-binary wordt projectlokaal gevonden. Tijdelijke profielen
staan in `.cache/tmp`; uitsluitend deze door de runner aangemaakte profielen
worden na afloop verwijderd.

`scripts/lighthouse.config.cjs` bevat websites, viewports en targets. Voeg daar
later bestaande projecten toe. De runner start `scripts/qa-server.cjs` en stopt
zijn eigen server na afloop. Een bezette poort 4173 wordt geweigerd. Audits lopen
achtereenvolgens met een nieuw browserprofiel om onderlinge belasting en
browsercache te beperken. Geen websitecode, Axe-regels of Playwright-config
worden gewijzigd.

Rapporten: `test-results/lighthouse/<tijdstip>/<website>/<mode>/` met `report.html`,
`report.json` en `summary.json`. Daarnaast bevat iedere run een gecombineerde
`summary.json`. Targets zijn Performance 90, Accessibility 95, Best Practices 95,
SEO 95. Een score onder target is een diagnose, geen procesfout; technische
uitvoeringsfouten geven wel een niet-nul exitcode. Bekijk details en menselijke
impact voordat je verbeteringen kiest. Scores zijn geen toegankelijkheidscertificaat.

Desktop: 1440×900, Lighthouse desktop-throttling. Mobiel: 390×844, Lighthouse
standaard mobiele throttling. Beide simuleren netwerk/CPU. Eén meting per mode
is een momentopname; bij latere performancebeslissingen meerdere metingen doen.

Externe bronnen/webfonts mogen echt laden, anders dan de Playwright-mocks.
Formspree wordt op Lighthouse- en requestniveau geblokkeerd; niet-leesverzoeken
worden eveneens geblokkeerd. De runner bedient geen formulieren. Geblokkeerde
en mislukte requests en Lighthouse-waarschuwingen staan in de summaries.
Interception zelf kan enige meetoverhead toevoegen.

Dit is localhost met een eenvoudige server (no-store, geen compressie/CDN/TLS).
Caching-, compressie-, HTTPS-, robots- en canonical-resultaten kunnen afwijken
van productie. Simulatie en echte externe netwerkvariatie blijven lokale
labmetingen, geen bewezen productieprestaties of echte Core Web Vitals.

Functionele regressiecheck zonder de Lighthouse-map te laten verwijderen door
Playwrights output-cleanup:

`npm run test:e2e -- sites.spec.cjs --output=test-results/functional`

Een gewone `npm test` kan de volledige standaardmap `test-results` opschonen.
Bewaar relevante Lighthouse-rapporten eerst als je die later wilt behouden.
