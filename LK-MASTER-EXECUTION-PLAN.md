# LK Master Launch — pre-execution gate en master execution plan

Datum: 28 september 2026. **PRE-EXECUTION REVIEW COMPLETE — WAITING FOR OWNER GO.** Uitsluitend inspectie, bewijsbeoordeling en planning. Geen implementatie of algemene launch-PASS. Eén masterplan voor de drie ontvangen delen van Definitive Codex Execution Specification v1.0.

## A. Specification integrity check

### A1. Ontvangst, samenvoeging en versie

| Deel | Bronattachment | Inhoud | SHA-256 van ontvangen bytes |
|---|---|---|---|
| 1 | `55e5923c-e41a-4976-ae3c-77cbf7d1ccef/Geplakte tekst.txt` | §§0–25, §25 loopt door | `1f925c36cae6029c841702b7d5e6cc24e62ee5a9fbb4ca375e59f47d5f7de7b3` |
| 2 / opschrift PART 2A | `6727a2a4-15f2-412f-8a7b-23aee9150019/Geplakte tekst.txt` | Slot §25, §§26–54 | `3cb9a869e2bff2aa061a56ad143a7e740566077b755cf004d73bf54f6daa7153` |
| 3 / opschrift PART 2B | `7a7b4122-7d40-42bd-a067-bdf3e58bf77c/Geplakte tekst.txt` | Slot §54, §§55–94 | `0983c8663cc33c918e8b96bb3b227bdcb11c0822b5a617e9bd99b231fe350fd3` |

Samengevoegd beoordeeld als **95 secties, genummerd 0–94; geen ontbrekende of dubbele sectienummers**. Het losse streepje na §25 krijgt zijn lijstvervolg in deel 2. Het fragment `IMPRO` in §54 wordt aangevuld door `IMPROVE COMPONENTS / DEFAULTS` in deel 3. §94 eindigt met een inhoudelijk volledige zin over correcte recurringrapportage, zonder eindmarker. Op basis van de expliciete ownerbevestiging zijn dit alle drie delen; geen extra §95 of ongeziene finale opdracht verondersteld. De eerdere niet-definitieve, afgebroken masterbijlage is geen vierde normatieve bron.

De laatste useropdracht beperkt uitvoering nu tot A–F en verlangt daarna GO. Alle opdrachten tot bouwen, commitcheckpoints of publiceren binnen de master zijn dus doelvereisten voor latere fases, geen acties tijdens deze gate.

### A2. Conflicten en dubbelingen

| ID | Bevinding | Verwerking in dit plan |
|---|---|---|
| I01 | §§15/19 noemen EXCLUDING 21% VAT; Commercial Lock 27-09 kiest B2B/B2C met incl. primair/excl. secundair | Netto ankers zijn gelijk. Of “excluding” alleen de nettobasis beschrijft of de presentatie vervangt is onbeslist. Huidige weergave behouden; ownerbesluit vóór prijs-/calculatorcopy. Geen nieuwe bedragen |
| I02 | §14 vraagt finale review van Kelmora; registry heeft `frozen:true` | Historische/source-review nu toegestaan; geen nieuwe runtimecheck of edit. Voor nieuwe review expliciete, beperkte heropening via bestaand proces; guard niet omzeilen |
| I03 | §15 vraagt één commerciële bron; die bestaat al | `docs/commercial.js` behouden met bestaande HTML-fallbackgenerator. Geen tweede dashboardprijstabel die ongemerkt afwijkt |
| I04 | §19 vraagt slimme calculator; omvang/complexiteit/functies/maatwerk bestaan | Behoud implementatie; ontbrekende bereikbare opties en handoff toetsen, geen vervanging |
| I05 | §5 verbiedt misleidende mocks; repo verbiedt live Formspree-QA | Geen conflict als expliciet gelabeld: mocks bewijzen lokaal gedrag; aparte ownergeautoriseerde productiebezorgtest bewijst aflevering |
| I06 | §35 noemt full regression na verbeteringen; Standard kiest impact en geldig bewijs | Totale relevante dekking behouden door gerichte retests plus valide restbewijs. Niet elk tekstedit met alle sites hertesten; stale bewijs nooit als PASS gebruiken |
| I07 | §§83/86 streven naar 100/0 violations; registry heeft lagere bestaande targets | Geen targets verlagen of blind verhogen. Optimalisatie met bewijs; resterende beperkingen zichtbaar. Meerdere labruns bij performancevalidatie, geen beste run uitkiezen |
| I08 | §4 noemt logische commits; bestaande regels verbieden automatische commits/push | GO voor codefase is geen Git-/releaseautorisatie. Vooraf lokale herstelbare checkpointmethode; commit/push afzonderlijk |
| I09 | §§20–22 willen engines; eerdere architectuur stelde brede automatisering uit | Nu concrete v1-contracten en bewezen hergebruik plannen; geen universeel framework, massaprovisioning of klantportal. Master is nieuwe richting, huidige gate blijft alleen planning |
| I10 | §49 vraagt dashboard; §§45–48 zijn grotendeels expliciet toekomstig | Klein intern dashboard is v1-deliverable, geen publieke backend/SaaS. Bouwen vóór afsluiting Master v1; operationeel uiterlijk vóór echte klantadministratie. Cloudsync/portal later |
| I11 | §§30–37 vragen Website Check maar staan interface/contracts/mocks toe als live backend onveilig/onbeschikbaar is | Veilige live v1 is de doelroute. Development-only contract is een toegestane tussenstaat, geen live feature. Lanceren zonder scanner vereist expliciete aangepaste release-scope |
| I12 | Homepageconcept bevat veel onderdelen, maar §§1/7/72 eisen compactheid | Geen verplichte extra sectie per requirement. Behoud huidige kernstructuur; Check als beknopte ingang naar eigen ervaring. Geen extra dunne Over/Projecten-pagina’s zonder reden |

