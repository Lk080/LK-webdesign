# LK P4 — Consent-first conversion intelligence foundation

Datum: 29 september 2026 (Europe/Amsterdam). Scope: uitsluitend P4, lokaal.

**Actuele status: P4 PASS — TECHNICAL_GATE_PASS.** Lorenz heeft E1 gericht
geaccordeerd en daarna expliciet uitsluitend de tien oorspronkelijke P4-baselines
voor footer/full-page goedgekeurd. Die tien zijn via de bestaande helper
geaccepteerd. De onmiddellijke vergelijking en de daaropvolgende volledige
P4-eindrun zijn beide **35/35 PASS**. Geen andere baseline is gewijzigd.

Dit is de actuele A–R-afsluiting. De eerdere A–R-versie, inclusief de toenmalige
weigering, INCOMPLETE-status, mislukte runs en lagere labmetingen, is onderaan
ongewijzigd behouden als historisch bewijs. De huidige goedkeuring geldt voor de
exact genoemde baselines, niet voor toekomstige referenties of een algemene
productierelease. `DELIVERY_APPROVED` voor de volledige website wordt niet afgeleid.

## A. Existing tracking baseline

Vóór P4 geen analyticsprovider/ID/SDK of consentmodule; wel lokale interactiehooks.
De architectuur uit de historische versie blijft van toepassing. De acceptatieronde
heeft geen runtime, endpoint of account veranderd. Formspree blijft ongewijzigd.

## B. Consent architecture

Eén centrale consentstaat, noodzakelijke opslag actief, analytics standaard uit.
De opgeslagen keuze heeft een schema/policy en maximaal 180 dagen geldigheid;
ongeldige of verlopen toestemming faalt gesloten. Zonder geconfigureerde provider
geen misleidende trackingbanner; de footerknop opent de providerloze voorkeuren.
Accept/Reject/Preferences/withdrawal zijn met uitsluitend een lokale fixture getest.
E1 voorkomt bedekte assistentfocus bij banner of dialoog en behoudt logische,
zichtbare focus-return. Zie [consentcontract](LK-CONSENT-MEASUREMENT.md).

## C. Event taxonomy

De bestaande P4-taxonomie blijft ongewijzigd: primary/secondary CTA, project_view,
calculator_start/complete, contact_start, generate_lead en phone/email waar aanwezig.
Website Check/WhatsApp-events blijven gereserveerd en geweigerd. Geen micro-events,
nieuwe publieke secties of tracking in demo's toegevoegd.

## D. Analytics adapter design

De bestaande allowlist-adapter valideert categorieën, begrenst initialisatie,
vangt uitval af en kent geen queue/replay. Alleen de bevestigde formulierhook kan
een lead aanbieden. Noodzakelijke navigatie, calculator en formulier wachten niet
op een meetprovider. Deze afronding heeft de adapter niet gewijzigd.

## E. Provider status

`enabled: false`, `provider: null`, `policy: lk-analytics-v1-unconfigured`.
Geen echte meetdienst geactiveerd. Het fixturebewijs bewijst het contract, niet
het gedrag of de privacy van een toekomstige externe SDK.

## F. PII / data minimization

De zeven adapter-unitgevallen en browserassertions valideren allowlists, verboden
payloads/typecoercion, leadsemantiek en failure isolation. Geen PII, volledige URLs,
querystrings, vrije tekst of formulierpayloads verzonden. De volledige unitset
(inclusief bestaande contract-, guard- en freezegevallen) is **39/39 PASS**.

## G. Consent tests

Alle **22 consentbrowsergevallen PASS** in de volledige eindrun: de oorspronkelijke
14 plus acht E1-gevallen (320/390/768/1440 px, desktop- en mobiele Chromiumcontext).
De assertions omvatten banner + assistent, toetsenbordfocus, voorkeuren openen en
sluiten, Accept/Reject/Escape, intrekken, cross-tab, opslagfouten, focus-return en
privacyknop/assistent-overlap. De eerdere gerichte E1-run van 18/18 blijft behouden;
dat subsetresultaat wordt niet bij de finale 86 opgeteld.

## H. Event tests

CTA/project/calculator/contact/email, precies één lead na bevestigde gemockte
response, geen lead bij fout of duplicaat, en providerthrow/block/timeout zijn in
de finale functionele suite getest. Phone wordt alleen uitgezonden waar een
werkelijke tel-link bestaat; ontbreken wordt niet als live eventbewijs ingevuld.
Geen echte Formspree-inzending of echte analyticsaflevering.

## I. Network-proof results

Finale functionele suite: 88 netwerk/consoleattachments, 2.462 guardrecords,
alle bestaande fontfixtures; **0 rejects, 0 console-/page-errors**. De afzonderlijke
Axe-suite: twee attachments, 14 fixture-records, nul fouten. De eventtest onderschept
het lokale fixturetransport vóór aflevering: nul optioneel transport vóór consent,
na Reject of na intrekken; uitsluitend verwachte events na expliciete toestemming.
Alle Lighthousemetingen: geen failed/unexpected requests of runwarnings.

Bewijs: [browseraudit](test-results/qa-runs/lk-final-KIz23G/p4-final-browser-audit.json)
en de oorspronkelijke functional/axe-attachments. Geen guard of foutfilter gewijzigd.

## J. Accessibility results

**111 canonieke Axe-scans, 0 violations.** Incomplete checks blijven expliciet:
`color-contrast` in 98 scans, `aria-valid-attr-value` in 51, `hidden-content` in drie
en `css-orientation-lock` in drie. Dit zijn aantallen scans, geen aantallen unieke
zichtbare fouten. De bestaande handmatige duiding blijft gelden; incomplete is
geen automatisch PASS of claim van volledige WCAG-conformiteit.

Eén aanvullende incomplete contrastmelding ten opzichte van vóór E1 betrof
`#assistant-title` in de mobiele paginakeuze. Axe kon de achtergrond door gedeeltelijk
overlappende elementrechthoeken niet bepalen. Handmatige controle van werkelijke
tekstfragmenten en de stabiele capture toont geen bedekte tekst: Sluiten raakt
alleen lege ruimte in de titelrechthoek. Kleur `rgb(246,247,242)` tegen
`rgb(21,26,24)` geeft **16,35:1**. De titel en focus zijn zichtbaar; de sluitknop blijft bereikbaar.

