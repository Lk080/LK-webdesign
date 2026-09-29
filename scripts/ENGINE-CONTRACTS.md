# LK Website / Audit Engine v1 — contract foundation

Status: lokale contractfoundation; geen scanner, klantplatform of productie-integratie.
Engine-, contract- en methodologieversie zijn expliciet `1.0.0`. De bestaande
[Development Standard](../LK-DEVELOPMENT-STANDARD.md) blijft het kwaliteitsbeleid.

## Eigenaarschap en architectuur

| Classificatie | Onderdeel | Besluit |
|---|---|---|
| KEEP | `qa-projects.json`, vijf LK-skills, `qa-run/state/network`, Playwright, axe, Lighthouse, visual regression | Eén registry, bestaande uitvoering, hashes, guards en reviewproces |
| KEEP | Frontendhelpers, demo's, commerciële configuratie | Geen extractie/migratie; `docs/commercial.js` blijft de enige bedragenbron |
| EXTEND | `qa-evidence.cjs`, `qa:unit` | Optionele auditconsumer en extra contracttests; bestaande interfaces behouden |
| EXTRACT | Geen | Geen bewezen noodzaak om stabiele frontendcode naar een package te verplaatsen |
| NEW | `contracts/*.v1.json`, `engine-contracts.cjs`, fictieve fixture/tests | Kleine data-/validatielaag, geen tweede runner of dependencies |

Datastroom: registry + projectspecifieke bindings → bestaande site/QA → bestaande
artifacts → toekomstige expliciete produceradapter → auditcontract → optionele
`assessAudit` → bestaande technische gate → afzonderlijke owner-review.
De adapter van echte tooloutput naar findings is nog niet gebouwd. Er worden geen
oude rapporten herschreven of automatisch tot het nieuwe formaat gepromoveerd.

## Websitecontract

`contracts/website.v1.json` bezit versie, bindingsvorm en infrastructuurafspraken.
`createWebsiteManifest(projectId, bindings)` controleert de bestaande registry en
maakt een in-memory manifest; het schrijft niets. `validateWebsite(manifest)`
valideert de portable vorm, niet de aanwezigheid of kwaliteit van de implementatie.
Een fictieve klant kan dezelfde vorm lokaal gebruiken; een echt klantproject moet
eerst in zijn eigen registry worden geregistreerd. Geen tweede identiteitsdatabase.

Identiteit, source/route, freeze, capabilities, publicatiefase, QA-adapters,
viewports en budgetten blijven in de registry. Bindings verwijzen naar bestaande
projectbestanden voor tokens, navigatie, responsive gedrag, forms/validatiestates,
a11y, SEO/social/schema, analytics/consent, performance/images, security/privacy,
QA en eventuele deploymentmetadata. De catalogus legt hun afspraken vast.

- `BOUND`: een implementatiereferentie is opgegeven; **geen** bewijs van conformiteit.
- `UNBOUND`: mapping ontbreekt; ook geen claim dat bestaande functionaliteit ontbreekt.
- `NOT_APPLICABLE`: geen binding met expliciete reden; geen vrijstelling van QA.

Alle gebieden blijven zichtbaar. Een later onboardingproces moet referenties,
toepasselijkheid en actuele QA controleren; schema-validiteit is geen READY-status.
Branding, art direction, layout/compositie, copy, fotografie, bedrijfslogica en
conversiestrategie blijven per klant uniek. Dit is infrastructuur, geen visueel template.
De huidige lokale `lk:interaction`-events zijn hooks, geen actieve analyticsdienst.

Per klant worden engine/contract exact gepind; upgrades gebeuren expliciet met diff
en regressiebewijs. Voorlopig versieert Git de bron: geen gepubliceerd package/tag.
Een overdracht bevat de zelfstandige site, assets en licenties, registry/bindings,
gepinde contractbron en eventuele build-/providerinstructies. Deze contracten voegen
geen frontendruntime of verplichte LK-/Cloudflareverbinding toe. Providerprovisioning
en een bewezen recovery/exit-oefening horen bij de operationele hostinggate.

## Auditcontract en bewijs

`audit-methodology.v1.json` is de machineleesbare vocabulaire/methodologie;
`validateAudit` is de uitvoerbare contractvalidator, geen JSON-Schema-engine.
Het envelope bevat contract-/methodologieversie, project, de **bestaande volledige
QA-snapshot** en checks. Iedere check erft de methodologie van dat envelope.
Een check buiten zijn envelope exporteren zonder versie/context is niet toegestaan.