Dubbele requirements worden één keer geïmplementeerd met meerdere verwijzingen: prijs/calculator/handoff (§§15/19/66/67); Hosting/Care/MRR (§§16/17/45/46/94); QA-loop/evidence (§§5/6/22–24/33–35/73–89); metadata/schema/AI-basis (§§25–28/71); consent/events (§§40–42/54/65/70); compacte UX (§§1/7–11/60–64/72). Geen dubbele modules, eventzenders of bewijsregisters.

## B. Repository baseline

Volledig dossier: [LK-MASTER-BASELINE-REPORT.md](LK-MASTER-BASELINE-REPORT.md). Dit is een complete repository-inventaris voor planning, geen volledige actuele browser-/productiecertificering.

- Branch `prelaunch-checkpoint-2026-09-27`, HEAD `74fea4993282d70e76fc986cc07da2a9794beb98`; bestaand ongecommit documentatiewerk behouden.
- Vanilla HTML/CSS/JS, drie actuele LK-kernpagina’s plus drie zelfstandige demo’s; geen backend, frameworkmigratie of serverlessconfig aangetroffen.
- Centrale prijsbron, gewogen calculator, lokale assistent, contextoverdracht, robuust contactformulier en lokale eventhooks bestaan.
- Bestaande registry/runners/evidence, Playwright/Axe/Lighthouse/static/visual en vijf echte LK-skills hergebruiken.
- Huidige toolingcheck: **19/20 PASS, 1 FAIL** door verouderde portfolioselector in fixture. Prijsfallbackcheck geslaagd.
- Historische LK Final: 115 PASS-items + 2 SKIP; Medium: 74 PASS + 2 SKIP. Alle 193 artifactverwijzingen hashgeldig; door snapshotverschillen **0 automatisch herbruikbaar als actuele PASS**.
- Historische LK-labperformance desktop 100/mobile 99; geen actuele productie-/veldclaim. 85 CSS-warnings blijven zichtbaar.
- Read-only npm-audit: nul gemelde bekende kwetsbaarheden voor het lockfile; beperkte credentialpatronen in tracked tekst: nul treffers. Geen pentest of volledige veiligheidsverklaring.
- Geen actuele analyticsverzameling, Website Check, intern dashboard of zelfstandig geversioneerde Website Engine aangetroffen. Hosting/Care-processen zijn ontworpen, niet bewezen ingericht.

De baseline beschrijft ontbrekende actuele runtime-/veld-/account-/human-reviewdekking expliciet. Een onbekende status wordt geen productdefect of 100-score genoemd. Nieuwe finale visual review volgt later, met freezebesluit voor Kelmora.

## C. Gap analysis en traceability

| Mastersecties | Systeem | Klasse | Gap / uitkomst | Fase |
|---|---|---|---|---|
| 0–8 | Positionering, preservation, scope, kwaliteit | KEEP | Bestaande compacte site/Standard behouden; gatebeleid expliciet | P0/P9 |
| 9–11, 60–64 | Hero, responsive, interactie/copy/trust | IMPROVE | Gevraagde calculator-CTA wijkt af; nieuwe states gericht reviewen, geen homepageverlenging als default | P3/P9 |
| 12–14 | Portfolio/demo’s | KEEP | Demo’s gelabeld; nieuwe eindreview geen rewrite; Kelmora freeze open | P9 |
| 15–19, 66, 94 | Prijzen, calculator, Care | KEEP | Canonieke bron bestaat; I01 oplossen; geen dubbel Hosting/Care; opties/handoff behouden | P0/P3/P7 |
| 20 | Website Engine | IMPROVE | Herbruikbare bron/QA bestaat; versie-/klantcontract en minimale extractie ontbreken | P2 |
| 21, 54, 59 | Conversion library/tokens/leren | REFACTOR | Alleen aangetoonde herhaling canoniseren; visuele identiteit vrij; voorkeurspatronen pas op echt bewijs | P2/P3, leren later |
| 22–24, 33–35, 77–81 | Audit Engine/diagnose | IMPROVE | Findings/gates bestaan; provenance, severity/confidence/next verification uniformeren, geen nieuwe testrunner | P1/P2 |
| 25–28, 71–72 | SEO/schema/AI-basis/content | IMPROVE | Metadata aanwezig; volledige semantiek/crawl/404/bedrijfscorrectheid en eerlijke AI-basis nog afronden | P3/P8/P9 |
| 29, 36, 75 | Security/scanner | MISSING | Publieke scannerboundary/abuse-controls ontbreken; bestaande frontend afzonderlijk reviewen | P5/P6/P9 |
| 30–32, 37, 65, 67–70 | Website Check, UI, API, handoff | MISSING | Veilige live scan, echte resultaten, partiële/foutstates en contextreferentie ontbreken | P5/P6 |
| 38–39, 45–48, 53 | Monitoring, before/after, Care/portal/prospect/review | IMPROVE | Architectuur bestaat gedeeltelijk; contracten/vergelijkbaarheid voorbereiden, platforms niet bouwen | P2/P8, later |
| 40–42, 54 | Analytics, consent, klant-events | IMPROVE | Lokale events aanwezig; taxonomy, provider, consent, deduplicatie en verwerking niet operationeel | P4 |
| 43–44, 74 | Contact/Formspree | KEEP | Behoud bewezen flow; scannercontext en analytics uitsluitend additief testen | P4/P6 |
| 49–52, 92–94 | Intern financieel dashboard | MISSING | Datamodel bestaat in revenue-architectuur; minimale veilige werkende managementtool ontbreekt | P7 |
| 55–58 | Performance/assets/fonts/JS | IMPROVE | Afmetingen/srcset/lazy/high-priority bestaan; transferbudgetten nog niet gebaseerd op actuele meting | P3/P9 |
| 73–74, 85–86 | Handmatige a11y/axe/flows | IMPROVE | Veel tests aanwezig, helpers verschillen in WCAG-tags; 2.2/manualdekking per state afmaken | P1/P3–P6/P9 |
| 82–84 | Visuals/lab/field | KEEP | Bestaande infrastructuur intact; actuele finale dekking en herhaalde labmetingen nodig; velddata kan ontbreken | P9 |
| 87–90 | Console/network/links/omgeving/deploy | IMPROVE | Guards aanwezig; prodheaders/cache/404/backend/consent apart bewijzen; deployment niet nu | P8–P10 |
| 91 | Business/legal | IMPROVE | Bestaande checklist behouden; echte identiteit, fiscale/privacy-/contract-/facturatieinput ontbreekt | P0/P8/P9 |

