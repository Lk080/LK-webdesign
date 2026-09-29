# LK Master Launch — requirements coverage §§0–94

Datum: 29 september 2026. Scope: de drie ontvangen delen van **Definitive Codex Execution Specification v1.0**, inclusief de voortzettingen van §25 en §54, gelezen als één specificatie. Alle 95 secties staan hieronder precies eenmaal. Dit is een dekkingsinventaris, geen nieuwe implementatieopdracht of launchgoedkeuring.

De bindende ownerbesluiten blijven leidend: bestaande centrale commerciële bron en goedgekeurde incl./excl.-btwpresentatie behouden; Kelmora-freeze respecteren; echte Website Check alleen achter bewezen veilige backend; dashboard privé buiten publieke repo; geen feature-bloat; nieuwe releaseclaims vereisen actueel bewijs. P5 is niet gestart of geautoriseerd.

## Statusdefinities

- `IMPLEMENTED_AND_VERIFIED`: de betreffende beperkte eis/procedure is met het genoemde bewijs gerealiseerd. Geen impliciete productieclaim.
- `IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED`: de huidige lokale implementatie is bewezen; overeenkomst en werking op preview/productie nog niet.
- `PARTIALLY_IMPLEMENTED`: slechts een deel bestaat; een contract/plan vervangt de ontbrekende uitvoering niet.
- `INTENTIONALLY_DEFERRED`: bewust nog niet uitgevoerd. Een genoemde P7/P9-fase kan nog steeds vóór Master Launch nodig zijn; dit label betekent niet automatisch “mag na launch”.
- `OWNER_DECISION_REQUIRED`: expliciete externe, zakelijke of operationele keuze/bewijs ontbreekt.
- `NOT_APPLICABLE`: voorwaardelijke eis die momenteel niet van toepassing is, met reden. Geen testskip om ontbrekende implementatie te verbergen.

Bij samengestelde secties bepaalt het ontbrekende relevante onderdeel de status. Het feit dat toekomstige Website Check-states ontbreken maakt de bestaande calculator-/formulierbewijzen niet ongeldig, maar maakt de volledige samengestelde requirement evenmin af.

## Bewijsregister

| Ref | Bewijs en grens |
|---|---|
| B | [Baseline](LK-MASTER-BASELINE-REPORT.md), [uitvoeringsplan P0–P10](LK-MASTER-EXECUTION-PLAN.md): historische inspectie, scope en afhankelijkheden; geen vervanging voor actuele QA. |
| S | [Development Standard](LK-DEVELOPMENT-STANDARD.md), [projectregistry](scripts/qa-projects.json), [QA foundation](scripts/QA-FOUNDATION.md). |
| E | [P2-contracten](scripts/ENGINE-CONTRACTS.md), [validator](scripts/engine-contracts.cjs), [contracttests](scripts/engine-contracts.test.cjs), [methodologie v1](scripts/contracts/audit-methodology.v1.json). Contractfoundation; geen live scanner/producerplatform. |
| P3 | [P3-eindrapport](LK-P3-EVIDENCE-REVIEW.md): visuele ownerreview, responsive/SEO/CSS-analyse en beperkingen. |
| P4 | [P4-eindrapport](LK-P4-EVIDENCE-REVIEW.md), [consentcontract](LK-CONSENT-MEASUREMENT.md): E1- en baselinegoedkeuring, privacycontract; echte meetprovider staat uit. |
| Q | [P4.5-eindrapport](LK-P4.5-TOOLCHAIN-REVIEW.md), verse [evidence](test-results/qa-runs/lk-final-ntdlrO/evidence.json), [browseraudit](test-results/qa-runs/lk-final-ntdlrO/p45-browser-audit.json), [snapshotcontrole](test-results/qa-runs/lk-final-ntdlrO/p45-snapshot-verification.json). Lokale Chromium-QA, geen productiecertificatie. |
| F | [Frontendflows](tests/e2e/lk-final-flows.spec.cjs), [consent/E1](tests/e2e/lk-consent.spec.cjs), [assistent](tests/e2e/lk-assistant.spec.cjs), [slice/keyboard](tests/e2e/lk-slice-one.spec.cjs), [algemene flows](tests/e2e/sites.spec.cjs); uitgevoerd in Q. |
| C | [Commerciële configuratie](docs/commercial.js), [calculator](docs/project.js), [context](docs/request-context.js), [Commercial Requirements](LK-COMMERCIAL-REQUIREMENTS.md). Laatste document bevat vooraf bestaand uitgesloten ownerwerk. |
| O | [Prelaunchchecklist](LK-PRELAUNCH-CHECKLIST.md), [mastercontrol](LK-PRELAUNCH-MASTER-CONTROL.md), [hostingontwerp](LK-HOSTING-ARCHITECTURE.md), [infrastructuur/revenue](LK-CLIENT-INFRASTRUCTURE-REVENUE.md). Operationeel ontwerp ≠ geleverd proces. Deze vier documenten bevatten vooraf bestaand, niet in de P1–P4-index opgenomen werk. |