Bewijs: [kleur/geometry](test-results/qa-runs/lk-inspection-KYNFwG/inspection/title-review.json),
[stabiele mobiele capture](test-results/qa-runs/lk-inspection-ZYOPYr/inspection/assistant-pages-stable-390.png)
en [viewport vóór/na](test-results/qa-runs/lk-inspection-ZYOPYr/inspection/title-capture.json).
De eerste capture in KYNFwG was een onbruikbaar tussenframe tijdens scrollen; ook
die is bewaard. De controlecapture wachtte op twaalf stabiele viewport/scrollframes,
zonder bron-, CSS- of testwijziging. Geen Safari/Firefox/screenreader-certificatie.

## K. Performance before / after

P3-referentie: Home/Aanpak/Contact desktop 100, mobiel 99; mobiele LCP respectievelijk
1675/1635/1554 ms. Alle onderstaande P4-metingen hebben dezelfde volledige snapshot
als de eindrun. Scores: Performance / Accessibility / Best Practices / SEO.

| Pagina/mode | P4-scores | FCP ms | LCP ms | TBT ms | CLS | Run |
|---|---|---:|---:|---:|---:|---|
| Home desktop | 100 / 100 / 100 / 100 | 395 | 543 | 0 | 0,00082 | `lk-final-KIz23G` |
| Home mobiel 1 | 95 / 100 / 100 / 100 | 2308 | 2458 | 0 | 0,00049 | dezelfde |
| Home mobiel 2 | 99 / 100 / 100 / 100 | 1387 | 1863 | 3,5 | 0,00049 | `lk-lighthouse-z9FxA2` |
| Home mobiel 3 | 99 / 100 / 100 / 100 | 1391 | 1855 | 0 | 0,00049 | `lk-lighthouse-YPTaCk` |
| Aanpak desktop | 100 / 100 / 100 / 100 | 438 | 442 | 0 | 0,02720 | `lk-lighthouse-EYcUu1` |
| Aanpak mobiel | 99 / 100 / 100 / 100 | 1536 | 1803 | 0 | 0,00475 | dezelfde |
| Contact desktop | 100 / 100 / 100 / 100 | 412 | 412 | 0 | 0,02791 | `lk-lighthouse-CQv2bk` |
| Contact mobiel | 99 / 100 / 100 / 100 | 1390 | 1780 | 0 | 0,00070 | dezelfde |

Na de 95 zijn vooraf precies twee extra Home-mobielmetingen vastgelegd en uitgevoerd,
zonder wijzigingen. Mediaan 99, spreiding 95–99; mediane LCP 1863 ms, spreiding
1855–2458 ms. De lagere 95 is niet vervangen of weggefilterd. De exacte externe
of schedulingoorzaak is niet bewezen. Bestaande targets 90/95/95/95 zijn overal
gehaald. De lokale reeks toont geen reproduceerbare betekenisvolle scoreterugval;
wel circa 188/168/226 ms extra mobiele lab-LCP op Home-mediaan/Aanpak/Contact ten
opzichte van P3. Dit is nadrukkelijk geen nul-impactclaim.

De providerloze architectuur voegt geen externe analyticsload toe. Labvariatie,
de vier P4-assets en afhankelijkheid van bestaande fonts blijven zichtbaar. Geen
veld-INP of productieperformance bewezen; een echte provider vraagt nieuwe metingen.
De oorspronkelijke P4-metingen (ook 93/94) blijven in het historische rapport staan.

## L. Visual review en exacte acceptatie

Lorenz gaf expliciete menselijke toestemming voor uitsluitend `lk-footer.png` en
`lk-full-page.png` in de vijf genoemde viewports. Reden: de bedoelde
Privacyvoorkeuren-integratie, 20 px extra footerhoogte en reeds beoordeelde
assistentpositionering. E1 was apart goedgekeurd; de tien kandidaten bleven
bytegelijk. Header, hero, projecten, prijzen, contact en andere componenten bleven
in de beoordeelde captures ongewijzigd. Categorie D: nul.

[OLD / NEW / DIFF en consentstates](test-results/qa-runs/lk-inspection-ZMBhei/p4-human-visual-gate.html)
blijven intact. Toegepast via `npm run qa:visual:accept -- <review.json> --apply`,
na plancontrole. Tijdstip acceptatie: **2026-09-29T08:10:09.559Z** (10:10 CEST).
De helper bewaart de tien oude PNG's en de review in
[acceptance-LKGVc7](test-results/qa-runs/lk-visual-hPttNc/acceptance-LKGVc7/review.json).
Goedkeuringsgrond per onderstaande rij: de expliciete scope hierboven; deze staat
ook per bestand volledig in het review-JSON. Padprefix: `tests/visual/baselines/`.

