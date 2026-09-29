# LK P4.5 — Playwright/toolchain review en revalidatie

29 september 2026. **P4.5 PASS — NO UPDATE REQUIRED; TECHNICAL_GATE_PASS voor de lokale LK-scope.** Beslissing: `NOT_JUSTIFIED`, omdat de bestaande Playwrightversie gelijk is aan de actuele officiële stable. Geen dependencies, browsers, productiecode, tests, thresholds of baselines gewijzigd. Geen productie-/deliverygoedkeuring afgeleid.

P1 PASS; P2 PASS; P3 PASS; P4 PASS — TECHNICAL_GATE_PASS. **P5 NOT STARTED.** Dit rapport en de coverage matrix zijn nieuwe documentatie en staan bewust nog buiten de eerdere, exact behouden P1–P4-index van 59 bestanden. Geen commit/push/deploy uitgevoerd.

## A. Vastgelegde toolchainbaseline

| Onderdeel | Vóór en na P4.5 |
|---|---|
| Branch | `prelaunch-checkpoint-2026-09-27` |
| HEAD | `74fea4993282d70e76fc986cc07da2a9794beb98` |
| Node / npm | `v24.21.0` / `11.19.0` |
| Systeem | Darwin arm64 25.6.0; Europe/Amsterdam |
| `@playwright/test` / `playwright` / `playwright-core` | Alle drie `1.63.0`; één versie per package, core gedeeld met axe |
| `@axe-core/playwright` / Lighthouse | `4.13.0` / `13.5.0` |
| Chromium / headless shell | `153.0.8010.12`, revisie `1243` |
| Cache | Bestaand Chromium, headless shell en ffmpeg `1011`; geen Firefox/WebKit geïnstalleerd in deze QA-cache |

`@playwright/test` en axe zijn directe devDependencies; Playwright/core zijn bestaande transitieve dependencies. Geen extra directe package nodig. Browserdescriptor vermeldt ook Firefox 155.0/rev1543 en WebKit 26.6/rev2359; die descriptor is **geen** bewijs van uitgevoerde Firefox/WebKit-tests.

Vooraf opgeslagen: package/lock/browserdescriptor, volledige Git-index/status, dependency tree en oorspronkelijke repositorymanifest. Zie [freeze](test-results/qa-runs/lk-inspection-DzX2oV/toolchain/freeze-verification.json). Alle oorspronkelijke 341 niet-genegeerde bestanden zijn na de controles nog bytegelijk. De twee nieuwe rapporten worden afzonderlijk verantwoord.

## B. Beschikbare targetversie

Op 29 september via npm-registry read-only gecontroleerd: `@playwright/test@latest = 1.63.0`, Node-engine `>=20`. De registry-integrity van deze package is gelijk aan de bestaande lockfile-integrity. Installed=current=target; er is geen patch/minor/major-delta.

