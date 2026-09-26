# LK Webdesign — prelaunch master control

Datum: 27 september 2026. Ontvangen scope onderzocht en lokaal bijgewerkt; geen publicatie- of launchgoedkeuring.
De volledige vervolgopdracht §§0–37 is verwerkt in de Release Authority-sectie hieronder. De eerdere audit en btw-fix blijven als gedateerd bewijs behouden.

## Historisch auditbewijs — source-of-truth map vóór de btw-implementatie

| Classificatie | Bron | Gevolg |
|---|---|---|
| CURRENT OWNER DECISION | Masteropdracht 27-09, §4–8 | Netto prijzen behouden; B2B én B2C; toekomstige normale 21%-regeling; incl. primair, excl. secundair, zonder toggle. Lokale minimale gapfix toegestaan. Registratie/activering niet bevestigd. |
| CURRENT COMMERCIAL LOCK | Commercial Requirements 23–25-09 | Scope, nettobasis, add-ons, Care inclusief Hosting, 30 niet-opspaarbare minuten, domeinhouderschap en 2–4-wekennuance behouden. Exclusief-only presentatie door nieuwste besluit SUPERSEDED. |
| CURRENT IMPLEMENTATION | docs/commercial.js + index/aanpak/contact, project/request-context/assistant | Netto bedragen/wegingen correct; alleen excl.-btw-presentatie. VAT STATUS: IMPLEMENTATION GAP. |
| CURRENT VERIFIED EVIDENCE | lk-final-2gfe3n/evidence.json | Vóór wijzigingen snapshot exact gelijk; 115 PASS-artifacts via reuseEvidence gevalideerd, nul fouten. Technische PASS op die bronstaat; OWNER_REVIEW_PENDING, draft. |
| CURRENT EMAIL TRUTH | LK-EMAIL-DNS-PRELAUNCH.md, 27-09 | Eén echte Formspree-keten PASS op oude publieke homepage; reply in Hotmail-junk. Geen herhaling. Combell-afzendernaam apart open. |
| HISTORICAL / SUPERSEDED | INTEGRATIONS.md, oudere checklistpassages, publieke legacy-site | Oude pakketnamen, verborgen assistent en ‘bezorgtest open’ niet als actuele lokale bron gebruiken. Historisch bewijs niet overschrijven. |
| OPEN / NOT YET VERIFIED | Bedrijfsregistratie, btw-activering, privacy/voorwaarden, Hosting/Care-processen | Geen nummers, contractbesluiten, providerprocessen of juridische gereedheid verzinnen. |

Scope: alleen LK (`frozen:false`, publicatiefase draft); Kelmora frozen, geen demo-edits/retests. Bestaand ongecommit werk behouden. Geen redesign, nettoprijswijziging, nieuwe dependencies, baselines, commit/push/deploy, DNS- of accountwijziging. De lokale btw-presentatie is voorbereiding op het gekozen fiscale model; publicatie vereist bevestigde toepasbaarheid.

Vóór wijziging: source `2beb2d2def8ed867daaee84768f22493281e29b20b849145782d562cd28f72a0`, config `3e3767c6c853834ca8e007de09db06b3a266146011bec0036ee748bc973e2cd2`, baselines `978fbc548b0c48ec1ae8b795b7cdd6ac5e3a5a657b915bbdc347f1e02123e97a`.

## Uitkomst van de ontvangen scope

**Niet klaar voor publieke commerciële launch.** De btw-presentatiegap is lokaal verholpen en gericht getest. De netto launchprijzen blijven behouden (**KEEP CURRENT LAUNCH PRICES**). Registratie, privacy/voorwaarden, uitvoerbare Hosting/Care-processen, passende productiehosting en goedkeuring van de exacte release ontbreken nog. Dit dossier is geen juridisch/boekhoudkundig advies en geen deploymentautorisatie.

### VAT audit en minimale lokale fix

**Vóór implementatie: VAT STATUS: IMPLEMENTATION GAP. Na fix: lokale dubbele presentatie geverifieerd.** Geen claim dat LK al btw-geregistreerd is. Publiceer deze fiscale presentatie pas zodra zij voor de onderneming toepasbaar is.

| Controlepunt | Bron / resultaat |
|---|---|
| Home + Aanpak prijsranges | Incl. 21% primair, netto eronder; beide zichtbaar zonder interactie. Exacte centen, geen gewijzigde netto ankers. |
| Hosting / Care / meerwerk | €30,13 / €71,39 per maand, €78,65 per uur incl.; €24,90 / €59,00 / €65,00 excl. Care blijft inclusief Hosting. |
| Calculator | Netto basis en alle add-ons, outward €25-afronding en €5.000-bovengrens behouden. Eerst netto rekenen, daarna btw. Offertegevallen krijgen geen schijntotaal. |
| Assistent | Range-/samenvatting- en serviceweergave gebruiken centrale afleiding; netto secundair. Bestaande routes, modal/focus en lokale opslag behouden. |
| Contact/context | Centrale bruto/netto projectsamenvatting, bewerkbaar; verborgen payload en zichtbare context consistent. Eigen bericht wordt niet overschreven. Netto contextregel kleiner weergegeven. |
| Zonder JavaScript | Home/Aanpak tonen berekende statische bruto/netto fallbacks. Generator `node scripts/lk-price-fallbacks.cjs --write`; controle zonder `--write` geeft fout bij drift. |
| Footer / structured data | Geen huidige prijsbedragen; geen fictieve fiscale identiteit toegevoegd. Bestaande bedrijfsfeiten vereisen registratie-/ownerbevestiging. |
| Oude bedragen | Geen €83,90/€19/€49/€79-abonnementslogica in actieve lokale LK-kern. Zulke historische LK-voorstellen zijn SUPERSEDED; vergelijkbare bedragen van concurrenten in de benchmark blijven hun eigen aanbod. Productie bevat andere verouderde LK-bedragen, zie delta. |

Gewijzigd: commercial.js, index.html, aanpak.html, project.js, assistant.js, request-context.js, final.css, assistant.css; bestaande flowtests aangepast en één gerichte btw-test toegevoegd. Nieuwe kleine fallbackgenerator; geen packagewijziging of dependency. Contact-HTML, endpoint en contact.js in deze opdracht ongemoeid. Geen pricing toggle, nieuw design, garanties, extra diensten of contractuele clausules.

## LOCAL FINAL vs CURRENT PUBLIC PRODUCTION

Read-only GET/HEAD op 27-09-2026, circa 00:29–00:36 CEST. Publieke Home: HTTP 200, `server: GitHub.com`, `last-modified: Thu, 24 Sep 2026 13:17:59 GMT`; SHA-256 `ef264771e3176bafbd8df2e7690851a412118359d355b697d4eae68abc0b7244`. Dit is content-/HTTP-bewijs, geen ingeziene accountconfiguratie.

| Onderdeel | Current public production | Local Final / deploymentdelta |
|---|---|---|
| Routes/navigatie | Één pagina: #aanbod/#prijzen/#voorbeelden/#werkwijze/#contact. `/aanpak.html` en `/contact.html` 404. | Drie pagina’s; Projecten, Aanpak & prijzen, Contact. Dedicated calculator/contactflow. |
| Home/positionering | Titel ‘Websites, AI & automatisering’; oude lange aanbod-/pakketroute. | Compacte websitepositionering; projecten → aanpak/prijsrichting → Lorenz/contact. Geen redesign uitgevoerd. |
| Portfolio/assets | Oude conceptpresentatie, bron gebruikt PNG-logo/style.css. | Bestaande drie expliciete fictieve demo’s, projectbeelden en WebP-logo; final/slice-one/home/approach/assistant CSS nodig. Geen claim van echte klanten. |
| Aanpak/calculator | Start vanaf €1.190 (1–3), Groei vanaf €1.990 (5–7); oude project.js. | Netto ranges €995–1290 / €1390–1790 / €1790–2290, 9+ circa €2300. Centrale calculator/add-ons + nieuwe btw-presentatie. `/commercial.js` publiek 404. |
| Terugkerend/meerwerk | Basis €59, Plus €99, 60 minuten, €55/u met minimaal 30 minuten in publieke copy. **SUPERSEDED voor LK Final.** | Hosting €24,90; Care €59 incl. Hosting, 30 niet-opspaarbare minuten; €65/u. Geen minimumblok geïntroduceerd. |
| Assistent | Preview-only script, `data-preview=false`/niet actief. | Actieve vaste lokale keuzehulp, niet AI. Backendvoorstellen uit INTEGRATIONS historisch. |
| Contact/Formspree | Formulier op homepage, endpoint mjyvnevy; echte keten bewezen. Publieke contact.js verschilt van lokaal. | Dedicated Contact + request-context + huidige validatie/mocks. Zelfde endpoint; gewijzigde bruto/netto contextinhoud lokaal getest, geen tweede live test. |
| Metadata | Oude Home-title/description/aanbodcatalogus. ProfessionalService zonder vaste business-@id. | Nieuwe unieke drie paginatitels/descriptions/canonicals, WebPage voor Aanpak/Contact met business-@id. Geen Offer-prijsdata. |
| Robots/sitemap | Robots Allow:/; sitemap alleen Home. | Robots hetzelfde; sitemap bevat Home/Aanpak/Contact. Nieuwe routes pas zinvol na toegestane release. |
| Canonical/redirects | Non-www HTTPS canonical. HTTP non-www, HTTP www en HTTPS www redirecten getest 301 naar non-www HTTPS met pad/query intact; doelroutes kunnen nu nog 404 zijn. | Zelfde beoogde non-www canonical; enkele www-links werken via redirect. Registry blijft draft/null, dus definitieve publicatiekeuze nog bevestigen. |
| Hosting | GitHub-respons; TLS-validatie door curl geslaagd zonder bypass. | CNAME lkwebdesign.be; historisch `main → /docs`, remote Lk080/LK-webdesign. Geen lokale Actions-deploymentconfig aangetroffen. Live branch/account/recovery niet ingezien. |

### Productiehosting: besluit vereist

GitHub beperkt Pages als gratis hosting voor online business/commerciële transacties/SaaS. Een leadgeneratiesite zonder checkout bewijst op zichzelf niet dat de specifieke toepassing is toegestaan. **Niet als geverifieerd geschikte commerciële hosting afvinken**; bevestig dit met de provider of kies na ownerbesluit een toegestane productiehost. Er is geen migratie, accountaanmaak of hostkeuze uitgevoerd. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

