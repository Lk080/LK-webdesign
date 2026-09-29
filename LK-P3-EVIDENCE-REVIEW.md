# LK P3 — current snapshot evidence en eindrapport A–Q

Afgerond 29 september 2026 (Europe/Amsterdam). **P3: PASS binnen de hieronder begrensde lokale scope. TECHNICAL_GATE_PASS; OWNER_REVIEW_PENDING voor de totale release.** De owner heeft uitsluitend de 23 exacte visual baselines uit A/B/C goedgekeurd. Dit is geen algemene release-, productie- of toekomstige baselinegoedkeuring. P4 is niet gestart.

**MEASURED FACT** betekent hieronder uitgevoerd of in artifacts vastgesteld. **DESIGN JUDGMENT** is een inhoudelijk visueel oordeel, geen gemeten conversiewinst. Historische resultaten blijven historisch. De actuele live site wijkt aantoonbaar af van deze lokale releasekandidaat.

## A. Fresh evidence matrix

De feitelijke LK-routes zijn `/`, `/aanpak.html` en `/contact.html`. `/index.html` is een alias van Home. Frozen demo's zijn alleen op integratie/referenties onderzocht, niet opnieuw door hun suites gehaald.

| Controle | Vers bewijs / run onder `test-results/qa-runs/` | Uitkomst en grens |
|---|---|---|
| Volledige relevante lokale gate | `lk-final-YmGLOV/record.json`, `evidence.json` | CHECKS_COMPLETED; TECHNICAL_GATE_PASS; coherent; missing=[] |
| Functioneel | `lk-final-YmGLOV/functional.json` | 64 PASS, 2 toegelichte N/A-skips, 0 FAIL/flaky |
| Axe | `lk-final-YmGLOV/axe.json` en originele functionele/axe JSON | 2 afzonderlijke Axe-tests PASS; 83 scanartifacts, 0 violations; incompletes behouden |
| Visual direct na acceptatie | `lk-visual-hXld2n` | 5 viewporttests PASS, alle 35 referentiebeelden gelijk |
| Visual in finale regressie | `lk-final-YmGLOV/visual.json` | Opnieuw 5 PASS / 35 gelijke beelden; geen onverwachte nieuwe diffs |
| HTML/CSS/JS/links/tooling/foundation | `lk-final-YmGLOV/static`, `tooling`, `foundation` | 0 errors; 85 CSS-warnings, 55 linkinfos, 4 foundationinfos blijven zichtbaar |
| Lighthouse Home | `lk-final-YmGLOV/lighthouse` | Beide modes, alle targets gehaald |
| Lighthouse Aanpak | `lk-lighthouse-6xWC48`, `lk-lighthouse-XlStnE`, `lk-lighthouse-8eYymU` | Desktop + drie mobiele metingen; alle targets gehaald |
| Lighthouse Contact | `lk-lighthouse-U7T62h` | Beide modes; alle targets gehaald |
| Keyboard/SEO/landscape/contrast/timeout | `lk-inspection-swwUTH/inspection/inspection.json` | 3 routes; 3 landscapechecks; 15 dialogcontraststates/42 tekstelementen; echte lokale 20s-timeout via transportstub |
| CSS-impact per pagina/viewport | `lk-inspection-DYdTNo/css-warning-analysis/inspection.json` | 15 combinaties; geen gemeenschappelijke elementen in gemelde selectorparen |
| Cascade tussen geladen stylesheets | `lk-inspection-ZDeb64/cascade-analysis/inspection.json` | 60 states; relevante matched rules, mediaqueries en computed styles vastgelegd |
| Volledige toolingtests | `npm run qa:unit` na acceptatie | 32 PASS, 0 FAIL, 0 SKIP; inclusief P2-contracten |

Finale snapshot: source `6ebb5535a9ac56713a26426c0e8fb91fad4a0e8ce45e1b36a654c8747154a2dd`; configuration `cb4b885179cff8ed31fa91f2a1b72868786fcfd716918e0c9121f956776f8047`; LK-baselines `8639c5319ed3e6405df2d431175328f8a1f8157f8283ab541ab7232589fdd563`.

De 117 PASS-evidenceentries zijn met de bestaande `qa-evidence.reuseEvidence` tegen de actuele snapshot én oorspronkelijke artifacthashes gecontroleerd. Oude metadata is niet herschreven. Node v24.21.0, Playwright 1.63.0, Axe-playwright 4.13.0, Lighthouse 13.5.0, Darwin arm64. De JSON bevat de verdere browser-/OS-identiteit. Netwerk en systeemfonts zijn niet volledig door bronhashes beschreven. De losse onmiddellijke visual-run `lk-visual-hXld2n` registreert een andere browsercachelocatie/mtime dan de final-wrapper; source/config/baselines zijn gelijk, maar die run wordt daarom niet als exact environment-identiek bewijs hergebruikt. Zijn eigen vergelijking is 35/35 PASS. De daarna volledig uitgevoerde visualvergelijking in `lk-final-YmGLOV` is het finale snapshot-coherente bewijs. Alle aanvullende Lighthouse- en geslaagde manual-inspection-runs hebben wel dezelfde volledige snapshot als de final-wrapper.

## B. Lighthouse — mobile en desktop

**MEASURED FACT**, lokale labmetingen. Volgorde scores: Performance / Accessibility / Best Practices / SEO. Bestaande targets: 90 / 95 / 95 / 95; ongewijzigd.

