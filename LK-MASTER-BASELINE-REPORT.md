# LK Master Baseline Report

Datum: 28 september 2026. Status: **BASELINE RECORDED — PRE-EXECUTION REVIEW COMPLETE, WAITING FOR GO**. Geen Master Launch PASS of productiegoedkeuring. Bestaande implementatie, configuratie en bewijs read-only onderzocht; alleen dit rapport toegevoegd.

## 1. Ontvangen opdracht en grens

Alle drie delen van Definitive Codex Execution Specification v1.0 zijn ontvangen en als één geheel beoordeeld: §§0–94, 95 secties zonder nummergaten of dubbele sectienummers. De vervolgdelen herstellen de oorspronkelijke afbrekingen in §25 en §54. §94 eindigt met een volledige inhoudelijke afsluitzin; geen ongeziene latere secties verondersteld. De expliciete ownerbevestiging dat dit de volledige drie delen zijn is leidend.

De laatste owneropdracht beperkt uitvoering tot de PRE-EXECUTION GATE A–F. De eerdere vraag om ontbrekend vervolg is daarmee afgehandeld. Dit baselineverslag en het ene [Master Execution Plan](LK-MASTER-EXECUTION-PLAN.md) vormen het resultaat; vóór implementatie wordt gewacht op GO. Geen homepage, calculator, engine, scanner, accounts of commerciële regels gewijzigd.

Bronnen: [Development Standard](LK-DEVELOPMENT-STANDARD.md), [Commercial Requirements](LK-COMMERCIAL-REQUIREMENTS.md), [projectregistratie](scripts/qa-projects.json), [QA Foundation](scripts/QA-FOUNDATION.md), [Master control](LK-PRELAUNCH-MASTER-CONTROL.md), [Hosting Architecture](LK-HOSTING-ARCHITECTURE.md), [Client Infrastructure & Revenue](LK-CLIENT-INFRASTRUCTURE-REVENUE.md). Skills `lk-technical-gate` en `lk-visual-review` gebruikt voor bewijs-/baselinebeoordeling. Security-skill en relevante frontendguidance gebruikt voor begrensde broninspectie en toekomstig scannerplan; geen penetratietest of scannerimplementatie uitgevoerd. Alle vijf LK-skills zijn ingezien en hun lokale discovery-symlinks verwijzen naar deze repository.

## 2. Git, werkstaat en rollbackbasis

| Onderdeel | Vastgesteld |
|---|---|
| Branch | `prelaunch-checkpoint-2026-09-27` |
| HEAD | `74fea4993282d70e76fc986cc07da2a9794beb98` — `chore: checkpoint LK Final prelaunch state` |
| Vorige commit | `fbdb1ef` — `Optimize LK Codex workflow efficiency` |
| Bestaande gewijzigde bestanden | `LK-COMMERCIAL-REQUIREMENTS.md`, `LK-EMAIL-DNS-PRELAUNCH.md`, `LK-PRELAUNCH-CHECKLIST.md`, `LK-PRELAUNCH-MASTER-CONTROL.md` |
| Bestaande untracked bestanden | `LK-CLIENT-INFRASTRUCTURE-REVENUE.md`, `LK-HOSTING-ARCHITECTURE.md` |
| Huidige website/testwijzigingen t.o.v. HEAD | Geen bij taakstart; documentatiewerk blijft behouden |
| Deployment | Historisch bevestigd GitHub Pages `main → /docs`; niet opnieuw remote geverifieerd in deze baseline |
| Oude Sites-config | `.openai/hosting.json` verwijst naar `dist`; geen bewijs van de actuele host |

De checkpoint bevat niet de latere ongecommitte documentatie. Voor een omvangrijke implementatiefase eerst die werkstaat veilig vastleggen zonder reset/stash/overschrijven; commit/push afzonderlijk expliciet afstemmen, niet uit het woord checkpoint afleiden. Geen branchwijziging, commit, push of deployment in deze taak.

Actuele `qa-state.snapshot('lk')` vóór rapporttoevoeging:

```text
source        8f86708ce4c074dbc1468c5fdadde1c6aef833de9f5df3b83dec7cab70edfc3e
configuration 9f8df7426a8a60ccc56ba8d780e095950cf8428423b868f8c5495f29621a2432
baselines     978fbc548b0c48ec1ae8b795b7cdd6ac5e3a5a657b915bbdc347f1e02123e97a
Node          v24.21.0
Platform      darwin arm64 / 25.6.0
Timezone      Europe/Amsterdam
Playwright    1.63.0
Axe package   4.13.0
Lighthouse    13.5.0
```