**REPLACE: geen geselecteerd. REMOVE: geen geselecteerd.** Legacybestanden en duplicatie eerst op echte afhankelijkheden toetsen. Er is geen reden om Kelmora, AVREN, de QA-foundation of de LK-skills opnieuw te bouwen.

### C1. Wat vóór de beoogde Master Launch gereed moet zijn

1. Betrouwbare huidige toolingbaseline, scope/btw-besluit en actueel relevant QA-bewijs.
2. Compacte site met duidelijke primaire actie, intacte demo’s, calculator/contact, juiste metadata/404/redirects en geverifieerde bedrijfs-/privacycopy.
3. Consent-first conversiemeting van werkelijk aanwezige acties, met correct succesmoment en tests. Geen events toevoegen voor een niet-bestaande WhatsApp-/telefoonknop.
4. Kleine Website/Audit Engine v1: contracten/versie en herbruikbare engineering bovenop bestaande foundation; geen platformmigratie. Testbare findings en bewijsniveaus, géén verplicht totaalscoreproduct.
5. Website Check: voor de volledige beoogde release veilige werkende scanroute plus states/handoff. Als alleen developmentcontracten haalbaar zijn: zichtbaar INCOMPLETE; owner beslist expliciet over een kleinere launch zonder publieke scanner.
6. Minimaal intern managementdashboard met fictieve testdata, veilige opslaglocatie en bewezen berekeningen; geen echte klantgegevens tijdens bouw. Geen koppeling aan de publieke deploy.
7. Uitvoerbare Hosting/Care-processen voor alles wat publiek wordt beloofd, inclusief onafhankelijke recovery, monitoring, capaciteit en exit. Anders expliciet aangepast aanbod/releasebesluit, niet stilzwijgend marketing laten vooruitlopen.
8. Technische gate, menselijke inhoud/visual-goedkeuring en apart productieakkoord voor de exacte release.

### C2. Alleen architectonisch voorbereiden, later bouwen

Client portal/auth/tenantplatform; automatische periodieke audits en klantreports; brede before/afterpublicatie; prospecting/outreachworkflow; reputatiecollectie; Peppol/boekhoudsync; cloudmultiplayerdashboard; massale engine-upgrades; resellersysteem; volledige CMS/mailmigratiediensten. Contracten nu voorzien, geen operationele claims. Een LK-totaalscore is optioneel; voor v1 voorkeur voor losse evidencecategorieën om misleidende precisie te voorkomen.

## D. Master execution plan

### D0. Volgorde, scope en checkpointregel

**P0 → P1 → P2 → P3 → P4 → P5 → P6 → P7 → P8 → P9 → P10.** Owner-/providerinput voor P8 kan tijdens eerdere fases worden verzameld; codefases worden niet allemaal tegelijk gestart. Een GO noemt fase en begrensde scope. Automatische overgang naar een fase met nieuwe externe bevoegdheden is niet toegestaan.

Vóór elke schrijffase: status/branch + betrokken files/hashes, bestaande dirty documenten veilig bewaren, eigen wijzigingsscope noteren en herstelbare lokale kopie/patch buiten publieke assets maken. Bij grotere engine/backendproeven na GO een passende bestaande of nieuwe geïsoleerde worktree overwegen; huidige werkstaat niet vergeten. Git-checkpointcommit/push alleen met aparte expliciete toestemming. Geen reset/stash/rebase als opruimactie.