| Pagina/mode | Scores | FCP ms | LCP ms | TBT ms | CLS |
|---|---|---:|---:|---:|---:|
| Home desktop | 100 / 100 / 100 / 100 | 392 | 503 | 0 | 0,00082 |
| Home mobile | 99 / 100 / 100 / 100 | 1382 | 1675 | 0 | 0,00049 |
| Aanpak desktop | 100 / 100 / 100 / 100 | 432 | 432 | 0 | 0,02646 |
| Aanpak mobile, meting 1 | 99 / 100 / 100 / 100 | 1534 | 1635 | 1,5 | 0,00238 |
| Aanpak mobile, meting 2 | 99 / 100 / 100 / 100 | 1535 | 1645 | 5 | 0,00475 |
| Aanpak mobile, meting 3 | 99 / 100 / 100 / 100 | 1534 | 1635 | 1 | 0,00238 |
| Contact desktop | 100 / 100 / 100 / 100 | 643 | 643 | 0 | 0,02791 |
| Contact mobile | 99 / 100 / 100 / 100 | 1385 | 1554 | 0 | 0,00070 |

Aanpak mobile: mediaan performance 99, spreiding 99–99; LCP 1634,94–1644,84 ms, mediaan 1635,14 ms. Een eerdere P3-run `lk-lighthouse-gMvtLA` had mobile 94 en FCP/LCP 2444 ms bij dezelfde applicatiebron/config maar de vorige baselinehash. Dat resultaat blijft zichtbaar; er is geen performancefix tussen die runs toegepast. Drie vergelijkbare metingen van de finale staat ondersteunen meet-/omgevingsvariatie, niet een verzonnen optimalisatiewinst. De exacte externe oorzaak van die ene tragere run is niet bewezen. Contact was eerder 100 mobile en nu 99; de finale 99 wordt gerapporteerd.

Runwarnings, failedRequests en unexpectedRequests zijn leeg in de finale drie routeparen. Lighthouse-diagnostiek blijft bestaan: op Home circa 3 KiB mogelijke JS-minificatie, 9 KiB documentcompressie, 299/306 KiB beeldbesparing desktop/mobile, renderblocking circa 210/780 ms, font/netwerkafhankelijkheden en bfcachebeperkingen van onder andere de lokale `no-store`-server. Dit zijn geen 85 Stylelint-meldingen. Geen scorejacht, minifier, extra dependency of beeldwijziging toegepast. Lab-TBT bewijst geen veld-INP; ontbrekende velddata is niet als 100 ingevuld.

## C. Accessibility

**MEASURED FACT:** alle 83 actuele Axe-scanartifacts hebben 0 violations, ook geen moderate/minor. Incomplete rulevoorkomens (geen aantallen unieke defecten): `color-contrast` 69, `aria-valid-attr-value` 41, `hidden-content` 3, `css-orientation-lock` 3. Ze zijn niet uit de ruwe rapporten verwijderd.

De terugkerende dialogcontrast-onzekerheden betreffen onder meer achtergrond/overlapdetectie bij native dialogs. Aanvullend zijn 15 representatieve dialogstates op 320/390/1440 gecontroleerd: 42 tekstmetingen, minimale contrastverhouding 6,826:1, geen achtergrondafbeelding en geen afgedekt middelpunt. Decoratieve pijlglyphs hebben `aria-hidden`; hun knop/link heeft een tekstuele naam. `aria-controls`-targets bestaan vóór en tijdens openen. Verborgen menu-/dialoginhoud is ook geopend getest. Landscape op 844×390 toont geen oriëntatieblokkade.

Keyboardroutes, skiplink, menu open/dicht, dialogfocus/Tab/Escape/terug/reset/heropenen, calculator en formvalidatie zijn gedekt. Focus is aanvullend op hero/calculator/form gemeten: zichtbare 3px-outline in de betreffende context. Fouten en timeoutstatus krijgen focus/statuscommunicatie. Reduced motion en 200%-tekstvergrotingssimulatie zijn getest. Dit is geen fysieke browserzoom-/screenreader-/volledige WCAG-certificering.

## D. Functional results

64 PASS; de twee skips zijn uitsluitend desktopinstanties van `mobiele navigatie openen en sluiten` en `mobiel geen horizontale overflow`. Hun mobiele equivalenten slagen; andere desktopnavigatie/responsivechecks zijn uitgevoerd. Er is geen noodzakelijke mislukte flow als skip weggeschreven.

Dekking omvat hero → calculator met de eerste keuze zichtbaar, header → contact, projecten/demolinkintegriteit zonder demo-heropening; calculator ranges/unknown/custom/reset, netto/bruto-invarianten en contextoverdracht; assistentkeuzes, terug/reset, heropenen, opslaggrenzen en handoff; formulier required/email/URL/honeypot, loading/dubbelverzendpreventie, 400/429/500/netwerk/ongeldige JSON/onzekere ontvangst en gemockte succeslogica. De extra timeoutmeting gebruikt de echte 20s-applicatietimer met een transportstub: één poging, abort, fictieve invoer behouden, knop weer beschikbaar, focus op status. Er is geen echte Formspree-inzending uitgevoerd.

## E. Responsive results

**MEASURED FACT:** 3 routes × 9 breedtes = 27 route/breedtecombinaties: 320, 360, 375, 390, 430, 768, 1024, 1280 en 1440. Geen horizontale documentoverflow. Visual references dekken aanvullend 1920. Menu en dialog passen op alle drie routes in 844×390 landscape.