Q-artifacts staan bewust in genegeerde `test-results/`; na clone zijn die niet automatisch beschikbaar. De samenvattingen zijn duurzame documentatie; ontbreken van originele artifacts mag later niet als actuele PASS worden geïnterpreteerd. De hosting-/infrastructuurdocumenten zijn lokaal aanwezig maar nog untracked en vallen buiten de huidige checkpointselectie.

## Volledige matrix

| § | Requirement | Status | Bewijs / huidige implementatie | Resterend werk / doelfase |
|---:|---|---|---|---|
| 0 | Premium, schaalbaar bedrijfssysteem met eenvoudige publieke ervaring | PARTIALLY_IMPLEMENTED | B, E, P3, P4, Q; bestaande site en foundation | Echte Check, private managementlaag, operatie en releasegates; P5–P10. |
| 1 | Geen featurecatalogus, generieke rebuild of verzwakte kwaliteit | IMPLEMENTED_AND_VERIFIED | P3/P4 scope en Q: bestaande compacte site, geen extra homepageblokken in P4.5 | Doorlopende beperking voor elke nieuwe fase; geen conversiesuperioriteit geclaimd. |
| 2 | Eerst inspecteren, baseline en KEEP/IMPROVE-classificatie | IMPLEMENTED_AND_VERIFIED | B met repositorybaseline en gapmatrix; checkpointaudit | Inspectie opnieuw uitvoeren bij volgende bronstaat; huidige actie voltooid. |
| 3 | Bestaande LK-skills, registry en model-/kwaliteitsregels behouden | IMPLEMENTED_AND_VERIFIED | S; bestaande QA gebruikt in P1–P4.5, geen nieuwe concurrerende runner/skill | Behouden bij vervolgfasen. |
| 4 | Wijzigingsveiligheid, checkpoints, userwerk en releasegoedkeuring | IMPLEMENTED_AND_VERIFIED | Lokale hashes/backups, expliciete 59-bestandenselectie, 6 oude documenten uitgesloten | Gitcommit/push afzonderlijk autoriseren; geen reeds voltooide remote backup claim. |
| 5 | Absolute anti-cheating en eerlijke ontbrekende data | IMPLEMENTED_AND_VERIFIED | E-tests, P3/P4 reviewtrail, Q; geen gewijzigde thresholds/baselines in P4.5 | Blijvend afdwingen; geen algemene toekomstige integriteitsgarantie. |
| 6 | Meetbare completioncriteria in plaats van “master”-claims | IMPLEMENTED_AND_VERIFIED | S/E/Q gates en gescheiden ownerreview | Criteria opnieuw toepassen op elke nog ontbrekende feature. |
| 7 | Compacte, snelle, begrijpelijke publieke UX | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | P3/P4 visuele review en Q; details op Aanpak/Contact | Finale menselijke releasecontrole en pariteit; P9/P10. |
| 8 | Homepagejourney met bewijs, prijs en nuttige Check-ingang | PARTIALLY_IMPLEMENTED | `docs/index.html`, P3; bestaande journey behouden | Check pas toevoegen zodra echte dienst gereed is; compact houden; P6. |
| 9 | Hero: calculator primair, projecten secundair, Check vindbaar | PARTIALLY_IMPLEMENTED | P3 CTA-fix en F/Q testen calculator/projecten | Check-vindbaarheid ontbreekt bewust tot P5/P6; geen CTA-chaos. |
| 10 | Coherent premium visueel systeem en reduced motion | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | `docs/final.css`, P3/P4, F/Q | Finale releasevisuele review; geen redesign vereist zonder defect; P9/P10. |
| 11 | Betekenisvolle states op 320/390/768/1024/1440 | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | F/Q: 27 route/breedtechecks plus consent/E1 en reviewed captures | Nieuwe Check-states na P6; finale visuele releasecontrole P9. |
| 12 | Drie duidelijk gelabelde premium demos als portfolio | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | `docs/index.html#projecten`, P1-fixture, F/Q linkassertions | Publicatie-/demoversies en finale review P9/P10; geen echte klanten geclaimd. |
| 13 | Bewezen demo-kwaliteit en freeze behouden | IMPLEMENTED_AND_VERIFIED | Registry, volledige baseline/filehashcontrole; geen demowijziging P1–P4.5 | Historische demo-QA niet als vers hertestbewijs gebruiken; P9 alleen binnen freezebesluit. |
| 14 | Finale menselijke visuele gate LK + alle drie demos | PARTIALLY_IMPLEMENTED | P3/P4 exacte LK-ownerreview; bestaande demo-evidence | Gezamenlijke actuele launchreview nog niet voltooid; Kelmora-review mag geen opportunistisch redesign worden; P9. |
| 15 | Eén commerciële bron, ondubbelzinnige btw en indicaties | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | C/F/Q nettobedragen en goedgekeurde dubbele presentatie | Offerte/dashboard later uit dezelfde bron; consistente releasepariteit P7–P10. |
| 16 | Hosting €24,90 excl.; alleen werkelijk geleverde inclusies | PARTIALLY_IMPLEMENTED | C/O; hostingarchitectuur gedocumenteerd | Monitoring, restore, toegang en support bewijzen vóór eerste Hosting-klant; P8. |
| 17 | Care €59 incl. Hosting; 30 min niet opspaarbaar; €65/u; klant domeinhouder | PARTIALLY_IMPLEMENTED | C/O, F/Q prijs-/Care-invarianten | Minutenregistratie, meerwerkgoedkeuring, contracten/offboarding operationeel bewijzen; P7/P8. |
| 18 | 2–4 weken verwachting; sneller bij kwaliteitsgate + klantakkoord | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | C, bestaande publieke copy en deliveryregels | Werkelijke klantplanning en opleverproces bewijzen; P8/P10. |
| 19 | Calculator op omvang, complexiteit/functies met indicatieve range/context | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | C/F/Q: ranges, complex/custom/unknown, reset, btw en contact | Bestaande UI behouden; productieflow valideren P10. |
| 20 | Herbruikbare Website Engine, infrastructuur los van klantontwerp | PARTIALLY_IMPLEMENTED | E: websitebindings, versiecontract, bestaande helpers/QA | Echte klant-onboarding/recovery/export bewijzen; pas bewezen herhaling extraheren; P8 en eerste klanten. |
| 21 | Kleine herbruikbare conversiepatronen, geen componentenfabriek | PARTIALLY_IMPLEMENTED | B/E; bestaande hero/CTA/calculator/contactpatronen | Catalogiseer bewezen hergebruik, test configuratie; na eerste klanten, geen nieuwe publieke blokken verplicht. |
| 22 | Audit Engine: scan→diagnose→prioriteit→fix→retest | PARTIALLY_IMPLEMENTED | E-validator en bestaande QA; P1/E1 concrete herstelcycli | Echte tooloutput-producers en veilige scanadapter ontbreken; P5/P6. |
| 23 | Performance-audit met lab/field apart en controleerbare metrics | PARTIALLY_IMPLEMENTED | Q Lighthouse Home; hashgeverifieerd P4 Aanpak/Contact; E | Generieke remote producer, cache/weightbevindingen en FIELD-adapter ontbreken; P5/P8. |
| 24 | Axe + handmatige a11y, WCAG 2.2 waar van toepassing | PARTIALLY_IMPLEMENTED | F bevat wcag22aa; Q 111 scans, 0 violations; P4 handmatige contrastduiding | Incomplete niet groen verklaren; bredere manual/screenreader/release-scope en remote producer; P5/P9. |
| 25 | Betrouwbare SEO-audit incl. metadata, links, redirects/crawlconflicten | PARTIALLY_IMPLEMENTED | P3; Q static/foundation/Lighthouse, E-vocabulaire | Remote SEO-producer en live canonical/robots/sitemap/redirectbewijs; P5/P8/P10. |
| 26 | Geldige, feitelijke JSON-LD passend bij zichtbare inhoud | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | `docs/index.html` JSON-LD, P3/foundation; geen fictieve ratings | Businessidentiteit en productiedomein opnieuw controleren; geen schema toevoegen voor punten; P8/P10. |
| 27 | Eerlijke lokale SEO, identiteit/NAP/servicegebied/zoekconsole | PARTIALLY_IMPLEMENTED | B/P3/O; bestaande regio-inhoud zonder doorwaypages | Definitieve owneridentiteit, GBP/Search Console en live-indexeerbaarheid; P8/P10. |
| 28 | Eerlijke AI-ready foundations, geen AI-rankinggarantie | PARTIALLY_IMPLEMENTED | Semantische site, E evidencebeleid en B | Geen AI-score/remote-checkproduct; concrete begrensde checks en eerlijke uitleg bij P5/P6. |
| 29 | Security/privacy: secrets, XSS, third parties, dependencies, headers | PARTIALLY_IMPLEMENTED | B/P3/P4/Q; indexscan, audit, CSP/validatie/guards | Productieheaders/TLS, externe providerreview en scannersecurity nog niet bewezen; P5/P8/P10. |
| 30 | Gratis Website Check met echte waarde | PARTIALLY_IMPLEMENTED | Alleen E/B contract en plan; geen publieke live scanner | Veilige echte backend + UI; P5/P6. Launch STOP/scopebesluit als dit niet veilig gereed raakt. |
| 31 | URL→veilige scan→nuttig resultaat→vrijwillige lead | PARTIALLY_IMPLEMENTED | E/B status- en evidencefoundation | Volledige flow ontbreekt; geen mock als live publiceren; P5/P6. |
| 32 | Begrijpelijke issues met bewijs, impact en details op verzoek | PARTIALLY_IMPLEMENTED | E findings bevatten technische/zakelijke uitleg | Werkelijke producerinhoud en resultaat-UX valideren; P5/P6. |
| 33 | LAB/FIELD/LK_AUTOMATED/MANUAL/BUSINESS_OBSERVATION gescheiden | IMPLEMENTED_AND_VERIFIED | E-vocabulaire + unitinvarianten 39/39 in Q; unavailable→NOT_TESTED | Elke toekomstige adapter afzonderlijk op semantiek testen; geen remote bewijs aanwezig. |
| 34 | Optionele LK-totaalscore reproduceerbaar en versioned | NOT_APPLICABLE | E kiest expliciet géén overall-score of default 100 | Alleen heropenen als owner later score kiest; dan volledige methodologie + tests vóór gebruik; P6-optie. |
| 35 | Begrensde echte audit/fix/retestlus, stop bij bewijs of geduide beperking | IMPLEMENTED_AND_VERIFIED | P1 fixture-rootcause, E1 gerichte fix en P4/Q regressie, S | Proces behouden; autonome repairservice niet geclaimd. |
| 36 | Scanner SSRF/redirect/DNS/IP/rate/time/size/secrets/securityreview | PARTIALLY_IMPLEMENTED | B/E beschrijven boundary; URL-contractchecks zijn geen egressbeveiliging | Backendbeveiliging en adversarial tests onafhankelijk bewijzen; P5, harde launchblocker. |
| 37 | Ondersteunde externe audit-API met serversecrets/quotas/failurestates | OWNER_DECISION_REQUIRED | B P5, E; statische site heeft geen veilige live scanservice | Runtime/provider/budget/retentie kiezen vóór P5-uitvoering; geen API-key in frontend. |
| 38 | Veilige form-/lead-healthmonitoringfoundation | PARTIALLY_IMPLEMENTED | F/Q formulier/CTA mocks, E toekomstige monitoringgrens | Scheduler, alarms/recovery en veilige synthetische monitor ontwerpen/bewijzen; P8/Care later. Geen echte inzendingen. |
| 39 | Vergelijkbare before/after audits met toestemming | PARTIALLY_IMPLEMENTED | E-versie/snapshotregels; P3/P4 lokale vergelijkingen | Remote captureproducer, vergelijkingsrapport en klanttoestemming; P5/P6, publicatie per klant. |
| 40 | Betekenisvolle conversie-events, lead alleen na succes | PARTIALLY_IMPLEMENTED | P4/Q allowlists/consent/leadtests, `measurement-config.js` uit | Echte provider/retentie/privacybesluit en productievalidatie; Check-events blijven gereserveerd tot echte flow; P6/P8. |
| 41 | Configureerbare klantconversies zonder omzetclaim | PARTIALLY_IMPLEMENTED | E-bindings en P4 adaptercontract | Echte klantconfiguratie/provider en eventbewijs per klant; eerste klant-onboarding/P8. |
| 42 | Consent-first, eerlijke keuze, intrekken, toegankelijk | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | P4/Q Accept/Reject/Preferences/withdrawal/failure/zero-before-consent | Provider staat uit; echte SDK/privacyvoorwaarden en productieverkeer opnieuw reviewen vóór activatie; P8/P10. |
| 43 | Bestaande Formspree behouden; veilige test-/productiescheiding | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | `docs/contact.js`, F/Q mocks + guards; bestaande mailrapportage historisch | Nieuwe release op domein read-only/pariteit; echte inzending alleen nieuw expliciet mandaat indien nodig; P10. |
| 44 | Kort, toegankelijk en robuust contact met bruikbare context | PARTIALLY_IMPLEMENTED | `docs/contact.html`, F/Q calculator/project/assistentcontext | Website Check-context ontbreekt nog; P6, daarna productiepariteit P10. |
| 45 | Care-architectuur kan audits/monitoring/historie/alerts consumeren | PARTIALLY_IMPLEMENTED | E uitbreidingsgrenzen; O operationeel ontwerp | Uptime/formhealth/operationele datafeeds en alarmproces nog geen geïmplementeerde dienst; P8/later Care. |
| 46 | Eerlijk toekomstig Care-report met data-contracten | PARTIALLY_IMPLEMENTED | E audit/evidencevorm; ontbrekende data expliciet | Uptime-, werkzaamheden- en conversiecontracten/renderer ontbreken; later Care, geen lege cijfers invullen. |
| 47 | Portal alleen architectonisch voorbereiden | INTENTIONALLY_DEFERRED | E future authenticated readmodel; B | Tenantisolatie/auth/private opslag pas bij echte behoefte; na eerste klanten. Geen portal-launchplicht. |
| 48 | Human-reviewed prospecting, geen spam of massamail | INTENTIONALLY_DEFERRED | E/B reusable auditvorm; geen outreachautomatisering | Inputrechten/prospectworkflow pas na veilige Audit Engine en aparte GO; later. |
| 49 | Privaat businessdashboard voor klanten/projecten/facturen/recurring/kosten | OWNER_DECISION_REQUIRED | B P7 ontwerp; geen dashboardartifact of echte klantdata in repo | Private opslag/backup en beheervorm kiezen, daarna P7; buiten publieke repo/site. |
| 50 | Correcte omzet/btw/kosten/MRR/ARR/reserveberekeningen | INTENTIONALLY_DEFERRED | B P7 rekenregels en tests gepland; C bron | Nog geen formules/dataset gebouwd; P7 vóór managementtool-PASS. Fiscale aannames laten bevestigen. |
| 51 | Eén invoerbron, gevalideerde tabellen/formules, bruikbare UX | INTENTIONALLY_DEFERRED | B P7 voorstel, geen werkend dashboard | Implementeren en testen met fictieve data in private artifact; P7. |
| 52 | Officiële accounting/Peppol afzonderlijk | OWNER_DECISION_REQUIRED | B/O expliciete grens, dashboard is geen boekhouding | Owner/boekhouder bevestigt officieel systeem en factuurproces; P7/P8, geen complianceclaim uit code. |
| 53 | Eerlijke toekomstige feedback/reviewverzameling | INTENTIONALLY_DEFERRED | B; geen fake reviewcontent in huidige site | Handmatig proces bij eerste echte opleveringen, platformregels dan controleren; na eerste klanten. |
| 54 | Analytics→menselijk beoordeeld leren, geen causale claims uit kleine samples | INTENTIONALLY_DEFERRED | P4 datafoundation; geen live meetdata/provider | Pas na echte consented data en voldoende context/sample; later, geen automatisch defaultpromoveren. |
| 55 | Gemotiveerde performance-/assetbudgetten tegen regressie | PARTIALLY_IMPLEMENTED | Registry LH-targets 90/95/95/95; Q meet assets | Foundation meldt expliciet geen projectassetbudget; gewicht/JS/CSS/font/requestbudget vanuit metingen vaststellen; P8/P9. |
| 56 | Beelden: dimensies, formaat, compressie, loading, alt/stabiliteit | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | P3, F/Q lokale images/decode/overflow en Lighthouse | Nieuwe Check-assets later apart; finale release-assetpariteit P9/P10. |
| 57 | Typografie/fontload/fallback/licenties en leesbaarheid | PARTIALLY_IMPLEMENTED | P3/Q fontfixtures, rendering/CLS en bestaande fontkeuzes | Fixturebewijs is geen livefont-/licentie-/fallbackaudit; distributierechten en productiepad bevestigen; P8/P9/P10. |
| 58 | Kleine JS-laag, geen onnodige libraries/frameworkmigratie | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | P4 failure-isolation/no-JS/F/Q; geen runtime dependency toegevoegd | Nieuwe modules dezelfde discipline; echte providerkosten/cleanup opnieuw testen bij activatie; P8/P10. |
| 59 | Beheersbare CSS/tokens/cascade zonder opportunistische refactor | PARTIALLY_IMPLEMENTED | P3 cascadeanalyse, Q visuals; 85 warnings behouden | 24 duplicates in legacy maar production-relevant `style.css` blijven maintenance debt; vervolg alleen op bewezen nut/defect, niet P4.5. |
| 60 | Keyboard-/mobielnavigation met Escape/focus/scroll/resize | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | F/Q, twee desktop-N/A-skips verklaard | Releasepariteit en finale manual review P9/P10. |
| 61 | Echte interactiestates en controls, geen hover-only/dead buttons | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | F/Q bestaande calculator/contact/assistent/consentstates | Nieuwe Check toevoegen met eigen statebewijs; P6/P9. |
| 62 | Bondige geloofwaardige Nederlandse copy | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | P3/P4 ownerreview en bestaande site; geen copywijziging P4.5 | Zakelijke beloften matchen geleverde operatie; Check-copy P6 en finale review P8/P9. |
| 63 | Geen verzonnen klanten/reviews/resultaten | IMPLEMENTED_AND_VERIFIED | P3 portfolio/demolabels; geen fictieve social-proofclaims toegevoegd | Nieuwe claims uitsluitend met bewijs/toestemming; doorlopend. |
| 64 | Geen dark patterns/verborgen upsells/moeilijke reject | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | C/F/Q duidelijke btw, optionele Care, evenwaardige consentkeuzes | Echte provider-/release-UX opnieuw beoordelen P8/P9/P10. |
| 65 | Website Check→contact met minimaal nuttige geverifieerde context | PARTIALLY_IMPLEMENTED | E evidencevorm; C bestaand algemeen contextmechanisme | Scanreferentie/handoff/security/retentie en tests ontbreken; P5/P6. |
| 66 | Calculator→contact bewaart keuzes/range en blijft indicatie | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | C/F/Q handoff inclusief btw en reset/editregels | Productiepariteit en toekomstige offertebronconsistentie; P7/P10. |
| 67 | Check en calculator vullen elkaar aan; direct contact blijft vrij | PARTIALLY_IMPLEMENTED | Calculator/directcontact bestaan, B P6-flow | Check en optionele handoff zonder gedwongen funnel; P6. |
| 68 | Begrijpelijke recoverable errors zonder secrets/stacktraces | PARTIALLY_IMPLEMENTED | F/Q form/consent/calculatorfailure bewezen | URL/scan/APIquota/field-unavailable states nog niet geïmplementeerd; P5/P6. |
| 69 | Eerlijke loading, geen fake progress, focus/reduced motion | PARTIALLY_IMPLEMENTED | F/Q formulier sendinglock en feedback | Scannerloading/status/cancel nog niet gebouwd; P5/P6. |
| 70 | Veilige URL/state en back/refresh zonder PII-lek | PARTIALLY_IMPLEMENTED | C/F/Q whitelisted context, P4 geen replay van events | Veilige scanresultaatreferenties en retention ontbreken; P5/P6. |
| 71 | LK metadata, canonical, robots, sitemap, 404/redirects | PARTIALLY_IMPLEMENTED | P3 lokale SEO, Q Lighthouse/static/foundation | Preview/productiepublicatiepolicy en werkelijk 404/redirect/security-/SEOmanifest; P8/P10. |
| 72 | Compacte contentarchitectuur, alleen nuttige aparte pagina's | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | Home/Aanpak/Contact, portfolioanker; P3/P4 review | Check aparte beperkte route; noodzakelijke legalinfo P8, geen dunne pagina's toevoegen; P6/P9. |
| 73 | Handmatige a11y-gate naast axe voor alle kritieke flows | PARTIALLY_IMPLEMENTED | P3/P4 visuele/focus/contrastreview; Q keyboard/E1/reflow | Geen nieuwe volledige menselijke/screenreaderreview of Check-scope; P9 met expliciete beperkingen. |
| 74 | Form quality: validatie, honeypot, duplicaat, slow/fail/success/retry | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | F/Q gemockte response-/keyboard-/a11ystates | Productie-specifieke aflevervalidatie niet uit lokale mocks afleiden; P10 apart mandaat indien echte test. |
| 75 | Scanner A–M-matrix incl. malicious URL/partial/API-/fieldfailure | PARTIALLY_IMPLEMENTED | E alleen contractfixtures, geen volledige scannerfixturematrix | Alle gecontroleerde A–M-cases en end-to-end/securitybewijs vóór publieke Check; P5/P6. |
| 76 | LK-scoreinvarianten vóór vertrouwen in score | NOT_APPLICABLE | E: geen overall-score geïmplementeerd | Bij eventuele scorekeuze reproduceerbare fixtures/missing-data/monotoniciteit; P6-optie. SSRF-eis blijft zelfstandig §36. |
| 77 | Auditmethodologie versioneren, historie vergelijkbaar houden | IMPLEMENTED_AND_VERIFIED | E methode/contract v1, onbekende versie afgewezen, unit-Q | Elke producer draagt versie/provenance; semantiekwijziging vraagt nieuwe versie. |
| 78 | Prioriteit op impact/confidence, geen opgeblazen verkoopseverity | PARTIALLY_IMPLEMENTED | E severity/confidence/evidencevelden + tests | Echte rulecatalogus, effort/frequentie-context en producer-/menselijke beoordeling; P5/P6. |
| 79 | Concrete aanbevelingen met locatie en verificatie | PARTIALLY_IMPLEMENTED | E locaties/actie/verification, P1/E1 concrete reparaties | Echte generieke aanbevelingsproducers ontbreken; P5/P6. |
| 80 | Machineleesbare bevindingen→begrensde menselijke fixflow | PARTIALLY_IMPLEMENTED | E serialisatie/lifecycle/safety; geen automatische bevoegdheid | Producer/taakadapter nog niet gebouwd; later na P5, risicovol herstel blijft apart akkoord. |
| 81 | Domeinoverschrijdende regressiecontrole na wijzigingen | IMPLEMENTED_AND_VERIFIED | P4/E1/Q functional/axe/visual/static/LH; ongewijzigde guards | Elk nieuw scopeonderdeel opnieuw testen; geen algemene toekomstige regressievrijgarantie. |
| 82 | Visuele diff→inspectie→exacte menselijke baselineacceptatie | PARTIALLY_IMPLEMENTED | P3/P4 helpertrail; Q 35 bytegelijke LK-captures | Bestaande LK-scope bewezen; Check-states en volledige release/demoreview nog P6/P9. |
| 83 | Eerlijke Lighthouse-gate met herhalingen/omgeving/spreiding | IMPLEMENTED_AND_VERIFIED | P4 vaste 95/99/99-serie behouden; Q verse 100/99, hashes/omgeving gelijk | Provider/nieuwe routes meten zodra geraakt; geen 100-garantie of FIELD-claim. |
| 84 | Echte CWV-fielddata afzonderlijk, unavailable eerlijk | IMPLEMENTED_AND_VERIFIED | E FIELD-contract en unitinvarianten; P3/P4/Q expliciet geen veld-INP/CWV-bewijs | Live FIELD-adapter later; afwezigheid geeft nooit 100 of lab→fieldpromotie. |
| 85 | Playwright-uitkomsten voor alle kritieke journeys | PARTIALLY_IMPLEMENTED | Q 86 pass/2 N/A; huidige nav/calc/contact/context bewezen | Website Check-journeys nog toevoegen vóór P6/P9; huidige tests niet vervangen. |
| 86 | Axe over pagina's/states zonder volledige WCAG-claim | PARTIALLY_IMPLEMENTED | Q 111 scans/0 violations; incomplete 98/51/3/3 behouden | Nieuwe Check/demos binnen release/freeze-scope en handmatige rest; P6/P9. |
| 87 | Geen onverwachte console/netwerkproblemen | IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | Q 0 console/page errors, 0 rejects; alleen verwachte fixtures/failuremocks | Live fonts/provider/CORS/assets/headers bewijzen op juiste omgeving; P10. |
| 88 | Interne/externe/demo/contact/canonical/ankerlink-integriteit | PARTIALLY_IMPLEMENTED | Q geen lokale linkerrors; P1 feitelijk `#projecten` contract | 55 INFO blijven externe/publicatiebeperkingen; definitieve livebestemmingen en canonicals P8/P10. |
| 89 | LOCAL↔PREVIEW↔PRODUCTION verschillen expliciet verifiëren | PARTIALLY_IMPLEMENTED | B P10 verplichte paritymatrix; P3 live `/style.css`-verschil vastgelegd | Werkelijke drielaags HTML/assets/SEO/forms/consent/redirect/headers/releasevergelijking ontbreekt; P10. |
| 90 | Exact deploymentbesluit, secrets/config/headers/cache/rollback | OWNER_DECISION_REQUIRED | B P10, O; draft registry, geen release-go | Host/artifact/domein/venster/rollback expliciet autoriseren na gates; P8–P10. |
| 91 | Zakelijke/legal launchgate met owner/boekhouderbewijs | OWNER_DECISION_REQUIRED | O checklist; technisch PASS is geen zakelijke READY | Registratie/btw/identiteit/privacy/contracten/invoice/Peppol/hostingterms afsluiten; P8 vóór commercial launch. |
| 92 | Dashboarddata minimaal/privé/beveiligd met herstel | OWNER_DECISION_REQUIRED | Bindend ownerbesluit + B P7, geen zakelijke dataset in publieke assets | Private opslag/toegangs-/backupkeuze, restoretest en databeheer; P7/P8. |
| 93 | Dashboard snel bruikbaar voor omzet/openstaand/btw/MRR/resultaat | INTENTIONALLY_DEFERRED | B P7 functionele vragen vastgelegd; nog geen dashboard | Private UX bouwen + fictieve-data-validatie; P7. Niet als klaar gepresenteerd. |
| 94 | Hosting/Care recurring gescheiden, Care éénmaal €59 MRR | PARTIALLY_IMPLEMENTED | C Care/both=59; F/Q invariant bewezen | Private MRR/ARR-/start-stop-/paymentrekenlaag nog niet gebouwd; P7. |