| Viewport | Bestand | Oude SHA-256 | Nieuwe SHA-256 |
|---|---|---|---|
| mobile-small | `lk-footer.png` | `50fc556328a05d829d3a987cb64069a330888241f452dd10cf7d7d1186b17d9b` | `63ec28fd96b4e14bd06524cc57af3152a9dc3e626ae3c86d39f999c2e7bbd4e8` |
| mobile-small | `lk-full-page.png` | `694d5b0d370ae85062743e03f0c63854e605d6069e882379d5070f123e59d6ee` | `edf9d75df61333169ac95e6de4ff1c1ba59572278e9231e4060a1d411c0a286a` |
| mobile-standard | `lk-footer.png` | `26704f1511615aa0b354a985c80e1b912a4271380e16a1b30095a7f08f23f2a6` | `80c76577254eef462651fd38cac5fd8d501242810c49abfff4fb4af52678257e` |
| mobile-standard | `lk-full-page.png` | `32b01ecd814b076a960f4bfe9c26a2a3a21b1c33df3108c29f0ff90590ef19f0` | `9a1ed592e2be87554866ea1f79253691a66450b9bc6cf4fa5f56783dac3dcd8d` |
| tablet | `lk-footer.png` | `fa30453475087baf1b516eaed3f6bc2195e026c7f7a434c9afc3eff97881e39e` | `67e7d2d260a1f867a9c1dbe0f8aedddc95fd98a99c5ccf201b269b4aad3de5e1` |
| tablet | `lk-full-page.png` | `08d3923e94e44c63b2d559e06f3887fc764e087c25946b34a0ac502a24681854` | `a554b8e795c23b36c5c99a07125d9de1274841695d1a728f20d80913230cfe83` |
| desktop | `lk-footer.png` | `f8019fd21efb95711fea3ec52c4726081cd07f235135623e6ad85e2d44dbb026` | `87d611a2c9ce1ce5a928446865c7e46da9d60ec8bc1398630d3271ede6912a8f` |
| desktop | `lk-full-page.png` | `32307ca76aa778736d46f8148ccbc60cfb750b559f4a4c9ab78b0fea9ac3dc57` | `2bc64eaf06708df442c9cb6457bfc0422d37751d8ecb60d7e21e750c3296dd91` |
| large-desktop | `lk-footer.png` | `dd67e8d07aa5b65ea36d5ed661e58ce0791be995b676b45226c266467136c292` | `b9af73c505954097a3cbc5878b51bf0114ecdcd8d88de7c7b503aa96ade0248b` |
| large-desktop | `lk-full-page.png` | `56074ccf6a22717de731cf6be1986a7020db4c2e80e049fc4222422a5b6a942f` | `30083b6d809193d6610cf2896692e27002c3451be78261d18d8bd32d3987715d` |

Onmiddellijk na acceptatie: `lk-visual-QvYQzm`, **35/35 PASS**. Daarna volledige
`lk-final-KIz23G`: opnieuw **35/35 PASS**, alle 35 captures ook bytegelijk aan de
referenties. Geen onverwacht verschil; geen tweede acceptatie of demo-baselinewijziging.

## M. Files changed

Deze afronding: uitsluitend de tien bovenstaande baseline-PNG's en dit rapport;
verder alleen genegeerde lokale QA-artifacts. Broncode, tests, configuratie,
commerciële bron, consentlogica, thresholds en demo's zijn sinds de geaccordeerde
E1-snapshot bytegelijk. Van de 341 bestaande repositorybestanden is de beginhash
bewaard en de scope opnieuw gecontroleerd.

Voor de hele P4-slice blijven de acht gewijzigde bestaande en acht nieuwe bestanden
uit de historische M van toepassing, nu aangevuld met tien geautoriseerde baselines.
E1 zit binnen `docs/assistant.js` en `tests/e2e/lk-consent.spec.cjs`; geen extra
productiebestanden. Alle bestaande P1/P2/P3-delta's blijven behouden.

## N. Regression results en acceptatiematrix

| Gate | Actueel resultaat / bewijs |
|---|---|
| Centrale consentstaat, Reject/Preferences/withdrawal | PASS; 22 consentgevallen binnen volledige functional |
| Adapter/taxonomie, PII, leadsemantiek, provideruitval | PASS; browserassertions + 39 unitgevallen; contract gedocumenteerd |
| Geen optionele requests zonder toestemming | PASS; lokale fixtureassertions en ongewijzigde guards; geen echte provider |
| Functionele regressie | **86 PASS, 0 FAIL, 0 flaky, 2 desktop-N/A-skips** |
| Unit | **39/39 PASS**, 0 skips |
| A11y/E1 | **111 Axe-scans, 0 violations**; incomplete checks handmatig geduid onder J |
| Performance | Alle targets gehaald; begrensde Home-reeks en overhead onder K |
| Human visual gate | Expliciete approval voor exact tien bestanden; oorspronkelijke consentstates behouden |
| Visual | **35/35 PASS** onmiddellijk én in volledige eindrun |
| HTML / JS / toolinglint | 0 errors, 0 warnings |
| CSS | 0 errors, **85 bestaande warnings**, ongewijzigd |
| Links / foundation | 0 errors; **55 + 4 INFO** |
| `git diff --check` | Schoon |
| Scope/externe side effects | Geen andere baseline, broncode, productieconfig, echte inzending, commit, push of deployment |

De twee skips zijn bestaande desktop-N/A voor mobiele menunavigatie en mobiele
overflow; beide mobiele varianten zijn uitgevoerd. Dit zijn geen ontbrekende
vereiste tests. Alle zeven jobs in de volledige final-run eindigden met exit 0.

Bestaande evidence-API: **139 PASS-entries**, twee SKIP, nul FAIL; `missing: []`,
`coherent: true`, `TECHNICAL_GATE_PASS`. Alle 139 PASS-entries zijn via
`qa-evidence.reuseEvidence` tegen de huidige snapshot en artifacthash geverifieerd;
de twee SKIP-artifacts zijn eveneens gehasht. De verse metadata is niet herschreven.
De helperstatus `OWNER_REVIEW_PENDING` blijft correct voor algemene oplevering;
deze baselineapproval wordt niet opgewaardeerd tot globale releasegoedkeuring.

85 CSS-warnings = 12 `final.css` no-descending-specificity + 49 `style.css`
no-descending-specificity + 24 `style.css` duplicate selectors. De P3-duiding blijft
exact gelden: legacy voor lokale Master/P3-routes, maar production-relevant volgens
het live `/style.css`-bewijs; geen dead code. De 24 duplicaten zijn maintenance debt
zonder bewezen zichtbare productiefout. Geen CSS gewijzigd om lint groen te maken.
55 links-INFO en vier foundation-INFO (drie publication-pending, één budget unset)
blijven zichtbaar. NO_COLOR/FORCE_COLOR is een runneromgevingsmelding.

| Snapshotonderdeel | SHA-256 |
|---|---|
| source | `65b7f06f0b1f792bff449d7509401154651c77e1b1f7ad9c3a6fe101f9173558` |
| configuration | `5a1ee3607932f1139e3d53083f62dbf0b9c17f33786d455245c9c1e902cf60b1` |
| baselines | `2dd94f9c0fc1428ffa507e6ec652bfff9244243ae6e06dbc7568e9914e47e73f` |