Elke check bevat een stabiele `lk.<domein>.<regel>`-ID, categorie, severity,
confidence (0–1 of expliciet onbekend `null`), pagina, optionele locatiegegevens,
viewport/state, technische én zakelijke uitleg, aanbevolen actie, bewijs,
verificatiemethode/resultaat/tijd, remediation safety, lifecycle en uitkomst.
Scope-identiteit is rule + page + viewport + state + evidence-type; duplicaten zijn
ongeldig. Rule-ID's worden nooit hergebruikt voor een andere betekenis. Een nieuwe
producer moet zijn concrete regels en dekking documenteren; P2 bouwt geen scanners.

| Evidence type | Betekenis |
|---|---|
| LAB | Synthetische meting met toolversie, omgeving en vastgelegd protocol in artifact |
| FIELD | Echte geaggregeerde gebruikersdata; afzonderlijk sample/URL- of originscope in artifact en verplichte observatieperiode |
| LK_AUTOMATED | Deterministische LK-test/controle binnen zijn daadwerkelijke dekking |
| MANUAL | Expliciet vastgelegde menselijke controle, reviewer en werkwijze |
| BUSINESS_OBSERVATION | Zakelijke interpretatie/observatie; geen technische meting |

Ieder bewijs heeft precies één type. Beschikbaar bewijs vereist een relatief
artifactpad, SHA-256, producer/toolversie of reviewer, en UTC-observatietijd.
`MISSING`/`UNAVAILABLE` vereisen een reden, null artifact/hash/tijd en `NOT_TESTED`.
FIELD kan niet door LAB, handmatig of automatisch bewijs worden ingevuld.
Ontbrekende selector/resource/regel/viewport blijft `null`; niet verzinnen.
Tijden zijn canonieke UTC ISO-strings met milliseconden. Een fieldperiode eindigt
uiterlijk op de observatietijd; verificatie komt niet vóór de observatie.

**Trust boundary:** validatie bewijst de vorm en onderlinge consistentie, niet de
authenticiteit, artifactinhoud, revieweridentiteit of beschikbaarheid op disk.
De fixture gebruikt bewust fictieve hashes en een niet-bestaand artifact, uitsluitend
voor contracttests. Een echte adapter moet bewijs veilig opslaan, scoped paths/hashes
controleren met de bestaande evidencehelpers en inhoudelijke dekking beoordelen.
Ongeverifieerde remote/clientinput mag geen releaseconsumer voeden. Dit contract
is geen publiek API-endpoint of securitysandbox. Remote captures zonder lokale
QA-snapshot vragen in P5 een expliciet geversioneerd capturecontract; geen nep-hashes.

## Severity, lifecycle en herstel

CRITICAL = kritieke flow onbruikbaar of ernstig aantoonbaar security/dataverliesrisico;
HIGH = belangrijke toegang/flow ernstig belemmerd; MEDIUM = betekenisvol beperkt;
LOW = kleine beperkte afwijking; INFO = context/waarneming zonder defectclaim.
Severity beschrijft impact van de regel/bevinding, niet confidence of testdekking.
Alle daadwerkelijke FAILs blijven blokkerend in deze conservatieve foundation.

`DETECTED → CONFIRMED → PLANNED → FIXED → VERIFIED` beschrijft voortgang;
de validator controleert de actuele combinatie, niet een historische state-machine.
`FIXED` blijft `REVIEW_REQUIRED` tot nieuw verificatiebewijs. `VERIFIED`/`PASS`
vereisen beschikbaar bewijs én PASS-verificatie. Een beperkte testpass bewijst alleen
zijn eigen scope. `ACCEPTED_LIMITATION` vereist reden, expliciete human-ownerattestatie,
reviewer, reviewtijd en vervaldatum binnen dezelfde projectsnapshot/checkscope.
Een beperking wordt nooit een PASS; verval vereist herbeoordeling.