Na elke fase: diff, geraakte tests, bewijs en scope samenvatten. Bij regressie uitsluitend de eigen fasewijziging terugnemen met gecontroleerde patch/herstelkopie; bestaande userwijzigingen behouden. Bij backend/providerwijziging apart reversie-/data-/configplan. Baselines blijven ongewijzigd tenzij owner exacte gereviewde captures accepteert. Eén bron voor bewijs: bestaande qa-runs/registry, geen parallel “groen dashboard” met afwijkende criteria.

### P0 — Besluiten en uitvoeringscontract

- **Doel/afhankelijkheid:** dit plan goedkeuren; btw I01, Kelmora-reviewgrens, v1-scannerroute, analyticsprovider/gegevensbeleid en dashboardlocatie kiezen. Geen alles-in-één toestemming vragen; P1 kan zonder die latere beslissingen.
- **Geraakt:** alleen dit plan/baseline; eventuele latere ownerbesluiten in bestaande canonical docs.
- **Risico:** masterdoel verwarren met account-, prijs- of releaseautorisatie.
- **Controle/acceptatie:** scope, deliverables, eigenaar, kostenplafond en ontbrekende besluiten expliciet; commerciële bedragen ongewijzigd.
- **Checkpoint:** huidige dirty staat behouden.
- **STOP/GO:** nu WAITING FOR GO; GO P1 autoriseert alleen P1. Prijs-, freeze-, provider- en prodmutaties wachten op specifieke toestemming.

### P1 — Toolingbaseline herstellen en bewijsgrenzen vastleggen

- **Doel:** B01 in bestaande `scripts/fixtures/project-reference.json` beoordelen/herstellen naar werkelijk bedoelde portfolioselector; assertion behouden. Geen homepage- of commerciële wijziging.
- **Afhankelijkheid:** GO P1; repository/fixture/DOM-historie bevestigt dat `#projecten` bedoeld is.
- **Geraakt:** fixture, zo nodig gerichte semantische selectorcontrole in `scripts/qa-foundation.test.cjs`, baseline/planbewijs. Geen andere refactor in deze fase.
- **Risico:** testwijziging gebruiken om een productdefect te verhullen.
- **Tests:** `npm run qa:unit`; ongewijzigde prijsfallbackcheck; gerichte portfolio-selector/sourcecheck. Bewaak dat de test nog faalt voor een niet-bestaande/verkeerde referentie. Geen visuele baselineupdate.
- **Acceptatie:** alle toolingtests slagen op juiste semantiek; reden van fixturewijziging gedocumenteerd; website/config-/baseline-inhoud verder gelijk. Dit is geen volledige site-PASS.
- **Rollback/checkpoint:** kopie/hash van betrokken fixture/test, alleen eigen diff terugneembaar.
- **STOP/GO:** STOP bij onverwacht productverschil of testverzwakking; GO P2 pas na fasebewijs en owner-goedgekeurde vervolgscope.

### P2 — Minimale Website/Audit Engine-contracten

- **Doel:** bestaande registry, foundation, evidence en skills als kern behouden; versieerbaar contract voor projectconfig, capabilities, form-/event-/metadata-adapters en typed findings. Start met aantoonbaar herbruikbare modules, geen redesignbibliotheek of tweede runner.
- **Afhankelijkheid:** P1; gekozen grens tussen LK-eigen businesscopy en algemene infrastructuur.
- **Geraakt:** `scripts/qa-evidence.cjs`, `qa-foundation.cjs`, registry/adapters en hun tests uitsluitend bij bewezen gap; documentatie voor engineversie/upgrade/exit. Nieuwe moduleroot pas na bounded ontwerp; geen package/publicatie of nieuw repo automatisch.
- **Risico:** generieke abstrahering breekt bestaande clients of maakt kleine sites afhankelijk van private LK-toegang.
- **Tests:** unitfixtures met ontbrekend/stale/FAIL/SKIP-bewijs, verschillende methodologieën; bestaande guards blijven effectief; gerichte regressie van werkelijk geëxtraheerde module. Fictieve klantinstantiatie lokaal zonder deployment.
- **Acceptatie:** één reproduceerbare findingsvorm met rule/methodology-version, evidence-type, timestamp/bron, state/viewport, severity/confidence, location, recommendation, verification en unavailable-status. Geen ontbrekende score als 100. Gepinde engineversie en exitbuild mogelijk. Eén bron van commerciële bedragen.
- **Loopgrens:** maximaal drie gerichte herstelpogingen per probleem per opdracht als werkafspraak; daarna diagnose/limiet rapporteren. Geen automatische prijs/legal/brand/prodwijziging. Geen magische PASS na een geaccepteerd risico.
- **Checkpoint/STOP:** geïsoleerde modulewijzigingen, bestaande interfaces regressietesten; STOP bij gedeelde regressie of nieuwe afhankelijkheid zonder rechtvaardiging.

### P3 — Compacte website en SEO/a11y-baseline afronden