Visueel beoordeeld: wrapping, CTA-hiërarchie, projecten/cards, calculator, contact, footer, floating assistent en focus. De homepage op 390 px blijft circa 4539 px hoog; 1024 circa 3243, 1440 circa 3693. Deze hoogtes veranderden niet door de P3-CTA-edit. De oudere mobiele baseline van circa 4244 px was van vóór de reeds goedgekeurde btw-presentatie; dat is geen door P3 toegevoegde sectie. De actuele primary CTA is op de geïnspecteerde 320px-startviewport zichtbaar. Geen CSS-polish of langere homepage toegevoegd.

## F. SEO findings

Elke route heeft één unieke title, description en canonical; één H1 en coherente main/header/footer/nav. Geen ontbrekende image-alt-attributen. Huidige structured data parseert: `ProfessionalService` op Home, `WebPage` op Aanpak/Contact. OG/Twitter metadata en de bestaande afbeelding zijn geïnventariseerd; canonical/OG-URL/sitemap sluiten aan op de drie routes. Robots staat crawling toe. Lokale links/assets geven geen fouten.

Foundation houdt 3 `publication-pending`-infos vast omdat de registry nog draft is, plus 1 info over ontbrekend vastgelegd assetbudget. De 55 linkinfos zijn bewust niet extern/frozen gecrawlde URLs, geen 55 gebroken links. Metadata in HTML is geen bewijs van actuele productie-indexering of volledige bedrijfs-/juridische juistheid. Geen doorwaypages, nieuwe claims of SEO-copy toegevoegd.

## G. Homepage compactness classification

**DESIGN JUDGMENT**, ondersteund door huidige captures en hoogtemetingen; geen conversie-experiment.

| Onderdeel | Besluit | Klantwaarde, dichtheid en trade-off |
|---|---|---|
| Header | KEEP | Korte oriëntatie en contactroute; mobiele onthulling beperkt startdrukte |
| Hero | KEEP | Aanbod en Lorenz meteen herkenbaar; één primaire calculatoractie en secundaire projectenactie |
| Projecten | KEEP | Drie duidelijk gelabelde, verschillende demo's onderbouwen ontwerpkwaliteit; grootste mobiele bijdrage (~1488 px), maar niet vervangen door ongefundeerde klantclaims |
| Prijs-/aanpakblok | KEEP | Concrete richting en transparante btw/context; circa 1339 px mobiel, functionele informatie en eerder goedgekeurde presentatie |
| Persoonlijk contact | KEEP | Direct menselijk aanspreekpunt; circa 451 px mobiel, logische vervolgstap |
| Footer | KEEP | Beperkte oriëntatie en contact; geen extra marketingsectie |

Home houdt vier hoofdsecties. Geen SHORTEN/MERGE/MOVE/REMOVE zonder voldoende bewijs. Uitleg blijft waar bestaand passend in calculator, assistent en details beschikbaar. Het hergebruik van Kelmora-beeld in hero/projectblok en desktopwitruimte zijn optionele ontwerpvragen; geen automatische herbouw. Een toekomstige Website Check hoeft geen nieuw homepageblok te worden.

## H. Visual review findings

| Klasse | Bevinding | Besluit |
|---|---|---|
| BLOCKER voor vergelijking | Oude referenties pasten niet op actuele bedoelde staat | Opgelost door expliciete menselijke goedkeuring van exact 23 bestanden en twee geslaagde normale vergelijkingen |
| HIGH VALUE | Hero-primary was “Bespreek je website” → contact, terwijl P3 expliciet calculator-first vraagt | Minimaal aangepast en met bestemming/zichtbare eerste keuze getest |
| OPTIONAL POLISH | Herhaald Kelmora-beeld, plaatselijke prijsblokwitruimte | Geen aangetoonde regressie; behouden |
| SUBJECTIVE / NO ACTION | Palet, typografie, beeldcompositie, bestaande sectievolgorde | Bestaande visuele identiteit behouden |

Premium uitstraling en rust zijn ontwerpbeoordelingen, geen gemeten omzet-/conversiescore. Tijdens de exacte baseline-review waren A=10, B=5, C=8, D=0. Geen mogelijke echte regressie onder D overgeslagen.

## I. Issues fixed

1. **Hero-route/CTA-mismatch.** Bewijs: oorspronkelijke HTML en P3-strategie; primary wees naar contact. Impact: extra wrijving voor bezoekers die hun websiteprijs willen berekenen. Kleinst mogelijke wijziging: twee bestaande anchors in `docs/index.html`; primary wordt “Bereken je website” → `aanpak.html#projectkeuze`, secondary “Bekijk projecten” behoudt `#projecten`. Geen component/CSS/prijswijziging. Risico: bestaande navigatieverwachting; afgedekt door 4 gerichte mobiele/desktoptests, volledige functional/Axe/responsive/visualregressie.
2. **Lighthouse-dekkingsbeperking.** Bestaande runner koos alleen registry-startpagina. Voor actuele Aanpak/Contact-evidence is één optionele, strikt owned-page route toegevoegd met bestaande foundation-discovery/freezegrenzen. Geen nieuwe runner of targets. Positieve/negatieve routegrenzen getest; beide subpagina's via dezelfde runner gemeten.
3. **Bedoelde screenshotverschillen.** Alleen de exacte owner-goedgekeurde 23 captures via de bestaande acceptance-helper geaccepteerd. Dit is referentieonderhoud, geen productiecodefix en geen autorisatie voor andere beelden.

## J. Bewust niet gewijzigd; volledige CSS-duiding

### J1. 35 is geen bewezen CSS-warningcount