Safety: LEVEL_1_REPORT_ONLY rapporteert; LEVEL_2_PROPOSE_FIX stelt een patch voor;
LEVEL_3_LOW_RISK_AUTOFIX_CANDIDATE markeert slechts een potentiële kandidaat;
LEVEL_4_REQUIRES_HUMAN_APPROVAL vereist expliciete menselijke beslissing.
Geen level verleent uitvoeringsbevoegdheid. Geen repair-loop in P2.
Later: scan → diagnose → prioriteit → begrensde fix → targeted test → regressie →
re-audit → verificatie; iedere audit bewaart zijn eigen versie/snapshot/artifacts.

## Gate- en scoresemantiek

`auditGate(audit, {projectId, snapshot, required, asOf})` is een pure,
deterministische contractbeoordeling. De **vertrouwde releasecaller** bepaalt de
vereiste scope en evaluatietijd; een scan mag zijn eigen vereisten niet verkleinen.
Vereisten noemen rule/page/viewport/state/evidence-type expliciet.

1. Ongeldig/ongekend contract: exception, consumer moet gesloten falen; geen PASS-fallback.
2. Ander project/snapshot: `REVIEW_REQUIRED`, geen hergebruik als actueel bewijs.
3. Een FAIL in enige aangeleverde check: `FAIL`, ook buiten de vereiste subset.
4. Lege vereisten, ontbrekende scope of `NOT_TESTED`: `NOT_TESTED`.
5. Open review, toekomstige timestamps of verlopen beperking: `REVIEW_REQUIRED`.
6. Resterende geldige beperking: `ACCEPTED_LIMITATION`.
7. Alleen volledige, geverifieerde scope: `PASS` voor dit auditcontract.

`qa-evidence.assessAudit(entries, project, snapshot, audit, required, asOf)` voegt
dit optioneel toe aan bestaande `assess`. Iedere audituitkomst behalve PASS houdt
`TECHNICAL_GATE_INCOMPLETE`/`NOT_READY`. Audit-PASS kan ontbrekende/falende bestaande
QA nooit opwaarderen; menselijke goedkeuring blijft apart. Bestaande runners gebruiken
hun ongewijzigde route totdat een latere, geteste integratie expliciet is toegestaan.
Noodzakelijke skips en handmatige dekking blijven volgens de Standard reviewpunten.

Geen overall-score, weging of standaardwaarde 100. Ongetest is niet geslaagd.
Een toekomstige score vereist reproduceerbare regels, ruwe bronmetingen, gescheiden
bewijssoorten, expliciete missing-data-policy en een nieuwe methodologieversie.
Ook wijzigingen aan rulebetekenis, severitybeleid of gate/scoringsemantiek vereisen
een versie en regressiefixtures. Historische rapporten blijven ongewijzigd interpreteerbaar
via hun gepinde validator/catalogus; onbekende versies worden nu geweigerd.
`serializeAudit` sorteert objectkeys, bewaart arrayvolgorde en muteert niets.

## Uitbreidingsgrenzen en validatie

- Website Check: P5 levert veilige backend/producers, captureprovenance en foutstates;
  SSRF/redirect/IP/rate/size/timeout/secrets/securityreview vóór publieke activatie.
- Care: later planner/monitor en retestpolicy rond dezelfde evidence; geen dienstclaim nu.
- Prospect Engine: later geautoriseerde inputs/producers; geen scraping of outreach nu.
- Client Portal: later authenticated readmodel met tenantisolatie en toegangscontrole.
- Codex-remediation: later gescopeerde voorstellen en expliciete bevoegdheden; safety is geen toestemming.
- Before/after: vergelijk alleen dezelfde regel/scope/methodologie onder vergelijkbare
  omstandigheden; snapshotverschillen expliciet. Anders onvergelijkbaar, geen winstscore.

Geen backend, dashboard, tracking, nieuwe publieke UX, providerconfiguratie,
Formspreewijziging, prijs-/btwwijziging, deployment of frontendextractie in P2.
Findings zijn onbetrouwbare tekst: toekomstige UI rendert ze als tekst, niet als HTML.
Geen secrets/klantdata in repo-fixtures. Paginareferenties sluiten credentials/query/
fragment uit; dit is geen volledige privacyfilter voor vrije tekst of artifacts.

Tests: `node --test scripts/engine-contracts.test.cjs`; volledige regressie:
`npm run qa:unit`; bestaande toolinglint: `npm run qa:tooling -- lk`.
De contracttests gebruiken uitsluitend fictieve data en lokaal bestaande bronreferenties.
Een groene unitset is geen huidige browser-, performance- of releaseclaim.