- **Doel:** kleinste bewezen UX-fixes; primaire heroactie naar bestaande calculator volgens akkoord; compacte ingang voor Check voorbereiden zonder inactieve knop te publiceren. Privacy-/bedrijfsinformatie alleen uit bevestigde input. A11y-helperdekking harmoniseren zonder bestaande checks te verliezen.
- **Afhankelijkheid:** P1/P2; btwbesluit voor prijs-/presentatiecopy, echte bedrijfsinput voor schema/legal. Geen herbouw van sterke Home/demo’s.
- **Geraakt:** `docs/index.html`, `aanpak.html`, `contact.html`, `script.js`, relevante styles; metadata/robots/sitemap en later passende 404; `tests/e2e/accessibility-helper.cjs`, LK-statechecks. Hostspecifieke headers pas P8.
- **Risico:** extra homepageblokken, copygroei, calculatorregressie, dubbele schema-/btwbron, CSP-hashdrift.
- **Tests:** geraakte flows mobiel/desktop; 320/390/768/1024/1440, no-JS, zoom/reflow, focus/reduced-motion; relevante Axe inclusief 2.2; static/links/schema-visible-content; source/network-bytes en relevante labmetingen bij performance-impact.
- **Acceptatie:** één primaire hero-CTA, direct contact bereikbaar, calculator op dedicated pagina behouden, geen technisch jargonraster; iedere toevoeging verantwoord. Geen horizontale overflow/overlap, inhoud blijft beschikbaar zonder hover. Page length vergelijken met baseline, geen willekeurige pixelgrens. Geen regressie in context/Formspree.
- **Checkpoint/STOP:** eigen HTML/CSS/JS-diff per component; STOP bij ongeautoriseerde merk-/prijswijziging of nieuwe ontbrekende staatsdekking. Nieuwe visuals zijn reviewkandidaten, geen autoacceptatie.

### P4 — Consent-first meting

- **Doel:** bestaande `lk:interaction` normaliseren naar gedocumenteerde taxonomy en één optionele provideradapter, default uit tot geldige toestemming. Contactsucces blijft de bron van `generate_lead`.
- **Afhankelijkheid:** gekozen provider, kosten, rollen/DPA/retentie en cookie-/privacyinput; P3 stabiel.
- **Geraakt:** bestaande events in `script.js`, `project.js`, `assistant.js`, `contact.js`; kleine consent-/analyticsadapter en toegankelijke voorkeuren-UI; netwerkguard/fixtures en E2E.
- **Risico:** trackers vóór consent, dubbele events, PII in payload, events alsnog verzenden na intrekken, onterechte conversie bij klik/timeout.
- **Tests:** fresh/no consent/reject/accept/withdraw/reload; nul optionele requests/opslag vóór toestemming; geen replay van preconsent-events; één lead na HTTP+JSON-success, nul bij fout/timeout/dubbelklik; payloadallowlist zonder formulierinhoud/volledige URL-query; consistente focus/keyboard. Alleen mocks.
- **Acceptatie:** gelijke begrijpelijke accepteer/weigerkeuze, intrekken werkt, ontbrekende data zichtbaar; scanner/start/completion alleen bij feitelijke actie/status. Geen trackingprovideraccount geconfigureerd zonder apart mandaat.
- **Checkpoint/STOP:** adapter kan volledig uit zonder kernflow te breken; STOP bij ongewenste data/netwerk of ontbrekend privacybesluit.

### P5 — Website Check: securityboundary en backendadapter

- **Doel:** backendcontract en threat model vóór scannerpublicatie. Voorkeur voor begrensde adapter naar ondersteunde audit-API; geen eigen onbeperkte remote Chromium-worker als v1-default.
- **Afhankelijkheid:** P2 findingscontract, ownerkeuze runtime/provider/budget/retentie, onafhankelijke securityreview vóór publiek gebruik. Cloudflare Pages alleen levert deze app-logica niet; aparte service/serverlessfunctie nodig.
- **Geraakt:** nieuwe geïsoleerde server-/adaptermodule buiten `docs/`, adversarial tests, API-contract en omgevingdocumentatie; geen sleutels of echte accountconfig in Git. Concrete bestandsnamen/runtime na ontwerpbesluit.
- **Risico:** SSRF, DNS-rebinding, redirects/subresources, resource-/quotamisbruik, remote-contentinjectie, privacyverlies van gescande URL’s.
- **Tests:** gecontroleerde targets voor loopback/private/link-local/metadata/IPv4-mapped IPv6/mixed DNS-answers, credentials/schemes/redirectlussen, public→private redirect, TLS-fout, oversized/slow/compressed respons, HTML/XSS in findings, timeout/cancel/rate/concurrency/cost cap en ontbrekende secrets. Geen echte prospectscan tijdens ontwikkel-QA.
- **Acceptatie:** serverallowlist voor provider-API’s; geen arbitraire proxy of remote `eval`. Als LK rechtstreeks usertargets ophaalt: gevalideerde resolutie koppelen aan de werkelijke verbinding, elke hop en elk toegestaan vervolgrequest opnieuw begrenzen; netwerkuitgang moet private bestemmingen blokkeren. Runtime die dit niet bewijsbaar ondersteunt is NO-GO voor directe fetch. CORS is geen abusecontrole. Eindige limits fail-closed; sleutels alleen server-side.
- **Contract:** status queued/running/complete/partial/failed; schema-/methodologyversie; LAB/FIELD/automatisch/handmatig apart; geen gesimuleerde technische progress. Google PSI voor lab; veldadapter apart en unavailable toegestaan. TTL/budget en toegestane URL-/queryscope expliciet kiezen.
- **Checkpoint/STOP:** mocks/local contract zonder publiek endpoint kan tussenresultaat zijn onder §37; STOP publieke route tot review, grenzen en externe toestemming rond zijn. Geen fake live scanner.

### P6 — Website Check-ervaring en handoff

