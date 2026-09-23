# LK Development Environment v1 — foundation

De bestaande stack blijft: HTMLHint, Stylelint, ESLint, Playwright, Axe, Linkinator
en Lighthouse. Geen tweede testframework, nieuwe dependencies of websitearchitectuur.

## Centrale registratie

`scripts/qa-projects.json` is de bron voor IDs/namen, bronnen/routes, freeze,
publicatiefase, capabilities, adapters, vereiste checks/viewports, budgetten,
Lighthouse-targets en netwerkbeleid. `qa-projects.cjs` valideert projectselectie.
Projectspecifieke selectors blijven in deze data; businesslogica blijft in de
bestaande projectspecifieke tests. Gedeelde runners kennen geen vaste sitelijsten.

Publicatiefase beschrijft het beoogde beleid, geen geverifieerde deploymentstatus.
De bestaande demo's zijn portfolio-demo's; LK staat conservatief als draft zolang
het publicatiebesluit hier niet bevestigd is. `canonicalURL: null` betekent
onbevestigd. Voor `published` zijn een bevestigde HTTPS-canonical, consistente
OG-URL, absolute OG-image en indexeerbaarheid vereist. Geen deployment door QA.

## Uitvoering en output

Alle uitvoeringen vereisen één expliciet project. Voorbeelden:

```sh
npm run qa:light -- --site automotive --check smoke --project mobile --run
npm run qa:light -- --site beauty --check foundation,html --run
npm run qa:medium -- --site automotive
npm run qa:final -- --site automotive
npm test -- --site automotive automotive-flows.spec.cjs --project=mobile-chromium
npm run qa:visual -- --site automotive --project=mobile-standard
npm run qa:static -- automotive
npm run qa:lighthouse -- automotive
npm run qa:foundation -- automotive
npm run qa:tooling -- automotive
npm run qa:unit
```

V2-plannen voeren zonder `--run` niets uit. `--list` bewijst alleen discovery.
Direct Playwright-gebruik vereist `QA_SITE=<id>`; dezelfde guards blijven actief.
Kelmora wordt vóór uitvoering geweigerd, ook bij directe configs, static,
Lighthouse en referentieacceptatie. Historische bestanden mogen wel worden gelezen.
Een aangepast framework/config of handmatige bestandsschrijfactie valt buiten
ondersteunde ingangen: deze guard is geen OS-securitysandbox.

Iedere uitvoering krijgt `test-results/qa-runs/<project-kind-random>/run.json`.
Ieder check-onderdeel krijgt een eigen, eenmalig gereserveerde outputmap. Een tweede
uitvoering gebruikt een nieuwe run; `--output`-overrides zijn niet toegestaan.
Playwright ruimt uitsluitend zijn eigen nieuwe checkmap op. HTML- en JSON-reports
staan naast die checkmap. Bestaande bewijzen en referenties worden niet verwijderd.
Gebruik ook bij interactief werk een nieuwe sessie/run voor duurzaam bewijs; de
Playwright UI is een debugomgeving, geen immutable auditlog voor iedere UI-rerun.

Rapporten hebben altijd expliciete scope, nooit automatisch de laatste run:

```sh
node scripts/qa-axe-report.cjs <run-directory> <project-id>
node scripts/qa-static-report.cjs <run-directory> <project-id>
node scripts/qa-visual-index.cjs <run-directory> <project-id>
npm run test:e2e:report -- <run-directory> <project-id> <check>
```

Legacy rapporten zonder metadata worden niet automatisch samengevoegd of als
nieuw bewijs opgewaardeerd. Ze blijven ongewijzigd beschikbaar op hun oude pad.
Een menselijke historische beoordeling kan ze blijven citeren, met de oorspronkelijke
scope/beperkingen; automatische hergebruikclaims vereisen volledige metadata.

## Bewijs en statussen

V2 schrijft `record.json` en `evidence.json`. Iedere evidence-entry heeft project,
check/state, viewport, bron/config/baseline-hashes, omgeving, resultaat, artifactpad
en hash, tijd en hergebruikstatus. Browserresultaten bevatten testcase-states;
Axe voegt scans toe; visual voegt bestaande capture-artifacts toe. Er wordt niet
opnieuw gecaptured om een overzicht te bouwen.