36 bewaarde scoped LK-`css.json`-rapporten zijn gecontroleerd; geen daarvan bevat 35 CSS-warnings. Het getal 35 is wel aantoonbaar het aantal visuele referentiebeelden. Een verwisseling in eerdere communicatie is mogelijk, maar zonder een artifact geen bewezen oorzaak. **35 wordt daarom niet als CSS-count gebruikt. Er is geen bewezen stijging van 35 naar 85.**

De P3-startmeting `lk-final-pLgGPX` en de eindmeting `lk-final-YmGLOV` hebben exact dezelfde 85 finding-objecten, inclusief bestand, regel, kolom, rule en tekst. Ook op 24 september bevatte `lk-final-RMh9jz` al 85 meldingen. Eerdere echte meetreeksen omvatten onder meer 73 → 84 → 85 en tijdelijke 86–88 bij oudere wijzigingen; die zijn geen P3-toename van 50.

| Uniek warningtype | `final.css` | `style.css` | Totaal |
|---|---:|---:|---:|
| `no-descending-specificity` | 12 | 49 | 61 |
| `no-duplicate-selectors` | 0 | 24 | 24 |
| **Totaal** | **12** | **73** | **85** |

`approach.css`, `assistant.css`, `home.css` en `slice-one.css` hebben ieder 0 warnings in deze statische run. Parse errors, invalid-option warnings en deprecationmeldingen zijn leeg. Er zijn 85 unieke bronlocaties, 78 verschillende warningteksten wanneer locatie wordt genegeerd: zeven teksten komen elk tweemaal voor op verschillende bronlocaties. Geen dubbele logging van dezelfde exacte locatie; geen viewportvermenigvuldiging. Iedere rerun rapporteert dezelfde resterende meldingen opnieuw.

### J2. De 12 meldingen in `final.css`, afzonderlijk

Alle twaalf zijn `no-descending-specificity`. Stylelint signaleert de volgorde van selectors met verwante laatste elementen; dit bewijst op zichzelf niet dat zij dezelfde DOM-elementen stylen. In 15 initiële combinaties en 60 aanvullende states overlappen de genoemde selectorparen nergens op hetzelfde element.

| Regel | Selector → vergeleken eerdere selector | Daadwerkelijke aard / impact |
|---:|---|---|
| 61 | `.project-card > p` → `.split > div > p` | Oude componentselector zonder match in de huidige onderzochte LK-states. Gedeelde `color`, maar geen elementcollision; geen huidige zichtbare fout |
| 71 | `details > p` → `.section-heading > p` | Beide gebruiken `color`/`max-width`, maar verschillende componenten. Actief bij Aanpak/details en dynamische assistent. Aanpak-fontsize 15px en assistent 14px/1.6 komen correct uit hun latere modules |
| 82 | `.process-list li > span` → `.project-meta span:last-child` | Procesnummer versus projectmeta; geen gedeelde directe property en geen overlap. Procesnummers aanwezig op Aanpak |
| 84 | `.process-list p` → `.split > div > p` | In onderzochte states geen match voor de eerste selector. Potentieel gedeelde kleur is geen actuele collision |
| 87 | `.support-band p` → `.split > div > p` | In onderzochte states geen match voor de eerste selector; mogelijke max-width-volgordevraag heeft daar geen runtime-impact |
| 95 | `.contact-close p` → `.split > div > p` | Donkere afsluittekst versus split-copy; gedeelde kleur/max-width maar gescheiden elementen. Huidige afsluittekst behoudt `#ccd2cb`; geen bewezen contrast-/layoutfout |
| 102 | `.footer-inner p` → `.split > div > p` | Footer en split zijn gescheiden. `home.css` verfijnt bewust footer-margins van 12px naar 4px en voor directe `.fine` naar 0; computed styles bevestigen dit |
| 111 | `legend span` → `.project-meta span:last-child` | Formulierlegend versus projectmeta; font-weight versus border-bottom, geen gedeelde directe property/elementen |
| 117 | `.field label` → `.choice-grid label:has(input:checked)` | Gewoon veldlabel versus geselecteerde keuze; de gemelde declarations gaan over verschillende properties. Geen actuele overlap of verloren checked-state gevonden |
| 118 | `.field label span` → `.project-meta span:last-child` | Labeltoelichting versus projectmeta; font-weight/color versus border-bottom; geen overlap |
| 139 | `.request-plan p` → `.split > div > p` | Contextsamenvatting met white-space/font-size versus split-copy met max-width/color; geen gedeelde directe property. Bij initiële Contact verborgen, bij handoff door bestaande tests gedekt |
| 177 | `.lk-header a` → `.footer-inner a:not(.lk-logo)` | Headerdecoratie versus footerpadding; gescheiden elementen/properties. `slice-one.css` geeft navigatiehover terecht underline en lime, zonder footerinvloed |

Conclusie: contextuele specificiteits-/onderhoudssignalen, **0 daarmee bewezen huidige zichtbare fouten binnen de onderzochte lokale states**. Drie first-selectors (61/84/87) zijn in die states ongebruikt; dat is geen globale verwijdertoestemming. Geen selector verplaatst of CSS gewijzigd om de telling te verlagen.

### J3. Per pagina en viewport, zonder fictieve linttelling

Stylelint draait per bronbestand, niet per browserviewport. Alle drie lokale kernpagina's laden `final.css` met dezelfde 12 bronmeldingen; `style.css` wordt daar niet geladen. Deze 12 mogen niet per pagina of viewport worden opgeteld tot nieuwe unieke defects.