Bronnen: [officiële 1.63.0-release](https://github.com/microsoft/playwright/releases/tag/v1.63.0), [Playwright release notes](https://playwright.dev/docs/release-notes), [officiële npm-package](https://www.npmjs.com/package/%40playwright/test?activeTab=code). [Vastgelegde registryrespons](test-results/qa-runs/lk-inspection-DzX2oV/toolchain/registry-observation.json).

## C. Playwright Update Impact Assessment

Deze beoordeling is vóór eventuele dependencywijziging aan de owner gepresenteerd. Omdat er geen versiedelta is, wordt bestaande 1.63-functionaliteit niet opnieuw als migratie ingevoerd.

| Gebied | Gecontroleerde toepassing en impact |
|---|---|
| Runner/API/locators/actionability/waits/navigatie | Bestaande `@playwright/test`, semantische locators, fixtures en scoped runners; geen API-migratie nodig. Testintentie, retries en timeouts ongewijzigd. |
| Dialog/focus/mobile/viewport | Native dialog, keyboardfocus, E1, mobiele Chromiumcontext; bestaande descriptors en viewports behouden, vers herhaald. |
| Netwerk/routing/storage/cookies/downloads | Bestaande guard en fixture-interceptie blijven gelden; geen nieuwe downloadworkflow/API afhankelijkheid. Consent/storage-failure en contextflow vers getest. |
| Screenshots/traces/video/reporters | Exact dezelfde Chromiumrevisie; oorspronkelijke pixelthreshold `0`/maxDiffPixels `0`. Reporter/artifactformaat behouden. 35 actuele captures bytegelijk. |
| Accessibility | Bestaande axe-integratie en tags behouden; geen ARIA-snapshotmigratie of uitgeschakelde regels. |
| Node/OS/browser support | Node24 voldoet aan package-engine >=20. 1.63-releasewijzigingen rond Ubuntu20.04 en experimentele componenttestpackages raken de huidige macOS/Chromium/e2e-stack niet. Geen wijziging naar andere engine. |
| Lighthouse | Runner gebruikt hetzelfde Chromiumexecutable; Lighthousepackage/config gelijk. Verse homepagecontrole en artifactgevalideerd P4-routebewijs. |
| CI | Geen `.github`-workflowdirectory in deze checkout. Historische Pages `main → /docs` is geen nieuwe remote-deployconfigcontrole. Geen CI-/branchwijziging. |

1.63 bevat additieve API-/traceopties; er is geen reden ze voor deze taak te adopteren. Dit is geen algemene garantie over toekomstig Playwrightgedrag: een latere versiewijziging vereist opnieuw vergelijking en visuele review.

## D. GO/NO-GO

**NOT_JUSTIFIED — NO UPDATE REQUIRED.** Wel GO voor de gevraagde verse revalidatie. Geen dependency- of browsermutatie uitgevoerd; een fictieve upgrade zou geen verbetering leveren.

## E–G. Dependencies, browsers en compatibiliteitswijzigingen

- **E Dependencies veranderd:** geen. Geen `npm update`, install of audit-fix.
- **F Browserrevisies veranderd:** geen; Chromium/headless shell rev1243 behouden. Geen browserinstallatie of systeembrowserinstelling geraakt.
- **G Compatibiliteitscode/tests veranderd:** geen. Geen nieuwe dependency/runner, baselineacceptatie, timeoutverhoging of testverzwakking.

Alleen tijdelijke inspectiescripts onder genegeerde `test-results/` en de twee gevraagde rootrapporten toegevoegd. Een eenmalige Git-blobinspectie bereikte Node's standaard stdoutbuffer van 1 MiB bij een grote PNG; uitsluitend die inspectielezer kreeg een 32 MiB leesbuffer. Dit was geen QA-failure en veranderde geen testlimiet.

## H. Functionele resultaten

Verse volledige eindrun: [`lk-final-ntdlrO`](test-results/qa-runs/lk-final-ntdlrO/evidence.json), 08:49:46–08:51:33 UTC.

**86 PASS, 2 SKIP, 0 FAIL, 0 flaky**, exact dezelfde PASS/SKIP-aantallen als P4. De twee skips zijn desktop-N/A voor “mobiele navigatie openen en sluiten” en “mobiel geen horizontale overflow”; mobiele equivalenten en bredere responsive-tests zijn uitgevoerd. Geen nieuwe skip.

Navigatie, projecten/links, hero→calculator, calculatorranges/context, assistent, contact, validatie, failure/success, gemockte Formspree en eventsemantiek blijven gedekt. Frozen demos niet heropend of hertest.

## I. Consent en leadsemantiek

**22/22 consentbrowsergevallen PASS**, inclusief acht E1-gevallen. First visit, Accept, Reject, Preferences, intrekken/wijziging, reload, cross-tab, policy/expiry, malformed/unavailable storage en providerthrow/block/timeout zijn vers uitgevoerd.

Optioneel fixturetransport vóór toestemming, na Reject en na intrekken: nul. Provider blijft `enabled:false`, `provider:null`; geen echte collector geactiveerd. `generate_lead` uitsluitend na bevestigde gemockte successresponse; HTTP-/`ok:false`-/ongeldige-responsefouten en dubbele/replayed attempts genereren geen extra lead binnen het huidige clientcontract. Geen echte Formspree-inzending. Fixtures bewijzen geen levering aan een toekomstige externe analyticsdienst.

## J. E1

**8/8 vers PASS:** 320/390/768/1440 px in desktop- en mobiele Chromiumcontext. Banner/dialog laten assistentfocus wijken; bedekte assistentcontrols zijn niet focusbaar. Preferences openen/sluiten, Accept/Reject/Escape, zichtbare focus-return en privacyknop/assistent-overlap zijn gecontroleerd. Geen bron- of baselinewijziging.

## K. Accessibility/Axe

**111 canonieke scans, 0 violations**, alle severities gecontroleerd. Incomplete blijft incomplete:

| Regel | Scans P4 | Scans P4.5 |
|---|---:|---:|
| color-contrast | 98 | 98 |
| aria-valid-attr-value | 51 | 51 |
| hidden-content | 3 | 3 |
| css-orientation-lock | 3 | 3 |

Geen nieuwe incomplete types/aantallen. De eerdere handmatige P4-duiding van de mobiele assistenttitel (lege rechthoekoverlap, daadwerkelijke glyphs zichtbaar, contrast 16,35:1) blijft geldig bij identieke bron/browser. Geen nieuwe volledige menselijke screenreaderreview uitgevoerd; geen volledige WCAG-conformiteitsclaim.

## L. Responsive

27 verse route/breedtechecks voor Home/Aanpak/Contact op 320/360/375/390/430/768/1024/1280/1440: geen ongewenste overflow volgens de bestaande ≤1px-assertie; beelden geladen/gedecodeerd. Dialog/consent/assistent/calculator/contact/menu hebben aanvullende state-/keyboardchecks. De exacte visuele referenties zijn 375/390/768/1440/1920; 320/1024 zijn geen nieuwe screenshotbaselines. Geen viewports of tolerantie aangepast.

## M. Visuals en baselinebescherming

**35/35 byte-identiek, categorie A (geen wijziging). B/C/D/E: 0.** Geen nieuwe OLD/NEW/DIFF-review nodig, geen acceptatie uitgevoerd. Alle 170 bestaande repository-baselines, inclusief demo's, zijn ongewijzigd tijdens deze audit/P4.5.

De reeds goedgekeurde P4-set is exact footer + full-page op vijf viewports (10). De P3-set omvat 23 historische goedkeuringen: 15 nog bytegelijk, acht uitsluitend opgevolgd door de expliciete P4-acceptatie (vijf full-pages, drie footers). De twee mobiele P4-footers waren geen gewijzigde P3-baselines. Daarom bevat de huidige P1–P4-index netto **25** gewijzigde baselinepaden ten opzichte van HEAD, geen 33 verschillende paden. Oude archieven/nieuwe hashes en keten zijn gecontroleerd in [baselineaudit](test-results/qa-runs/lk-inspection-60lJoy/checkpoint/baseline-audit.json).

## N. Lighthouse, performance en suiteduur

Bestaande targets P/A/BP/SEO = 90/95/95/95, ongewijzigd.

| Bewijs | P/A/BP/SEO | Mobiele LCP | Duiding |
|---|---|---:|---|
| Verse Home desktop | 100/100/100/100 | n.v.t.; desktop 543 ms | Eén nieuwe P4.5-meting |
| Verse Home mobiel | 99/100/100/100 | 1855 ms | Eén nieuwe P4.5-meting; TBT 0,5 ms, CLS 0,00049 |
| Bestaande P4 Home mobiele reeks | 95/99/99, overige categorieën 100 | 2458/1863/1855 ms | Volledige vaste reeks behouden; mediaan 99, spreiding 95–99 |
| P4 Aanpak desktop/mobiel | 100/99 performance; overige 100 | 1803 ms | Artifacthash + volledige snapshot opnieuw gecontroleerd |
| P4 Contact desktop/mobiel | 100/99 performance; overige 100 | 1780 ms | Artifacthash + volledige snapshot opnieuw gecontroleerd |

Geen betekenisvolle nieuwe achteruitgang aangetoond; dit is labbewijs, geen veld-CWV/INP. Geen extra runs om 100 af te dwingen. Eerdere P3/P4-variatie en lagere metingen blijven in hun rapporten behouden. Routes Aanpak/Contact zijn niet onnodig opnieuw gemeten: bron, configuratie, browser en originele artifacthashes zijn exact gelijk. Zie [hergebruikcontrole](test-results/qa-runs/lk-final-ntdlrO/p45-snapshot-verification.json).

| Suite | P4 duur | P4.5 duur |
|---|---:|---:|
| Functional | 81,96 s | 81,25 s |
| Axe-run | 1,239 s | 1,247 s |
| Visual | 6,999 s | 6,966 s |

Geen relevante slowdown of nieuwe flakiness. Dit zijn door de runner gerapporteerde duurtijden, geen performancebenchmark van meerdere identieke machines.

## O. Network/console

88 functionele attachments: 2461 bestaande fontfixture-records, **0 rejects, 0 console-/page-errors**. Axe: twee attachments, 14 fixture-records, nul fouten. Lighthouse: geen failed/unexpected requests of runwarnings.

P4 registreerde 2462 fontfixture-records. Het enige verschil is één extra herhaalde DM Sans-fontrequest in de oude mobiele test “form validation, URL safety, honeypot and accessible errors”. Geen nieuwe origin, gewijzigde guard, ontbrekende vereiste resource of mislukte assertion. Requestaantal is geen productinvariant; cache-/navigatietiming is een plausibele, niet bewezen oorzaak. Alle overige testattachments bevatten dezelfde request-multisets. Geen productdefect of verborgen netwerkfout afgeleid uit deze ene fixtureherhaling.

De runner meldt ook bestaand `NO_COLOR` wordt genegeerd omdat `FORCE_COLOR` gezet is. Dit betreft terminalkleuren, geen browserconsolefout; niets onderdrukt. [Volledige browseraudit](test-results/qa-runs/lk-final-ntdlrO/p45-browser-audit.json).

## P. Security/dependencyresultaten

Read-only `npm audit --package-lock-only --ignore-scripts --json`: **0 bekende kwetsbaarheden** in alle ernstklassen, 312 gerapporteerde dependencies. Geen directe/transitieve vulnerabilityfinding of door een update geïntroduceerde dependency (er was geen update). Lockfile bevat geen deprecated-packagevermeldingen; npm-tree geeft één Playwright/coreversie en geen invalid/missing dependency aan. Geen install uitgevoerd, dus geen nieuwe install-/peerwarning om te verbergen. [Auditrespons](test-results/qa-runs/lk-inspection-DzX2oV/toolchain/audit-observation.json).

Bestaande begrensde secretpatrooncontrole opnieuw uitgevoerd op de volledige werkelijke index: 339 bestanden (132 tekst/207 binary). Eén match is de expliciete fictieve credential-URL in een afwijzingstest; geen echte secret. Geselecteerde emailstrings zijn publiek bedrijfscontact, fictieve testdata en een bestaand generiek validatievoorbeeld. Geen privé-mailboxdata, klantenbestand, env-file, keyfile of tijdelijk artifact geselecteerd. PNG's zijn de reeds goedgekeurde publieke sitecaptures zonder tekstmetadata. [Indexcontrole](test-results/qa-runs/lk-inspection-60lJoy/checkpoint/staged-verification.json).

Dit is een begrensde patroon-/dependencycontrole, geen volledige historische secretscan, pentest of garantie dat alle onbekende kwetsbaarheden afwezig zijn. Initieel geblokkeerde registrytoegang is via de toegestane netwerkretry opgelost; geen automatisch dependencyherstel.

## Q. Unit/final QA en bestaande warnings

`qa:unit` na expliciete staging op dezelfde onveranderde kandidaat: **39 PASS, 0 FAIL, 0 SKIP**, circa 1,022 s. P2 contractsemantiek en P4 analyticsgevallen blijven inbegrepen. [Uitvoeringssamenvatting](test-results/qa-runs/lk-inspection-DzX2oV/toolchain/unit-observation.json) vermeldt eerlijk dat dit een overgenomen toolresultaat is, geen nieuw aangemaakte originele TAP-log.

De verse volledige `qa:final -- --site lk --run` omvat functional, axe, visual, static, foundation, Lighthouse en tooling. De bestaande gate-helper bevestigt coherent `TECHNICAL_GATE_PASS`, 139 PASS-evidenceentries en twee verklaarde skips; alle 139 PASS-artifactreferenties opnieuw hashgevalideerd. Evidenceentries zijn geen telling van onafhankelijke tests.

- HTML/JS/static/tooling: geen errors.
- CSS: **85 warnings** = 12 `final.css` no-descending-specificity + 73 `style.css` (49 no-descending-specificity, 24 duplicate selectors). Geen lint-/CSS-/thresholdwijziging. `style.css` blijft legacy voor lokale Master-routes maar production-relevant volgens P3-livebewijs; niet dead code. De duplicates blijven maintenance debt zonder bewezen zichtbare productiefout. De vermeende eerdere 35 CSS-warnings zijn niet als bewezen artifactcount gebruikt.
- Links: 55 INFO; externe/publicatiechecks niet als volledig bewezen voorstellen.
- Foundation: 3 publicatiepending INFO + 1 ontbreken projectassetbudget INFO.
- `git diff --check` en `git diff --cached --check`: schoon.

## R. Package-/lockfilediff

Ten opzichte van P4.5-start zijn package.json en package-lock.json byte-identiek. Geen dependencychurn. De reeds gestagede `package.json`-wijziging ten opzichte van Git HEAD is uitsluitend de eerdere P2/P4-uitbreiding van `qa:unit` met engine-contracts/analytics-tests. De lockfile heeft ook ten opzichte van HEAD geen diff.

## S. Productiecodewijzigingen

Geen in deze audit/P4.5. Alle oorspronkelijke runtimebestanden, commercial config, Formspree, CSS, demos en baselines behouden. Geen mail-/DNS-/account-/hostingactie of analyticsactivatie.

## T. Documentatie

Nieuw: dit A–Y-rapport en [LK-MASTER-REQUIREMENTS-COVERAGE.md](LK-MASTER-REQUIREMENTS-COVERAGE.md). Bestaande P3/P4-verslagen en hun historische bewijs intact. Tijdelijke manifesten/analyses/QA-runs blijven genegeerd. De twee nieuwe rapporten zijn nog niet gestaged; de eerdere expliciete 59-bestandenselectie blijft exact bewaard.

## U. Requirements §§0–94

Alle drie delen integraal gelezen, inclusief voortzettingen §25/§54. **95 unieke secties, geen gat of duplicaat**. Per sectie requirement, status, bewijs, resterend werk en fase vastgelegd.

| Status | Secties |
|---|---:|
| IMPLEMENTED_AND_VERIFIED | 14 |
| IMPLEMENTED_NOT_YET_PRODUCTION_VERIFIED | 20 |
| PARTIALLY_IMPLEMENTED | 46 |
| INTENTIONALLY_DEFERRED | 7 |
| OWNER_DECISION_REQUIRED | 6 |
| NOT_APPLICABLE | 2 |
| **Totaal** | **95** |

Geen completionpercentage/score afgeleid. “Implemented” geldt uitsluitend voor de expliciete beperkte eis. Architectuur ≠ uitgevoerde dienst; lokale QA ≠ productiepariteit. De twee N/A betreffen de voorwaardelijke overall-score en scorevalidatie: er wordt bewust geen totaalscore aangeboden.

## V. Resterende Master Launch-gaps

Afhankelijkheidsvolgorde: scanner-runtime/provider/budget/retentie kiezen → P5 securityboundary/producers + securityreview → P6 echte Check/UI/A–M-matrix/handoff → productie-meting/provider/privacybesluit → P7 private managementtool → P8 bewezen Hosting/Care/business/legal/restore/monitoring → P9 finale menselijke/technische release-evidence → P10 expliciete publicatie-GO en LOCAL↔PREVIEW↔PRODUCTION-pariteit.

Zonder veilige echte Check: STOP en expliciet launchscopebesluit. Geen fake scan publiceren. Volledige Care-automatisering, portal, prospectengine en datagedreven componentpromotie blijven latere scope. Geen nieuwe homepageblokken afleiden uit interne systeemontwikkeling.

## W. Risico's en beperkingen

Chromium/macOS lokaal; geen nieuwe Safari/Firefox-/echte-device-/screenreader-/productionmatrix. Consentprovider is uitgeschakeld; echte SDK/retentie/cross-domain delivery niet bewezen. Incomplete Axe, fontafhankelijkheid, 85 CSS-warnings, publicatie-/assetbudgetgaten blijven zichtbaar. Deze toolchaingate sluit geen zakelijke/legal/hostinggates.

De bestaande snapshotter hasht ook genegeerde `docs/.DS_Store`. De workspace-sourcehash is daarom bewust niet gelijk aan de hash van alleen Git-indexbestanden. Vergelijking bewijst: alle **34 daadwerkelijke sourcebestanden**, **74 config/testbestanden** en **35 LK-baselines** zijn bytegelijk; uitsluitend dat OS-bestand ontbreekt terecht in Git. Geen metadata herschreven, OS-bestand gestaged of oude machine-PASS als nieuwe clean-checkout-PASS gelabeld. Een latere schone checkout krijgt een nieuwe snapshot/eigen QA-provenance.

Sommige P1–P4-documenten verwijzen naar vooraf bestaande hosting/infrastructuurdocs die bewust buiten de index blijven; daarnaast zijn originele QA-artifacts lokaal genegeerd. Het checkpoint is daardoor geen zelfstandige distributie van alle lokale historische bewijsbestanden. Geen runtime-/testbronbestand ontbreekt uit de gecontroleerde kandidaat.

## X. Rollback/checkpointstatus

59 bestanden blijven gestaged: 34 tekstbestanden + 25 netto gewijzigde LK-baselines, 2655 invoegingen/29 verwijderingen in tekst. Exacte lijst en precommitaudit A–P: [PRE-COMMIT-P1-P4.md](test-results/qa-runs/lk-inspection-60lJoy/checkpoint/PRE-COMMIT-P1-P4.md).

Zes vooraf bestaande ownerdocumenten blijven uitgesloten en onveranderd. Twee nieuwe P4.5-documenten staan untracked, klaar voor beoordeling en eventuele expliciete toevoeging aan een uitgebreid checkpoint. Tijdelijke toolchainfreeze: `test-results/qa-runs/lk-inspection-DzX2oV/toolchain/`; bronmanifest/binaire diff/selectie: `test-results/qa-runs/lk-inspection-60lJoy/checkpoint/`. Dit zijn lokale herstelhulpmiddelen, geen voltooide externe backup. Een manifest alleen herstelt geen ongetrackte inhoud; de originele bestanden en bestaande P1–P4-bron-/baselinearchieven blijven nodig. Omdat geen toolchainmutatie plaatsvond is daarvoor geen rollback nodig/uitgevoerd.

Branch/HEAD onveranderd; geen reset/stash/rebase/commit/push/deploy. Potentiële latere push uitsluitend `origin` → `prelaunch-checkpoint-2026-09-27`, nooit automatisch `main`. Remote/Pages-status direct vóór een afzonderlijk toegestane push opnieuw controleren.

## Y. Eerstvolgende stap

Owner beoordeelt P4.5 en de 95-sectiematrix. Daarna kan het checkpoint gecontroleerd met uitsluitend deze twee duurzame rapporten worden uitgebreid en opnieuw op index/diff/secrets worden gecontroleerd. **Nog geen commit/pushautorisatie en geen P5.** Wacht op expliciet ownerbesluit; deze PASS is geen Master Launch PASS.