De beleidsbetekenis en reviewvoorwaarden van CHECKS_COMPLETED,
TECHNICAL_GATE_PASS, OWNER_REVIEW_PENDING en DELIVERY_APPROVED staan uitsluitend
in de [Standard](../LK-DEVELOPMENT-STANDARD.md#status-en-oplevering).
`qa-evidence.assess` toetst snapshots en geregistreerde check/viewport-aanwezigheid;
het valideert niet alle betekenisvolle flowstates en laat SKIP naast PASS toe.
Een reviewer moet noodzakelijke skips/ontbrekende states dus expliciet afhandelen.

`qa-evidence.approve` vereist decision=approve, actor=human-owner, reviewer, reviewedAt,
evidence en de exacte snapshot. Dit is een expliciete lokale attestatie, geen
cryptografische identiteitscontrole. Geen stilzwijgende goedkeuring door AI of exitcode.
Een echte eigenaar moet de visuele/inhoudelijke review buiten de automatische tests
afhandelen. Publicatie is een apart registratieveld en wordt hierdoor niet gewijzigd.

Hergebruik: `reuseEvidence` accepteert alleen PASS, gelijke snapshots, intacte artifacts
en een expliciete reden. Omgeving bevat browser/OS/Node/packageversies; wijzigingen
in systeemfonts, installatie buiten lockfile of niet-gemodelleerde omstandigheden
vragen menselijke beoordeling. Hashing is conservatief, geen dependencygraph.

## Referentieacceptatie

Browser-runs schrijven nooit baselines. Ook `--update-snapshots` en `-u` worden
geweigerd. `qa:visual:update` verwijst naar dezelfde veilige acceptatiehelper.
Deze kopieert bestaande captures, start geen browser en doet geen brede update.

```json
{
  "project": "automotive",
  "run": "test-results/qa-runs/<exact-run>",
  "reviewer": "naam van menselijke reviewer",
  "reason": "beoordeelde bedoelde wijziging",
  "evidence": "test-results/<bestaand-reviewverslag>",
  "files": [{"viewport":"desktop","file":"automotive-hero.png","sha256":"<sha256 van beoordeelde capture>"}]
}
```

`npm run qa:visual:accept -- <review.json>` toont alleen het plan. `--apply` accepteert
uitsluitend die bestanden; bestaande referenties worden met reviewmetadata gearchiveerd
in dezelfde run. Daarna is een normale vergelijking zonder updates verplicht.
Vooraf expliciete menselijke scope/review volgens de Standard.

## Deterministische aanvullende controles

Foundation gebruikt de bestaande HTMLHint-parser: metadata/taal/H1, canonical/OG,
publicatiefase, JSON-LD-parseerbaarheid en top-level URL-consistentie, lokale image
bestanden, expliciete dimensies en responsive descriptors. PNG/JPEG/WebP en SVG-viewBox
worden gelezen zonder image-library. Niet ondersteunde formaten zijn zichtbaar WARNING.
Dit is geen volledige SEO-, structured-data- of browserlayoutvalidator.

`qa.budgets.assetTotalBytes` en `maxAssetBytes` zijn optionele projectbudgetten.
Ontbrekende budgetten geven INFO en metingen, nooit verzonnen universele limieten.
Geen automatische paginalengtegrens. Lighthouse beoordeelt ongeronde scores tegenover
projecttargets; ontbrekende/lagere scores of netwerkfouten geven niet-nul exitcode.
Een lokaal target blijft diagnostiek, geen productiegarantie.

Netwerk: local GET/HEAD; Formspree uitsluitend expliciete mock in functionele tests,
blokkering in visual/Lighthouse; alle andere writes geweigerd. Onbekende externe
requests worden geblokkeerd én als fout gerapporteerd. LK's vastgelegde fontfixtures
zijn expliciet toegestaan in browser-QA; Lighthouse gebruikt uitsluitend allowlisted
read-origins. APIRequestContext is apart tot lokale reads zonder redirects beperkt.
Functionele LK-fonts zijn daardoor realistischer dan de oude lege HTTP-200 mocks;
oude layout-/Axe-bewijzen met die lege fonts mogen niet automatisch worden hergebruikt.

Toolinglint omvat onderhouden scripts/tests/configs zonder fixes. De bestaande
ongecommitte `qa-visual-fonts.cjs` blijft een buiten deze run behouden legacy refresh-
helper en is expliciet uitgesloten van onderhouden toolinglint. Hij is geen
ondersteunde automatische runner. De drie rapporthelpers zijn wel gemigreerd.
Tijdelijke screenshot-/contrastscripts blijven historische artifacts; de gedeelde
visual-captures en index zijn de onderhouden reviewroute.

## Filters voor gerichte uitvoering

`--check`: smoke, functional, axe, visual, html, css, js, links, static, foundation,
tooling, lighthouse. LIGHT vereist een check; browserchecks ook `--project`.
`--project mobile|desktop|tablet` gebruikt functioneel `*-chromium` en visueel
mobile-standard/desktop/tablet. Tablet is alleen visueel beschikbaar. FINAL
accepteert geen check/project/grep-filter; gebruik LIGHT/MEDIUM voor subsets.
`--grep` is een regex voor functionele testnamen, gecombineerd met de sitefilter.
Geen passende tests is een fout. Een visual-test omvat een volledige site/viewport-
referentieset; er is geen componentfilter. `--compare <record.json>` voert niets uit
en selecteert slechts kandidaten, zonder artifactvalidatie of automatische testskip.

```sh
npm run qa:light -- --site lk --check functional --grep hoofdnavigatie --project desktop
npm run qa:light -- --site lk --check axe --project mobile
npm run qa:medium -- --site lk --check visual --project tablet
```

Voeg alleen `--run` toe om deze plannen werkelijk uit te voeren.