Dit is een toestandmeting, geen bewijs dat alle huidige sitechecks slagen.

## 3. Bestaand systeem en classificatie

KEEP = behouden; IMPROVE = gericht aanvullen; REFACTOR = bewezen duplicatie gecontroleerd samenbrengen; REPLACE/REMOVE uitsluitend bij bewezen noodzaak; MISSING = niet aangetroffen binnen onderzochte repository. Ontbreken van een tool bewijst niet dat een extern account niet bestaat.

| Systeem | Klasse | Feitelijke basis en richting |
|---|---|---|
| Statische architectuur | KEEP | Vanilla HTML/CSS/JS in `docs/`; geen Astro-app of productiebackend. Geen frameworkmigratie nodig om deze baseline te verbeteren |
| Home | KEEP | Compacte hero → drie demo’s → aanpak/prijsrichting → Lorenz/contact. Geen volledige calculator of formulier op Home |
| Hero-CTA | IMPROVE | Nu `Bespreek je website` naar Contact; nieuwe specificatie vraagt `Bereken je website`. Kleine wijziging pas in begrensde UX-fase, geen redesign |
| Portfolio | KEEP | Kelmora, Velune en AVREN met expliciete fictieve demo-labels en lokale links; geen klantresultaten geclaimd |
| Projectdetailervaring | IMPROVE | Directe demo’s bestaan; geen aparte actuele projectcasepagina’s aangetroffen. Alleen toevoegen als bezoekerswaarde bewezen is |
| Aanpak/calculator | KEEP | Paginaomvang, complexiteit, functies, custom/unknown en persoonlijke offerte; geen page-count-only calculator |
| Commerciële runtime | KEEP | `docs/commercial.js` bezit ranges, wegingen, normalisatie, €25-afronding, maatwerkgrens, Hosting/Care en btw-afleiding |
| Prijsfallbacks | KEEP | `scripts/lk-price-fallbacks.cjs` controleert/genereert HTML uit dezelfde runtimebron; check zonder writes geslaagd |
| Contactcontext | KEEP | `request-context.js` reconstrueert toegestane keuzes; aparte projectsamenvatting en behoud van eigen bericht |
| Formspree-flow | KEEP | `contact.js`: validatie/foutfocus, honeypot, lock, 20s abort, geen automatische retry, invoerbehoud, HTTP plus JSON `ok:true` voor succes |
| Navigatie | KEEP | Progressive enhancement, menu/escape/focusherstel, breakpointfocus, no-JS-links; bestaande tests dekken deze flows |
| Assistent | KEEP | Lokale vaste keuzehulp, geen externe AI, beperkte sessionStorage-keuzes en contact/calculatoroverdracht |
| Visuele tokens/componenten | KEEP | Bestaande stylesheets met bewuste compositie; geen bewijs voor volledige vervanging |
| Stylesheetonderhoud | IMPROVE | Historische 85 specificiteitswarnings; legacy `style.css` wordt niet door de drie actuele kernpagina’s geladen. Verwijdering alleen na referentie-/impactonderzoek |
| QA/Audit-basis | KEEP | Registry, scoped runners, netwerkguards, artifact-hashes, evidence, gate/owneronderscheid, Playwright/Axe/Lighthouse/static/visual bestaan |
| Toolingfixture | IMPROVE | Eén actuele unitfailure: historische portfolioselector versus huidige registry; zie B01 |
| A11y-hulplogica | REFACTOR | Centrale helper/slice gebruikt 2.1-tags; Final/Assistant gebruiken al `wcag22aa`. Afwijkende helpers moeten gecontroleerd worden verenigd zonder regels te schrappen |
| Auditdiagnose/prioriteiten | IMPROVE | Findings en classificaties bestaan; nog geen volledige uniforme diagnose→prioriteit→fix/retest-werkstroom voor alle gevraagde categorieën |
| Website Engine | IMPROVE | Herbruikbare engineering/QA aanwezig, maar geen zelfstandig geversioneerde klantfoundation met bewezen instantiatie/upgrade/exitcontract |
| Conversion Library | MISSING | Losse patronen bestaan; geen expliciete, versieerbare bibliotheek. Begin met bewezen patronen, niet tientallen nieuwe varianten |
| Publieke Website Check | MISSING | Geen URL-scanner/UI/API/queue/SSRF-grens aangetroffen; niet als bestaande werkende functie presenteren |
| Conversion measurement | IMPROVE | Lokale `lk:interaction`-hooks bestaan; geen actieve analyticscollector, consentadapter of opgeslagen conversiecijfers aangetroffen |
| Privacy/consent | IMPROVE | Geen volledige privacypagina/consentlaag; externe fonts en assistantstorage bestaan. Juridische/operationele input blijft nodig |
| SEO/structured data | KEEP | Titles/descriptions, canonical/OG/Twitter, JSON-LD, robots en sitemap aanwezig; publicatieconsistente URL’s en schema-inhoud nog apart reviewen |
| Field performance | MISSING | Geen actuele CrUX-/RUM-dekking aangetroffen; Lighthouse is labbewijs |
| Hosting/Care | IMPROVE | Commerciële lock en operationele ontwerpen aanwezig; providercontract, backup/restore/monitoring en capaciteit nog onbewezen |
| Intern financieel dashboard | MISSING | Rapportagemodel bestaat in Client Infrastructure & Revenue; geen beveiligde uitvoerende app/dataset aangetroffen |
| Monitoring/portal/prospecting | MISSING | Toekomstige ideeën/ontwerp, geen operationele dienstverlening; niet tegelijk bouwen |