- **Doel:** nuttige resultaten vóór contactgegevens, maximaal enkele belangrijkste issues in gewone taal, technische details op verzoek; rechtstreeks contact/calculator blijven bereikbaar.
- **Afhankelijkheid:** P5 gevalideerd contract; P3/P4; echte dienst vereist P5-productieGO, developmentmocks duidelijk afgescheiden.
- **Geraakt:** dedicated Check-pagina/module/styles, één compacte ingang in bestaande website, contextadapter in `request-context.js`/contact, mockfixtures/E2E/Axe/visuals.
- **Risico:** lange homepage, opgeblazen score, XSS, privé-URL in analytics/querystrings, vervalste scancontext als bewijs.
- **Tests:** volledige A–M matrix uit §75, back/refresh/reset, toetsenbord, focus/loading/error/partial/not-enough-data; geen contactgate vóór nuttige resultaten; safe text rendering. Handoff met domein/tijd/gekozen probleem, geen onnodige pagina-inhoud; serverreferentie indien gebruikt niet-enumerabel, beperkt geldig en gevalideerd. Geen lead bij scancompletion.
- **Acceptatie:** bron/datum/methodologie zichtbaar, geen AI-rankings of garanties; issues betrouwbaar en relevant. Optionele totaalscore alleen na expliciete methodologie/invarianttests; voorkeur v1 zonder totaalscore. Missing data verhoogt nooit score; imperfecte externe sites niet kunstmatig slechter maken voor verkoop.
- **Checkpoint/STOP:** nieuwe route los terugneembaar; STOP bij onveilige resultaten/handoff, fake progress of homepagegroei zonder nut. Publieke link pas naar een werkende goedgekeurde route.

### P7 — Minimaal intern managementdashboard

- **Doel:** klant/project/factuur-betalingsreferentie/recurring/meerwerk/kosten één keer invoeren, berekeningen afleiden. Voorstel v1: lokale spreadsheet in owner-goedgekeurde private opslag buiten deze publieke siterepo; geen webbackend als standaard.
- **Afhankelijkheid:** gekozen opslag/backup, definitieve nettobron, boekhouderinput voor fiscale aannames; geen echte data nodig om te bouwen/testen.
- **Geraakt:** nieuw privaat artifact, datadictionary/formules/tests buiten `docs/` en buiten publiek te pushen repo; commerciële bron via versieerbare snapshot/import zonder formuleduplicatie. Spreadsheet-skill pas bij uitvoering.
- **Risico:** dubbeltelling, btw als omzet/winst, partial payments/credits onjuist, formule-injectie via imports, datalek of onterecht fiscale zekerheid.
- **Tests:** nul/onbekend, klant-ID-integriteit, dubbele import, korting/credit, partial/open betaling, einddatum/annulering, jaargrens, Hosting-only vs Care, één Care=€59 MRR, ARR=12×actuele MRR als run-rate. Omzet gefactureerd/ontvangen scheiden; belasting-/socialereserve alleen configureerbare schatting; echte referentierekengevallen en formulebescherming.
- **Acceptatie:** minimumvragen §93 beantwoord met lege/fictieve dataset en expliciete ontbrekende inputs; geen officieel boekhoudsysteem, geen hardcoded belastingszekerheid. Geldige providerkosten niet dubbeltellen; geen privacydata in Git.
- **Checkpoint/STOP:** versie/backup privé; STOP bij onduidelijke definities/opslag of echte data zonder passende toegang. Cloudsync/portal/Peppol-integratie later.

### P8 — Hosting, commerciële operatie en legal/productievoorbereiding

- **Doel:** bestaande prelaunchchecklist en Hosting O1–O7 daadwerkelijk sluiten waar beloofd; niets dubbel ontwerpen. Bedrijfsidentiteit/fiscaliteit, privacy/contract/facturatie en domeinhouderschap vastleggen.
- **Afhankelijkheid:** owner/provider/juridisch/boekhouderinput; gekozen productiehost; scanner/analyticsomgeving als in release. Geen voorgewende compliance door code.
- **Geraakt:** bestaande dossiers en uiteindelijk goedgekeurde legalcopy/headers/404/redirect/buildconfig. Account-, DNS- en providerinstellingen vallen onder apart exact mandaat.
- **Tests:** veilige restore, monitoralarm, rollback en accessrecovery in geautoriseerde testomgeving; lokale/preview/productieverschillen expliciet. Echte Formspree-test alleen als relevante gewijzigde transportconfig die nodig maakt én owner apart toestemming geeft.
- **Acceptatie:** voor alle geadverteerde Hosting/Care-functies proces/eigenaar/bewijs; kosten haalbaar binnen lock; mail/DNS onaangeraakt tenzij exact aparte toestemming; geen niet-bewezen performance-/formmonitoring als bestaande inclusie.
- **Checkpoint/STOP:** account/DNS-export en bekende vorige release vóór latere ingreep; STOP op ontbrekende ownerinput, contract-/betaalde actie of onverantwoord herstelpad.

### P9 — Finale relevante QA en menselijke review