Bewijs: [final evidence](test-results/qa-runs/lk-final-KIz23G/evidence.json),
[hash-/snapshotcontrole](test-results/qa-runs/lk-final-KIz23G/p4-final-integrity.json),
[browseraudit](test-results/qa-runs/lk-final-KIz23G/p4-final-browser-audit.json),
[unitlog](test-results/qa-runs/lk-inspection-ZMBhei/p4-final-unit.log),
[acceptatiescope](test-results/qa-runs/lk-inspection-ZMBhei/post-acceptance-verification.json).
Node 24.21.0, Playwright 1.63.0, Axe 4.13.0, Lighthouse 13.5.0, macOS/Darwin arm64.
De finale visual/full/Lighthouse-runs gebruiken allemaal expliciet dezelfde
`.cache/ms-playwright/chromium-1243` vóór import, met gelijke volledige metadata.
Historische runs met een andere cachelocatie/mtime blijven ongewijzigd; de eerdere
vergelijking van 901 bestanden en vijf symlinks bewijst bytegelijkheid van de twee
browserbundels, niet automatische gelijkheid van historische omgevingsmetadata.

## O. Privacy / legal owner items

Ongewijzigd vóór publicatie: classificatie van noodzakelijke opslag/180 dagen en
publieke privacy-informatie bevestigen. Vóór echte analyticsactivering: aparte
provider/account/privacy/DPA/retentie-/doorgiftereview, expliciet ownerbesluit,
nieuwe policyversie en nieuwe tests met de echte implementatie. Dit blokkeert geen
providerloze P4-foundation-PASS, maar geeft geen toestemming tot live activering.
Geen juridische garantie of fictieve leverancierstekst toegevoegd.

## P. Risks / limitations

Geen resterende P4-blokkade. De a11y-incompletes, labspreiding en bestaande CSS-debt
zijn hierboven zichtbaar gebleven. Geen volledige browser-/screenreader- of
productieveldvalidatie. Client-side leaddeduplicatie is geen server-side exactly-once
of mailafleveringsbewijs. Provideradapter is geen sandbox voor toekomstige SDK's.

De verplichte latere LOCAL ↔ PREVIEW ↔ PRODUCTION parity-gate blijft staan voor
HTML, CSS/JS-assets, canonical/SEO, forms, consent/tracking, redirects, securityheaders
en deploymentversie. Deze lokale P4-PASS is geen bewijs van productiepariteit.

## Q. Recommended P5 scope

Alleen het eerder geplande Website Check-backend-/securitycontract na expliciete
GO P5. Geen Website Check, backend, dashboard, portal of extra homepageblok in deze
afronding gebouwd. **P5 is niet gestart.**

## R. Rollback / checkpoint status

Branch `prelaunch-checkpoint-2026-09-27`; HEAD
`74fea4993282d70e76fc986cc07da2a9794beb98` ongewijzigd; staging leeg.
Geen commit/push/deploy. De helperarchive bevat alle tien oude referenties;
het preacceptatiemanifest bewaart 341 beginhashes. De rapportversie van vóór deze
afsluiting is bytegetrouw bewaard in
[p4-report-before-finalization.md](test-results/qa-runs/lk-final-KIz23G/p4-report-before-finalization.md).

Een eventuele rollback is alleen na opdracht gericht op deze tien paden en de
rapporttoevoeging, met eerst controle op later user work. De eerdere P4-startkopie
en E1-voorversies blijven beschikbaar. Geen reset/stash/rebase; lokale artifacts
zijn geen externe backup. **STOP na P4; wachten op expliciete GO P5.**

---

<details>
<summary>Historische A–R-versie vóór E1-goedkeuring en definitieve baselineacceptatie — behouden audit trail</summary>

Deze versie beschrijft de toenmalige snapshot en reviewstatus. Uitspraken over
INCOMPLETE, niet-accepteren en ongewijzigde baselines hieronder zijn historisch;
de actuele beoordeling en beperkte ownerapproval staan hierboven.

# LK P4 — Consent-first conversion intelligence foundation

Datum: 29 september 2026 (Europe/Amsterdam). Scope: uitsluitend P4, lokaal.

**Status: TECHNICAL_GATE_INCOMPLETE — visuele referenties niet goedgekeurd.**
Lorenz heeft expliciet gekozen: **“Nog niet; baselines behouden.”** Geen baseline
is in P4 vervangen. De hieronder beschreven implementatie is aanwezig; een
volledige P4 PASS en DELIVERY_APPROVED worden niet geclaimd. P5 is niet gestart.

De actuele eindrun is `lk-final-EQGauj`; de exacte resultaten staan onder N.
Het technisch contract en de volledige taxonomie staan in
[LK-CONSENT-MEASUREMENT.md](LK-CONSENT-MEASUREMENT.md).

## A. Existing tracking baseline

Vóór P4: geen analyticsprovider, measurement-ID, tracking-SDK, analyticscookies,
analytics-localStorage of consentmodule. Wel bestaande lokale `lk:interaction`-
hooks in `script.js`, `project.js`, `contact.js` en `assistant.js`. Ze verstuurden
niets naar een meetdienst. De assistent gebruikte al `lk.assistant.v2` voor
categorische sessiekeuzes. Formspree bleef de bestaande formulierdienst; Google
Fonts een bestaande externe CSS/fontdependency. Er is geen tweede meetimplementatie
toegevoegd en geen formulierendpoint gewijzigd.

## B. Consent architecture

Eén centrale staat: NECESSARY altijd actief; ANALYTICS standaard uit. De noodzakelijke
keuze wordt uitsluitend na een expliciete actie opgeslagen in `lk.consent.v1`:
schema 1, beleidsversie, twee categorieën, keuze- en vervaltijd; maximaal 180 dagen.
Verkeerde versie, verlopen/toekomstige of ongeldige opslag geeft geen toestemming.
Geblokkeerde opslag werkt alleen in geheugen en wordt in voorkeuren gemeld.
Andere tabs, paginahervatting en verval worden verwerkt.

Zonder provider verschijnt geen toestemmingsbanner voor toekomstige tracking.
De blijvende footerknop opent een eerlijk venster: statistieken staan uit. De
volledige Accept/Reject/Preferences-flow is gebouwd en met een lokale fictieve
provider getest. Accepteren en Weigeren hebben dezelfde knopstijl. Er is geen
vooraf aangevinkt analyticsvakje. Intrekken stopt nieuwe metingen en roept
provider-stop/cleanup aan; al verstuurde gegevens worden niet als gewist voorgesteld.