Voor latere release vastleggen: provider/accounttoegang + recovery, toegestane toepassing, exacte bron/artifact, custom domain en certificaatbeheer, redirects, logs/retentie/verwerking, rollback naar bekende vorige release. Maak vooraf release-inventaris en backup. Pas na sluiting van launchvoorwaarden en aparte ownerapproval publiceren; daarna routes/assets/metadata/canonical/sitemap controleren zonder spontane live submission. Deze publieke/local mismatch wordt niet opgelost door nu te pushen.

## Legal / business readiness

De owner heeft **B2B én B2C gekozen**, met normale Belgische 21%-regeling als beoogde structuur; **registratie is nog niet definitief**. Doelgroep opnieuw laten kiezen is onnodig. Officiële naam/rechtsvorm, publiceerbaar vestigingsadres, KBO-nummer, geactiveerd btw-nummer/ingangsdatum en passende facturatie ontbreken nog. Geen nummers of adressen ingevuld.

| Fase | Open vereiste | Concrete afsluitactie / eigenaar |
|---|---|---|
| BLOCKS PUBLIC COMMERCIAL LAUNCH | Officiële identiteit + fiscale toepasbaarheid | Lorenz levert registratie-/bedrijfsfiche; ondernemingsloket/boekhouder bevestigen btw-regeling en start. Daarna pas werkelijke gegevens publiceren. |
| BLOCKS PUBLIC COMMERCIAL LAUNCH | Privacy- en bedrijfsinformatie | Na provider-/identiteitsinput volledige teksten + footer/formulierlinks voorbereiden; Lorenz accordeert, privacydeskundige toetst onzekere rollen/grondslagen/doorgiften. Huidige contactzin volstaat niet als volledig privacydossier. |
| BLOCKS PUBLIC COMMERCIAL LAUNCH | Gegevensstromen | Formspree-plan/quota/retentie/DPA en internationale verwerking, Combell-mailbewaring, hostlogs, rechtenverzoeken en toegangen bevestigen. Routing is al bewezen; privacydetails niet. |
| BLOCKS PUBLIC COMMERCIAL LAUNCH | SessionStorage / externe Google Fonts | Assistent leest sessionStorage bij initialisatie; fonts/preconnects delen technische requestgegevens met Google. Noodzakelijkheid/grondslag en transparantie onderbouwen. Geen tracking aangetroffen; geen willekeurige cookiebanner toegevoegd. |
| BLOCKS PUBLIC COMMERCIAL LAUNCH | Production hosting + huidige claims Hosting/Care | Toegestane eigen-sitehost en uitvoerbare serviceprocessen aantonen, of expliciet nieuwe launchscope besluiten. Geen claims stilzwijgend uitbreiden of weglaten. |
| BLOCKS PUBLIC COMMERCIAL LAUNCH | Exacte release/assetrechten/owner-review | Lorenz bevestigt feiten/rechten en uiteindelijke lokale staat; nieuwe prijsweergave behoeft eigen review. Geen automatisch DELIVERY_APPROVED. |
| BEFORE FIRST PAYING CLIENT | Offerte/voorwaarden, B2B/B2C-proces | Revisierondes, scope, betaling, acceptatie, IP/derdenlicenties, vertraging, beëindiging en consumentenrechten laten besluiten/toetsen; exacte versie met klantakkoord bewaren. |
| BEFORE FIRST PAYING CLIENT | Administratie en e-facturatie | Boekhouder bevestigt toepasselijkheid en factuurvelden; kies operationele uitgaande/inkomende gestructureerde B2B-facturatie, nummering, rekening, betaal-/creditnotaproces. Indien eerder zakelijke leveranciersfacturen: al vóór die transacties regelen. |
| BEFORE FIRST PAYING CLIENT | Toegang/incidenten/overdracht | Dossierlocatie, MFA/recovery, minimale rechten, beveiligde overdracht en intrekken toegang, datalek-/rechtenverzoekpad. Geen secrets in Git of chat. |
| CAN FOLLOW AFTER LAUNCH | Search Console, echte cases, procesoptimalisatie | Alleen na ownerkeuze; echte klantcases met toestemming. Geen fictieve sociale bewijskracht toevoegen. |