Onderstaande getallen tellen hoeveel van de 12 gemelde first-selectors minstens één DOM-match hebben in de **initiële state**; zij tellen geen bewezen fouten en geen aantallen individuele DOM-nodes.

| Pagina | 320 | 390 | 768 | 1024 | 1440 | Gemelde selectorparen op hetzelfde element |
|---|---:|---:|---:|---:|---:|---:|
| Home | 3 | 3 | 3 | 3 | 3 | 0 |
| Aanpak | 7 | 7 | 7 | 7 | 7 | 0 |
| Contact | 5 | 5 | 5 | 5 | 5 | 0 |

Op Contact is één van deze vijf (`.request-plan p`) initieel verborgen; vier hebben layout-zichtbare matches. Native closed-details/ancestorclipping is apart via details-open bekeken, niet afgeleid uit alleen een elementrect. De aanvullende cascadecontrole omvat op iedere combinatie initial, details-open, navigation-hover en assistant-care. Matchaantallen kunnen met dynamische inhoud veranderen, terwijl de statische 12 gelijk blijven.

### J4. `style.css`: legacy voor lokaal P3, nog production-relevant

**Exacte classificatie:** `docs/style.css` is legacy ten opzichte van de huidige lokale Master/P3-routes, maar nog production-relevant omdat de huidige live homepage op `https://lkwebdesign.be/` `/style.css` laadt. Het bestand is **niet als dead code geclassificeerd** en volledig onaangeraakt gebleven.

Bewijsbasis:

- Alle zes lokale HTML-documenten op stylesheetrefs geïnspecteerd, met relatieve URL-resolutie. Home gebruikt final/slice-one/assistant/home; Aanpak final/slice-one/assistant/approach; Contact final/slice-one/assistant. Kelmora gebruikt `docs/demos/vakman/style.css`, een ander bestand; Beauty en AVREN gebruiken hun eigen CSS. Geen `<base>` die deze resolutie verandert.
- Geen CSS-`@import` of dynamische JS-stylesheetinjectie naar root-`style.css` gevonden. De bestaande noscript/fallbacks staan in dezelfde HTML en voegen die stylesheet niet toe. Geen repository-serviceworker, aparte fallback-HTML of lokale SPA-fallback die root-style alsnog laadt; de QA-server levert onbekende routes als 404. Een P2-contracttest gebruikt het pad als voorbeeldref, niet als browserload.
- Read-only GET van live Home op 29-09-2026 00:52 CEST: HTTP 200, GitHub-server, HTML SHA-256 `ef264771e3176bafbd8df2e7690851a412118359d355b697d4eae68abc0b7244`; stylesheetlink `style.css`.
- Live `/style.css` is 28.189 bytes en byte-identiek aan lokaal: SHA-256 `d24f8863d73ca54c68b9ff748777e6ba5b04e256167c067bd5e2edfa3e07b114`. HTML/CSS plus HTTP-headers zijn bewaard in `lk-inspection-DYdTNo/css-warning-analysis/`. Dit is bestaans-/versie-/referentiebewijs, geen volledige visuele productieaudit.

**24 duplicate selectors = afzonderlijke maintenance debt, zonder bewezen zichtbare productiefout.** Het zijn echte herhaalde selectorblokken. Bij 15 ervan worden eerder gedeclareerde propertywaarden overschreven; 9 voegen uitsluitend andere properties toe binnen de onderzochte exacte selector/parentcontext. Bijvoorbeeld `.button:hover` verandert transform van translateY naar none, `.pricing-note` wijzigt kleur en `.contact` wijzigt grid/gap. Overrides kunnen bedoeld zijn; hun bestaan bewijst geen bug. De onderbouwde declarations staan in `legacy-duplicates.json`.

De overige **49** zijn specificiteits-/volgordesignalen in dezelfde production-relevante CSS. Ze zijn niet op de lokale Master/P3-DOM van toepassing en worden niet zonder live visuele/cascadereview als fout of als onschuldig afgevinkt. Geen volledige live demo-/pagina-QA is uitgevoerd. Risico: onverwachte cascade bij later onderhoud van de oude productieversie. Geen lint-refactor/verwijdering binnen P3.

De volledige onverkorte lijst van alle 85 findings staat in [warning-inventory.md](test-results/qa-runs/lk-inspection-DYdTNo/css-warning-analysis/warning-inventory.md); geschiedenis/artifacthashes en live-hashes in `warning-evidence.json`; oorspronkelijke lintbron `lk-final-YmGLOV/static/css.json`.

### J5. Cross-stylesheet cascade en overige bewuste non-fixes

De actuele laadvolgorde en CSSOM matched rules/mediaqueries/computed styles zijn vastgelegd voor 60 lokale states. Gecontroleerde relevante overlaps zijn onder meer `final.css` → `home.css` footermargins (12→4→0), `final.css` → `approach.css` detailtekst (15px), `final.css` → `assistant.css` detailtekst (14px/1.6), en `final.css` → `slice-one.css` navigatielayout/hover. Deze leveren de bedoelde computed styles op. Geen onverklaarde selectorcollision in de onderzochte warning-gerelateerde componenten; dit is geen bewijs voor iedere theoretische selectorcombinatie in alle toekomstige states.

Geen wijziging aan Stylelint-config, severity, excludes, thresholds, baseline-toleranties of lintercode. De bestaande regels stonden reeds op warning. CSS-warningcount blijft 85. Geen pricing/btw, demo, mail, DNS, productie-Formspree, tracking, backend of andere Master-feature gewijzigd. Externe fonts en de lokale Lighthouse-opportunities blijven zichtbaar; geen ongevraagde optimalisatie.