- **Doel:** finale bronstaat, alle belangrijke states en releaseonderdelen beoordelen; bestaande LK-skills/runners gebruiken.
- **Afhankelijkheid:** eerdere v1-deliverables en operationele gates gesloten; Kelmora-scope opgelost; finale releasehash vastgelegd.
- **Geraakt:** tests alleen voor echte ontbrekende dekking, scoped artifacts en reviewdossier; baselines uitsluitend na exacte owneracceptatie.
- **Tests:** functional/Axe/keyboard/screenreadergerichte handmatige checks, responsive 320/390/768/1024/1440 plus relevante breakpoints, contact/scanner/calc states, visuals van LK en demo’s binnen toegestane scope, static/links/console/network, security-/privacyregressie. Lighthouse op relevante routes in mobile/desktop, vooraf vastgesteld herhaald protocol (voorstel drie vergelijkbare runs per mode/geraakte route) met mediaan én spreiding; niet alleen beste run. Field apart, unavailable geen blocker op verzonnen score.
- **Acceptatie:** huidige evidence coherent en artifactgeldig; failures/noodzakelijke skips niet weggefilterd; moderate/minor/incomplete/manualbeperkingen beoordeeld. Onverklaarde regressie blokkeert. Geen algemene WCAG-, penetratietest-, ranking- of conversiegarantie.
- **Checkpoint/STOP:** finale build/source/config/baselinehash en QA-rapport; TECHNICAL_GATE_PASS alleen bij volledige relevante dekking, dan OWNER_REVIEW_PENDING. Geen DELIVERY_APPROVED zonder werkelijk ownerakkoord.

### P10 — Exact releasebesluit en gecontroleerde publicatie

- **Doel:** alleen na afzonderlijk productie-GO exact goedgekeurd artifact/config publiceren en verifiëren.
- **Afhankelijkheid:** P9 plus business-/operationeel akkoord; expliciet host/domein/source/artifact/releasevenster en rollbackmandaat. GO op dit plan is niet voldoende.
- **Geraakt:** uitsluitend vooraf goedgekeurde deploymentconfig/bron; geen onverwachte `main`-push.
- **Tests:** preview versus productie, HTTPS/canonical/robots/sitemap/404/headers/cache, assets, consent en ingeschakelde backend; Formspree puur UI/read-only tenzij afzonderlijk geautoriseerde echte test.
- **Acceptatie:** werkelijk gepubliceerde versie matcht beoordeelde staat; smoke bewijs, monitoralertkanaal en herstelverantwoordelijke bevestigd.
- **Verplichte LOCAL ↔ PREVIEW ↔ PRODUCTION parity-check (ownerbesluit P3, 29-09-2026):** leg per omgeving URL, tijd, source-/build-/deploymentversie en het HTML- en CSS/JS-assetmanifest met hashes vast. Vergelijk expliciet HTML/routes; geladen CSS/JS en assetversies; canonical, robots, sitemap en overige SEO; formulierendpoint, validatie en veilige fout/successtates; consent vóór/na toestemming en intrekking plus trackingverkeer; redirects/404; daadwerkelijke HTTP-securityheaders; deploymentversie en rollbackreferentie. Omgevingsverschillen mogen alleen vooraf verklaard en goedgekeurd zijn (bijvoorbeeld preview-noindex of mockformulier); geen onverklaarde oude assets, routeverschillen of gemengde versies. Controleer LOCAL ↔ PREVIEW vóór productie-GO en verifieer dezelfde goedgekeurde release op PRODUCTION na de afzonderlijk toegestane publicatie. Ontbrekende preview/productiegegevens zijn NOT_TESTED, geen PASS. Afwijkingen blokkeren launch; post-deploy afwijkingen activeren de STOP/rollbackregel hieronder. Formspree blijft gemockt/read-only zonder apart mandaat voor een echte inzending. Deze documentatieregel autoriseert geen deployment of productieaanpassing in P3. Aanleiding: de lokale P3-routes laden `final.css` en modules, terwijl de actuele live homepage nog `/style.css` laadt; lokale QA bewijst daarom geen productiepariteit.
- **Checkpoint/STOP:** vorige productieartifact/config/release-ID, DNS-export uitsluitend indien geraakt; bij anomalie stop en herstel binnen vooraf geautoriseerd mandaat. Geen verdere deploys om ongeanalyseerde fout te maskeren.

## E. Risico’s, infrastructuur en approvals

### E1. Backend-/externe dienstgrens

| Onderdeel | Wat nu statisch kan | Wat aparte infrastructuur vraagt |
|---|---|---|
| Calculator/assistent | Bestaande lokale keuzes/prijsindicatie | Geen backend nodig; geen externe AI toevoegen |
| Contact | Bestaande frontend/validatie/context | Bestaande Formspree is serverprovider; ontvanger/account niet blind wijzigen |
| Website Check | UI/validatie/mockcontract | Secrets/APIproxy, quotas, rate/concurrency, cache/jobs waar nodig en veilige eventuele egress; niet in frontend hacken |
| Analytics/consent | Lokale state/hooks/voorkeuren | Gekozen collectorprovider/retentie; server-side tracking omzeilt consent niet |
| Dashboard v1 | Private spreadsheet, formules en veilige backup | Alleen bij latere cloudapp: auth/rollen/tenantdata, database, encryptie/recovery |
| Periodieke Care | Contracten/dataformat | Scheduler, opgeslagen historie, alerts en operationele verantwoordelijkheid; later |
| Portal/prospectsync | Architectuur | Auth, private datastore, jobs, legal/providerafspraken; later, geen automatische outreach |