Publicatie van de juiste ondernemingsinformatie geldt ook wanneer de website niet rechtstreeks verkoopt. Prijzen voor consumenten moeten het te betalen totaal weergeven; een indicatieve scopeprijs blijft als zodanig herkenbaar. [FOD bedrijfswebsite](https://news.economie.fgov.be/203683-deze-info-moet-u-zeker-vermelden-op-uw-bedrijfswebsite/), [FOD prijsaanduiding](https://economie.fgov.be/nl/themas/verkoop/prijsbeleid/prijsaanduiding).

Bij een B2C-overeenkomst op afstand is doorgaans een herroepingstermijn van 14 dagen relevant. Laat informatie/modelformulier en eventueel uitdrukkelijk verzoek om vroege start passend uitwerken; ‘maatwerkwebsite’ op zichzelf niet als automatische uitsluiting gebruiken. Classificatie van deze concrete dienst en voorwaarden door jurist toetsen. [FOD informatieplichten](https://economie.fgov.be/nl/themas/ondernemingen/guidance/handelspraktijken/informatieverplichting-bij-e/veelgestelde-vragen-over-de).

Vanaf 1 januari 2026 vallen Belgische btw-plichtige B2B-transacties in beginsel onder gestructureerde e-facturatie; een e-mail met pdf volstaat daarvoor niet. Beperkte uitzonderingen en LK-toepassing door boekhouder bevestigen. [Officiële e-facturatie](https://efactuur.belgium.be/nl/article/voor-wie-wordt-e-facturatie-verplicht). Het gekozen 21%-model is geen bewijs van activering: [FOD tarieven](https://financien.belgium.be/nl/ondernemingen/btw/btw-plicht/tarieven-en-berekening/btw-tarieven), [aanvang activiteit](https://financien.belgium.be/nl/ondernemingen/btw/aangifte/aanvang-wijziging-einde-activiteit).

Toestemmingsregels beperken zich niet tot klassieke cookies; niet strikt noodzakelijke opslag/uitlezing vraagt in beginsel voorafgaande toestemming. Onderbouw de concrete hervatfunctie, voeg niet zonder diagnose een banner toe. [GBA cookies](https://www.gegevensbeschermingsautoriteit.be/professioneel/thema-s/cookies).

## Projectscope en revisies — voorstel, geen nieuw contract

Reeds publiek voorbereid: definitieve offerte na gesprek, klant levert teksten/logo/beelden met rechten, extra contentcreatie/licenties/scope vooraf begroten, 2–4 weken indicatief en oplevering na kwaliteitscontrole + akkoord. **Aantal revisierondes en contractuele grenzen nog niet besloten.**

Voorgestelde launch-scope ter ownerbeslissing:

- Leg per offerte pagina’s/secties, functies, formulieren, technische basis, assets en exacte leveringen vast. Nettobasisrange is geen automatische onbeperkte inclusielijst.
- **Voorstel: twee geconsolideerde feedbackrondes** binnen de overeengekomen richting. Correctie van aantoonbaar niet-conforme overeengekomen levering onderscheiden van nieuwe wens; wettelijke rechten niet beperken via revisietelling. Niet in website/contract gezet.
- Eén klantcontact bundelt feedback. Klant levert goedgekeurde teksten, logo’s en beelden met rechten. Copywriting/fotografie, nieuwe pagina’s, migratie en integraties alleen indien expliciet opgenomen.
- Externe licenties/abonnementen en domein apart benoemen; klantvertraging en ontbrekende input verschuiven planning volgens nog goed te keuren afspraken. Geen verzonnen boete of vervaltermijn.
- Meerwerk uitsluitend na schriftelijk scope-/kostenakkoord tegen €65/u excl. (€78,65 incl.) of afzonderlijke offerte. Geen minimumfacturatieblok of onbeperkte wijzigingen.
- Oplevercriteria, acceptatie, betaling, overdracht en begrensde nazorg expliciet opnemen; nog geen periode/voorschotpercentage vastgesteld. Laat B2C-voorwaarden juridisch aansluiten.

## Hosting & Care — aanbod correct, operatie nog niet bewezen

| Onderdeel | Huidige waarheid | Nog te bewijzen vóór verkoop / waar nodig vóór aanbodpublicatie |
|---|---|---|
| Provider + kostprijs | Geen geverifieerde klantprovider/kostenstaat | Hosting/domein/Formspree/licenties/backup/monitoring/admin en beheertijd per klant; providerlimieten en datalocatie. Eigen GitHub-sitehost is niet automatisch klantdienst. |
| SSL / beschikbaarheid | Commerciële belofte bestaat | Verlengingsbewaking, monitorfrequentie, alertontvanger en geslaagde alarmtest; geen 24/7-SLA. |
| Backup / restore | ‘Volgens afspraak’ | Scope, frequentie/retentie, onafhankelijke opslag waar nodig, verantwoordelijke en succesvolle proefrestore. Git alleen niet gelijkstellen aan volledige backup incl. mail/Formspree. |
| Updates/security | Relevante technische checks | Per stack bepalen wat bestaat en hoe opgevolgd; geen WordPress/pluginonderhoud beloven voor een statische site. |
| Mail/formulieren | Eigen mailboxketen bewezen | Klantmail/formulierkosten, quota, eigendom en support niet stilzwijgend inbegrepen. |
| Support | Rechtstreeks Lorenz; geen vastgestelde termijnen | Kanaal, werkdagen, ontvangst versus oplossing, urgentiepad en afwezigheidsfallback kiezen. Geen extra gratis supportbeloften. |
| Care-tijd | 30 minuten, niet opspaarbaar | Eenvoudig tijdlog: klant/maand/verzoek/raming/werkelijke minuten/restsaldo/vooraf akkoord. Startmaand/resetmoment en administratietijd nog besluiten. |
| Domein | Klant dag 1 officiële houder; eigen hosting toegestaan | Klantregistrantgegevens + eigen e-mail, LK beperkte beheer-/resellerrol, renewal/billing/transfer/authcode en exittoegang documenteren. |
| Stoppen/overdracht | Geen kunstmatige lock-in | Looptijd/opzegging, export, eigendom/licenties, finale rekening, continuïteit en verwijdering via goedgekeurde servicebijlage. |
| Incidenten | Geen uitgevoerd runbook bewezen | Melding → triage → provider/escalatie → communicatie → goedgekeurd herstel → verificatie/verslag; privacyroute bij mogelijk datalek. |

Rendabiliteitssignaal blijft: Care minus Hosting = €34,10 netto; 30 minuten tegen de verkoopreferentie €65/u = €32,50. Overblijvende €1,60 is **geen winstberekening**, want kosten en overige tijd ontbreken. Maximaal contentgebruik bij 10 klanten = 5 uur/maand, bij 100 = 50 uur vóór beheer/admin/incidenten. Geen prijswijziging; eerst echte kosten en tijdregistratie.

## E-mail en Formspree — hergebruikt bewijs

[Maildossier](LK-EMAIL-DNS-PRELAUNCH.md) blijft leidend. IMAP `imap.mailprotect.be:993 SSL`, SMTP `smtp-auth.mailprotect.be:465 SSL`, uitgaande authenticatie gebruikt inkomende gegevens; niets aangepast. Historische SPF/DKIM/DMARC PASS geldt voor de eerder onderzochte mail, niet als verzonnen nieuwe headercontrole.

Nieuwe mail: **LK WEBDESIGN**; reply/forward **LK Website- Antwoord**. Eén live formulierinzending en één reply bewezen op 27-09; reply in Hotmail-junk, juiste korte signature en linkdoelen. Veilig-afzenderactie bewijst geen universele inboxplaatsing. `Lorenz | LK Webdesign` blijft provideractie via geopend Combell-ticket; geen workaround. In deze master control geen UI-/mail-/DNS-mutatie en geen nieuwe echte submission.

## QA, bewijs en grenzen

Nieuwe passende controle: `npm run qa:medium -- --site lk --check functional,axe,static,tooling --run`.

| Onderdeel | Uitgevoerd / bewijs |
|---|---|
| Functioneel | **64 PASS**, twee bewuste desktop-skips van mobiele tests; mobiele equivalenten PASS. Bruto/netto, ongewijzigde nettoweights, offertegevallen, bewerkbare contactcontext, assistent, fout/succes/timeout/lock uitsluitend met mocks. |
| Axe | **86 rapporten, nul violations**. 129 incomplete-resultaatregels over die rapporten blijven handmatige aandachtspunten; geen claim van volledige WCAG-certificering. |
| Responsive/keyboard | Bestaande relevante flows mobiel + desktop; breedtechecks 320–1440 incl. tabletwaarden, tekstzoom en reduced motion. Nieuwe btw-captures 320/390/768/1440. Geen horizontale overflow in geteste states. |
| Visuele review | Home 320/1440, Aanpak 320 en Care-assistent 320 expliciet bekeken: bruto/netto leesbaar, aparte regels, geen afgesneden prijs/CTA. Geen redesign of baselineacceptatie. Overige captures beschikbaar in dezelfde run. |
| Static/tooling | HTML/JS/tooling nul errors; CSS nul errors, **85 bestaande warnings**, geen toename. Lokale links nul errors, **55 bestaande INFO/out-of-scope skips**. |
| Fallbacks/diff | `node scripts/lk-price-fallbacks.cjs` geslaagd; `git diff --check` geslaagd. Nettobron en statische fallback in sync. |
| Snapshot | Source `ddee9c681398049ff9448d496a5328671b110f70f3b57e47cba59183bcf10140`; config `9f8df7426a8a60ccc56ba8d780e095950cf8428423b868f8c5495f29621a2432`; baselinehash ongewijzigd. |
| Bewijsvalidatie | **74 nieuwe PASS-entries** na afloop via `reuseEvidence` met huidige snapshot en artifact-hashes gevalideerd. [Medium-run](test-results/qa-runs/lk-medium-3TxCIX/evidence.json), [auditverificatie](test-results/qa-runs/lk-inspection-3Wdp5x/prelaunch-control/verification.json). |

De eerste sandboxrun `lk-medium-SZZNCM` kon geen localhostserver starten (EPERM), dus geen browser-PASS. Daarna `lk-medium-kZPZa4`: 62 oude flows PASS; alleen de twee nieuwe fallbacktests faalden doordat bewust geaborteerde scripts consoleerrors veroorzaakten. Die testopzet is vervangen door een echte JavaScript-disabled context met de bestaande netwerkguard; de finale run hierboven slaagt. Tussentijdse twee CSS-warnings opgelost zonder rules uit te schakelen. Oude mislukkingen behouden, niet als product-PASS opgewaardeerd.

**Geen nieuwe volledige TECHNICAL_GATE_PASS.** De oude gate was vóór de btw-fix volledig herbruikbaar, maar bron/config zijn nu gewijzigd. Haar 35/35 visual-regression en Lighthouse 100/99 blijven historisch; niet op de nieuwe prijsweergave geplakt. Geen nieuwe assets/fonts/dependencies of performanceprobleem dat een Lighthouse-rerun voor deze MEDIUM-fix vereiste. Nieuwe prijsregels veranderen bewust bestaande screenshots; geen baselines automatisch accepteren. Vóór een finale launchstaat moeten passend actueel visual-/final-gatebewijs en owner-review worden afgesloten. Dit is geen reden om frozen demo’s te hertesten.

Publieke home/scripts/responseheaders en beginsnapshot zijn read-only bewaard in [auditbewijs](test-results/qa-runs/lk-inspection-3Wdp5x/prelaunch-control/). Geen brede account-, certificaatverval-, DNS-, fysieke-device-, Safari-, Firefox- of screenreadercertificering. Juridische/fiscale bronnen zijn op 27-09 geraadpleegd; toepasselijkheid op LK blijft door bevoegde adviseur te bevestigen, inclusief eventuele grensoverschrijdende offertes.

## Release Authority — definitieve voortzetting §§0–37

**27 september 2026. De opdracht is nu volledig ontvangen, inclusief vervolg §§24–37.** Deze sectie en de afsluiting A–K vervangen de eerdere open-vraag over ontbrekende opdrachttekst en verfijnen de historische conclusies hierboven. De bronkaart bovenaan is nadrukkelijk de kaart **vóór** de eerdere btw-fix. Actueel is de bewezen dubbele btw-presentatie; geen nieuwe websitewijziging gedaan in deze voortzetting.

Beslishiërarchie: actuele ownerbeslissingen → Commercial Requirements → Development Standard/AGENTS → implementatie → geldig QA-bewijs → productie → historie. Dit bepaalt de gewenste staat, niet de feitelijkheid van observaties: een ownerbesluit maakt een oude productieversie niet actueel. **SOURCE CONFLICT:** productie en oude rapporten bevatten andere prijzen/layouts dan de huidige lock. Oplossing is de gecontroleerde releaseprocedure, niet terugzetten van lokale code. De commerciële en technische brondocumenten blijven eigenaar van hun regels; dit masterrapport is eigenaar van de resterende prelaunchbesluiten.

### Eén centrale blocker matrix en vier gates

**A PUBLIC WEBSITE:** publiceerbare identiteit/fiscaliteit/privacy, waarheidsgetrouwe commerciële inhoud, geschikte hosting, veilige release en exacte ownergoedkeuring. **B FIRST PAYING CLIENT:** contracteren, betaling, administratie en klantproces. **C HOSTING/CARE:** aantoonbaar uitvoerbare recurring dienstverlening vóór verkoop/activering. **D GROWTH:** optimalisaties die kunnen wachten. B/C worden niet automatisch A: voor de publieke aanbodclaims moet wel aantoonbaar duidelijk zijn wat LK aanbiedt en kan leveren. Een algemene-voorwaardenpagina is niet op zichzelf een technisch vereiste voor een leadsite zonder checkout; passende voorwaarden moeten vóór contractering beschikbaar en aanvaard zijn.

| Item | Status | Evidence | Blocker type | Owner | Next action |
|---|---|---|---|---|---|
| Commerciële nettolock + calculator | PROVEN READY | commercial.js; 64 flowtests; hashverificatie | Geen | Lorenz bewaakt | Geen heropening zonder relevante fout |
| Dubbele btw-presentatie | PROVEN READY | Home/Aanpak/assistent/context en no-JS bewijs | Geen technisch; fiscale toepasbaarheid apart | Lorenz/boekhouder | Toepasbaarheid laten bevestigen |
| Registratie en fiscale identiteit | NEEDS OWNER ACTION | Geen definitieve bedrijfsfiche; ownerbevestiging | A; tevens B | Lorenz + ondernemingsloket/boekhouder | Business Data Block invullen en bevestigen |
| Privacyrollen, leveranciers, bewaartermijnen | NEEDS EXTERNAL CONFIRMATION | Datastromen hieronder; providercontracten niet ingezien | A | Lorenz + providers/privacyadviseur | Doel, rol, grondslag, retentie/doorgifte bevestigen |
| Publieke bedrijfsinformatie/privacylinks | NEEDS IMPLEMENTATION | Huidige footer/contact bevatten geen volledige informatie | A; afhankelijk van input | Codex na owner/legal akkoord | Alleen goedgekeurde feiten/tekst toevoegen |
| Hostingkeuze + account/releaseherstel | NEEDS OWNER ACTION | GitHub-respons/DNS; geen accountbewijs | A | Lorenz | Productieroute goedkeuren; account/recovery aantonen |
| Definitieve routes/headers/404 | NEEDS IMPLEMENTATION | Hostafhankelijke configuratie nog niet gekozen | A; afhankelijk van hostingbesluit | Codex na hostbesluit | Releaseconfig aan gekozen host aanpassen en testen |
| Omschrijving Hosting/Care uitvoerbaar | NEEDS OWNER ACTION | Commercial lock; operationele keuzes ontbreken | A voor claims; C voor verkoop | Lorenz | Servicegrenzen/kosten/runbook goedkeuren |
| Restore/monitoring/service-activatiebewijs | NEEDS IMPLEMENTATION | Hieronder ontworpen, niet uitgevoerd | C | Lorenz + provider/Codex | Testaccount/proefrestore en alarmtest na autorisatie |
| Offerte, scope, revisies en betaling | NEEDS OWNER ACTION | Geen vastgestelde rondes/termijn/voorschot | B | Lorenz | Beslismodel invullen; geen stilzwijgende standaard |
| B2C/voorwaarden/IP/late betaling | NEEDS EXTERNAL CONFIRMATION | Requirements aanwezig; geen juridisch akkoord | B; C voor servicevoorwaarden | Jurist + Lorenz | Exacte gekozen afspraken toetsen |
| Facturatie/e-facturatie | NEEDS OWNER ACTION | Administratiefiche ontbreekt | B; eerder indien transacties dit vereisen | Lorenz/boekhouder | Werkbaar ontvang-/verzend-/creditnotaproces |
| Mail + één Formspree-keten | PROVEN READY | LK-EMAIL-DNS-PRELAUNCH; één submission en reply | Geen voor bewezen transport | Lorenz | Bewijs behouden; geen tweede test |
| Afzendernaam Combell-ticket | NEEDS EXTERNAL CONFIRMATION | Outlook read-only; ticket open | Geen A-transportblocker; mailfinalisatie open | Combell/Lorenz | Providerantwoord verwerken; daarna gerichte identiteitstest |
| Hotmail-junk | NEEDS EXTERNAL CONFIRMATION | Retourtest 00:22 in junk | Deliverability-observatie, geen bewezen DNS-fout | Lorenz/provider | Opvolgen bij herhaling, geen configuratiewijziging |
| Functioneel/Axe/static/tooling huidige staat | PROVEN READY | 74 PASS-entries exact hergebruikt | Geen binnen bewezen dekking | Codex | Alleen geraakt bewijs later herhalen |
| Finale visual/Lighthouse/foundation en finale scope | REVALIDATION REQUIRED | Oude final-gate vóór btw; medium is geen volledige gate | A, na andere blockers | Codex | Plan K op definitieve staat uitvoeren/samenstellen |
| Definitieve visual/content/assetrechtenreview | NEEDS OWNER ACTION | Oude approval geldt voor andere bronstaat | A | Lorenz | Exacte release + screenshots accorderen |
| Oud publiek aanbod en layout | SUPERSEDED | Publieke snapshot versus lock | A-releaseverschil | Lorenz/Codex | Alleen gecontroleerd vervangen na toestemming |
| Website Engine/tooling/acquisitie/SaaS | POST-LAUNCH | Expliciete ownerafbakening §§24–31 | D | Lorenz | Geen launchwerk van maken |

### Volledige Local Final ↔ Production truth table

Productieobservaties: bewaarde GET/HEAD-snapshot circa 00:29–00:36 CEST; aanvullende favicon/OG/404 HEAD circa 00:51 CEST. Geen demo-functionaliteit opnieuw getest. ‘Niet bewezen’ betekent dat hier geen gelijkheid wordt geclaimd.

| Onderdeel | Local Final | Production | Match? | Launch impact |
|---|---|---|---|---|
| `/` | Driepagina-LK entrypoint | HTTP 200 oude homepage | Nee, inhoud | Nieuwe release vereist |
| Home | Compacte websitepositionering, demo’s, actuele CTA’s | Oud aanbod/AI-accent en pakketten | Nee | Exacte lokale content ter ownerreview |
| `/aanpak.html` | Aanpak, prijzen, calculator | HTTP 404 | Nee | Moet echte bereikbare pagina worden |
| `/contact.html` | Dedicated formulier + context | HTTP 404 | Nee | Moet echte bereikbare pagina worden |
| Projectroutes | `/#projecten`, geen zelfstandige projectdetailpagina’s | Oude `#voorbeelden`-sectie | Nee | Geen niet-bestaande detailroutes beloven |
| Demo’s | `demos/vakman/`, `demos/beauty/`, `demos/automotive/` | Productie niet bytegewijs vergeleken in deze audit | Niet bewezen | Link-/assetinventaris bij release; frozen Kelmora niet heropenen |
| Calculator | Centrale ranges, add-ons, outward €25, offertegevallen | Oud project.js | Nee | Alle lokale scripts als coherente set publiceren |
| LK Assistent | Actieve lokale keuzehulp | Preview-only/inactief | Nee | Geen AI-backend nodig; focus/context behouden |
| Formspree | Contact + endpoint mjyvnevy, mocks PASS | Homepage + zelfde endpoint, echte keten PASS | Endpoint ja; transportcode/pagina niet identiek | Bestaand bewijs met expliciete scope behouden |
| Prijzen | 995–1290 / 1390–1790 / 1790–2290; 9+ circa €2.300 netto | Start €1.190/Groei €1.990; oude services | Nee | Oude commerciële copy niet meenemen |
| VAT | Incl. 21% primair, netto secundair | Geen huidige dubbele presentatie | Nee | Fiscale toepasbaarheid vóór publicatie bevestigen |
| Navigation | Projecten/Aanpak/Contact | Oude sectieankers | Nee | Links/active state/mobilemenu smoke |
| Footer | Huidige routes/mail; nog onvolledige bedrijfsinfo | Oude footer/informatie | Nee/onvolledig | Identiteit/privacy gecontroleerd toevoegen |
| Privacy | Geen volledige verklaring/route in LK-kern | Geen volledige verklaring via onderzochte publieke navigatie aangetoond | Beide onvoldoende bewezen | A: gegevens + goedgekeurde tekst en links |
| Voorwaarden | Geen definitieve contractset | Niet publiek aangetoond | Geen gereedheid | B/C: voorwaarden vóór overeenkomst; webpublicatie volgens gekozen proces |
| Robots | Allow:/, sitemapverwijzing | Zelfde intentie | Ja qua policy | Preview niet indexeerbaar; live geen onbedoelde blokkade |
| Sitemap | Home/Aanpak/Contact | Alleen Home | Nee | Alle definitieve 200-canonicalroutes opnemen |
| Canonical | HTTPS non-www; `.html` subpagina’s | HTTPS non-www Home | Home ja, subpagina’s nee | Bij hostwijziging uiteindelijke URLs opnieuw afstemmen |
| Favicon | favicon.svg aanwezig | HEAD200 image/svg+xml | Beschikbaar; bytegelijkheid niet vastgesteld | Klein releaseasset, geen redesign |
| OG metadata | Unieke paginametadata; gedeelde logo-PNG | Oude Home-metadata; PNG HEAD200 | Asset beschikbaar, content niet gelijk | Definitieve URLs/titles + preview controleren |
| 404 | Geen eigen 404.html | Willekeurig onbekend pad HTTP404, GitHub-default | Eigen ontwerp afwezig | Echte 404 vereist; custom uiterlijk op zichzelf geen blocker |
| Assets | WebP-logo, projectbeelden, final/slice-one/home/approach/assistant styles, centrale JS | Oudere assetset; commercial.js404 | Nee | Manifest, MIME, status, cache en ontbrekende bestanden controleren |

De projectdemo’s behouden hun fictieve labels. Geen nieuwe demo, geen nieuw klantbewijs. De gepubliceerde OG-PNG is circa 969 kB; dit is een deelafbeelding, niet vanzelf een paginalaad-LCP-regressie. Een aparte geoptimaliseerde deelafbeelding is POST-LAUNCH tenzij een concrete platformfout optreedt.

### Productiearchitectuur: bevindingen en aanbeveling

Read-only DNS: apex A = `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`; geen AAAA-antwoord in deze lookup. Nameservers `ns1.combell.eu`, `ns3.combell.net`, `ns4.combell.net`; `www` CNAME `lk080.github.io`. Dit bewijst Combell-DNS en GitHub-routing; niet de actuele mailboxinstellingen opnieuw. Geen MX/SPF/DKIM/DMARC-mutatie of herdiagnose.

Repository: lokale branch `main`, HEAD `fbdb1ef` (‘Optimize LK Codex workflow efficiency’), met ongecommit werk. Historische deploybron `main:/docs` en repo `Lk080/LK-webdesign`; actuele remote Pages-settings/deploycommit niet ingezien. Geen `.github`-workflow aangetroffen. `.openai/hosting.json` is een historische andere configuratie, geen bewijs van actuele productie. Owner moet het echte Pages/deploy-dashboard en recovery-toegang verifiëren vóór migratie of release.

HTTPS en apex/www-redirects zijn hierboven bewezen; certificaatverval/automatische vernieuwing nog providerbewijs. Home-cache `max-age=600` met ETag. In de onderzochte Home-response ontbreken CSP-, Referrer-Policy-, nosniff- en frame-ancestors/X-Frame-Options-headers; lokale HTML heeft wel meta-CSP en referrer policy. De GitHub-default 404 heeft een eigen CSP: dat bewijst geen beveiligingsheader op de homepage. Rollback is theoretisch herpublicatie van een bekend artifact/commit; actuele werkende toegang en proefherstel zijn niet bewezen.

**RECOMMENDED PRODUCTION ROUTE: betaalde Combell-webhosting voor de eigen LK-site, onder voorbehoud van ownerkeuze en bevestigde prijs/contract/configuratie.** Reden: gewone statische bestanden kunnen overdraagbaar blijven, bestaand domein/DNS/mailbeheer hoeft niet naar andere nameservers, en een zakelijke provider kan de gekozen service ondersteunen. Dit is een aanbeveling, geen aankoop/migratie en geen automatische keuze voor alle klantwebsites. Er is geen prestatiemeting op die host en geen gegarandeerde LK-SLA afgeleid van providermarketing.

| Criterium | GitHub Pages behouden | Combell betaalde webhosting | Cloudflare Pages |
|---|---|---|---|
| Commercieel gebruik | Specifieke toepassing niet geverifieerd passend bij Pages-beperkingen | Zakelijk hostingproduct; exacte contract/order bevestigen | Geen persoonlijke-only beperking aangetroffen in Pages-productinfo; voorwaarden/DPA voor gebruik bevestigen |
| Kosten/limieten | Huidige accountkosten niet ingezien | Business toont €5,99/mnd eerste jaar, regulier €19,49; 50 GB, 4 sites; btw/billing/offerte nog bevestigen | Free product; 500 builds/mnd, 1 tegelijk, 20.000 bestanden, 25 MiB per asset; 100 projecten/account |
| Performance/betrouwbaarheid | Bestaande CDN/TLS; oude liveversie | Nog meten; providerbackup/support, geen LK-uptimegarantie | Edge CDN/TLS; nog meten op eigen artifact; geen free-SLA veronderstellen |
| Domein/SSL | Nu werkend | Domein kan blijven; A/www/TLS exact voorbereiden | Apex vereist Cloudflare-zone/nameservers; mailrecords volledig behouden; subdomein kan externe DNS gebruiken |
| Preview/rollback | Huidig proces niet bewezen | Afgeschermde staging en versioned artifact/proefrestore ontwerpen; niet als inbegrepen automatische feature claimen | Git-previews; rollback naar eerdere succesvolle productie; previews standaard openbaar |
| Security/onderhoud | Beperkte custom responseheaders; statisch eenvoudig | Header-/404-config en veilige upload/rechten bevestigen; geen CMS toevoegen | `_headers` beschikbaar; preview Access/noindex bewust regelen; geen Functions nodig |
| Schaalbaarheid | Geen basis voor onbegrensde commerciële klantdienst | Per klant geïsoleerde toegang/kost/plan; 4 sites niet gelijk aan 4 veilig beheerde klantcontracten | 100-projectlimiet relevant bij groei; niet alle klanten automatisch in één account |
| Eenvoud/overdracht | Git-afhankelijk deployproces | Bestandsdeploy portable; backup en manifest nodig | Git + providerconfig; HTML portable, DNS/deployconfig overdracht documenteren |
| Lock-in/risico | Bestaand account/sourcebewijs ontbreekt | Providerconfig/restoreproces vastleggen; klant eigenaar houden | Extra DNS- en routegedrag; expliciete exit/export noodzakelijk |

Bronnen: [Combell webhosting](https://www.combell.com/nl/hosting/webhosting), [Cloudflare Pages product](https://www.cloudflare.com/products/pages/), [Pages-limieten](https://developers.cloudflare.com/pages/platform/limits/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), [rollbacks](https://developers.cloudflare.com/pages/configuration/rollbacks/), [previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/), [headers](https://developers.cloudflare.com/pages/configuration/headers/). Prijsobservatie is geen definitieve offerte. Geen kostenmarge berekend op een onbevestigde btw-basis. **SOURCE CONFLICT:** marketing ‘unlimited sites’ mag de gedocumenteerde 100-projectlimiet niet overrulen.

Specifieke Cloudflare-routevoorwaarde: `.html` URLs redirecten standaard naar extensionless URLs en zonder top-level 404 wordt SPA-fallback toegepast. Bij die keuze eerst canonical/sitemap/linkstrategie en een echte 404 vastleggen; dit is geen drop-in hostwissel voor de huidige multipagecanonicals. Geen custom cache toevoegen zonder bewijs; stale JS/CSS voorkomen. [Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/).

### Data-flow & privacy map

Scope: de drie LK-kernpagina’s en hun geladen scripts; geen volledige netwerkaudit van frozen demo’s of provideradmin. Broninspectie vond één externe fetch naar Formspree, Google-fonts en lokale scripts; geen analytics-SDK, externe embed, AI-call of eigen cookiecode in deze kern. Dat is geen bewijs dat providers nooit cookies/logs gebruiken.

| Systeem | Data | Doel | Derde partij | Storage/cookie | Privacy action |
|---|---|---|---|---|---|
| Contactformulier | Naam, e-mail, optionele website, bericht, gekozen projectcontext | Aanvraag behandelen | Formspree; later Combell/Outlook | Formspree-account + mailkopieën; retentie onbekend | Verklaring nodig; rollen/DPA, quota, retentie, doorgifte en verwijderproces bevestigen |
| Formspree-notificatie/reply | Aanvraagtekst, afzender/Reply-To, mailheaders | Ontvangst en persoonlijk antwoord | Formspree, Combell, ontvangende provider; Microsoft-client | Mailservers en lokale/sync-clients; precieze cloudroute niet geïnspecteerd | Ontvangers/toegang/retentie bepalen; geen onbekende Microsoft cloudopslag als feit claimen |
| LK Assistent | Geselecteerde scope/service/project/scherm, geen vrije chat of AI | Keuzehulp en hervatten | Geen externe AI-provider | sessionStorage, gelezen bij initialisatie | Noodzakelijkheid hervatfunctie/toestemmingsuitzondering juridisch onderbouwen; transparant uitleggen |
| Calculator | Vaste keuzes en berekende indicatie | Prijsrichting | Geen aparte derde | In geheugen; context via URL/assistent | Geen trackinggrondslag verzinnen; beperk context tot keuzes |
| Queryparameters | Scopekeuzes/service/project/situatie | Overdracht naar contact | Host kan URL loggen | Browsergeschiedenis, hostlogs; context wordt bij submission meegestuurd | Geen naam/mail/vrije klanttekst in URLs; allowlist behouden; retentie hostlogs bevestigen |
| localStorage/cookies | Geen toepassing in onderzochte LK-kerncode | Niet aangetroffen | Geen geïdentificeerd | Geen eigen persistente cookie aangetroffen | Geen banner wegens niet-bestaande analytics; provider/storagebeoordeling apart |
| Google Fonts/preconnect | IP/browserrequestmetadata; concrete providerlogging onbekend | Typografie | Google fonts.googleapis.com/gstatic.com | Netwerk/cache; geen cookie-implementatie aangetroffen in bron | Transparantie en transfer/grondslag bevestigen; lokaal hosten alleen na gerichte beslissing |
| Hosting/CDN | IP, URL, tijdstip, requestheaders mogelijk in logs | Websitelevering/veiligheid | Nu GitHub/Fastly; toekomstige host nog kiezen | Cache en providerlogs, bewaartermijn niet ingezien | Providerbeleid/rollen/retentie opnemen |
| Externe scripts/embeds/analytics | Geen geladen externe JS/iframe/analytics in LK-kern aangetroffen | Niet van toepassing | Geen aangetroffen | Geen aangetroffen | Nieuwe analytics/tracking vereist apart ownerbesluit en privacyreview |
| Portfolio-demo-links | Navigatie naar aparte statische demo | Demonstratie | Afhankelijk van demo-assets; niet opnieuw onderzocht | Demo-eigen scope | Geen reële klantdata invoeren; bestaande freeze respecteren |

**Technische conclusie:** privacyverklaring nodig voor contact en externe diensten. Voor niet aangetroffen analytics/tracking is momenteel geen consentmechanisme nodig. Over sessionStorage en eventuele providertechnieken: **LEGAL CONFIRMATION REQUIRED**; geen onvoorwaardelijke ‘cookieconsent niet nodig’ claim voor de hele site. Geen banner of tracking geïmplementeerd. Zelf hosten van fonts kan een datastroom verminderen, maar gebeurt niet als ongevraagde optimalisatie.

### Owner Business Data Block — uitsluitend ontbrekende gegevens

| Ontbrekend veld | Vereiste fase | Afsluitbewijs |
|---|---|---|
| Officiële ondernemingsnaam + rechtsvorm | A | Definitieve registratie/bedrijfsfiche; handelsnaam onderscheiden |
| KBO-ondernemingsnummer | A | Registratie verifieerbaar, geen placeholder |
| Btw-identificatie + activeringsdatum/toepasbaarheid21% | A | Boekhouder/loket bevestigt; niet afleiden uit gewenste regeling |
| Publiceerbaar vestigings-/geografisch adres | A | Owner bevestigt juiste wettelijke adresgegevens |
| Bankrekening, facturatieverantwoordelijke, nummering/creditnota/e-facturatieproces | B, vóór eerste factuur/transactie waar toepasselijk | Werkende administratiefiche, alleen benodigde gegevens delen |
| Zakelijk telefoonnummer/contactroute voor B2C-overeenkomsten | B; websiteplicht met jurist afstemmen | Bereikbaar nummer indien wettelijk vereist; aparte eSIM is optionele uitvoering, geen automatisch launchblocker |
| Eventuele beroeps-/vergunnings-/registervermeldingen | Alleen indien toepasselijk, A/B | Adviseur bevestigt toepasselijkheid; niet verzinnen |

Zakelijke e-mail `info@lkwebdesign.be`, B2B+B2C-keuze en gewenste prijsstrategie zijn bekend: niet opnieuw vragen. Geen wachtwoorden, identiteitsdocumenten of volledige bankgegevens nodig in chat om dit plan goed te keuren.

### Legal readiness — requirements, geen contract

| Document/onderdeel | Vereiste inhoud en beslissing | Goedkeuring |
|---|---|---|
| Website | Werkelijke identiteit/contact; privacydoelen/categorieën/ontvangers/retentie/rechten/contact/doorgiften; storagebeleid indien relevant; indicatieve scope + totaal incl. btw en netto secundair | Lorenz levert feiten; privacy/juridisch adviseur toetst; boekhouder fiscale toepassing |
| Offerte | Exacte pagina’s/functies/opleveringen, uitsluitingen, vaste prijs/range→definitieve prijs, btw, externe terugkerende kosten, geldigheidsduur, planningvoorwaarden, revisies, content/rechten, betalingsmijlpalen en acceptatie | Lorenz beslist; juridisch/boekhoudkundig toetsen vóór gebruik |
| Algemene voorwaarden | Totstandkoming/versieakkoord, betaling en betwisting, vertraging, annulering, proportionele aansprakelijkheid, IP/derdenlicenties, klantmateriaal, oplevering/acceptatie, B2B/B2C-differentiatie en consumentenrechten | Jurist; geen door Codex gekozen aansprakelijkheidslimiet/boete/rechtbank |
| Hosting/Care-bijlage | Provider/rol, concrete scope/exclusies, supportvenster en urgentie, geen onrealistische SLA, backup/restore, minuten/meting, vooraf meerwerkakkoord, kosten/domein, looptijd/opzegging, continuïteit/export/verwijdering | Lorenz + provider voor haalbaarheid; jurist voor werking |
| B2C-opdracht op afstand | Informatieplichten, herroepingsinformatie/modelformulier en passende vroege-startprocedure; maatwerk niet automatisch uitsluiting | Juridische bevestiging vóór contracteren |

De officiële FOD/GBA/efactuur-bronnen en hun toepasselijkheidsgrenzen staan in de eerdere legal-sectie. Deze specificatie is een invul-/reviewopdracht, geen definitieve juridische tekst. Websitevoorwaarden en betaalregeling niet publiceren als stilzwijgend besloten.

### Scope-creep firewall en betalingsbesluit

**Vóór klant 1 per offerte invullen:** inbegrepen pagina’s/secties, ontwerpuitwerking, afgesproken formulier/functies, responsive/technische SEO/QA-basis, levering en expliciete uitsluitingen. Een paginarange is geen onbeperkte scope. Klant levert goedgekeurde tekst/logo/foto’s, gebruiksrechten, bedrijfsfeiten, één gebundelde feedbackset en expliciete eindgoedkeuring. Een correctie herstelt een aantoonbare afwijking van de afgesproken levering; een change request voegt/wijzigt overeengekomen scope. Correcties/wettelijke rechten niet wegboeken als betaalde wens.

**Revisierondes: OWNER DECISION REQUIRED.** Het eerdere voorstel van twee rondes is niet goedgekeurd. Ook feedbacktermijn/acceptatieprocedure nog kiezen. Nieuwe pagina, andere ontwerprichting, nieuwe functie, inhoudsproductie of wijziging na goedgekeurde scope = vooraf ramen en schriftelijk akkoord op €65/u excl. of aparte offerte. Geen unlimited revisions, minimumblok of gratis aanvullende dienstverlening veronderstellen.

**Betaling: OWNER DECISION REQUIRED.** Repository noemt overdracht na volledige betaling maar legt geen voorschot, percentages, vervaltermijn of abonnementsincasso vast. Maximaal drie opties ter bespreking: (1)50% bij start/50% bij afgesproken oplevering; (2)30% start/40% na ontwerpgoedkeuring/30% bij oplevering; (3)één factuur bij afgesproken oplevering voor kleine scopes. Geen optie gekozen. Lorenz kiest mijlpalen en betaaltermijn, boekhouder/jurist toetsen btw/voorschotfactuur/B2C en wanbetaling. Recurring start/factuurmoment, betaalmethode, herinnering/betwisting/opschorting, proportionaliteit en continuïteit apart vastleggen. Geen betaalintegratie bouwen.

### Hosting/Care — minimaal ontworpen operationeel systeem

Onderstaande is een **voorstel ter ownergoedkeuring**, niet een reeds actieve service of nieuw contract. Gebruik één klantdossier met servicefiche, kostenstaat, wijzigingslog en restorebewijs; geen CRM of nieuwe tooling nodig.

| Onderdeel | Concreet te vullen proces | DONE-bewijs vóór verkoop/activering |
|---|---|---|
| Provider/kosten | Per klant plan, renewalprijs/btw, quota, hosting/mail/form/licenties/monitor/backupkosten, factureerder en beheertijd vastleggen | Providerorder/voorwaarden + volledige maand/jaarkostenstaat |
| Domein | Dag 1 klant als registrant met eigen mail; LK beperkte beheerder/reseller; registratie/renewalprijs apart; vervalalerts naar verantwoordelijke en klant | Registrantbewijs en toegang/renewalprocedure; stoppen met Care verandert eigendom niet |
| SSL/monitor | Voorstel: HTTPS/status- en certificaatmonitor op gekozen interval, alert naar Lorenz, fallback bij afwezigheid; geen 24/7-belofte | Interval/supportvenster gekozen, gecontroleerde testalert ontvangen |
| Backup | Voorstel: versioned siteartifact + configmanifest bij iedere release; providerbackupretentie bevestigen; veilige onafhankelijke kopie/recovery; mail/Formspree apart behandelen | Locatie, retentie, toegang en restorebereik in servicefiche |
| Restore | Herstel naar geïsoleerde staging, vergelijk manifest/routes/assets/forms met mocks; meet tijd en documenteer verliesvenster | Geslaagde proefrestore met datum, versie, duur en verifier; pas daarna hersteldoel beloven |
| Deployment | Alleen gereviewd artifact + QA/ownerakkoord; staging→release met vorige versie gereed; geen directe ongecontroleerde edits op live | Releasechecklist, artifacthash en rollbackinstructie |
| Incident | Triage impact/mail/data; providerescalatie; klant informeren volgens gekozen venster; herstel goedkeuren/uitvoeren; verifiëren/verslag; privacyincident naar verantwoordelijk adviseur | Runbook, providercontact, fallbackpersoon en droge oefening |
| Formulieren | Klantspecifieke eigenaar/recipient/quota/spamplan en kosten; alert bij quota/fout, geen standaard echte test zonder toestemming | Plan/limieten + mockbewijs; echte acceptatietest alleen afgesproken |
| Support | Voorgesteld kanaal zakelijke mail; owner kiest werkdagen/reactievenster/urgentie/afwezigheidsroute; ontvangst≠oplossingsgarantie | Servicebijlage + intern rooster; 24/7-support van de provider is geen 24/7-support door LK |
| Exit/cancellation | Eigen-hostingoptie, exportbestanden/config, domeintransfer, beveiligde credentialoverdracht, beperkte nazorg, toegangsintrekking en verwijdertermijn juridisch afstemmen | Exitchecklist + voorbeeldexport; klant behoudt domein en eigen toegang |

**Care ‘kleine wijziging’:** bestaande tekst/openingsuren/contactdetail aanpassen of bestaande afbeelding vervangen met aangeleverd gebruiksklaar materiaal, mits binnen bestaande component/scope en beschikbare tijd. Nieuwe pagina/redesign/functie/integratie/complexe SEO/copywriting/fotografie/uitgebreide invoer/spoedproject valt niet automatisch onder 30 minuten. Scope en raming eerst delen; werk boven resterend saldo pauzeren tot expliciet meerwerkakkoord.

**Minutenvoorstel:** timer per geautoriseerde taak, log werkelijk bestede minuten met datum/verzoek/raming/resultaat; intern geen afronding naar fictieveblokken van 30 minuten. Externe factuurafronding en of communicatie/QA meetelt zijn nog ownerbesluiten. Registreer ook niet-factureerbare tijd. Maandgrens/resetmoment kiezen; ongebruikte minuten vervallen volgens de bestaande non-rolloverlock. Klant krijgt bij verzoek resterend saldo/raming en na uitvoering gebruikte minuten/restsaldo. Geen uren boven budget zonder voorafgaand akkoord; €65/u excl. blijft lock.

| Aantal Care-klanten | Maximale inbegrepen wijzigingstijd/mnd | Care-omzet netto/mnd | Hosting-only omzet voor hetzelfde aantal | Verschil Care−Hosting vóór alle kosten |
|---:|---:|---:|---:|---:|
|10|5 uur|€590|€249|€341|
|25|12,5 uur|€1.475|€622,50|€852,50|
|50|25 uur|€2.950|€1.245|€1.705|
|100|50 uur|€5.900|€2.490|€3.410|

Dit is capaciteit en omzet, geen winst. Extra tijd voor monitoring, support, beheer, incidenten, administratie en acquisitie komt erbovenop. 30 minuten × €65/u is €32,50 verkoopreferentie, geen intern uurkostbewijs; het verschil van €1,60 met €34,10 Care-upgrade bewijst noch winst noch verlies. Als echte kosten/tijd niet binnen het aanbod passen: **OWNER COMMERCIAL DECISION REQUIRED**; prijs/pakket niet automatisch aanpassen. Bij100 klanten eerst vervangbaarheid en incidentcapaciteit aantonen, niet alleen50 uur rekenen.

### Customer operating system — uitvoerbaar zonder nieuw CRM

Eén dossier per klant: intake, scope/offerteversies, akkoord, administratie, contentrechten, tijdlog, QA, release/overdracht en servicefiche. Elke stap heeft een expliciet stop-/exitcriterium.

| Stap | Input | Owner | Klantactie | Document | Approval / exitcriterium |
|---|---|---|---|---|---|
| Lead | Aanvraag | Lorenz | Vraag/contactgegevens | Leadnotitie | Rechtmatige opslag + ontvangst/volgende stap |
| Kwalificatie | Doel/budget/planning | Lorenz | Context bevestigen | Kwalificatienotitie | Passend project of duidelijke afwijzing |
| Intake | Bedrijfsdoel/content/systemen | Lorenz | Input/constraints leveren | Intake | Begrip door klant bevestigd |
| Scope | Intake + prijsrichting | Lorenz | Pagina’s/functies/prioriteiten kiezen | Scopelijst | Inclusies/exclusies meetbaar |
| Offerte | Scope, bedrijfsfiche, kosten | Lorenz | Offerte/voorwaarden lezen | Genummerde versie | Bedrag/btw/betaling/revisies/termijn volledig |
| Akkoord | Exacte offerteversie | Klant + Lorenz | Schriftelijk akkoord; B2C-proces waar nodig | Akkoordregistratie | Geen bouwen op impliciete toestemming |
| Betaling | Gekozen model | Lorenz/boekhouder | Verschuldigde stap betalen | Factuur/betalingsbewijs | Contractuele startvoorwaarde voldaan |
| Content | Contentlijst | Klant | Definitieve teksten/assets/rechten | Contentmanifest | Vereiste input compleet of expliciet faseren |
| Build | Scope + content | Lorenz/Codex | Vragen beantwoorden | Versiebeheer/werklog | Scope gerealiseerd; geen stille uitbreiding |
| Review | Afgeschermde preview | Klant/Lorenz | Gebundelde feedback | Revisielog | Afgesproken rondes en correcties afgehandeld |
| QA | Kandidaatrelease | Lorenz/Codex | Feitelijke inhoud bevestigen | Actueel QA-bewijs | Technische dekking sluitend, warnings beoordeeld |
| Owner approval | Exacte versie/screenshots | Klant voor klantwebsite; Lorenz intern | Expliciete content/visual/liveganggoedkeuring | Goedkeuringsbewijs | Techniek en menselijke approval beide aanwezig |
| Launch | Approval + backup | Lorenz | Tijdstip/impact akkoord | Release/rollbacklog | Geautoriseerde deploy + smoke; DNS apart akkoord |
| Handover | Gevalideerde productie | Lorenz | Toegang/levering bevestigen | Overdracht/credentials via veilig kanaal | Rechten/bestanden volgens betalingsafspraak geleverd |
| Care/Hosting | Aparte servicekeuze | Lorenz + klant | Optioneel contract kiezen | Servicefiche | Gate C geslaagd; eigenaar/kosten/start duidelijk |
| Nazorg | Oplevering/servicegrenzen | Lorenz | Issues gericht melden | Nazorglog | Correctie vs nieuw werk helder; geen onbeperkte gratis zorg |

### Tijd- en margemetingen vanaf klant 1

Logvelden: klant/project-ID, datum, categorie, taak, start/einde of werkelijk aantal minuten, geraamd, factureerbaar ja/nee, scope/revisie/change-request, akkoordreferentie en kostenbon. Categorieën exact: prospecting, intake, offerte, design, development, content, communicatie, revisions, QA, deployment, administration, aftercare. Ook misgelopen leads en niet-factureerbare tijd registreren, zonder die dubbel aan projecten toe te rekenen.

Projectreview: netto-omzet exclusief doorlopende services, externe projectkosten, totale werkuren, afwijking raming, effectieve opbrengst per uur vóór interne overhead/belastingen. Formule bijdrage vóór interne arbeid/overhead = netto-omzet − directe externe kosten; effectieve uur-opbrengst = die bijdrage / alle toerekenbare uren. Pas met een gekozen interne kostbasis een margeschatting maken. Care afzonderlijk per maand meten; geen btw als omzet tellen.

Na klant 1: ontbrekende categorieën en grootste overruns. Na klant 3: terugkerende scope-/content-/revisieproblemen. Na klant 5: mediaan en spreiding per projecttype, change-requestdiscipline en werkelijke Care-belasting. Na klant 10: capaciteit, herstel/overdracht en onderbouwd prijs-/scopevoorstel aan owner. Geen automatische prijsverhoging; commercial lock blijft totdat Lorenz anders besluit.

### SEO, accessibility en performance releaseaudit

**LAUNCH SEO:** drie unieke titles/descriptions/canonicals, één H1 per pagina, headings H1→H2→H3 zonder aangetroffen niveauoverslag; OG/Twittertags, favicon en JSON-LD aanwezig. Image-inspectie: alle tien img-elementen over de drie pagina’s hebben alt, width en height; onderliggende beelden grotendeels lazy, bovenste logo/hero niet onnodig lazy. Lokale link/staticcheck nul errors blijft geldig. JSON-LD heeft business@id en pagina-about, maar echte bedrijfsfeiten blijven ownerinput. Robots/sitemap pas beoordelen tegen werkelijke finale hostroutes; geen Search Console-indexering als bewezen resultaat claimen. Echte404 vereist; merkcustom 404 optioneel als host reeds correct404 levert. Contactadres consistent met info@lkwebdesign.be. Publieke routes ontbreken nu: dit is deploymentdelta, geen aanleiding tot massale nieuwe content.

**POST-LAUNCH SEO:** Search Console/eigendom, Google Business Profile na correcte bedrijfsgegevens/geschiktheid, echte cases en toestemming voor reviews, zoekvraaganalyse en gerichte content. Geen rankinggarantie/keywordstuffing/automatische plaatsnamenpagina’s.

**Accessibility:** huidig medium dekt functionele focus/modalrestoration, labels/errors, progressive disclosure, mobiele interactie, zoom/reducedmotion en Axe op de geregistreerde states. Handmatige historische review omvat keyboard/200%/responsive; de nieuwe btw-captures zijn apart visueel bekeken. 86 Axe-rapporten met nul violations is geen volledige WCAG-claim; 129 incomplete-resultaatregels vereisen gerichte beoordeling in de finale relevante states. Contrast, touch targets, dialoogfocustrap/terugkeer, landmarks en foutmeldingen op later toegevoegde legal/hostroutes opnieuw controleren. Geen nieuwe fysieke iPhone-, Safari-, Firefox- of screenreader-PASS uit deze audit afleiden.

**Performance:** historische Lighthouse desktop 100/mobile 99 blijft historische gate vóór de btw-fix; geen nieuwe score verzonnen. LCP/CLS/TBT op definitieve release meten met dezelfde runner/budgetten; TBT is labproxy, geen bewezen veld-INP. Huidige bron gebruikt gedimensioneerde WebP/JPEG-beelden, lazy offscreenbeelden, lokale vanilla JS/CSS, geen analytics/AI-SDK; externe fonts voegen netwerk-/privacyafhankelijkheid toe. Niet alle JPEGs blind naar AVIF converteren, geen preload zonder gemeten critical-pathwinst. Nieuwe provider/cache/headers of extra legalassets kunnen bewijsscope wijzigen; dan gericht meten. Geen nieuwe dependencies, minifier of framework om een goede score te ‘verbeteren’.

### Security & recovery review

Nieuw auditbewijs: [release-authority](test-results/qa-runs/lk-inspection-BwiUF3/release-authority/). Patternscan van 69 huidige tekstbestanden in docs/scripts/tests/.github: nul matches voor de gekozen private-key/token/secret-assignmentpatronen, geen waarden gelogd. Dit is geen volledige secretscanner of volledige Git-historieaudit. `npm audit --json --ignore-scripts` op 27 september: 0 bekende kwetsbaarheden, 312 dependencyentries; geen install/upgrade/fix. Packages zijn developmenttools, geen runtimebackend. Eerste sandboxpoging had DNS-fout, tweede toegestane read-only poging slaagde. De formele QA-snapshot is onveranderd en 74 PASS-artifacts zijn opnieuw geverifieerd.

| ID / ernst | Bewijs | Impact en minimale vervolgstap | Gate |
|---|---|---|---|
| SEC-01 / medium hardening | Lokale HTMLregel2 meta-CSP/referrer; onderzochte publieke Home geen relevante responseheaders | Meta-CSP beschermt niet met frame-ancestors. Gekozen host moet passende CSP/headerpolicy kunnen leveren; CSP met bestaande hashes/origins testen, geen blind unsafe-inline of HSTS-preload. Geen exploit aangetoond. | A hostconfigreview; ontbrekende header alleen is geen bewezen incident |
| SEC-02 / medium operational | Backup/restore/remote deployrechten niet geverifieerd | Verkeerde release of accountverlies kan herstel vertragen. Bekend artifact, least-privilege/MFA/recovery, stagingrestore en rollbackbewijs regelen. | A voor eigen release; C voor klantservice |
| SEC-03 / laag–medium abuse | contact.js endpointallowlist op regel 9, honeypot op regel 91, fetch op regel 111; clientlock/timeout; providerquota niet ingezien | Browservalidatie/honeypot voorkomt geen directe POST-spam. Providerrestricties, quota-alerts en recipientbevestiging read-only vastleggen; geen live abuseprobe/CAPTCHA toevoegen zonder aanleiding. | C klanten; A eigenformulierquota/privacykennis |
| SEC-04 / informatief | request-context.js gebruikt textContent; assistant.js DOM-creatie; commerciële keuzes via allowlists | Geen innerHTML/eval/externe JS-sink aangetroffen in gescande LK-kern. Context blijft data; behoud bounds/URLallowlist. Geen bewijs van volledige pentest. | Behouden |

Formspree-endpoint is publiek routing-ID, geen geheim. `form-action 'none'` hoort bij de huidige fetch/JavaScript-formulierroute; niet zonder functionele diagnose versoepelen. Lokale 500/timeout/netwerkfouten worden met mocks getest. API-keys/wachtwoorden niet aangetroffen in gescande scope; negeerbestanden, vaults, accountrechten en volledige commitgeschiedenis niet als gecontroleerd afvinken. Geen beheersecrets uit Keychain lezen.

Recovery-ontwerp: vóór toegestane release publicsnapshot + assetmanifest + bronartifact + relevante hostconfig veilig vastleggen; secrets apart. Deployfailure: stop verdere release, leg fout vast, herstel laatste goedgekeurde versie, controleer HTTPS/routes/assets/form UI met mocks en contacteer owner. DNS terugzetten uitsluitend als noodzakelijk en apart goedgekeurd, rekening houdend met TTL; geen mailboxrecords raken. Git alleen dekt mail/Formspree/accountrecovery niet.

### Client ownership & exit — beleid versus bewijs

Beleid is vast: klant vanaf dag 1 domeinhouder met eigen gegevens/e-mail; LK mag beheerder/reseller zijn; eigen hosting toegestaan; stoppen met Care betekent geen domeinverlies. Operationele bevestiging bij iedere klant vereist registrantbewijs, eigen toegang/MFA/recovery, gedelegeerde LK-rol, renewalverantwoordelijke, overdraagbaar source/artifact/configmanifest, licenties/IP-afbakening en export/transferpad. Credentials uitsluitend via veilig afgesproken kanaal, nooit in Git/chat. Na overdracht toegang intrekken en gegevens volgens goedgekeurde termijn verwijderen. Geen providerafhankelijkheid verbergen; geen fictieve transferdeadline/kosten of gratis onbeperkte overdracht beloven.

### Engine, development environment en business launch

**POST-LAUNCH SYSTEM IMPROVEMENT:** Website Engine pas extraheren uit echt hergebruikte projectpatronen. Mogelijke contracten: initialisatie/nav/responsive/formstates/a11y/SEO/metadata/robots/sitemap/performance/images/privacy/security/deploy/QA/delivery. Geen standaardhero/sectievolgorde/kleuren/fonts/beeldtaal afdwingen; iedere klant eigen identiteit. Geen enginewerk nodig gevonden om huidige blockers te sluiten.

**POST-LAUNCH TOOLING REVIEW:** bestaande Playwright/Axe/Lighthouse/visualregression/LK-skills/standards behouden. Gerichte browserinspectie vóór snapshot; volledige snapshot alleen noodzakelijk; visuele beoordeling vereist screenshots. Geen MCP/package/skill/framework geïnstalleerd. Nieuwe tool alleen voorstellen bij bewezen onoplosbaar probleem of meetbare winst met aanvaardbaar onderhoud.

**POST-LAUNCH / BUSINESS LAUNCH:** inventaris, geen uitvoering: Google Business Profile, Instagram, passend LinkedIn-gebruik, WhatsApp Business, Belgisch zakelijk nummer/eSIM, lokale prospecting, persoonlijke outreach en opvolging, visitekaartje/QR/referrals, echte cases/testimonials met toestemming, conversiemeting na apart privacy- en ownerbesluit. Geen berichten verstuurd of accounts gemaakt.

**FUTURE BUSINESS TRACK — NOT A LAUNCH BLOCKER:** SaaS pas na webdesignlaunch, echte terugkerende ondernemersproblemen, kleine MVP, circa 3–5 designpartners en betaalbereidheid. Geen backend/auth/database/payments of SaaS-architectuur toegevoegd.

### Gecontroleerde releaseprocedure — alleen ontworpen

1. Alle echte launchblockers sluiten en bewijs registreren.
2. Officiële owner/businessgegevens invullen.
3. Privacy/legal requirements voor publieke release oplossen.
4. Hosting/Care operationeel goedkeuren voor de aangeboden scope.
5. Productiearchitectuur goedkeuren.
6. Exacte Local Final vastzetten met bron/config/artifactmanifest; registry/freeze volgens bestaandeprocedure, nu niet gewijzigd.
7. Finale technische gate samenstellen volgens K.
8. Lorenz beoordeelt en accordeert exacte visual/contentstaat; technische PASS is geen ownerapproval.
9. Huidige productie/hostconfig snapshotten; vorige werkende artifact en herstelpad veilig bewaren.
10. Alleen expliciet goedgekeurde commit maken; ongecommit userwork niet ongezien meenemen.
11. Alleen geautoriseerde push.
12. Alleen geautoriseerde productiondeployment.
13. DNS uitsluitend indien nodig en afzonderlijk goedgekeurd; complete vergelijking/backup, mailrecords behouden.
14. HTTPS/apex/www/redirects/routes/headers/assets/404 controleren.
15. Productiesmoketest met veilige mocks/blokkering voor submissions; geen klantdata.
16. Formspree alleen opnieuw live testen als deployment bestaand bewijs relevant ongeldig maakt én afzonderlijke testautorisatie bestaat; pure publicatie is geen automatische reden.
17. Indexability/robots/sitemap/canonical bevestigen; previews niet indexeerbaar.
18. Monitoring en alertontvanger controleren.
19. Rollback gereed houden; bij regressie release stoppen en herstel volgens goedgekeurd plan.
20. Launchbewijs, artifacthash, tijd, ownerapproval en resterende observaties registreren.

Deze procedure is **niet uitgevoerd**. Geen commit/push/deploy/DNS/account/mail/signature/spam/Formspree-mutatie.

## A. EXECUTIVE STATUS

Analyse van alle ontvangen delen 0–37 is compleet. Local Final is technisch sterk en de btw-fix blijft bewezen; publieke productie is ouder. Registratie/fiscaliteit, privacy, hosting-/servicebesluiten en finale goedkeuring staan open. Geen technische onmogelijkheid: gereed voor gerichte owneracties, nog niet voor finale gate of commerciële launch.

## B. PROVEN READY

Ongewijzigde nettolock/calculator en bruto-nettopresentatie; 64 functionele PASS; 86 Axe-rapporten, 0 violations; static/tooling: 0 errors met 85 CSS-warnings en 55 linkinfos; 74 PASS-artifacts exact hergebruikt. Mailtransport en één Formspree-E2E/replyketen bewezen binnen vastgelegde scope. Publieke HTTPS/redirects en huidige DNS-route geobserveerd. Npm-audit: 0 bekende advisories. Designfreeze behouden; dit zijn geen generieke juridische/veiligheids-/deliverabilitygaranties.

## C. BLOCKS PUBLIC COMMERCIAL LAUNCH

Ontbrekende officiële identiteit/fiscale toepasbaarheid; onvolledige privacy/bedrijfsinformatie en leverancier-/storagebeoordeling; niet goedgekeurde geschikte productiearchitectuur met herstelpad; onvoldoende besloten uitvoerbaarheid van gepubliceerde serviceclaims; finale actuele QA/release- en ownerreview nog niet afgesloten. Pure acquisitie, SaaS/Engine, een mooiere 404 en een afgeronde betaalintegratie zijn geen A-blockers. Geen redesign nodig.

## D. OWNER ACTION REQUIRED

Lorenz levert Business Data Block en fiscale bevestiging; kiest productieprovider en servicegrenzen/kosten-/supportmodel; laat privacy/contractkeuzes passend toetsen; accordeert later exacte implementatie/release. Geen nieuwe prijsstrategie nodig. De centrale matrix specificeert eigenaar/bewijs/actie, de queue onderaan beperkt de onmiddellijke volgorde tot drie stappen.

## E. BEFORE FIRST PAYING CLIENT

Afgesproken scope/revisies/correcties/change requests, contentrechten, betalingsmodel/offertegeldigheid/acceptatie, juridisch passende B2B/B2C-voorwaarden, facturatie/e-facturatie en veilige klantdossier-/toegangs-/tijdregistratie operationeel. Geen accountant/juristwerk als voltooid presenteren omdat er een requirementslijst staat.

## F. BEFORE SELLING HOSTING/CARE

Providercontract/kosten/limieten, domeinregistrant en eigen klanttoegang, monitoringalarm, daadwerkelijk restorebewijs, gekozen support-/incidentpad, tijdlog/reset/overschrijdingsakkoord, facturatie/opzegging/export/transfer en vervangbaarheid. Care blijft €59 inclusief Hosting met 30 niet-opspaarbare minuten; geen onbegrensde dienst. Bij onhoudbare kosten ownerbesluit, geen automatische prijswijziging.

## G. REVALIDATION REQUIRED

Historische visual 35/35 en Lighthouse 100/99 gelden niet automatisch voor gewijzigde btw-bron. Sluit relevante finale dekking inclusief foundation op definitieve bron. Latere legalcontent/headers/host/routingwijzigingen vragen passende functionele/a11y/SEO/security/perfcontrole. Exact ongewijzigd bewijs alleen via snapshot+artifactvalidatie hergebruiken; externe omgevingswijziging apart beoordelen. Geen tweede Formspree-test enkel omdat een oud checklistpunt nog openstaat. Providerafzendernaam na gerichte providerwijziging gericht valideren; geen volledige mailreset.

## H. POST-LAUNCH

Engineextractie, toolingreview, acquisitiekanalen, Search Console/GBP, echte cases/testimonials, marketing/conversiemeting na autorisatie, margereview na klant 1/3/5/10 en toekomstige SaaS-validatie. Deze lijst creëert geen voorwaarde voor huidige technische prelaunch.

## I. SUPERSEDED — DO NOT RESTORE

€83,90 als Hosting+Care; €19 Hosting/€49 Care/€79 Groei; publieke legacy Start €1.190/Groei €1.990/Basis €59/Plus €99/60 minuten/€55 per uur/minimum 30 minuten; excl-onlypresentatie; oude AI-primaire positionering; oude lange onepage-layout en verborgen assistent; eerdere claims dat de Formspree-bezorgtest nog openstaat. Concurrentprijzen en historische bewijsbestanden blijven historische context; niet wissen of als LK-lock herstellen. De commerciële lock en huidige Local Final blijven leidend.

## J. PRODUCTION DEPLOYMENT DELTA

Volledige routematrix hierboven is de release-inventaris. Over te brengen: huidige Home, Aanpak, Contact, centrale commercial/project/request-context/assistant/contact/script-JS, bijbehorende CSS/assets, juiste demo-links/labels, metadata/sitemap/canonicals. Eerst ontbrekende goedgekeurde bedrijfs- en privacyinformatie en hostconfig afronden. Huidige publieke bron niet blind over Local Final kopiëren. Exact artifactmanifest en hash pas na finale freeze; geen conclusie dat de huidige Git HEAD alle ongecommitteerde Local Final bevat.

## K. FINAL GATE PLAN

Alleen uitvoeren nadat inhoudelijke A-blockers zijn opgelost; productiechecks pas na afzonderlijk goedgekeurde deployment. Gebruik bestaande runners/registrybudgetten, geen parallel nieuw gatesysteem. Begin met snapshot/requiredcoverage en valideer hergebruik met `reuseEvidence`; een hashverschil is geen toestemming om oud bewijs te herlabelen. `qa:final` eerst plan/assessment, daarna alleen ontbrekende/geraakte checks volgens bestaande Standard. Geen frozen demo-suite activeren.

| Dekking | Exact te sluiten bewijs |
|---|---|
| Functional | Navigatie/active states/mobile menu; calculator met alle bases, add-ons, thresholds en offertegevallen; Contact-validatie, succes, fout, timeout en verzendlock; LK Assistent, openen/sluiten en focus; projectlinks; disclosure; bewerkbare context, URL-allowlist en no-JS fallback. Formuliernetwerk gemockt/geblokkeerd. |
| Responsive | Screenshots en overflowcontrole op 320, 375, 390, 768, 1024, 1440 en 1920 px voor Home, Aanpak, Contact, assistent, calculator en kritieke open states. Bewijs per state en breedte aantoonbaar hergebruiken of gericht aanvullen. |
| Accessibility | Axe plus handmatig keyboard, focus/restoration, labels/errors, landmarks, dialogs, contrast, touch targets, 200% tekstzoom en reduced motion; relevante incompletes triëren. Geen onverklaarde noodzakelijke skips. |
| Visual | Goedgekeurde visual regression en screenshots; bewuste btw-/legalverschillen expliciet beoordelen. Baselines alleen na expliciete ownerapproval via bestaand acceptatiepad. Ownerreview van de exacte inhoudstaat blijft apart. |
| Performance | Lighthouse desktop/mobile volgens registry; LCP, CLS, TBT, scores, budgetten en externe fonts beoordelen; regressies verklaren. Geen veld-INP-claim op labscores. |
| Commercial | Nettoprijzen, add-ons en afronding; bruto 21%/netto; 9+ offerte; Care inclusief Hosting met 30 niet-opspaarbare minuten; €65/u; 2–4 weken indicatief; sneller na QA en klantakkoord; demo-labels; geen legacyregels. |
| SEO | Unieke title/description/H1, headings, canonical op uiteindelijke 200-URL, sitemap/robots/indexability, OG/favicon, images/alt, structured data/contactconsistentie en echte 404; preview noindex. |
| Security/privacy | Gerichte actuele secrets-/dependencyreview, feitelijke headers/CSP/referrer policy, formulier/honeypot/quotaproces, privacy/storage/externe diensten, veilige toegang, backup/restore en rollback. Geen pentestclaim. |
| Static/tooling/foundation | Bestaande vereiste config-, lint-, HTML/CSS/JS-, link- en artifactguards; warnings/skips expliciet registreren; bron/config/environment en artifacts sluitend. |
| Production na toestemming | HTTPS/apex/www, pad/query-redirect, alle routes/assets/MIME/cache, 404, canonical/sitemap/robots, formulier-UI/mocks en origin/recipientconfig. Mailrecords alleen bij geautoriseerde DNS-scope. Live Formspree alleen bij relevante invalidatie plus toestemming. |
| Releasebesluit | Actuele technische gate met dekkingsmatrix, gedateerde ownercontent/visualapproval en artifact-/rollbackmanifest. TECHNICAL_GATE_PASS is geen DELIVERY_APPROVED; geen automatische deployment. |

### OWNER ACTION QUEUE

**NEXT 1 — Bedrijfsfiche en fiscaliteit afronden.** Waarom nu: zonder echte identiteit/start/21%-toepasbaarheid kunnen wettelijke websitegegevens en prijscontext niet definitief gepubliceerd worden. Wie: Lorenz met ondernemingsloket/boekhouder. DONE: ontbrekende velden in het Business Data Block bevestigd, fiscale ingangsdatum/toepassing schriftelijk duidelijk.

**NEXT 2 — Productieroute en Hosting/Care-servicefiche kiezen.** Waarom daarna: privacytekst, kosten, backup/restore, support en releaseconfig hangen van providers en rollen af. Wie: Lorenz, met concrete providerbevestiging; Combell-route is aanbeveling, geen besluit. DONE: host/order/kosten/rollen/limieten, servicegrenzen/support/restore/exit en vereiste privacyinformatie goedgekeurd; geen migratieautorisatie inbegrepen.

**NEXT 3 — Legal/input omzetten in exact goedgekeurde releasekandidaat.** Waarom daarna: alleen bevestigde feiten en gekozen serviceafspraken kunnen in privacy/bedrijfsinformatie en hostconfig worden verwerkt. Wie: Lorenz + passende juridische/boekhoudkundige toets; daarna Codex binnen expliciete scope. DONE: publieke privacy/identiteit/serviceclaims gecontroleerd, noodzakelijke implementatie afgerond en Local Final gereed voor plan K; contract/payment/servicebewijs vóór betreffende B/C-gate. Nog geen commit/push/deployment.

LK PRELAUNCH MASTER CONTROL: READY FOR FINAL OWNER ACTIONS
