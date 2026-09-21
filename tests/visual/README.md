# Visual QA — referenties en gerichte regressie

Volg [LK Development Standard V2](../../LK-DEVELOPMENT-STANDARD.md).
Kelmora Final is goedgekeurd en bevroren op commit 4c8674f; 42 bewust gewijzigde
referenties zijn beoordeeld en bijgewerkt, daarna slaagden alle 85 vergelijkingen.
LK-referenties zijn geen finale design-/accessibilitygoedkeuring. Menselijke
review blijft verplicht. Geen brede updates als reactie op falende tests.

## Gebruik

- `npm run qa:visual`: vergelijken, nooit baselines schrijven (updateSnapshots: none).
- `npm run qa:visual:lk` / `npm run qa:visual:kelmora`: één website vergelijken.
- `npm run qa:visual:update`: legacy brede update; niet gebruiken in de V2-workflow. Selecteer uitsluitend vooraf beoordeelde referenties en vergelijk daarna zonder update.
- `npm run qa:visual:index`: HTML-overzicht van de laatst gemaakte screenshots.

Configuratie: `playwright.visual.config.cjs`. Siteselectoren: `sites.cjs`.
Baselines: `tests/visual/baselines/<viewport>/`. Nieuwe screenshots/diagnose:
`test-results/visual/`. Overzicht: `test-results/visual/index.html`.
Playwright HTML-rapport: `playwright-report/visual/`.

375×812, 390×844, 768×1024, 1440×900 en 1920×1080; Chromium, DPR 1,
light mode, nl-BE, Europe/Brussels. Vergelijk op dezelfde OS/browser/fontversies.
OS/browserupdates kunnen baselineverschillen veroorzaken en vereisen review.
Elke pixel telt: threshold 0 en maxDiffPixels 0; geen maskers of toleranties.

Per viewport: LK heeft 1 volledige pagina + 6 componenten; Kelmora 1 volledige
pagina + 9 componenten (inclusief prijsindicatie én offerte). Totaal 85 baselines.
Assistant-dialogen worden niet geopend; het bestaande automation-gedeelte wel
vastgelegd. De screenshots zijn initiële states, geen dekking van elke interactie.

## Stabiele rendering en netwerk

Fonts zijn eenmalig uit de bestaande Google Fonts stylesheet opgehaald en onder
assets opgeslagen (manifest plus 9 fontbestanden). Normale runs halen niets
extern op. `scripts/qa-visual-fonts.cjs` is een afzonderlijke expliciete
refresh-helper, nooit automatisch aangeroepen. Een fontrefresh vereist een
nieuwe menselijke review. Geen npm-dependencies toegevoegd.

Formspree en niet-leesverzoeken worden geblokkeerd; andere onbekende externe
resources geven een testfout. De lokale fontresponses behouden de originele
URL's, zodat de websitecode/CSP niet hoeven te veranderen. Een gemockte lokale
stylesheet schakelt animaties/transities/caret uit. Reduced motion staat aan.
CSP wordt niet omzeild. Lazy images worden alleen in de test-DOM eager gemaakt;
font readiness en image decoding worden afgewacht. Websitebestanden blijven
ongewijzigd. Datum/jaartal blijft actueel en kan later een verklaarbaar verschil geven.

## Layout en lengtediagnose

Checks: documentbreedte, grenzen en bruikbare afmetingen van geselecteerde
hoofdcomponenten, afmetingen/laden van zichtbare images, zichtbare navigatie
(mobiel/tablet geopend) en hit-test van de primaire hero-CTA. Geen generieke
scan van ieder decoratief element: dat zou legitieme clipping/carousels kunnen
afkeuren. Deze checks bewijzen niet dat elke knop en elk tekstblok vrij van
clipping is; menselijke review blijft nodig.

layout.json bevat hoogte, verhouding tot viewporthoogte, aantal directe
`main > section`-secties en de vijf hoogste secties. Geen PASS/FAIL-lengtegrens.

De functionele suite blijft gescheiden. Gebruik voor behoud van visual-output:
`npm run test:e2e -- sites.spec.cjs --output=test-results/functional --reporter=list`
Een gewone run met de oorspronkelijke default outputDir kan test-results en
het oorspronkelijke HTML-rapport opschonen; de baselines blijven onder tests.