## K. Exacte P3 change set

Zeven bron-/test-/toolingbestanden: `docs/index.html`; `tests/e2e/lk-slice-one.spec.cjs`; `tests/e2e/sites.spec.cjs`; `scripts/lighthouse.config.cjs`; `scripts/qa-lighthouse.cjs`; `scripts/qa-foundation.test.cjs`; `scripts/LIGHTHOUSE.md`. Samen 43 toegevoegde en 7 verwijderde tekstregels ten opzichte van de P3-startstaat.

Verder uitsluitend 23 geautoriseerde LK-baseline-PNGs (N), dit nieuwe rapport, en één door owner gevraagde aanvullende LOCAL ↔ PREVIEW ↔ PRODUCTION parity-regel in P10 van `LK-MASTER-EXECUTION-PLAN.md`. Alle andere reeds aanwezige P1/P2/documentatie/userwijzigingen zijn behouden. Ruwe QA/captures/reviews blijven in genegeerde scoped `test-results`-mappen. Geen `docs/*.css` veranderd.

## L. Tests added / changed

- Twee bestaande CTA-testbestanden volgen nu de werkelijk bedoelde calculatorroute. Accessible name, exact href, zichtbare builder en eerste keuze in viewport zijn expliciet; header-contactassertion en frozen-demogrens blijven behouden.
- Eén unit-test voor Lighthouse owned-page selectie: geldige LK-routes; afwijzen externe URLs, protocolrelative URLs, ontbrekende paden, traversal, query/hashvarianten en frozen demo's. Geen nieuwe dependency of tweede QA-framework.
- Aanvullende scoped inspecties leggen concrete ontbrekende manual evidence vast; zij vervangen de bestaande suites niet. Geen assertion verwijderd om rood groen te maken.

## M. Full regression result

**P3 TECHNICAL_GATE_PASS voor de huidige lokale snapshot.** Functioneel 64 PASS/2 N/A; Axe 0 violations met benoemde incompletes; visuals 35/35; qa:unit 32/32; static/tooling/foundation geen errors; alle zes route/mode-Lighthouse targets gehaald; 27 route/breedtechecks zonder overflow; 66 functionele console/netwerkattachments zonder errors/rejected requests. Aanvullende inspecties hebben geen runtimeerrors of vereiste-resourcefouten. `git diff --check` schoon.

Transparante historie: `lk-final-hna2E5` kon in sandbox geen localhostserver starten en geldt niet als browser-PASS. Voor CTA had `lk-final-pLgGPX` 18 oude visual diffs; na CTA had `lk-final-FmaN81` 23. Die zijn pas na ownerreview geaccepteerd. Twee vroege manual-inspecties (`lk-inspection-pWF7j1`, `lk-inspection-sDywj8`) controleerden focus vóór het native dialog-close-event; de geslaagde inspectie wacht op dat echte event. Extra cascade-inspectie `lk-inspection-odcJyF` stopte doordat sessieherstel de assistent op de eerdere Care-state hield; `lk-inspection-ZDeb64` gebruikt de bestaande “Opnieuw beginnen”-knop vóór iedere vaste journey en voltooit alle 60 states. Deze harnessfouten blijven bewaard en zijn geen websitefix of verzwakte assertion geworden.

## N. Screenshot baseline changes en audit trail

Expliciete menselijke goedkeuring: Lorenz, “VISUAL BASELINE APPROVAL — P3”, uitsluitend de 23 A/B/C-bestanden uit bronrun `lk-final-FmaN81` (runId `4fa1a389-00fe-45b4-b0ab-3188db1e980d`). A10 = bedoelde hero/calculator-CTA en samengestelde totaalbeelden; B5 = eerder goedgekeurde incl./excl.-btwpresentatie; C8 = beoordeelde contact/footer-raster-/uitsnedeverschuiving door bovenliggende layout; D0.

Bestaande workflow: `npm run qa:visual:accept -- test-results/qa-runs/lk-final-FmaN81/p3-owner-approval.json` (dry-run), daarna dezelfde opdracht met `--apply`. Geaccepteerd op `2026-09-28T22:37:57.514Z` (29-09 00:37:57 CEST). Auditrecord met bron-/targetpaden, categorie/redenen en hashes: `lk-final-FmaN81/acceptance-XrFA4G/review.json`. Vorige beelden: `0-previous.png` t/m `22-previous.png` in dezelfde map.

Alle 23 oude archivehashes en nieuwe targethashes gecontroleerd. De overige 147 van de 170 repository-baselinebestanden bleven byte-identiek, inclusief alle demo-baselines. Geen productiecode gewijzigd tijdens acceptatie. Meteen erna volledige vergelijking `lk-visual-hXld2n`: 35/35 PASS; daarna `lk-final-YmGLOV`: opnieuw 35/35 PASS. Geen nieuwe/unverwachte diffs en niets aanvullends geaccepteerd. Preapproval-reviewdocumenten blijven historische reviewstukken; dit record legt de latere acceptatie vast.