## C. Event taxonomy

| Event | Betekenis / toegestane extra data |
|---|---|
| `primary_cta_click` | Primaire CTA; vaste locatie en bestemming |
| `secondary_cta_click` | Bestaande secundaire project-/prijs-CTA; vaste locatie en bestemming |
| `project_view` | Klik naar demo; `kelmora`, `velune` of `avren` en locatie. Geen bewijs van geladen demo |
| `calculator_start` | Eerste calculatorinteractie in het actieve meetvenster |
| `calculator_complete` | Indicatie meenemen naar contact; uitsluitend paginagroottecategorie |
| `contact_start` | Eerste focus in een zichtbaar aanvraagveld |
| `generate_lead` | Alleen bevestigde applicatie-/serverresponse van formulier |
| `phone_click` | Alleen locatie; voorbereid, geen huidige tel-link om live te emitten |
| `email_click` | Alleen locatie; geen e-mailadres |

Alle payloads bevatten daarnaast alleen `page: home | approach | contact`.
`website_check_start`, `website_check_complete` en `whatsapp_click` zijn gereserveerd
en worden door de runtime geweigerd. Geen nieuwe micro-events, automatische
pageviews of metingen binnen de demo's.

## D. Analytics adapter design

`LKAnalytics.track(name, safeProperties)` valideert exacte eventnamen en toegestane
categorische velden. De adapter initialiseert een provider maximaal eenmaal per
toestemmingsperiode/document; er is geen queue of replay van gemiste events.
Initialisatie heeft een deadline van drie seconden. Abort/late cleanup, sync
exceptions en promise-rejections zijn afgevangen. Navigation/formulierlogica
wacht niet op analytics.

Eén gedelegeerde CTA-listener vervangt de oude lokale klik-emitter. Bestaande
calculatorhooks blijven behouden. `contact.js` voegt uitsluitend na HTTP-succes
én `ok === true` een lokale oplopende receipt toe. Alleen deze applicatiehook kan
een lead aanbieden; generieke `track('generate_lead')` wordt geweigerd. De receipt
wordt niet doorgestuurd. Bestaande sending-/identieke-inzendingguards blijven intact.

## E. Provider status

`enabled: false`, `provider: null`, `policy: lk-analytics-v1-unconfigured`.
Geen account, ID, secret, remote script of productie-endpoint is verzonnen.
Testverkeer gaat uitsluitend naar een exact onderschepte lokale fixture; het
activeert geen echte meetdienst. Externe activering vereist een apart ownerbesluit,
providerimplementatie/review en een nieuwe beleidsversie.

## F. PII / data minimization

Geen namen, e-mailadressen, telefoonnummers, berichten, formulierpayloads,
linkadressen, queryparameters, fragments of ruwe referrers in analyticspayloads.
Ook exacte prijzen en combinaties van calculatoropties worden niet verzonden.
De adapter bouwt het payload opnieuw uit gevalideerde waarden. Onbekende keys,
symbolen, accessors/getters, objectwaarden en niet-string-eventnamen worden geweigerd.
Een negatieve test voor typeconversie van de eventnaam faalde vóór de gerichte
typecheck en slaagde daarna. Dit is een privacygrens; geen score- of testaanpassing.

Een externe provider ontvangt onvermijdelijk transportmetadata volgens zijn
implementatie. De allowlist is geen garantie dat een toekomstige SDK automatisch
anoniem of compliant is. Autocapture, URL/referrercollectie, IP-bewaring en doorgifte
moeten provider-specifiek worden beoordeeld. De providerinterface is geen sandbox.

## G. Consent tests