### E2. Belangrijkste blockers

- **R1 — kwaliteitsbasis:** één toolingfailure en historisch bewijs past niet exact op huidige snapshot. Afsluiten via P1 en later gerichte actuele dekking, niet via hash-/testverzwakking.
- **R2 — commerciële interpretatie:** btw I01 en bestaande fiscale status. Owner/accountant bevestigen; geen exclusief-only wijziging aannemen.
- **R3 — scannersecurity:** huidige app heeft geen veilige scannerbackend. Geen publiek endpoint vóór securityreview, bewezen grenzen en provider/kostenmandaat.
- **R4 — privacy:** analytics, gescande URL’s, scanreferenties, fonts, sessionStorage en Formspree vereisen feitelijk gegevensbeleid. Een URL kan persoonsgegevens bevatten; niet in gewone analytics/logs bewaren. Toestemming intrekken moet effect hebben.
- **R5 — platform/ownership:** Pages/Cloudflare-accountmodel en commerciële beheerroute blijven onder bestaande open contractgate; klant is domeinhouder, emailconfig beschermd.
- **R6 — schaal/belofte:** backup, herstel, support en monitoring moeten vóór hun publieke belofte uitvoerbaar zijn. Care uitbreiden met toekomstige reports is geen automatische nieuwe inclusie.
- **R7 — freeze/visueel:** nieuwe Kelmora-review niet uitvoeren onder ongewijzigde freeze; geen demoherbouw voor een uniform uiterlijk.
- **R8 — financieel/data:** dashboardscope, opslag, formuledefinities en fiscale aannames moeten juist zijn; geen klantdata op Pages/Git en geen officiële boekhouding vervangen.
- **R9 — productomvang:** publiceer geen intern platform op Home. Site, Check en intern dashboard hebben aparte grenzen; portal/prospecting blijven later.

### E3. Expliciete ownerbesluiten en actietoestemmingen

| Besluit/actie | Wanneer nodig | Wat GO voor een eerdere codefase niet omvat |
|---|---|---|
| GO P1 / volgende begrensde fases | Vóór implementatie | Geen globale toestemming voor alle fases |
| Btw-/commerciële presentatie | Vóór geraakte prijs-/copywijziging | Geen prijswijziging of nieuwe dienst |
| Kelmora heropenen voor exact reviewbereik | Vóór nieuwe runtime/reviewuitvoering | Geen redesign of algemene freezeopheffing |
| Analytics/scannerprovider, retentie, budget/secrets | Vóór koppeling/account-/betaalde actie | Geen aankoop, quota-aanpassing, publicatie of secret in chat |
| Dashboardlocatie, financiële definities/input | Vóór artifact met echte bedrijfsdata | Geen publieke repo-opslag/cloudsync |
| Juridische/fiscale feiten en finale copy | Vóór publicatie | Geen AI-goedkeuring als juridisch oordeel |
| Baselineacceptatie / Gitcommit/push | Per exacte scope | Geen automatisch gevolg van groene tests |
| Productie/DNS/Formspree-/mailaccountmutatie of echte test | Afzonderlijk exact mandaat | Geen onderdeel van dit pre-execution-GO |
| Klantcase/outreach/reviewuitnodiging | Per echte externe communicatie | Geen automatische verzending of publicatie |

### E4. Actuele officiële controlemomenten voor het plan

Geraadpleegd 28-09-2026; geen externe accountmutatie:

- [OWASP SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) onderbouwt defense in depth, netwerkgrenzen en de gevaren van redirects/DNS. P5 is een nog te bewijzen ontwerp, geen claim dat een URL-regex voldoende is.
- [Google PageSpeed API](https://developers.google.com/speed/docs/insights/v5/get-started) kondigt afbouw van CrUX-velddata in PSI aan en verwijst naar aparte CrUX-API’s. Daarom twee adapters, geen afhankelijkheid van altijd aanwezige PSI-fielddata.
- [CrUX API](https://developer.chrome.com/docs/crux/api) beschrijft geaggregeerde velddata over een rollende periode van 28 dagen. Vergelijk origin/URL, apparaat en collectieperiode expliciet; die meting is geen live labtest.
- [Belgische GBA: cookies en andere traceringsmiddelen](https://www.gegevensbeschermingsautoriteit.be/professioneel/thema-s/cookies) beschrijft voorafgaande actieve toestemming, duidelijke weigering en intrekbaarheid. P4 test concrete werking; providerkeuze alleen bewijst geen juridische gereedheid.

## F. Aanbevolen eerste implementatiefase

**GO P1 — herstel uitsluitend de verouderde QA-referentie en bewijs de toolingbaseline.** Dit is klein, onderbouwd door een echte failure en onafhankelijk van btw-, backend- en designkeuzes. De bestaande selectorcontrole blijft aanwezig; geen test verwijderen, verwachtingen versoepelen of screenshotbaseline wijzigen.

Verwachte change set: `scripts/fixtures/project-reference.json`, eventueel de bijbehorende gerichte test, en het QA-/baselineverslag. Verwachte uitkomst: alle toolingtests geslaagd, bestaande commerciële fallbacks correct, site- en demo-inhoud ongewijzigd. Daarna fase-uitkomst rapporteren; geen automatische vervolgimplementatie.

**PRE-EXECUTION GATE: REVIEW COMPLETE — WAITING FOR OWNER GO**