Geen onderdeel is op basis van deze baseline als REPLACE of REMOVE geselecteerd. Aanwezigheid van oude bestanden alleen rechtvaardigt geen verwijdering.

## 4. QA-uitvoering en bewijsintegriteit

Nu uitgevoerd:

- `npm run qa:unit`: **19 PASS, 1 FAIL**, nul skips; bestaande toolingtestfailure B01.
- `node scripts/lk-price-fallbacks.cjs`: exit 0, geen writes; huidige HTML-bedragen passen bij de runtimebron.
- `npm run qa:final -- --site lk`: uitsluitend **plan-only** voor functioneel, Axe, visuals, static, foundation, Lighthouse en tooling. Geen browsersuite uitgevoerd door dit plan.
- `qa-state.snapshot`, artifact-hashcontrole, `reuseEvidence` en `assess` op twee expliciet gekozen historische runs. Geen metadata aangepast.

| Historisch bewijs | Inhoud | Integriteit nu | Huidige geldigheid |
|---|---|---|---|
| `test-results/qa-runs/lk-final-2gfe3n/evidence.json` | 115 PASS-items, 2 SKIP; toenmalige machinegate PASS | 117/117 artifactverwijzingen hashgeldig | 0 herbruikbaar: bron/config/tijdzone wijken af; actuele assessment INCOMPLETE |
| `test-results/qa-runs/lk-medium-3TxCIX/evidence.json` | 74 PASS-items, 2 SKIP; functioneel/Axe/static/tooling | 76/76 artifactverwijzingen hashgeldig | 0 herbruikbaar: bron/tijdzone wijken af; visuals/foundation/Lighthouse ontbreken ook binnen deze run |

Dit zijn aantallen evidence-items, niet hetzelfde als aantallen onafhankelijke tests. De twee skips zijn mobiele navigatie/overflowchecks in het desktopproject; mobiele tegenhangers en inhoudelijke dekking moeten bij finale beoordeling blijven worden gecontroleerd. `assess` alleen bewijst geen volledige states of handmatige review.

De eerdere Medium-bron staat vóór de twee reeds toegestane whitespacecorrecties; de grotere Final-run staat ook vóór de btw-implementatie. Niet-gehashte factoren en de huidige tijdzone blijven expliciete omgevingsverschillen. Historisch bewijs blijft context, geen nieuwe PASS via metadataherlabeling.

Bekende historische beperkingen: 85 CSS-specificiteitswarnings; 55 informational linkmeldingen voor niet extern gecontroleerde links; geen volledige screenreader-/browsermatrix afgeleid uit Chromium. Deze baseline bevat geen nieuwe volledige Axe-uitvoer. Aanvullend is read-only `npm audit --package-lock-only --ignore-scripts --json` uitgevoerd: nul bekende kwetsbaarheden gemeld. De eerste sandboxpoging mislukte; de toegestane netwerkretry slaagde. Geen dependencies gewijzigd. Een beperkte patrooncontrole op tracked tekst voor private keys, GitHub-tokens, AWS-key-ID’s en secret-key-literals vond nul treffers; geen secrets geprint. Dit is geen garantie dat alle secrets of kwetsbaarheden afwezig zijn. De actieve kern-JS gebruikt geen `innerHTML`, `insertAdjacentHTML`, `eval` of `new Function`; de enige aangetroffen fetch is de bekende Formspree-POST. Andere aanvalsvormen worden hiermee niet uitgesloten.