De 14 nieuwe browsergevallen (zeven scenario's, desktop en mobiel) controleren:
eerste bezoek; accepteren; weigeren; voorkeuren; intrekken; reload; cross-tab;
versiewissel; verval; kapotte/geblokkeerde opslag; geen optionele initialisatie
vóór keuze; noodzakelijke calculator/navigatie zonder toestemming; provideruitval.
Er zijn aanvullende unitgevallen voor asynchrone init/withdrawal-races en dubbele
scriptuitvoering. Geen retry of verborgen eventqueue bij falen.

## H. Event tests

Werkelijke CTA-, project-, mailto-, calculator- en contactinteracties zijn getest.
Demo-/mailto-navigatie is in die tests geannuleerd na de echte klik; frozen demo's
worden niet opnieuw uitgevoerd. Telefoonmeting is alleen op adaptercontractniveau
getest omdat geen tel-link aanwezig is.

Formulier: HTTP 500, HTTP 200 met `ok:false` en ongeldige JSON geven nul leads;
bevestigd gemockt succes geeft precies één. Dubbelklik maakt één verzendpoging.
Dubbele receipt, identieke herinzending en reload/back replay geven geen extra
lead. Geen fake data is als echte Formspree-aflevering voorgesteld.

De formuliertransportstub volgt de bestaande failure-state-testconventie. Een
eerste HTTP-routefixture veroorzaakte browsergegenereerde 500-consolemeldingen;
die mislukte run blijft bewaard. De console-/netwerkguard is niet afgezwakt en
er is geen foutmelding gefilterd. HTTP/body-semantiek blijft expliciet getest.

## I. Network-proof results

Vóór toestemming en na weigering: nul optionele fixture-requests en nul provider-
initialisaties. Na toestemming: uitsluitend de bedoelde lokale event-POSTs naar
`/__qa_analytics`, onderschept vóór netwerkaflevering. De fixture gebruikt geen
credentials en geen referrer. Intrekking verhindert volgende events en abort
is ook tijdens asynchrone initialisatie getest.

De functionele suite bewaart per testcase `network-and-console`-attachments.
Onbekende origins/writes blijven fouten; Formspree wordt gemockt/geblokkeerd.
Google Fonts worden in browser-QA met bestaande fixtures geleverd. Lighthouse
gebruikt alleen de bestaande toegestane read-origins. Geen echte formulierinzending.

## J. Accessibility results

Getest: keyboard/Tab/Shift+Tab/Escape, focusopener, checkboxlabel, gelijke keuzes,
native dialogmodaliteit, 320/390/768/1440 px, 200% tekstvergroting bij 320×480,
geen horizontale overflow en reduced-motion. De nieuwe UI heeft geen animaties.

Drie tijdens P4 gevonden problemen zijn gericht opgelost: de zwevende assistent
kan de footerknop niet meer bedekken; bannerreserveruimte houdt de footer bereikbaar;
vergrote tekst/knoppen kunnen in het venster wrappen. Een extra handmatige check
vond focus buiten beeld na de initiële keuze (footer op y≈4492 bij viewport 844).
Nu gaat focus in dat geval naar de hoofdinhoud. Sluiten vanuit de footer geeft
focus terug aan de footerknop. De nieuwe assertions testen ook zichtbaarheid.

Axe meldt geen overtredingen in de relevante scans, maar heeft incomplete checks;
die zijn geen automatisch PASS. In de nieuwe dialoog kon Axe bij enkele teksten
de overlappende achtergrond niet bepalen. Berekende contrasten uit de werkelijke
stijlen: hoofdtekst 16,35:1, gedempte tekst 6,83:1, focusgroen 6,49:1 tegen papier.
De bijbehorende beelden zijn bekeken. Een aparte screenreader-/Safari-/Firefox-
certificatie of volledige WCAG-conformiteitsclaim wordt niet gedaan.

## K. Performance before / after

P3-referentie: Home 100 desktop / 99 mobiel; Aanpak 100 / 99; Contact 100 / 99.
Het gaat om lokale labmetingen, geen veld-INP of productiegarantie. Onderstaande
metingen hebben exact de bron/config/baseline-snapshot uit N. Volgorde scores:
Performance / Accessibility / Best Practices / SEO.

| Pagina/mode | P4-scores | FCP ms | LCP ms | TBT ms | CLS | Run |
|---|---|---:|---:|---:|---:|---|
| Home desktop | 100 / 100 / 100 / 100 | 390 | 543 | 0 | 0,00082 | `lk-final-EQGauj` |
| Home mobiel | 99 / 100 / 100 / 100 | 1382 | 1824 | 0 | 0,00049 | dezelfde |
| Aanpak desktop | 100 / 100 / 100 / 100 | 432 | 432 | 0 | 0,02720 | `lk-lighthouse-JaNVWy` |
| Aanpak mobiel 1 | 94 / 100 / 100 / 100 | 2444 | 2519 | 0 | 0,00238 | dezelfde |
| Aanpak mobiel 2 | 99 / 100 / 100 / 100 | 1539 | 1855 | 0 | 0,00475 | `lk-lighthouse-t9KdY3` |
| Aanpak mobiel 3 | 99 / 100 / 100 / 100 | 1536 | 1782 | 0,5 | 0,00238 | `lk-lighthouse-TbEdBm` |
| Contact desktop | 100 / 100 / 100 / 100 | 393 | 400 | 0 | 0,02791 | `lk-lighthouse-M9GrLo` |
| Contact mobiel | 99 / 100 / 100 / 100 | 1383 | 1779 | 0 | 0,00070 | dezelfde |

Aanpak mobiele vaste reeks: mediaan score 99, spreiding 94–99; mediaan LCP 1855 ms,
spreiding 1782–2519 ms. Er is tussen deze drie metingen niets gewijzigd. Alle
bestaande targets 90/95/95/95 zijn gehaald; de lagere 94 blijft een gemeten resultaat.
De exacte oorzaak van de trage run is niet bewezen. Er is geen reproduceerbare
scoreterugval in de herhalingen aangetoond, maar wel meetbare overhead: finale
Home-LCP +149 ms, Aanpak-mediaan circa +220 ms en Contact +225 ms tegenover P3.
Dat is geen nul-impactclaim. De gangbare metingen blijven onder 2 seconden mobiele
lab-LCP; de tragere meting valt erbuiten en is niet weggelaten.

Eerdere P4-snapshots blijven expliciet historisch: Home `lk-final-fN5h7o` 100/99,
`lk-final-IAfugp` 100/94; Aanpak `lk-lighthouse-nsG97j` 100/99; Contact
`lk-lighthouse-SsrexT` 100/93, gevolgd door mobiele 99 en 99 in
`lk-lighthouse-5q4lPe` / `lk-lighthouse-X8UKGA` (dezelfde toenmalige snapshot,
mediaan 99, spreiding 93–99). Geen performancefix is uit die variatie verzonnen.
De latere focus-/inputvalidatiecorrecties worden niet als snelheidswinst voorgesteld.

De implementatie voegt vier lokale assets toe, circa 16,6 kB ongecomprimeerd,
circa 6 kB gzip-equivalent; dit laatste bewijst geen productiecompressie. Geen
extern analytics-script vóór toestemming. In eerdere vergelijkbare P4-metingen
was de mobiele LCP ongeveer 150–230 ms hoger dan P3; geen claim van nul overhead.
Alle meetresultaten blijven behouden, ook de lagere contactscore 93 en homescore
94. Targets, throttling en thresholds zijn niet gewijzigd. Een echte provider
moet vóór activering apart opnieuw op performance worden beoordeeld.

## L. Visual review

Het bestaande overzicht met onbewerkte oud/nieuw/diff, exacte namen en hashes:
[P4 visuele review](test-results/qa-runs/lk-final-fN5h7o/p4-visual-review.html).
De hash-/maatvergelijking staat ernaast in `p4-visual-review.json`.

| Viewport | Exacte referentiebestanden die afwijken | Beoordeling |
|---|---|---|
| mobile-small | `lk-footer.png`, `lk-full-page.png` | Bedoeld, nog niet geaccepteerd |
| mobile-standard | `lk-footer.png`, `lk-full-page.png` | Bedoeld, nog niet geaccepteerd |
| tablet | `lk-footer.png`, `lk-full-page.png` | Bedoeld, nog niet geaccepteerd |
| desktop | `lk-footer.png`, `lk-full-page.png` | Bedoeld, nog niet geaccepteerd |
| large-desktop | `lk-footer.png`, `lk-full-page.png` | Bedoeld, nog niet geaccepteerd |

Dit zijn uitsluitend tien paden onder `tests/visual/baselines/<viewport>/`.
De footer bevat Privacyvoorkeuren en wordt 20 px hoger. Op mobiel wijkt de floating
assistent voor de privacyknop; de vaste assistent-footerlink blijft staan. Op
desktop/tablet verschuift zijn positie binnen de langere footercapture. Pixelanalyse
van alle vijf totaalbeelden lokaliseert de veranderingen onderaan in de footer.
Hero, header, portfolio, prijzen en contact blijven gelijk: 25 van 35 vergelijkingen.

Nieuwe banner-/voorkeurenbeelden op 320/390/768/1440 zijn werkelijk bekeken;
de echte providerloze staat op 320/390/1440 eveneens. Geen clipping of onverwachte
layoutfout gevonden na de fixes. Deze aanvullende captures zijn geen automatisch
toegevoegde baselines. De expliciete menselijke beslissing blijft **niet accepteren**.
Daarom blijft de regressiecheck rood; 35/35 wordt niet geclaimd.

## M. Files changed

Ten opzichte van het P4-startcheckpoint, niet ten opzichte van de veel oudere Git-HEAD:

| Bestaand bestand | P4-wijziging |
|---|---|
| `docs/index.html`, `docs/aanpak.html`, `docs/contact.html` | Lokale assets en blijvende footerknop |
| `docs/script.js` | Klikhook verplaatst naar de enige adapterlistener |
| `docs/contact.js` | Lokale receipt na bevestigde response |
| `docs/assistant.js` | Bestaande overlapcontrole omvat ook footerbuttons |
| `package.json` | Nieuwe adapter-unitgevallen toegevoegd aan bestaande testcommand |
| `scripts/qa-projects.json` | Alleen LK krijgt de nieuwe consenttests |

Nieuw: `docs/measurement-config.js`, `docs/consent.js`, `docs/consent.css`,
`docs/analytics.js`, `scripts/analytics.test.cjs`, `tests/e2e/lk-consent.spec.cjs`,
`LK-CONSENT-MEASUREMENT.md`, dit rapport. Totaal: acht bestaande en acht nieuwe
repositorybestanden. Evidence/captures/checkpoint staan onder genegeerd `test-results/`.

## N. Regression results

| Controle | Actueel resultaat / bewijs |
|---|---|
| `npm run qa:final -- --site lk --run` | `lk-final-EQGauj`; exit 1 uitsluitend wegens de bestaande tien P4-visualdiffs |
| Functioneel | 78 PASS, 0 FAIL, 0 flaky, 2 bestaande N/A-skips; `functional.json` |
| Nieuwe consent/eventbrowsergevallen | 14/14 PASS, opgenomen in de 78; geen losse optelling |
| `npm run qa:unit` | 39/39 PASS, 0 skips; bestaande 32 plus zeven nieuwe adaptergevallen |
| Axe | 95 canonieke scans over functional/axe; 0 violations |
| Visuele vergelijking | 25/35 exacte overeenkomsten; 10 bedoelde maar niet geaccepteerde verschillen. De runner meldt daardoor vijf falende viewporttests |
| HTML / JavaScript / toolinglint | 0 errors, 0 warnings |
| CSS | 0 errors, 85 bestaande warnings |
| Links / foundation | 0 errors; respectievelijk 55 en vier INFO |
| Netwerk / console | 80 functionele attachments; 2.132 guardrecords; 0 rejects, 0 consoleerrors |
| `git diff --check` | Schoon |

De twee skips zijn de bestaande desktop-N/A-tests voor mobiele menunavigatie en
mobiele overflow; de mobiele varianten zijn uitgevoerd. De oorspronkelijke 64
functionele PASS zijn behouden en de 14 nieuwe consentgevallen zijn toegevoegd.
P2-contracttests en bestaande guard/freeze-tests blijven in de 39 unitgevallen.

De 95 Axe-scans bevatten ook incomplete beoordelingen: `color-contrast` in 81
scans, `aria-valid-attr-value` in 43, `hidden-content` in drie en
`css-orientation-lock` in drie. Dit zijn aantallen scans waarin een reviewtype
voorkomt, geen unieke zichtbare productiefouten. De nieuwe contrastgevallen zijn
onder J geduid; bestaande beperkingen zijn niet als nieuwe PASS weggepoetst.

De eindrun bevat 91 PASS-evidence-entries, twee SKIP en 40 FAIL-entries. Die 40
zijn de vijf gefaalde viewportrecords plus hun 35 capture-records: de bestaande
aggregator markeert alle captures van een falende viewport conservatief FAIL.
Dit is **niet** hetzelfde als 40 of 35 verschillende gewijzigde beelden. De
afzonderlijke hashvergelijking toont exact 25 gelijk en 10 afwijkend. Alle
evidence-artifacthashes zijn gecontroleerd; de 91 PASS-entries zijn aanvullend
met de bestaande `reuseEvidence`-validatie tegen de huidige snapshot gevalideerd.
De technische gate blijft INCOMPLETE; metadata is niet herschreven naar PASS.

| Snapshotonderdeel | SHA-256 |
|---|---|
| Source | `581aa7de12efb63e8308792c3eafa6ebd54b1e1f45934793b9fe5055b1d8c326` |
| Configuration | `18cf1a02964b584f27cdb11032e2b370d8b2e7229d3faa5110f58dd7ee296e21` |
| LK-baselines | `8639c5319ed3e6405df2d431175328f8a1f8157f8283ab541ab7232589fdd563` — ongewijzigd sinds goedgekeurd P3 |

Bewijs: `test-results/qa-runs/lk-final-EQGauj/record.json`, `evidence.json`,
`p4-verification.json`, `p4-network-summary.json`. De 35 eindcaptures zijn bytegelijk
aan de beelden uit het reeds geopende reviewoverzicht `lk-final-fN5h7o`. Voor
aanvullende providerloze beelden/contrast: `lk-inspection-c0RqGm`; voor de vóór
herstel aangetoonde focusfout: `lk-inspection-9jWhVs/inspection/focus.json`.

Mislukte ontwikkelruns zijn behouden: `lk-functional-pjcbu0` (11/14: transportfixture
en assistentoverlap), `lk-functional-oTRp2n` (12/14: banner/footeroverlap),
`lk-functional-Il7cox` (12/14: 200%-reflow). `lk-functional-CrZn3p` werd daarna
14/14. Een eerste toolingcontrole `lk-light-8CkI8B` vond twee ontbrekende globale
Storage-verwijzingen in de nieuwe test; opgelost met expliciet `window.Storage`.
De latere focus-/niet-string-eventnaamcorrecties zijn in de eindrun opnieuw
getest. De gerichte coercion-unitreproductie was vóór herstel 6 PASS / 1 FAIL;
de finale volledige set is 39/39. De twee eerdere finalruns `lk-final-fN5h7o` en
`lk-final-IAfugp` blijven als eerdere snapshots bestaan; geen actuele PASS daarvan
geleend zonder impact-/snapshotcontrole.

De bestaande 85 CSS-waarschuwingen blijven zichtbaar: 73 in `docs/style.css`,
12 in `docs/final.css`. P4-consent-CSS voegt geen warnings toe. Beide bestaande
bestanden zijn bytegelijk aan P4-start. `style.css` is legacy voor de huidige
lokale Master/P3-routes, maar production-relevant volgens het P3-livebewijs dat
de huidige live homepage `/style.css` laadt; **geen dead-codeclassificatie**.
De 24 duplicate selectors blijven afzonderlijke maintenance debt zonder bewezen
zichtbare productiefout. De aard van de 12 `final.css`-meldingen blijft zoals
onderbouwd in P3; geen wijziging om een warningcount te verlagen.

Links: 55 bestaande INFO-meldingen; foundation: drie publication-pending plus één
ontbrekend-projectbudget INFO. Geen verzonnen nul of 100 voor ontbrekende data.
De Node-melding over NO_COLOR/FORCE_COLOR is een runneromgevingsmelding, geen
browser-/websitefout. Er zijn geen baselines, guards of thresholds versoepeld.

## O. Privacy / legal owner items

Vóór publicatie: noodzakelijke-opslagclassificatie en 180-dagentermijn bevestigen;
publieke privacy-informatie afronden. Vóór analyticsactivering: provider/account,
doel, data, bewaartermijn, ontvangers/doorgifte en DPA controleren, beschrijving en
beleidsversie instellen en de echte SDK/transport testen. Google Fonts/Formspree
blijven deel van de bestaande bredere privacyreview.

De [Belgische GBA](https://www.gegevensbeschermingsautoriteit.be/professioneel/thema-s/cookies)
behandelt ook vergelijkbare opslagtechnieken en duidelijke informatie/keuze.
Dit werk maakt geen juridische compliancegarantie. Er is geen privacytekst over
een niet-bestaande provider of bewaartermijn van analytics verzonnen.

## P. Risks / limitations

1. Tien bedoelde visual diffs zijn niet goedgekeurd; P4 blijft INCOMPLETE.
2. Echte provider, opslagcleanup, aflevergaranties, blockers en transportmetadata
   zijn alleen via een adaptercontract/fixture voorbereid, niet live gevalideerd.
3. Client-side lead-deduplicatie is geen server-side exactly-once, botcontrole,
   bewezen mailaflevering of omzetregistratie. Geen replay betekent bewust gemiste
   events tijdens weigering, laden of uitval.
4. Chromium/lokale tests en Axe vervangen geen alle-browser-/screenreaderreview
   of productievelddata. Lagere labmetingen zijn bewaard en niet weggefilterd.
5. LOCAL ↔ PREVIEW ↔ PRODUCTION parity is niet bewezen en blijft verplichte
   launchgate voor HTML, CSS/JS, canonical/SEO, forms, consent/tracking, redirects,
   securityheaders en deploymentversie. Geen productieconfiguratie veranderd.

## Q. Recommended P5 scope

Pas na expliciete GO P5: het reeds geplande Website Check-backendcontract en
securitymodel buiten `docs/`; runtime/provider/budget/retentie bepalen; SSRF,
DNS-/redirect-/IP-grenzen, timeout/size/rate/concurrency/cost-limits, secrets en
foutcontracten met gecontroleerde targets bewijzen. Geen publieke scanner of
nep-live scan. P5, Care-monitoring, Prospect Engine, dashboard en portalen zijn
in P4 niet gebouwd of gestart.

## R. Rollback / checkpoint

Branch blijft `prelaunch-checkpoint-2026-09-27`; HEAD blijft
`74fea4993282d70e76fc986cc07da2a9794beb98`. Geen commit, push, deployment, DNS,
mailinstelling, prijswijziging, demo-aanpassing of externe betaalde actie.

Vóór P4 is een SHA-256-manifest van 333 bestaande repositorybestanden plus
tekstkopieën/status/HEAD gemaakt. Het tijdelijke origineel staat onder
`/var/folders/7t/dkpmylsn79v_c6d46n4qbjwm0000gn/T/lk-p4-checkpoint-97xwwygw`.
Een lokale blijvende kopie van manifest/status/HEAD en de acht geraakte bestaande
bestanden staat in
`test-results/qa-runs/lk-final-fN5h7o/p4-start-checkpoint/`.

Rollback is gericht: vergelijk met dit checkpoint en herstel uitsluitend de acht
P4-delta's; verwijder alleen de acht nieuw toegevoegde P4-bestanden indien rollback
expliciet gevraagd wordt. Eerst controleren op later user work. Geen brede Git-reset,
stash of terugkeer naar HEAD, want die zou eerder goedgekeurd P1/P2/P3-werk wissen.
Deze lokale kopie is geen externe Git-backup. Van 224 expliciet beschermde bestanden
(onder meer alle baselines, demo's, skills, contracten, commerciële bron,
netwerkguards en lockfile) is de hash vergeleken met P4-start: nul gewijzigd.
Bewijs: `lk-final-EQGauj/p4-scope-verification.json`. Alle eerdere rapporten en
goedgekeurde P1/P2/P3-delta's zijn behouden.

**STOP na P4. Geen GO P5 afgeleid uit deze implementatie of testresultaten.**

</details>