## Exacte statustotalen

| Status | Secties |
|---|---:|
| IMPLEMENTED_AND_VERIFIED | 14 |
| IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | 20 |
| PARTIALLY_IMPLEMENTED | 46 |
| INTENTIONALLY_DEFERRED | 7 |
| OWNER_DECISION_REQUIRED | 6 |
| NOT_APPLICABLE | 2 |
| **Totaal** | **95** |

Dit zijn aantallen secties, geen completionpercentage of release-/kwaliteitscore. Samengestelde secties zijn niet opgesplitst om het resultaat gunstiger te maken.

## Launchgaps in afhankelijkheidsvolgorde

1. **P5-inputbesluit:** veilige scanner-runtime/provider, quotas/budget en URL-/resultaatretentie vastleggen. Backendsecurity + bewijsproducers bouwen en onafhankelijk reviewen. Geen scope-GO verleend door deze matrix.
2. **P5→P6 echte Website Check:** gecontroleerde A–M-matrix, echte status/error/partial states, evidenceuitleg, veilige minimale contacthandoff. Geen fake live scan. Niet veilig gereed betekent STOP en expliciet launchscopebesluit.
3. **P4-foundation→P8 productie-meting:** providerkeuze/privacy/retentie en echte consented eventaflevering valideren. De uitgeschakelde adapter bewijst dit niet; “meten vanaf launch” blijft open.
4. **P7 private businesslaag:** owner kiest private opslag/backup, daarna beperkte managementtool met btw/MRR/ARR/partial-payment-rekengevallen. Officiële accounting/Peppol blijft afzonderlijk.
5. **P8 operatie en bedrijf:** Hosting/Care alleen als scope/support/monitoring/backup/restore/toegang/offboarding en zakelijke/legal checklists werkelijk bewezen zijn. Geen dubbele Care-MRR. Bepaal gemotiveerde assetbudgetten en sluit font-/productieafhankelijkheden.
6. **P9 finale release-evidence:** betrokken routes/features, handmatige a11y en LK plus demos binnen freezevoorwaarden; huidige toolchain-PASS vervangt deze toekomstige snapshotreview niet.
7. **P10 aparte productie-GO en parity:** HTML, CSS/JS-assets, canonical/SEO, formulieren, consent/tracking, redirects, daadwerkelijke securityheaders en deploymentversie tussen LOCAL, PREVIEW en PRODUCTION vergelijken; herstelreferentie vastleggen.

Bewust later: complete Care-automatisering/reporting, klantportal, prospectworkflow, evidence-based componentpromotie en uitgebreide conversion library. Alleen architectonisch voorbereiden waar nu nodig; geen extra homepageblokken.

De drie gebundelde ownerbesluiten voor vervolg zijn: (1) scanner-runtime/provider/budget/retentie; (2) private managementopslag/backup en koppeling aan afzonderlijke accounting; (3) productiehost/meetprovider en zakelijke/operationele launchscope met bewijs. Geen van deze besluiten is stilzwijgend genomen.