## 5. Performance, responsive en visuals

Historische LK Final-labmeting in `lk-final-2gfe3n/lighthouse/lk/`:

| Mode | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---:|---:|---:|---:|---:|---:|
| Desktop | 100 | 100 | 100 | 100 | circa 0,51 s | 0,00056 |
| Mobile | 99 | 100 | 100 | 100 | circa 1,65 s | 0,00049 |

Lokale single-run diagnostiek van een eerdere bronstaat; geen huidige productie-/veldclaim en geen noodzaak om 99 kunstmatig 100 te maken. Werkelijke productiecache, netwerk, privacykeuzes en nieuwe features kunnen de uitkomst veranderen.

Bestaande tests in `lk-final-flows.spec.cjs` inspecteren Home/Aanpak/Contact op 320/360/375/390/430/768/1024/1280/1440; no-overflow, images, calculator, form errors/success en keyboard zijn aanwezig. Visual-config heeft 375/390/768/1440/1920; 320/1024 worden daarnaast in functionele captures gebruikt. Testaanwezigheid is geen actuele uitvoering.

Historische fullpagebeelden daadwerkelijk bekeken:

- `lk-final-2gfe3n/functional/lk-final-flows-LK-Webdesig-10ff5-ible-with-keyboard-and-zoom-mobile-chromium/compact-home-390.png`
- `lk-final-2gfe3n/functional/lk-final-flows-LK-Webdesig-10ff5-ible-with-keyboard-and-zoom-desktop-chromium/compact-home-1440.png`

Beoordeling: samenhangende donkere/groene hero, duidelijke primaire actie, verschillende demo-uitstralingen, rustige sectievolgorde en eenvoudige mobiele stapeling. Geen reden voor een volledige herbouw. Dezelfde Kelmora-afbeelding komt hero én portfolio terug; dat is een reviewkeuze, geen bewezen defect. Beelden tonen nog de oude excl.-btw-presentatie, dus actuele prijswraps hiermee niet goedkeuren. Status **UNCERTAIN voor huidige finale visuals**; geen verse state-/focus-/hoverreview, geen baselineacceptatie.

## 6. Demo-status

| Demo | Repositoryfeit | Historisch bewijs | Grens |
|---|---|---|---|
| Kelmora | `docs/demos/vakman`, `frozen:true`, freezecommit in registry; forms/wizard/assistant | Labrapport 20-09 onder `test-results/lighthouse/2026-09-20T17-58-49-988Z/kelmora/` | Geen runtimeheropening of hertest; finale nieuwe review vereist expliciete afhandeling freeze |
| Velune | `docs/demos/beauty`, niet frozen, finder en afspraakdemo; geen boekingsbackend | Labrapport 21-09 onder `test-results/lighthouse/2026-09-21T11-41-47-934Z/beauty/`; eigen functional/Axe/visual-tests | Geen nieuwe finale visuele review in deze baseline |
| AVREN | `docs/demos/automotive`, niet frozen, configurator en gesimuleerde vergelijkingsslider | Labrapport 23-09 onder `test-results/lighthouse/2026-09-23T13-16-34-066Z/automotive/`; scoped desktoprapport aanwezig | Geen actuele integrale demo-PASS afgeleid uit losse historische rapporten |

Demo-HTML, assets/README’s, registry en testadapters read-only bekeken. Alle drie hebben eigen HTML/CSS/JS en herkenbare fictieve demo-inhoud. Beeldherkomst is gedocumenteerd; geen nieuwe rechten- of klantclaim toegevoegd.

## 7. Concreet afwijkingsregister