| Exact bestand | Categorie | Oude SHA-256 | Nieuwe SHA-256 |
|---|---|---|---|
| `tests/visual/baselines/mobile-small/lk-hero.png` | A | `132bd031a193a0128863157e9bef25571da9f458e756fbac3f3f7e6d5f33cd1c` | `0da6d9d93abe6918be6ab8aa487be628c0bf5a8835db1e5e0e6986411ef9c62a` |
| `tests/visual/baselines/mobile-small/lk-full-page.png` | A | `afe709003530d91c8d4338905b3c5049471b4348d1d2c7ced9dd9cd3c86e2949` | `694d5b0d370ae85062743e03f0c63854e605d6069e882379d5070f123e59d6ee` |
| `tests/visual/baselines/mobile-standard/lk-hero.png` | A | `f74334b64d7e778a09ef88707b2638c66949e6f59b61b1bb249abad4324cab90` | `d1a6f7b36b7855a23338b4c19f15bab5e1c08c2063815ad9af37762e72c08792` |
| `tests/visual/baselines/mobile-standard/lk-full-page.png` | A | `165cf9d657b4f7fb363aabc9a70140db6a74583e4ca704dc009918bed353b9c3` | `32b01ecd814b076a960f4bfe9c26a2a3a21b1c33df3108c29f0ff90590ef19f0` |
| `tests/visual/baselines/tablet/lk-hero.png` | A | `133b8586992c89e7bee90c7eab0229f9271b05c7ccf371dbadd172d2236087af` | `bc0125ab80d9a2a6e579c551c5291aaf84a459da7c1fe3ebc789ed6050b23cbb` |
| `tests/visual/baselines/tablet/lk-full-page.png` | A | `782d9ae8d4e1c982439e67829b520dcbdefb9f4ed6e3899253152ee8e9587c8b` | `08d3923e94e44c63b2d559e06f3887fc764e087c25946b34a0ac502a24681854` |
| `tests/visual/baselines/desktop/lk-hero.png` | A | `70c8898e55b2c898056be4571cc1b52f066cd15dc6c42c7392590d7dc63c4491` | `7ffe89e116deafaaf7ed2fc0f57c5d8d4839cc2ecaf9eaca184f66e1234cf514` |
| `tests/visual/baselines/desktop/lk-full-page.png` | A | `eb674671e818e11b4019a55c3ab9610d22cfa3b0a7f2cbf6b36934f8d89769ce` | `32307ca76aa778736d46f8148ccbc60cfb750b559f4a4c9ab78b0fea9ac3dc57` |
| `tests/visual/baselines/large-desktop/lk-hero.png` | A | `c29ba309f4e08667fa9963e5b0ac696603b004c571819690efdbab4e97118de4` | `c287970f268d8174319a1c6bba4e4e9994404d97724bb1881b66bf4210a5e536` |
| `tests/visual/baselines/large-desktop/lk-full-page.png` | A | `c4a7c9b417ed9b2099f5006952768d4be791a11c1b2fbf27ea9a7e1863df2dd6` | `56074ccf6a22717de731cf6be1986a7020db4c2e80e049fc4222422a5b6a942f` |
| `tests/visual/baselines/mobile-small/lk-pricing.png` | B | `585015003b7bbffa09f0917f6652bbbbfdff7da63f77e31eabaccf03eddaea1d` | `cdd0803af7bc77f8800783b598cc249c535d349bbc7f42ca9d2803f71ecb0add` |
| `tests/visual/baselines/mobile-standard/lk-pricing.png` | B | `910a4831aa1341d7490a815eb129aa52db361006b543efb6a9f858a1b8cd7d84` | `e0296563622c76bd8eb8c56542019f296494e8545b4c4f6a9dbf80cdcd8bcc33` |
| `tests/visual/baselines/tablet/lk-pricing.png` | B | `0e3ae3008e4d8a7d6f5ac59401f4b5a03d6b8ac2d85c551fcac0a4a2959225b7` | `35631784eb3b56f84e8d440a9b6af1884e29725b87e177b47e3a94104caaef27` |
| `tests/visual/baselines/desktop/lk-pricing.png` | B | `490af398d4a793730828cab5b4a4d5c256e507d98aac5fb94ab6ed6638ae126b` | `033f161236bd872ce9616ba626a5cd08303d2f99d42257d8b24d3e2bf2e79835` |
| `tests/visual/baselines/large-desktop/lk-pricing.png` | B | `69abb3e1873ac47ffff5886bf08b06d4cbbddeb580bcdf79c7989f95cce368f0` | `471a7b8d9554aece021d5732a99f5694e2007fe98256f8579a959441043bb382` |
| `tests/visual/baselines/mobile-small/lk-contact.png` | C | `a23c9b6514a3ddbcc415e375a2f2692bb308736af6b2520d2a6a10787bf8b4de` | `aa867ddeedf649c0660e66e090ae3ad091b342e337507b01e3b23807959c7fbf` |
| `tests/visual/baselines/mobile-small/lk-footer.png` | C | `99a6cf98c3a3afc4a6864ddd185cdda7760a5e3a2a6950027d6e404450f303c5` | `50fc556328a05d829d3a987cb64069a330888241f452dd10cf7d7d1186b17d9b` |
| `tests/visual/baselines/mobile-standard/lk-contact.png` | C | `122ab74d512c74d25a4f4cc0e6c6d07d9d264b468386eb000e4f79a8df9cecc9` | `f97a0bd0f5c73c723db9d8ab397020257f1445f33dfe0df3296903ed0a096dee` |
| `tests/visual/baselines/mobile-standard/lk-footer.png` | C | `9a75e67faa9127e3a3a07536f0a6e36c27ac224fe608dde4fda790071c9c2ef8` | `26704f1511615aa0b354a985c80e1b912a4271380e16a1b30095a7f08f23f2a6` |
| `tests/visual/baselines/tablet/lk-contact.png` | C | `a37ca1aaa6bf27bf73b356956f8286b1bc0573fb1ffc2428bdab8fd1d8edbe29` | `3ffe228d173b93206a20737c8577ee5a01a5310534cf6adb037a5ec64cedff5d` |
| `tests/visual/baselines/tablet/lk-footer.png` | C | `bebdfa84833fe3b401a2f09ae460f76d8d90d0d44760693e91fcf8c15fa07eab` | `fa30453475087baf1b516eaed3f6bc2195e026c7f7a434c9afc3eff97881e39e` |
| `tests/visual/baselines/desktop/lk-contact.png` | C | `335e4791ed8cac1dd3a4f3d7f3d48255ec0c70973923600e53e04e496f14b71c` | `234daed5ae31a31ffe59ab8e8c835b7c68c3f427e35647cdbe4c8783427e722a` |
| `tests/visual/baselines/large-desktop/lk-contact.png` | C | `d8986cff7ad49d984328fc84f5ecf10a047d1bfd71b9ed1d53a40807b4624d61` | `0fee3b4b37aa6b6173a5c988f2333bce33d9bac79c19f93f146d4961d07494e4` |

## O. Risks / limitations en Production/Launch Gate

- P3 bewijst de lokale releasekandidaat. De live homepage is een oudere andere versie; productie is niet door lokale QA gecertificeerd. `style.css` blijft production-relevant. Geen productieaanpassing uitgevoerd.
- Op expliciet ownerverzoek is P10 uitgebreid met een verplichte **LOCAL ↔ PREVIEW ↔ PRODUCTION parity-check**: HTML/routes, CSS/JS-assets en hashes, canonical/SEO/robots/sitemap, forms, consent/tracking, redirects/404, daadwerkelijke securityheaders, deploymentversie en rollbackreferentie. LOCAL ↔ PREVIEW vóór productie-GO; PRODUCTION na afzonderlijk geautoriseerde publicatie. Alleen verklaarde goedgekeurde omgevingsverschillen zijn toegestaan. Ontbrekende preview/deploymentgegevens blijven NOT_TESTED; afwijkingen blokkeren launch of activeren de overeengekomen STOP/rollback. Deze gate is nu gedocumenteerd, niet reeds uitgevoerd.
- Geen echte Formspree-test/mail/DNS/accountwijziging; mocks bewijzen geen aflevering. Geen backend/Website Check/consentprovider geïmplementeerd. Niet-geteste toekomstige mogelijkheden krijgen geen PASS.
- Geen volledige fysieke-device-, Safari-, Firefox- of screenreaderreview, geen productievelddata of echte OS-browserzoomcertificering. De extra handmatige contrastcontrole is representatief en geen volledige WCAG-conformiteitsclaim.
- 85 CSS-warnings, 55 externe/out-of-scope linkinfos, 4 foundationinfos en Axe-incompletes blijven zichtbaar; live impact van de legacy-specificiteitsmeldingen is niet volledig beoordeeld. Geen vastgelegd assetbudget; externe fonts blijven een afhankelijkheid.
- De rollback/evidencebestanden staan lokaal in genegeerde mappen en een tijdelijke checkpointmap. Niet op GitHub veiliggesteld; geen commit/push toegestaan in P3. Bewaar deze artifacts vóór opruimen van caches/temp.
- Geen onafhankelijke Review Agent ingezet; deze analyse is geen onafhankelijk reviewattest. Baseline-owneracceptatie is exact begrensd en vervangt geen finale menselijke inhouds-/releasegoedkeuring.

## P. Recommended P4 scope

Volgens het bestaande masterplan: **consent-first meting**, pas na expliciete GO P4. Eerst provider/rollen/DPA/retentie/privacykeuzes; behoud lokale event-taxonomie en default-off gedrag. Daarna alleen afgesproken minimale consent-/adaptergrens, geen PII, geen events vóór toestemming, intrekking en deduplicatie testen. Geen homepagefeature-bloat, Website Check of intern dashboard in die fase schuiven. Bij ontbrekend providerbesluit alleen architectuur/contractscope na expliciet akkoord. **P4 is niet gestart.**

## Q. Rollback / checkpoint

Branch `prelaunch-checkpoint-2026-09-27`; HEAD onveranderd `74fea4993282d70e76fc986cc07da2a9794beb98`. Geen commit, push, deployment, reset, stash of branchwisseling.

P3-startcheckpoint: `/var/folders/7t/dkpmylsn79v_c6d46n4qbjwm0000gn/T/lk-p3-checkpoint-y3_ajw_f`, met manifest van 332 bestaande bestanden en bronkopieën. Exacte P3-brondiff: `lk-final-YmGLOV/p3-source-changes.patch`. Baselineherstel kan gericht met de 23 gearchiveerde vorige beelden; herstel nooit blind vanuit Git HEAD, omdat dat ouder user/P1/P2-werk zou kunnen raken. De versie van het masterplan vóór de parity-toevoeging is apart opgeslagen als `lk-final-YmGLOV/LK-MASTER-EXECUTION-PLAN.before-parity.md`, hash gelijk aan het startmanifest.

Ten opzichte van dat startmanifest zijn exact 31 bestaande bestanden geraakt: 7 bron/test/tooling, 23 goedgekeurde baselines en 1 plan. Dit rapport is het enige nieuwe niet-genegeerde P3-bestand. Overige 301 bestaande bestanden zijn onveranderd. Definitieve controles staan in `lk-final-YmGLOV/p3-final-verification.json`; bestaande P1/P2-wijzigingen bleven intact. Geen rollback uitgevoerd.

**P3: PASS — STOP. Wacht op expliciete GO P4.**