| ID | Ernst / aard | Bevinding en bewijs | Eerstvolgende veilige actie |
|---|---|---|---|
| B01 | Toolingbaseline FAIL | `scripts/qa-foundation.test.cjs:64` vergelijkt `scripts/fixtures/project-reference.json` met registry. Fixture verwacht `#voorbeelden`; `docs/index.html` en registry gebruiken `#projecten` | Verifieer bedoelde selector en wijzigingshistorie; onderhoud alleen de verouderde referentie met expliciete motivatie en behoud selectorcontrole. Niet test verwijderen/overslaan of product terugsleutelen om fixture te volgen |
| B02 | Specificatieconflict | §15/19 vragen excl.-btw; Commercial Lock 27-09 en huidige tests verlangen incl. primair/excl. secundair voor gekozen B2B/B2C | Ownerbevestiging gevraagd; netto bedragen en presentatie blijven intussen ongewijzigd |
| B03 | Afgehandeld in pre-execution gate | Alle drie definitieve delen sluiten aan tot en met §94; fragmenten in §25/54 hersteld door vervolg | Eén masterplan; geen verdere ontbrekende tekst als blocker opvoeren |
| B04 | Freezeconflict | Gevraagde finale review Kelmora versus registry freeze | Freeze behouden; alleen afzonderlijk expliciet heropende review uitvoeren, guards niet omzeilen |
| B05 | A11y-dekking verschilt | `accessibility-helper.cjs` en slice 2.1-tags; Final/Assistant al 2.2-tag | Harmonisatie per relevante state ontwerpen; geen bewering dat 2.2 volledig ontbreekt of al volledig bewezen is |
| B06 | Bewijs niet actueel | Snapshotverschillen en geen nieuwe finale runs | Na gekozen implementaties precies geraakt/ontbrekend bewijs produceren; geen brede reruns alleen voor documentatie |
| B07 | Measurement ontbreekt | `script.js`, `project.js`, `assistant.js`, `contact.js` emitten lokale events; geen collector | Eerst event-/consentcontract, provider/privacy/budget en deduplicatie; succes blijft uitsluitend na bevestigde formulieracceptatie |
| B08 | Scannerboundary ontbreekt | Geen server/API/SSRF-beleid in huidige statische app | Eerst securityarchitectuur en uitvoeringsomgeving; geen client-side API-key of fake scan |
| B09 | Operationele launchpunten | Bedrijfs-/btw-bevestiging, privacy/voorwaarden, hostcontract, backup/restore/monitoring open in bestaande dossiers | Bestaande owners/gates behouden; nieuwe features sluiten die niet |

Lokale QA-mocks voor Formspree zijn veiligheidsmaatregelen en blijven actief; de nieuwe anti-cheatingregel is geen toestemming voor echte inzendingen. Mockbewijs wordt nergens productiebezorgbewijs genoemd. Historisch echte Formspree-/mailbewijs blijft begrensd tot de toen geteste publieke route.

## 8. Geconsolideerd vervolgplan en aanvullende inventaris

Er is één gefaseerd [Master Execution Plan](LK-MASTER-EXECUTION-PLAN.md), met requirementmapping, afhankelijkheden, scope, tests, acceptatie, herstelstrategie en STOP/GO per fase. De vroegere voorlopige volgorde is hierdoor vervangen. Eerste voorgestelde fase: alleen de bewezen verouderde selectorfixture herstellen, assertion behouden en toolingbaseline verifiëren; ook dit wacht op GO.

Assetinventaris van LK buiten demo’s: 6 JS-bestanden samen 52.748 bytes, 6 CSS-bestanden 60.294 bytes, 6 WebP’s 431.764 bytes, 2 JPEG’s 149.723 bytes en 2 PNG’s 1.919.798 bytes. Dit is bestandsomvang, **geen gemeten transfergewicht per pagina**. De drie actuele HTML-pagina’s laden niet alle bestanden; gebruik geen totaal als netwerkbudget of LCP-bewijs. Bestaande imageafmetingen/srcset/lazy-loading en hero-priority behouden; nieuwe budgetten pas op gemeten pagina-impact baseren.

Robots staat `Allow: /`; sitemap bevat de drie LK-kern-URL’s. Geen publieke scanner/serverless-, analyticscollector- of dashboardbestanden gevonden in de onderzochte repository. Productie-accountconfiguratie, huidige headers, externe domein-/mailwerking en veldmetingen zijn niet opnieuw uitgevoerd; eerder dossierbewijs blijft gedateerd. De baseline is volledig als repository-inventaris voor planning, niet als vervangende final gate.

## 9. Resultaat van deze fase

Feitelijke baseline vastgelegd, bestaande sterke onderdelen geïdentificeerd, huidige toolingfailure zichtbaar en bewijsgrenzen expliciet. Geen code/test/config/prijzen/baselines gewijzigd. Geen nieuwe publieke scan, tracking, accounts, migratie, DNS, mailboxactie, commit, push of deployment.

**LK MASTER BASELINE: RECORDED — WAITING FOR OWNER GO**
