# LK Webdesign — prelaunch business, legal & operations checklist

Auditdatum: 26 september 2026. Intern beslis- en bewijsdossier; geen gepubliceerde voorwaarden, juridisch advies of publicatietoestemming.


## Actuele correcties — 27 september 2026

Deze update heeft voorrang op de auditmomentopname van 26 september hieronder. Historische aantallen/statussen en ‘bestaande gate blijft geldig’ horen bij de toenmalige snapshot, niet automatisch bij de nieuwe btw-implementatie. [Actuele master control](LK-PRELAUNCH-MASTER-CONTROL.md) bevat de deploymentdelta, besluitstatus en nieuwe QA.

- **P02: strategische keuze gesloten; fiscale bevestiging OPEN.** B2B én B2C, beoogd normale 21%-regeling, incl. primair/excl. secundair. Niet opnieuw om doelgroepkeuze vragen. Inschrijving, btw-nummer, toepasbaarheid en startdatum nog onbevestigd. Lokale prijsweergave is voorbereid, niets gepubliceerd.
- **P05: routing/ontvanger/notificatie bewezen.** Eén e-mailactie naar info, Formspree-inboxregistratie, domain restriction leeg; plan/quota/retentie/DPA en werkelijk privacybeleid blijven open. ‘Alles onbekend’ is verouderd.
- **P06: mailbox/client/verzend-ontvangst bewezen.** Outlook/Combell en historische SPF/DKIM/DMARC PASS volgens maildossier. Alleen Combell-afzendernaam en junkbevinding afzonderlijk open; geen universele aflevergarantie.
- **P11: huidige publieke Formspree-keten PASS**, inclusief één antwoord met juiste korte signature/links, Hotmail-junk. Niet opnieuw indienen. Nieuwe lokale contextprijsweergave wordt met mocks getest; dat is geen herhaling van de live inzending en geen deploymentbewijs.
- **P07/P08 gedeeltelijk geverifieerd:** actuele hostrespons GitHub.com, HTTPS bereikbaar, geteste HTTP/www-redirects 301 met pad/querybehoud. Definitieve hostinggeschiktheid, accountbeheer, registrant/renewal en herstel nog open. Aanpak/Contact op productie 404; lokale versie is nieuwer.
- **A02 documentcorrectie uitgevoerd:** INTEGRATIONS heeft een actuele sectie boven duidelijk als historisch gemarkeerde oude notities.
- **R01 technische scope gewijzigd:** oude gate vóór btw-fix exact geverifieerd (115 PASS-artifacts); na bronwijziging alleen nieuwe passende controles als actueel tellen. Baselineacceptatie/owner-review en productieapproval blijven afzonderlijk.

Geen contractvoorwaarden, revisierondes, providers, garantie of fiscale registratie namens Lorenz vastgesteld. Eerstvolgende businessactie blijft officiële bedrijfsfiche + fiscale bevestiging; het B2B/B2C-besluit is al gegeven. Geen nieuwe live Formspree-test verlangen enkel omdat een oud plan nog open staat.

## A. Launch readiness summary

**LK PRELAUNCH AUDIT: READY FOR OWNER ACTION. De onderneming is hiermee nog niet klaar voor publieke lancering.** Er is geen nieuw technisch defect vastgesteld dat eerst onderzoek vereist. De bekende zakelijke, fiscale, juridische en operationele onzekerheden staan hieronder met verantwoordelijke en afsluitbewijs.

| Uitkomst | Aantal |
|---|---:|
| READY | 12 |
| MUST BEFORE PUBLIC LAUNCH | 12 |
| MUST BEFORE FIRST PAYING CLIENT | 6 |
| MUST BEFORE SELLING HOSTING/CARE | 6 |
| NICE AFTER LAUNCH | 2 |
| EXTERNAL VERIFICATION REQUIRED | 12 |
| NOT APPLICABLE | 3 |

Telregel: één punt is één unieke R/P/F/H/A/N-rij in §B. Er zijn 41 punten: 12 READY, 26 open en 3 NOT APPLICABLE. De 12 externe verificaties zijn een **deelverzameling** van de 26 open punten, geen extra blockers. Substappen en verwijzingen elders tellen niet opnieuw. Een READY-punt bevestigt uitsluitend de genoemde scope, niet de operationele dienst als geheel.

**Techniek:** bestaande Final Technical Gate en Master Review blijven geldig. Bron-, configuratie-, baseline- en omgevingssnapshot zijn tijdens deze audit read-only vergeleken met de laatste gate en komen exact overeen. Geen nieuwe QA-ronde uitgevoerd.

- [Laatste gate](test-results/qa-runs/lk-final-2gfe3n/evidence.json): `TECHNICAL_GATE_PASS`, coherent, geen ontbrekend bewijs; `OWNER_REVIEW_PENDING`, publicatiefase `draft`.
- [Laatste Master Review](test-results/qa-runs/lk-inspection-YMl1z9/MASTER-REVIEW.md): PASS; 47 responsive captures, aanvullende interactiecontrole en gedocumenteerde beperkingen.
- Gate: 62 functionele tests geslaagd; 2 bewuste desktop-skips van mobiele tests, mobiele equivalenten geslaagd. 86 Axe-rapporten zonder violations; 35 visuele vergelijkingen geslaagd. Lighthouse desktop 100/100/100/100; mobiel 99/100/100/100.
- Bestaande beperkingen blijven zichtbaar: 85 CSS-waarschuwingen, 55 informatieve externe/out-of-scope linkskips; Axe-incomplete bevindingen en lokale Lighthouse-diagnostiek zoals externe fonts/beeldoptimalisatie. Geen volledige fysieke-device-, Safari-, Firefox- of screenreadercertificering. Mocks bewijzen geen echte mailbezorging.
- Snapshot source: `2beb2d2def8ed867daaee84768f22493281e29b20b849145782d562cd28f72a0`; configuration: `3e3767c6c853834ca8e007de09db06b3a266146011bec0036ee748bc973e2cd2`; baselines: `978fbc548b0c48ec1ae8b795b7cdd6ac5e3a5a657b915bbdc347f1e02123e97a`.
- De [historische owner-goedkeuring](test-results/qa-runs/lk-inspection-vcIq1k/baseline-approval/owner-approval.md), Lorenz, 25 september 2026 22:57:09.100 UTC, betreft eerdere screenshots/baselines. Ze is geen stilzwijgende goedkeuring van de latere twee toegankelijkheidsfixes of toekomstige juridische toevoegingen.

**Zakelijk:** officiële identiteit, btw-status, doelgroep B2B/B2C, facturatie en contractproces zijn niet aangetoond. Publiek staan merknaam LK Webdesign, voornaam Lorenz, Oud-Turnhout, België en `info@lkwebdesign.be`; dat vervangt geen officiële registratie.

**Privacy en legal:** er is geen volledige privacypagina of afgerond voorwaardenpakket. Formspree, e-mail, hostinglogs, Google Fonts en assistentopslag vereisen juiste informatie en vastgelegde verantwoordelijkheden. Er is geen grondslag of bewaartermijn ingevuld zonder bewijs.

**Operations:** code bevat Hosting/Care-aanbod, maar geen bewijs van een gekozen klantprovider, rendabiliteit, werkende backups, restore, monitoring of supportorganisatie. De hosting van de eigen LK-site is een afzonderlijke beslissing.

**Bronhiërarchie:** [AGENTS](AGENTS.md), [Development Standard](LK-DEVELOPMENT-STANDARD.md), [Commercial Requirements](LK-COMMERCIAL-REQUIREMENTS.md), [projectregistratie](scripts/qa-projects.json), huidige `docs`-code en bovenstaande gate/review. [INTEGRATIONS](INTEGRATIONS.md) is aanvullende historische documentatie: verwijzingen naar het formulier in `index.html`, oude velden/pakketlogica en een verborgen assistent zijn niet actueel. Het formulier staat in `contact.html`; de actieve scripts en Commercial Requirements zijn voor deze inventaris leidend.

Scope: audit eerst read-only; daarna uitsluitend dit interne bestand toegevoegd. Geen publieke code, bedragen, demo’s, accounts, DNS, deployment, baselines, commits of pushes gewijzigd; geen echte inzending. Demo-bronnen zijn uitsluitend op externe gegevensstromen geïnventariseerd, niet geopend of hertest. De bestaande lokale wijzigingen blijven behouden.

## B. Prelaunchmatrix en blockers per fase

Statuswaarden: READY, OWNER INPUT REQUIRED, EXTERNAL VERIFICATION REQUIRED, NEEDS CHANGE, NOT APPLICABLE. Bij elke open rij: ontbrekend gegeven, reden, afsluitbewijs en rolverdeling. “Codex later” betekent technisch uitvoerbaar na vereiste input en afzonderlijke opdracht, niet automatisch toegestaan door deze audit.

### Aantoonbaar gereed

| ID | Status | Afgebakend gereed punt en bewijs |
|---|---|---|
| R01 | READY | Technische gate exact passend bij huidige snapshot; bewijs in §A. Geen herhaling nodig voor dit document. |
| R02 | READY | Responsive ontwerp, functionele flows, accessibility en visuele regressie binnen gedocumenteerde Master Review-scope. |
| R03 | READY | Prijsbedragen, indicatieve offertecontext en btw-labels consistent met Commercial Lock; fiscale geldigheid blijft P02. Zie §B1. |
| R04 | READY | Frontend Formspree-flow met validatie, timeout, locking, gecontroleerd succes en foutbehoud; mocks bewijzen dit, geen account/bezorging. Zie §D1. |
| R05 | READY | Calculator/assistent genereren alleen vaste niet-persoonlijke projectkeuzes; geen naam, e-mail of bericht in eigen context-URL/opslag. Privacybeoordeling blijft P04. |
| R06 | READY | Huidige broninventaris toont geen analytics, marketingpixels, advertentietracking, externe JS-embeds of expliciete cookie-writes. SessionStorage en externe fonts wel aanwezig; geen algemene cookie-vrijverklaring. |
| R07 | READY | Bestaande securityreview en gerichte huidige broncontrole geven geen nieuwe concrete securityblocker; grenzen in §B4. |
| R08 | READY | Canonicals, OG/metadata, favicon, robots en sitemap aanwezig in lokale hoofdsite. Feitelijke identiteit en productieconfiguratie blijven P01/P08/P09. |
| R09 | READY | Commercieel eigendomsprincipe besloten: klant registrant vanaf dag 1, eigen provider toegestaan, geen lock-in, domeinkosten afzonderlijk. Uitvoering H04. |
| R10 | READY | Hosting/Care-inclusies en grenzen commercieel vastgelegd, Care omvat Hosting; geen dubbel abonnement. Operationele uitvoering P10/H01–H06. |
| R11 | READY | Doorlooptijd circa 2–4 weken is voorwaardelijke verwachting; geen gegarandeerde deadline. Geen 24/7-, uptime-, zero-data-loss- of absolute herstelgarantie aangetroffen in huidige LK-copy. |
| R12 | READY | Exact plan voor latere productiebezorgtest staat in §D2, inclusief autorisatiegrens en fictieve gegevens. Uitvoering is P11, nog niet gebeurd. |

### Public launch — MUST BEFORE PUBLIC LAUNCH

| ID | Status | Wat ontbreekt en waarom | Vereist afsluitbewijs | Codex / Lorenz / externe partij |
|---|---|---|---|---|
| P01 | OWNER INPUT REQUIRED | Officiële naam, juridische identiteit, ondernemingsnummer, adres, btw-identiteit, bevoegde contactpersoon en eventuele telefoon; merk/voornaam volstaan niet. | Door Lorenz bevestigde officiële bedrijfsfiche op basis van registratie; publiceerbare gegevens expliciet aangeduid. | Lorenz levert/bevestigt; registratie/accountant onderbouwt; Codex kan later exact verwerken op plaatsen in §B2. |
| P02 | EXTERNAL VERIFICATION REQUIRED | Werkelijk btw-regime en toepasselijkheid van excl. 21% btw; uitsluitend B2B of ook consumenten nog niet expliciet bevestigd. | Fiscale bevestiging voor deze onderneming plus owner-besluit over doelgroep en correcte prijsweergave. | Accountant/fiscaal adviseur en Lorenz; Codex kan labels later consequent aanpassen, kiest geen regime of prijswijziging. |
| P03 | NEEDS CHANGE | Volledige privacy- en bedrijfsinformatie ontbreekt; contactzin is onvoldoende als volledig informatiepakket. | Gecontroleerde, ingevulde publicatietekst en bereikbare links vanaf footer en formulier, gebaseerd op P01/P02/P04. | Codex kan pagina/links na bevestigde inhoud bouwen; Lorenz keurt feiten/tekst goed; legal beoordeelt waar nodig. |
| P04 | EXTERNAL VERIFICATION REQUIRED | Verwerkingsrollen, grondslagen, termijnen, leveranciers, doorgiften en noodzaak assistentopslag/fonts niet volledig vastgesteld. | Ingevulde datamap, leveranciersafspraken/DPA waar nodig, bewaarbeleid en onderbouwde beslissing over sessionStorage en Google Fonts. | Lorenz verantwoordelijk; providers leveren feiten; privacydeskundige beoordeelt onzekere toepassing; Codex inventariseert/implementeert later. |
| P05 | EXTERNAL VERIFICATION REQUIRED | Formspree-account, ontvanger, domeinbeperking, routing, spam, quota en bewaring onbekend. | Gedateerde accountcheck voor `mjyvnevy`, zonder secrets, met alle items uit §D1. | Lorenz/accountbeheerder controleert met Formspree; Codex kan aangeleverd bewijs beoordelen. |
| P06 | EXTERNAL VERIFICATION REQUIRED | Zakelijke mailbox is alleen als link bewezen; ontvangst, verzending, authenticatie en bereikbaarheid niet bewezen. | Mailprovidercheck SPF/DKIM/DMARC en gecontroleerde verzend/ontvangsttest incl. spam, reply-to en clients. | Lorenz/mailprovider; Codex alleen verwijzingen gecontroleerd, geen DNS of mail gewijzigd/verstuurd. |
| P07 | EXTERNAL VERIFICATION REQUIRED | Werkelijk publicatiepad, accountbeheer, gebruiksvoorwaarden eigen-sitehosting en hostinglogs niet bevestigd. GitHub Pages wordt genoemd, met relevante commerciële gebruiksbeperking. | Bevestigde toegestane hosting voor deze LK-bedrijfssite, repository/pad/artifact, accounts/recovery en privacygegevens. | Lorenz + host/GitHub verduidelijken geschiktheid; Codex kan daarna goedgekeurde configuratie voorbereiden, kiest nu geen provider. |
| P08 | EXTERNAL VERIFICATION REQUIRED | Domeincontrole, TLS en HTTP/www-redirects niet operationeel bewezen; bron gebruikt zowel non-www canonical als enkele www-links. | Registrarcontrole en read-only productierapport: houder, toegang, renewal, certificaat, voorkeursorigin, redirects met pad/querybehoud. | Lorenz/registrar/host bevestigen; Codex kan later links normaliseren na keuze. Geen DNS-wijziging in audit. |
| P09 | OWNER INPUT REQUIRED | Publicatierecht voor eigen merk/portret/beelden en feitelijke claims/structured data nog niet expliciet bevestigd voor launch. | Owner-akkoord op assetrechten/licenties en correcte naam, Lorenz-rol, regio en contactgegevens; geen fictieve klantclaims. | Lorenz bevestigt; licentiegever alleen bij ontbrekend rechtenbewijs; Codex kan metadata later exact bijwerken. |
| P10 | OWNER INPUT REQUIRED | Publieke Hosting/Care-belofte vereist uitvoerbare onderbouwing vóór publicatie; commerciële lock §5/§8 zegt dit ook. | Lorenz bevestigt uitvoerbaar aanbod met provider/kosten, backup/restore/monitoring en haalbare support; verwijst naar relevante H-bewijzen. | Lorenz beslist met providers. Codex kan dossier structureren. Uitstel/aanbod weglaten vereist expliciet nieuw owner-besluit en aparte wijziging, is niet hier uitgevoerd. |
| P11 | EXTERNAL VERIFICATION REQUIRED | Productieformulier → echte inbox nog niet bewezen. Lokaal succes is geen bezorgbewijs. | Expliciete toestemming voor precies de test uit §D2, daarna één gecontroleerde ontvangstketen en rapport. | Lorenz autoriseert en verifieert mailbox, Formspree/mailprovider bij fouten; Codex kan geautoriseerde test begeleiden. Nu geen inzending. |
| P12 | OWNER INPUT REQUIRED | Exacte launchstaat en publicatie nog niet door eigenaar goedgekeurd. | Gedateerd owner-akkoord op definitieve snapshot, privacy/bedrijfstekst en gesloten P-punten; afzonderlijke deploymentautorisatie. | Alleen Lorenz verleent goedkeuring. Codex kan dossier/snapshot leveren, geen DELIVERY_APPROVED invullen namens eigenaar. |

### First paying client — MUST BEFORE FIRST PAYING CLIENT

| ID | Status | Wat ontbreekt en waarom | Vereist afsluitbewijs | Codex / Lorenz / externe partij |
|---|---|---|---|---|
| F01 | OWNER INPUT REQUIRED | Offerteproces: scope, revisierondes, feedback, klantinhoud, planning, acceptatie, betaling en oplevermoment niet volledig besloten. | Ingevulde beslissingen uit §B5 en goedgekeurde offerte-/opdrachtstructuur. | Lorenz kiest; Codex kan concept/template maken; juridische toets F02. |
| F02 | EXTERNAL VERIFICATION REQUIRED | Juridische werking van voorwaarden, aansprakelijkheid, IP, wanbetaling, beëindiging, transfer en B2B/B2C nog niet bevestigd. | Juridisch beoordeelde versie passend bij onderneming en doelgroep, met vastgelegd acceptatieproces. | Juridisch adviseur beoordeelt; Lorenz accordeert; Codex redigeert/implementeert alleen goedgekeurde inhoud. |
| F03 | OWNER INPUT REQUIRED | Facturatie-identiteit, bankrekening, betaaltermijn, eventueel voorschot, nummering, boekhoudverantwoordelijke en creditnotaproces ontbreken. | Operationele administratiefiche en goedgekeurd factuur-/creditnotamodel, geen echte klantfactuur nodig voor audit. | Lorenz beslist met boekhouder; Codex kan later sjabloon/checklist maken, geen software kiezen zonder besluit. |
| F04 | EXTERNAL VERIFICATION REQUIRED | Toepasselijkheid en inrichting Belgische gestructureerde e-facturatie 2026, uitgaand én inkomend, en verplichte factuurvelden niet bewezen. | Accountant bevestigt regime/uitzonderingen; bewezen verzend-/ontvangstmogelijkheid en correct model/creditnota. | Boekhouder/provider + Lorenz; Codex kan eisen verwerken. Bij eerdere leveranciersfacturen moet dit eerder gereed zijn, niet wachten op eerste klant. |
| F05 | OWNER INPUT REQUIRED | Klantdossier, expliciet akkoord, content-/assetrechten en overdrachtsbewijs moeten consequent worden bijgehouden. | Lorenz accepteert proces §F met dossierlocatie, verantwoordelijke, versiebeheer en acceptatiebewijs. | Lorenz voert uit; Codex kan documenttemplates leveren; klant bevestigt eigen inhoud en finale versie. |
| F06 | OWNER INPUT REQUIRED | Veilig klanttoegangsbeheer, geheimhouding, privacyrollen per project en incident-/rechtenverzoekafhandeling ontbreken als procedure. | Minimale werkafspraak voor toegang/MFA, intrekken rechten, dataminimalisatie, incidentcontact en waar toepasselijk verwerkersafspraken. | Lorenz eigenaar; providers/legal ondersteunen bij rollen/contracten; Codex kan checklist en technische handover maken. |

### Hosting/Care — MUST BEFORE SELLING HOSTING/CARE

| ID | Status | Wat ontbreekt en waarom | Vereist afsluitbewijs | Codex / Lorenz / externe partij |
|---|---|---|---|---|
| H01 | OWNER INPUT REQUIRED | Klantprovider/reseller, kosten/marge, capaciteit, accountownership, limieten en billing niet gekozen. OWNER/EXTERNAL DECISION REQUIRED. | Providerbesluit met prijs-/kostenstaat, functies, accountmodel en schaalgrenzen bij 1/10/meer klanten. | Lorenz kiest op eisen; provider bevestigt aanbod; Codex kan vergelijking/rekenmodel maken na input. |
| H02 | EXTERNAL VERIFICATION REQUIRED | Backupdekking, frequentie, retentie, off-site noodzaak en restore nog niet aantoonbaar uitvoerbaar. | Werkende backup + gedocumenteerde succesvolle proefrestore in veilige testomgeving, verantwoordelijke en grenzen. | Host + Lorenz verifiëren; Codex kan geautoriseerd runbook/test ondersteunen. Geen herstelgarantie uit broncode afleiden. |
| H03 | EXTERNAL VERIFICATION REQUIRED | Monitoring, SSL-verlenging, DNS-beheer en incident-/provideroutagepad nog niet ingericht/bewezen. | Gecontroleerde alertketen, contact-/escalatiepad, certificaatverantwoordelijkheid en haalbare responscapaciteit. | Provider + Lorenz; Codex kan later beperkte configuratie/test ondersteunen met opdracht. |
| H04 | EXTERNAL VERIFICATION REQUIRED | Klant als registrant vanaf dag 1, renewal, auth code, factuurstroom en vertrektoegang moeten providergewijs werken. | Registrarproces en klantdossier volgens §G2, incl. aantoonbare houder en transfermogelijkheden. | Registrar/reseller + Lorenz; klant bevestigt gegevens; Codex kan dossier maken, geen domein overzetten. |
| H05 | OWNER INPUT REQUIRED | Care-aanvraagkanaal, tijdregistratie/reset, akkoord op meerwerk en haalbare werk-/reactievensters ontbreken. | Door Lorenz gekozen en geteste eenvoudige werkwijze §G3 met duidelijke grenzen en urenadministratie. | Lorenz bepaalt capaciteit; Codex kan lichte template maken; geen CRM of 24/7-belofte. |
| H06 | OWNER INPUT REQUIRED | Recurring startdatum, factuurmoment, opzegging, betalingsopvolging, overdracht en stop-/verwijderproces niet vastgelegd. | Servicebijlage + administratief proces, aansluitend op F02–F04, zonder Care/Hosting dubbel te rekenen. | Lorenz beslist; accountant/legal/provider bevestigen toepasselijke onderdelen; Codex kan goedgekeurde afspraken verwerken. |

**Fasegrens:** iedere rij heeft één primaire fase. H-punten zijn daarnaast input voor P10 waar ze nodig zijn om het huidige publieke aanbod waar te maken. De nieuwe fase-indeling heft de strengere prelaunchafspraken uit Commercial Requirements §5/§8 niet stilzwijgend op. Offerte-/servicebasis, domeinworkflow en supportafspraken moeten volgens die lock vóór lancering bevestigd zijn; klantgebonden uitvoering volgt pas bij de klant. Uitstel kan uitsluitend met expliciet owner-besluit. “Geen klanten vandaag” sluit P10 niet.

### After launch — NICE AFTER LAUNCH

| ID | Status | Ontbreekt / reden / afsluitbewijs | Codex / Lorenz / extern |
|---|---|---|---|
| A01 | OWNER INPUT REQUIRED | Optionele Search Console-property en sitemapindiening; nuttig voor indexeringsopvolging, geen functionele launchvoorwaarde. Afsluiten met owner-keuze en indien gewenst geverifieerde property. | Lorenz kiest/accounttoegang; Codex kan daarna begeleiden. Geen analyticsinstallatie. |
| A02 | NEEDS CHANGE | Historische INTEGRATIONS-tekst later opschonen; deze checklist legt actuele feiten nu expliciet vast zodat er geen onzichtbare launchonzekerheid resteert. Afsluiten met documentupdate na providerbesluiten. | Codex kan later corrigeren; Lorenz bevestigt nieuwe account-/publicatiefeiten; geen externe partij nodig voor zuivere bronverwijzingen. |

### Niet van toepassing op deze implementatie

| ID | Status | Reden en grens |
|---|---|---|
| N01 | NOT APPLICABLE | Geen checkout, kaartbetalingen of online bestelflow in huidige LK-site. Geen betaalproviderintegratie te activeren. Dit sluit consumentenrecht bij latere overeenkomsten niet uit; P02/F02 blijven open. |
| N02 | NOT APPLICABLE | Assistent is vaste lokale keuzehulp, geen externe AI-service of vrije chat; geen AI-account/API-key of AI-verwerkerscontract voor deze functionaliteit. |
| N03 | NOT APPLICABLE | Geen marketing-/analyticsplatform aangetroffen; dus geen trackingaccount of marketingcookiebanner voor zo’n niet-bestaande integratie nodig. SessionStorage/fonts worden afzonderlijk beoordeeld onder P04. |

### B1. Bedragen, btw en commerciële tekst

Gecontroleerd tegen `docs/commercial.js`, Home, Aanpak, Contact/context, assistent en Commercial Requirements. Geen bedragen aangepast.

| Onderdeel | Huidige afspraak / broncontrole |
|---|---|
| 1–3 pagina’s | €995–€1.290 excl. btw |
| 4–5 pagina’s | €1.390–€1.790 excl. btw |
| 6–8 pagina’s | €1.790–€2.290 excl. btw |
| 9+ pagina’s | Vanaf circa €2.300 excl. btw; persoonlijke offerte |
| Hosting | €24,90/maand excl. btw; domeinregistratie/verlenging apart per jaar |
| Care | €59/maand excl. btw, inclusief Hosting; maximaal 30 minuten kleine wijzigingen |
| Meerwerk | €65/uur excl. btw; groot werk kan afzonderlijke offerte krijgen |
| Calculator | Indicatief, excl. 21% btw waar een range wordt getoond; definitief na bespreking. Gewogen ranges volgens lock, maatwerk/offertedrempel zonder verzonnen totaal. |
| Planning | Circa 2–4 weken afhankelijk van omvang, inhoud, feedback en planning; geen garantie/minimumduur. |

Alle huidige commerciële bedragen gebruiken dezelfde excl.-btw-conventie. “Inclusief Hosting” is een dienstinclusie, geen “inclusief btw”. Geen tegenstrijdige incl./excl.-bedragen aangetroffen. Het ontbreken van btw-registratiebewijs is **P02, publicatieblocker**; een Commercial Lock is geen fiscale registratie.

De site richt zich op zelfstandigen en kleine bedrijven, maar dat bewijst niet dat LK uitsluitend B2B zal contracteren. Voor consumenten noemt FOD Economie totaalprijzen inclusief btw en verplichte extra kosten. Lorenz moet doelgroep en correcte presentatie laten bevestigen; geen automatische prijsomrekening of nieuwe fiscale tekst in deze audit. [FOD Economie: prijsaanduiding](https://economie.fgov.be/nl/themas/verkoop/prijsbeleid/prijsaanduiding).

### B2. Officiële bedrijfsgegevens: huidige situatie en plaatsing

| Gegeven | Huidig aantoonbaar | Vereist ownergegeven / toekomstige plaats |
|---|---|---|
| Handelsnaam | Merknaam LK Webdesign | Officiële handelsnaam bevestigen; footer, bedrijfsblok Contact, privacy, offerte/voorwaarden/factuur. |
| Juridische naam/rechtsvorm | Niet als officiële identiteit vastgelegd | Exacte juridische naam/rechtsvorm; bedrijfsblok, privacyverantwoordelijke, voorwaarden en administratie. Geen achternaam uit privébestanden afleiden. |
| Ondernemingsnummer | Niet gepubliceerd | Officieel nummer; bereikbaar bedrijfsblok via iedere footer, voorwaarden/offerte/factuur. |
| Btw-status/nummer | Excl. 21% btw staat in aanbod, registratie onbewezen | Status en nummer indien toepasselijk; bedrijfsblok en fiscale vermeldingen/administratie na P02. |
| Adres | Alleen Oud-Turnhout, België | Officieel vestigingsadres; eventueel afzonderlijk correspondentieadres duidelijk onderscheiden. Bedrijfsblok, privacy en zakelijke documenten. Geen postadres als vervanging verzinnen. |
| E-mail | `info@lkwebdesign.be`, correcte mailto-links | Bevestigen als werkende zakelijke mailbox en privacycontact; footer/Contact/privacy/offerte. |
| Telefoon | Geen publiek zakelijk nummer | Lorenz beslist of gebruikt; toepasselijke informatieplicht bij B2C/afstandsovereenkomst laten beoordelen. Indien van toepassing Contact/bedrijfsblok/voorwaarden. |
| Contactpersoon | Voornaam Lorenz | Bevoegde zakelijke contactpersoon en rol bevestigen; Contact/privacy/serviceafspraak waar passend. |
| Land/regio | Oud-Turnhout/BE in copy/schema | Juistheid en werkelijk werkgebied bevestigen; metadata/structured data en contactinformatie. |
| Facturatie | Niet operationeel bevestigd | Juridische identiteit, bankgegevens en factuurgegevens voor offerte/factuur; IBAN hoeft niet automatisch in publieke footer. |

FOD Economie noemt identificatie-, adres-, contact- en ondernemingsgegevens ook voor bedrijfswebsites zonder online verkoop, plus toepasselijke btw- en beroepsinformatie. Bij consumentenovereenkomsten op afstand speelt ook telefooninformatie. Er is geen bewijs van een gereglementeerd beroep, vergunnings- of gedragscodeplicht voor het beschreven webdesignaanbod; niets daarover verzinnen. Laat bijzondere toepasselijkheid bevestigen als de officiële activiteit afwijkt. [FOD Economie: bedrijfswebsitegegevens](https://news.economie.fgov.be/203683-deze-info-moet-u-zeker-vermelden-op-uw-bedrijfswebsite/).

### B3. Datamap en privacy-TODO

Broncontrole: `contact.html`, `contact.js`, `commercial.js`, `project.js`, `request-context.js`, `assistant.js`, `script.js` en HTML/CSS-referenties. Dit is geen bewijs van verborgen accountinstellingen of volledige productieheaders.

| Stroom | Gegevens en doel | Verwerking / derde partij | Bewaring | Persoonsgegevens / privacyactie |
|---|---|---|---|
| Contactformulier vóór verzenden | Naam, e-mail, interesse, bericht; optioneel bedrijf, telefoon, website. Aanvraag voorbereiden. | Browser/DOM; nog geen Formspree-POST vóór expliciete verzending. Browser-autofill is browserbeheer, niet LK-opslag. | In document zolang aanwezig; foutpad behoudt invoer, bevestigd succes reset. Geen gegarandeerde bewaring na reload. | Ja. Informatie bij formulier en volledige privacyverklaring nodig. |
| Formspree-POST | Bovenstaande velden plus `selected_package`, `assistant_source`, `project_summary`, `_subject`, honeypot `_gotcha`; technische requestmetadata/IP. | Rechtstreeks HTTPS naar Formspree, daarna notificatie naar ingestelde mailbox. Account/routing onbekend. | Werkelijke plan-/accountretentie, logs en verwijdering: EXTERNAL VERIFICATION REQUIRED. | Ja. Ontvangers/rollen, afspraken en internationale doorgifte vaststellen; geen EU-only-claim. |
| Mailbox en mailto | Aanvraag, afzender/adres en correspondentie; antwoorden/offertevoorbereiding. | Mailprovider en LK-clients; provider/regio onbekend. Mailto opent gebruikersmailclient. | Geen termijn vastgesteld; mailboxkopieën en backups apart bepalen. | Ja. Opnemen in privacybeleid en verwijder-/toegangsprocedure. |
| Calculator | Type project, omvang, complexiteit, extra functies, indicatieve range. | Lokale berekening; vaste keuzes in URL naar Contact/assistent. Geen externe AI/backendberekening. | JS-state tot navigatie/reset; URL mogelijk in browserhistorie en hostinglogs, termijn onbekend. | Keuzes op zichzelf geen naam/contactgegevens; gekoppeld aan IP of aanvraag mogelijk persoonsgegevens. Geen blanket GDPR-uitzondering. |
| Assistent | Vaste project-/dienst-/demokeuzes, scherm/context; geen vrije tekst of contactvelden. | Lokale JS; `sessionStorage`-key `lk.assistant.v2`: version, screen, query, meaningful, contextKind, service, project, situation. | Browsersessie/tab; geen vaste servertermijn. Browserherstel kan sessie herstellen. Geen eigen localStorage. | Alleen vaste keuzes in eigen opslag. Informatieplicht/noodzaak opslag beoordelen onder P04. |
| Cookies/tracking | Geen expliciete cookie-writes, analytics, pixels of advertenties gevonden. `lk:interaction` zijn lokale events, geen aangetroffen doorgifte. | Geen aangetroffen analyticsleverancier in code. Productiehost kan eigen headers/logs hebben. | Geen analyticsretentie ingericht; hostheaders nog te bevestigen. | Geen banner “voor de zekerheid”. Opslagtoets hieronder blijft nodig. |
| Externe fonts | Browser vraagt DM Sans/Manrope CSS/fonts; IP en technische HTTP-metadata worden aan externe servers aangeboden. Typografie. | `fonts.googleapis.com` en `fonts.gstatic.com`; Google. Preconnects staan in hoofd-HTML. | Providerretentie/regio/doorgifte niet in LK-dossier bevestigd. | Potentieel persoonsgegeven IP. Verwerking en toelaatbaarheid opnemen/beoordelen; zelfhosting kan later een aparte wijziging zijn. |
| Externe scripts/embeds | Geen externe JS, iframe, kaart/video/social-embed gevonden in LK-hoofdsite. | Niet van toepassing op huidige bron. | Niet van toepassing. | Geen extra embedtoestemming implementeren voor iets dat er niet is. |
| Eigen-sitehosting/logs | IP, URL, tijdstip, user agent/referrer mogelijk nodig voor hosting/beveiliging; exacte logging onbekend. | Gedocumenteerd GitHub Pages-pad, daadwerkelijke hostconfig nog P07. | EXTERNAL VERIFICATION REQUIRED. | Provider bevestigt verzameling/toegang/regio/retentie; juiste privacycopy daarna. |
| Monitoring | Geen monitoring-SDK in LK-bron; aangeboden klantmonitoring nog niet ingericht/bewezen. | Toekomstige provider niet gekozen. HTTP-uptimecheck hoeft geen bezoekertracking te zijn. | Nog te bepalen naar werkelijk model. | Geen huidige monitoringgegevens verzinnen. H03 bij verkoop, P10 voor publieke belofte. |
| Gelinkte portfolio-demo’s | Broninventaris van drie demo’s toont lokale resources, geen externe embeds/scripts/fonts of storage/cookie-aanroepen in gerichte scan. | Dezelfde publicatieomgeving; geen runtimehertest. | Hostinglogs als hierboven. | Fictieve demo’s, geen klantresultaten. Geen generalisatie naar onbekende productie-injecties. |

**Opslagbesluit:** de assistent leest sessionStorage bij scriptinitialisatie; schrijft bij interactie/render en calculatorwijzigingen, dus niet uitsluitend na openen van het dialoogvenster. “Geen persoonsgegevens” betekent niet automatisch “geen toestemming nodig”. De Belgische GBA betrekt ook local/session storage bij de regels over toegang tot eindapparatuur; noodzakelijkheid voor een uitdrukkelijk gevraagde dienst kan een uitzondering geven. Documenteer de onderbouwing voor deze concrete hervatfunctie en het leesmoment. Als de uitzondering niet houdbaar is, is een gerichte wijziging nodig (bijvoorbeeld opslaggedrag aanpassen); niet willekeurig een cookiebanner toevoegen. [GBA: cookies en andere traceringsmiddelen](https://www.gegevensbeschermingsautoriteit.be/professioneel/thema-s/cookies).

**Formspree-providerinformatie:** de officiële securitypagina noemt hosting via AWS in de Verenigde Staten en SCCs bij de verwerkersrol. De privacyverklaring noemt internationale verwerking; accountlimieten beschrijven planafhankelijke retentie. Dit bevestigt geen afgesloten LK-DPA, specifieke ontvanger, bewaartermijn of gekozen plan. Marketing/cookies op Formspree’s eigen website mogen niet automatisch aan de LK-API-integratie worden toegeschreven. [Formspree Security](https://formspree.io/security/), [Privacy Policy](https://formspree.io/legal/privacy-policy/), [Account limits](https://help.formspree.io/articles/account-management/account-limits).

**Interne structuur voor toekomstige privacypagina — alle invulvelden blijven TODO:**

1. Verwerkingsverantwoordelijke: P01-identiteit/adres/contact, datum en versie.
2. Per doel: contactaanvraag beantwoorden, offerte/klantrelatie, administratie en technische beveiliging; exacte gegevens, noodzakelijkheid en bevestigde grondslag. Niet alle doelen automatisch op toestemming baseren.
3. Ontvangers/leveranciers: Formspree, mail, eigen-sitehost, Google Fonts; relevante rollen, landen, contracten/subverwerkers en waar nodig doorgiftewaarborgen. Geen fictieve EU-hosting.
4. Bewaartermijnen of concrete criteria per doel, inclusief Formspree, mail, logs en backups; accountant bevestigt wettelijke administratieve bewaring. Geen standaardtermijn verzinnen.
5. Rechten en uitvoerbaar verzoekproces: inzage, correctie, verwijdering, beperking, bezwaar, overdraagbaarheid waar van toepassing; intrekken van toestemming waar die grondslag geldt; klacht bij bevoegde toezichthouder.
6. Verplichte/optionele velden en gevolgen van niet verstrekken; geen onnodige bijzondere gegevens vragen.
7. Cookie-/opslaginformatie: assistent-key, doel, sessieduur en onderbouwde uitzondering of benodigde aanpassing. Fonts afzonderlijk behandelen.
8. Geen geautomatiseerde juridische besluitvorming door de vaste keuzehulp; prijs is niet bindend. Geen niet-bestaande profilering of AI-provider toevoegen.
9. Bereikbaar privacycontact, link bij formulier en footer van alle drie hoofdwebpagina’s; leesbare tekst vóór eerste persoonsgegevensverwerking.

De informatie moet transparant zijn over verwerkingsverantwoordelijke, doelen en rechten; de grondslag moet passen bij de werkelijke verwerking. Dit TODO-schema is nog geen juridische goedkeuring. [EDPB: transparantie en rechten](https://www.edpb.europa.eu/sme/be-compliant/respect-individuals-rights_en), [EDPB: rechtmatige verwerking](https://www.edpb.europa.eu/sme/be-compliant/process-personal-data-lawfully_en).

### B4. Security, SEO en productieconfiguratie

**Security:** huidige frontend bevat een publiek Formspree-formulier-ID, geen vereiste geheime API-key. Querywaarden worden naar toegestane commerciële keuzen genormaliseerd; tekst wordt via `textContent`/DOM-opbouw ingevoegd. Website-invoer staat alleen http/https toe, zonder embedded gebruikersnaam/wachtwoord. Geen contactgegevens in eigen session/local storage. Payload blijft tijdelijk in het paginageheugen voor foutbehoud en dubbele-verzendcontrole; dat is niet hetzelfde als duurzame browseropslag.

Gerichte herkenningsscan over 317 huidige Git-tracked/niet-genegeerde bestanden: geen matches voor private keys en herkenbare GitHub-, AWS-, Stripe- of OpenAI-secretpatronen. Dit is **geen volledige Git-history-, entropy- of accountaudit**. Geen credentials in rapport gezet. Hoofdsite gebruikt geen `target="_blank"`-links, dus daar geen ontbrekende noopener gevonden. Bestaande veilige externe-linkafspraken blijven gelden bij toekomstige toevoegingen.

Hoofd-HTML bevat CSP met self/scriptspecifieke hashes, beperkte Google-fontbronnen en Formspree-connect, `object-src 'none'`, `base-uri 'none'`, `form-action 'none'`, `frame-src 'none'`, plus upgrade-insecure-requests. Meta-referrerpolicy: `strict-origin-when-cross-origin`. Meta-CSP is geen bewijs van alle HTTP-beveiligingsheaders; hostconfig blijft P07/P08. Clientvalidatie/honeypot zijn geen server-side spam- of autorisatiegarantie. Geen onnodige securitylaag toegevoegd.

**SEO:** lokale canonicals wijzen naar `https://lkwebdesign.be/`, `/aanpak.html` en `/contact.html`; sitemap bevat die drie URL’s. Robots staat indexering toe en verwijst naar dezelfde sitemap. Titel/description, OG, favicon en ProfessionalService-data zijn aanwezig. Naam, founder Lorenz, Oud-Turnhout/BE, werkgebied en contact moeten P01/P09 volgen. Geen nep-reviews, ratings, openingstijden of extra adresgegevens toevoegen. Nieuwe privacy-/bedrijfspagina’s later passend linken en waar relevant in sitemap opnemen.

**Publicatie:** INTEGRATIONS noemt GitHub Pages `main` → `/docs`. `docs/CNAME` bevat `lkwebdesign.be`. Geen lokale `.github`-workflow gevonden. Historische `.openai/hosting.json` verwijst naar `dist`; dat is geen bewijs dat Sites het actuele publicatiepad is. Registry staat nog `draft`, canonicalURL null: toekomstige launch moet bronconfig én registratie coherent maken na ownerbesluit, niet alvast een productiefase invullen.

Aanpak/Contact hebben ook een link naar `https://www.lkwebdesign.be/`; de canonicals zijn non-www. Dat is pas aantoonbaar goed zodra de gekozen redirects werken. Read-only ophalen van beide publieke HTTPS-origins via de webtool leverde een toolfout op; geen status-/TLS-/redirectbewijs verkregen en **geen conclusie dat de site stuk is**. Host-/registraraccounts zijn niet geopend. Productie HTTPS, HTTP→HTTPS, www→voorkeursorigin en pad/querybehoud blijven expliciet P08.

GitHub stelt grenzen aan Pages-gebruik als gratis hosting voor online business, commerciële transacties en SaaS. De huidige LK-site is leadgeneratie zonder checkout; daaruit volgt niet automatisch toestemming of automatisch een bewezen overtreding. Laat P07 het concrete gebruik bevestigen en kies zo nodig pas na ownerbesluit passende hosting. Geen migratie uitgevoerd. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

### B5. Voorwaarden/offerte: besluiten en ontbrekende keuzes

Commercial Requirements is voldoende als commerciële basis, maar geen afgeronde juridische overeenkomst. Onderstaande onderwerpen vallen onder F01/F02/H06, tenzij een P-punt eerder van toepassing is.

| Onderwerp | Reeds besloten | Nog te besluiten / juridisch te toetsen |
|---|---|---|
| Scope/offerte | Indicaties, definitieve offerte na bespreking; maatwerk afzonderlijk | Exacte deliverables, inclusies/exclusies, offerteduur, wijzigingsprocedure en acceptatiemethode. |
| Betaling | Geen concrete betaalregeling besloten | Voorschot ja/nee, percentages/mijlpalen, vervaldatum, betaalmethode, opeisbaarheid, betwisting; fiscale aansluiting. |
| Oplevering/planning | 2–4 weken indicatief, quality check en klantakkoord | Startvoorwaarden, acceptatiecriteria, feedbackdeadlines, gevolgen vertraging/contenttekort en oplevermoment. |
| Revisies/feedback/content | Afgesproken feedbackmomenten; klantinhoud relevant | Aantal rondes, geconsolideerde feedback, aanspreekpersoon, verantwoordelijkheid voor teksten/beelden/rechten. |
| Intellectuele eigendom | Overeengekomen leveringen na volledige betaling overdraagbaar | Exacte rechten, bronbestanden, herbruikbare LK-elementen, portfolio-gebruik, timing en juridische overdrachtsvorm. |
| Third-party licenties | Eigen voorwaarden van fonts/stock/platforms blijven gelden | Assetregister, klantlicenties, beperkingen, recurring externe kosten en overdraagbaarheid. |
| Hosting/domein | Optioneel; klant registrant dag 1; domeinkosten apart; eigen provider mogelijk | Provider, accountmodel, beheerbevoegdheden, renewal/transfer, verantwoordelijkheid bij eigen provider. |
| Onderhoud/Care | €59 inclusief Hosting; maximaal 30 min; niet opspaarbaar/cumulatief | Aanvraag-/tijdregistratieproces, maandgrens, startmaand, toegang en uitvoeringsvenster. |
| Meerwerk | €65/u excl. btw, groter werk offerte | Vooraf schriftelijk akkoord, raming/maximum; geen minimumblok verzinnen. |
| Support/backups | Volgens afspraak; geen 24/7/uptime/herstelgarantie | Kanalen, werkdagen, haalbare reactie/uitvoering, frequentie/retentie/dekking/restoreprocedure, incident-escalatie. |
| Aansprakelijkheid | Geen specifieke beperking juridisch goedgekeurd | Passende verdeling/limieten, uitzonderingen, verzekering indien gewenst; geen vrijwaring blind toevoegen. |
| Beëindiging/transfer | Geen lock-in, overdracht mogelijk | Looptijd/opzegtermijn, saldo, begeleiding, data/export, toegangsintrekking, verwijdering en kosten indien overeengekomen. Domeinhouderschap niet als drukmiddel gebruiken. |
| Wanbetaling/overmacht | Geen definitieve clausules | Herinnerings-/opschortingsproces, proportionaliteit, wettelijke grenzen, continuïteit en provideroutages. |
| Privacy/geheimhouding | Geen vrije AI-chat/opslag contactdata in assistent | Rollen per dienst, verwerkingsovereenkomst indien nodig, toegangsbeveiliging en incidentmelding; aansluiten P04/F06. |
| Recht/rechtbank/B2C | Niet vastgesteld | Rechtskeuze, bevoegde rechter, dwingende consumentenregels en waar toepasselijk herroepings-/informatieplichten door jurist bevestigen. |

Geen algemene voorwaarden, rechtbankkeuze, betaaltermijn of aansprakelijkheidsbedrag is in deze audit uitgevonden.

## C. Concrete owner input required

Beantwoord deze vragen in een interne bedrijfsfiche; geen wachtwoorden, tokens of herstelcodes delen. Een antwoord sluit een punt alleen als ook het genoemde bewijs aanwezig is.

1. **P01:** Wat zijn de geregistreerde handelsnaam, juridische naam/rechtsvorm, ondernemingsnummer, officiële vestigingsadres en eventueel afwijkende correspondentieadres? Welke gegevens zijn bevestigd voor publicatie?
2. **P01/P02:** Wat zijn het actieve btw-nummer en het door de accountant bevestigde btw-regime/startmoment? Mag LK voor dit aanbod 21% btw aanrekenen? Lever de bevestiging, niet alleen een voorkeur.
3. **P02/F02:** Sluit LK uitsluitend contracten met ondernemingen voor beroepsdoeleinden, of ook met consumenten? Welke doelgroep moet publieke prijsweergave en contractdocumenten ondersteunen?
4. **P01/P06:** Is `info@lkwebdesign.be` de zakelijke én privacycontactmailbox? Wie beheert die? Welk zakelijk telefoonnummer wordt gebruikt, indien van toepassing, en wie is de bevoegde contactpersoon?
5. **P05:** Wie beheert het Formspree-account voor `mjyvnevy`, welk plan geldt en welke ontvanger/notification routing moet actief zijn? Lever een instellingenoverzicht zonder secrets.
6. **P04:** Welke mailprovider en eigen-sitehost verwerken aanvragen/logs? Welke bewaartermijnen worden per aanvraag, mailbox, log en backup gehanteerd na juridisch/fiscaal advies? Wie handelt rechtenverzoeken af?
7. **P04:** Laat je de concrete sessionStorage-hervatfunctie en externe Google Fonts behouden na onderbouwde privacybeoordeling, of geef je later opdracht voor een beperkte alternatieve implementatie?
8. **P07/P08:** Welk account/provider/pad wordt het definitieve productiepad? Wie beheert domein, renewal en recovery? Bevestig de gewenste canonical-origin; de bron gaat uit van `https://lkwebdesign.be/`.
9. **P09:** Bevestig publicatierechten voor LK-logo/portret/projectbeelden/fonts en de feiten Lorenz, Oud-Turnhout, België en werkgebied. Zijn licentiebeperkingen of credits van toepassing?
10. **P10/H01–H04:** Welke provider, kostprijs, backup/restore-, monitoring- en domeinworkflow onderbouwen het huidige publieke Hosting/Care-aanbod? Als je dit uitstelt, bevestig expliciet de gewijzigde launchscope; deze audit verandert het aanbod niet.
11. **F01/F03:** Wat zijn revisierondes, feedbacktermijn, offerteduur, voorschot/betaalmijlpalen, betalingstermijn en acceptatiecriterium? Welke bankrekening, boekhouder en nummerings-/creditnotawerkwijze worden gebruikt?
12. **F04:** Welke bestaande of nog te kiezen facturatieoplossing verzorgt vereiste gestructureerde B2B-facturen en ontvangst? Welke toepasselijkheid/uitzondering heeft de accountant bevestigd?
13. **H05/H06:** Welk aanvraagkanaal, tijdlog, resetmoment, werkdagen, haalbare reactie-/uitvoeringsvensters, urgentiecontact, factuurmoment en opzegproces kies je? Geen 24/7-bereikbaarheid veronderstellen.
14. **F05/F06:** Waar worden klantakkoorden, scope, rechten en toegangen veilig vastgelegd? Wie heeft toegang, hoe wordt MFA/recovery beheerd en wie neemt incidenten/rechtenverzoeken op?
15. **P11/P12, pas na voorbereiding:** Keur je het exacte testplan met één echte fictieve aanvraag en gecontroleerde reply-to-test goed? Daarna: keur je de exacte definitieve staat en afzonderlijk de deployment goed?

**Eerstvolgende owneractie:** lever de officiële bedrijfsfiche uit vraag 1, de fiscale bevestiging uit vraag 2 en het B2B/B2C-besluit uit vraag 3. Daarmee kunnen de juridische identiteit en fiscale publicatietekst worden afgerond zonder aannames.

## D. External verification

De 12 primaire externe punten zijn **P02, P04, P05, P06, P07, P08, P11, F02, F04, H02, H03, H04**. Andere ownerpunten kunnen providerinput nodig hebben, maar worden niet nogmaals als aparte externe verificatie geteld.

### D1. Formspree — P05/P04

**Update 27-09-2026 — expliciet geautoriseerde echte bezorgtest:** één inzending vanaf de actuele publieke `https://lkwebdesign.be/#contact` naar `mjyvnevy`, test-ID `LK-FORMSPREE-20260927-01`. UI-lock en succes/reset bevestigd; één nieuw Formspree-inboxrecord, geen nieuwe spamregistratie; één volledige notificatie in zakelijke Outlook-inbox om 00:11 CEST. Reply-To selecteert correct Hotmail. Eén neutraal antwoord is op 27-09 om **00:22 CEST ontvangen in Hotmail Ongewenste e-mail**, met één juiste compacte antwoordhandtekening en correcte mailto-/HTTPS-linkdoelen. **LK FORMSPREE END-TO-END: PASS voor de huidige publieke formulierroute.** Junkplaatsing blijft een afzonderlijke deliverability-bevinding; geen spaminstelling gewijzigd. **P11 niet integraal gesloten:** deze directe homepage-test bewijst geen calculator-/assistentcontext of niet-gepubliceerde lokale release. Numerieke HTTP-status/ruwe POST-telling niet vastgelegd. Publiek `/contact.html` is 404; deze test betreft de oudere publieke homepage, niet de lokale contactrelease. Providernaamactie blijft afzonderlijk open via Combell-ticket (ownerinformatie). Zie [gedetailleerd bewijs](LK-EMAIL-DNS-PRELAUNCH.md). De onderstaande brede account-/privacy-/releasechecks worden hierdoor niet automatisch READY.

Technisch aanwezig: publiek endpoint `https://formspree.io/f/mjyvnevy` op `docs/contact.html`; JSON POST via `contact.js`; credentials omit, redirects als fout; timeout 20 seconden; veldvalidatie/lengtegrenzen, website-normalisatie en honeypot; locking tijdens request; succes alleen bij HTTP-ok én JSON `ok: true`; geen automatische retry. Fout laat invoer staan en herstelt controls. Na bevestigd succes wordt formulier gereset. Dubbele verzending wordt tijdens verzenden en voor de laatst succesvolle identieke payload binnen dezelfde pagina geblokkeerd; **geen globale idempotentie over reloads of na een onduidelijke timeout**.

Frontend-CSP en endpointvalidatie zijn geen bewijs van een Formspree domain allowlist. Zonder JavaScript blijft verzenden uitgeschakeld; mailto is het alternatief. Domain restriction, eigenaarschap en mailbox zijn niet lokaal vast te stellen.

Accountcheck door Lorenz/provider:

- [ ] Juiste account-/formuliereigenaar, recovery/MFA en bevoegdheid om bedrijfsaanvragen te verwerken.
- [ ] Formulier actief, plan/quota/limietgedrag, geverifieerde ontvanger en routing; geen verborgen extra ontvangers/integraties.
- [ ] Toegestane productie-origin(s), domeinrestrictie en samenhang met origin-only referrerpolicy bevestigd.
- [ ] Spam-/honeypot-/eventuele providerfilters ingesteld en begrepen; geen captcha of cookiegedrag veronderstellen.
- [ ] `email` als reply-to correct gemapt; naam/bericht en projectcontext leesbaar, optionele lege velden acceptabel.
- [ ] Werkelijke opslag, retentie, exports/verwijdering, logs, subverwerkers, verwerkingslocatie en passende DPA/doorgifteafspraken bevestigd.
- [ ] Bewijs gedateerd bewaren zonder klantdata, credentials of volledige gevoelige notificaties in Git.

### D2. Oorspronkelijk bezorgtestplan — P11 (historisch; actuele geautoriseerde test hierboven)

1. P01–P08 voorbereiden; definitieve HTTPS-productie-origin beschikbaar en gecontroleerd. Lorenz autoriseert expliciet **één echte formulierinzending**, ontvanger, testtijd en aansluitende reply-to-test. Een goedkeuring van deze checklist is niet die toestemming.
2. Gebruik naam `LK Prelaunch Test`, bedrijf `Fictieve test — geen klant`, een door Lorenz beheerde testmailbox als afzender en bericht `PRELAUNCHTEST [unieke referentie] — fictieve aanvraag; geen klantopdracht`. Laat telefoon leeg; optionele website `https://example.com`. Geen geraden e-mailadres gebruiken.
3. Open productie-Contact via een calculator- of assistentkeuze, bijvoorbeeld nieuwe website, 4–5 pagina’s, eenvoudige opbouw. Noteer verwachtte contextvelden/range. Geen persoonlijke gegevens in de URL.
4. Inspecteer vóór submit origin, endpoint en payload. Verzend één keer. Eén extra klik tijdens lopende verzending mag alleen aantonen dat de UI gelockt blijft; netwerklog moet exact één POST tonen. Geen tweede aanvraag voor de test maken.
5. Noteer tijdstip, HTTP-status, providerrequest-ID indien beschikbaar en JSON `ok: true`. Controleer zichtbare successtatus/reset. Stop bij timeout of onduidelijke ontvangst; eerst provider/inbox controleren, nooit automatisch opnieuw verzenden.
6. Lorenz controleert inbox én spam: exact één aanvraag, juiste ontvanger/onderwerp, leesbare naam/bericht/interesse en `selected_package`, `assistant_source`, `project_summary` volgens gebruikte route. Geen productieklantdata in bewijs opnemen.
7. Controleer reply-to-adres en voer alleen binnen de expliciet goedgekeurde test een antwoord naar de beheerde testmailbox uit. Verifieer ontvangst en afzenderprofiel. Daarmee worden ontvangst en antwoord afzonderlijk bewezen.
8. Volledige identieke-payload/dubbel-submit- en foutpadtests blijven in een **volledig geblokkeerde/gemockte** sessie: validatiefout, 4xx, 429, 5xx, timeout, offline, ongeldige JSON, `ok:false`, redirect. Bewijs dat controls herstellen en invoer blijft staan. Geen echte fout- of spamrequests naar Formspree uitlokken.
9. Maak rapport met origin, snapshot/release, tijd, geautoriseerd aantal requests, uitkomst acceptatie/UI/inbox/spam/reply-to/context en bewijsverwijzingen. Een API-succes zonder mail sluit P11 niet.
10. Spreek opschoning van testrecord/mail volgens bevestigd beleid af. Wijzig geen retentie of providerinstellingen als verborgen onderdeel van een bezorgtest. Elke extra echte inzending vereist nieuwe expliciete autorisatie.

### D3. E-mail/DNS — P06

Lokale verwijzingen gebruiken consequent `info@lkwebdesign.be`; mailto-links zijn aanwezig op hoofdsite. Geen DNS-records opgezocht of gewijzigd in deze e-mailcontrole. Lorenz/mailprovider verifieert: verzenden/ontvangen, inbox/spam, SPF, DKIM, DMARC inclusief alignment van werkelijk verzendpad, reply-to, professioneel afzenderprofiel, desktop- en mobiele mailclient, toegang/recovery en bewaarbeleid. Bewijs: geredigeerde testheaders/uitkomsten, geen mailboxwachtwoorden. Een DNS-record alleen bewijst geen goede bezorging.

### D4. Hosting en domein — P07/P08/H02/H03/H04

Eigen site: werkelijk ingestelde host/publicatiebron, toegestane commerciële inzet, logs/privacy, TLS, voorkeursorigin, redirects, rollback en toegangsbeheer bevestigen. Klantdienst: geselecteerd product/resellermodel, kosten/limieten, backup/restore, monitoring/SSL, outage-escalatie en transferprocedure bevestigen. Registrar: werkelijke houder, registrantwijziging waar nodig, nameservers/DNS, vervaldatum/renewal, authcode-procedure en facturatie. Domeineigendom niet afleiden uit een CNAME of werkende website. Geen account of DNS-mutatie in deze audit.

### D5. Fiscaliteit — P02/F04

Accountant bevestigt registratie, btw-regime, prijs-/factuurtekst en verplichte factuurgegevens. Werk een model uit met juiste identiteit, nummering/datum, klantgegevens, prestaties/periode, fiscale behandeling en totalen; creditnota en bewaarbeleid aansluiten. Geen vrijstelling, bankrekening, factuurnummer of termijn verzinnen.

Sinds **1 januari 2026** geldt Belgische gestructureerde e-facturatie voor binnen het toepassingsgebied vallende B2B-transacties; een pdf-mail is daarvoor onvoldoende. Ook de kleineondernemingsvrijstelling sluit dit niet algemeen uit. Alleen B2C factureren kan nog steeds ontvangst van gestructureerde leveranciersfacturen vereisen. Laat de concrete uitzonderingen en inkomende/uitgaande verplichtingen bevestigen; deze actie kan dus al vóór de eerste betalende klant nodig zijn. Geen software gekozen. [Officiële e-factuurinformatie: toepassingsgebied](https://efactuur.belgium.be/nl/article/voor-wie-wordt-e-facturatie-verplicht).

### D6. Privacy/legal — P04/F02

Toets privacyrollen/grondslagen, leveranciers/DPA, daadwerkelijke internationale doorgiften, termijnen en rechtenproces. Beoordeel sessionStorage-leesmoment en hervatfunctie, Google Fonts en de privacytekst vóór publicatie. Juridische review van offerte/voorwaarden/servicebijlage volgt de beslispunten in §B5, inclusief B2B/B2C, IP, betaling, aansprakelijkheid, beëindiging, overmacht en recht/rechtbank. Een provider die zichzelf compliant noemt sluit deze LK-verantwoordelijkheid niet.

## E. Deployment checklist — exacte latere volgorde

1. P01/P02/P09 bevestigen: identiteit, fiscaliteit, doelgroep, feiten en rechten.
2. P04–P08 sluiten voor leveranciers, mail, eigen-sitehost en domein; P10 met uitvoerbaar aanbod onderbouwen. Commercial Lock-prelaunchvoorwaarden meenemen.
3. Op basis van bevestigde gegevens P03 in een afzonderlijk geautoriseerde wijziging uitvoeren: bedrijfs-/privacypagina, footer-/formulierlinks en noodzakelijke metadata. Geen placeholders publiek lanceren.
4. Definitieve publicatiebron, canonical-origin, www/HTTP-strategie en rollback naar vorige release vastleggen; registry en bronconfig later coherent bijwerken. Vastleggen wie toegang en herstelbevoegdheid heeft.
5. Wijzigingsimpact bepalen; bestaand geldig bewijs hergebruiken, uitsluitend noodzakelijke nieuwe QA voor werkelijk gewijzigde bron/config uitvoeren. Geen baselines automatisch accepteren; demo-scope bewaken.
6. Definitief artefact/snapshot en release-inhoud vastleggen; Lorenz beoordeelt exacte staat. P12 vereist expliciet owner-akkoord en **afzonderlijke** toestemming voor deployment/DNS indien nodig. Deze audit verleent geen van beide.
7. Pas met die toestemming een gecontroleerde release op de bedoelde productie-origin plaatsen. Vóór aankondiging/actieve launch read-only HTTPS/redirects, hoofdpagina’s, assets, privacylinks, mailto, canonical/OG, robots/sitemap en onbedoelde preview/noindex/mocks controleren. Geen echte submit als smoke-test toevoegen.
8. Met afzonderlijke testtoestemming §D2 uitvoeren en P11 sluiten. Productie-origin kan hiervoor nodig zijn vóór de actieve launch; behandel dit als gecontroleerd oplevermoment. Bij mislukte ontvangst niet aankondigen; afgesproken rollback/opschorting gebruiken, niet onbeheerd laten draaien als “gereed”.
9. Alle P-punten en toepasselijke contract-/servicevoorwaarden bevestigd? Leg tijd, release, owner-akkoord en uitkomsten vast en geef actieve lancering vrij volgens toestemming.
10. Daarna optioneel A01 uitvoeren. A02 bijwerken zodra feitelijke configuratie bekend is. Geen nieuwe tracking installeren.

Er is nu niets gepubliceerd of omgeschakeld. Een eventueel reeds online oudere site is niet automatisch identiek aan de lokale goedgekeurde LK Final-state.

## F. First-client checklist — exacte volgorde

1. Bevestig P-punten, registratie/btw en toepasselijke e-facturatie vóór relevante zakelijke transacties. Rond F01–F06 af; geen geld aannemen op basis van onbesliste voorwaarden.
2. Ontvang aanvraag, beperk opgeslagen data, maak een eenvoudig intern dossier met datum/contact en privacygrondslag volgens bevestigd beleid.
3. Intake: zakelijke behoefte, doelgroep, nieuw/redesign, inhoud/pagina’s, functies, planning, bestaande domein/hosting/e-mail en toegang. Controleer wie bevoegd is akkoord te geven.
4. Leg scope, deliverables, uitsluitingen, revisies, feedback, klantinhoud/assetrechten en acceptatiecriteria vast. Houd indicatieve prijs en definitieve offerte uit elkaar.
5. Verstrek offerte met juiste bedrijfs-/btw-gegevens, betaling, externe kosten, voorwaarden en eventuele servicebijlage. Alleen bevestigde voorschotregeling toepassen.
6. Bewaar expliciet klantakkoord op de exacte versie; registreer factuur en eventueel voorschot volgens gekozen systeem en wettelijke e-facturatievereisten. Creditnota-/correctiepad gereed.
7. Verzamel goedgekeurde content/assets en rechten; regel veilige toegangen met minimale rechten. Domein registrant klant vanaf dag 1, bestaande infrastructuur behouden waar mogelijk. Hosting/Care alleen na §G.
8. Ontwerp/bouw binnen scope, verzamel afgesproken geconsolideerde feedback; scopewijzigingen vooraf offreren/accorderen.
9. Doorloop relevante LK Quality Check met mocks voor externe writes; technische PASS en expliciete klantapproval afzonderlijk vastleggen.
10. Check overeengekomen betaling/oplevervoorwaarden; verkrijg afzonderlijke toestemming voor livegang en eventuele domein-/mailwijzigingen. Maak release-/rollbackplan.
11. Publiceer volgens overeengekomen proces, controleer productie en autoriseer echte integratietests afzonderlijk. Leg klantacceptatie van de exacte eindstaat vast.
12. Draag overeengekomen leveringen/rechten na volledige betaling over, rekening houdend met derdepartijlicenties. Geef domein-/hostingdocumentatie, toegang en contact-/supportgrenzen mee.
13. Activeer alleen gekozen Hosting/Care met startdatum, billing en tijdlog; plan relevante opvolging. Sluit projectdossier af, trek overtollige toegang in en volg bewaarbeleid.

## G. Hosting/Care: operationele voorwaarden vóór verkoop

### G1. Hosting, kosten, backups en incidenten

Onderstaande checklist concretiseert H01–H03/H06; niet als reeds geleverd verkopen. P10 vereist vóór publicatie onderbouwing van de huidige aanbodclaims.

- [ ] Selectiecriteria vastgelegd: statische/CMS-sitevereisten, opslag/verkeer, datalocatie, accountisolatie, toegangen, SSL, DNS, backup/restore, monitorbaarheid, export/transfer en providerondersteuning.
- [ ] Eigen-sitehosting en klantdienst afzonderlijk gekozen. Geen GitHub Pages- of andere gratis setup automatisch als bewijs voor “professionele beheerde hosting”.
- [ ] Kostenstaat: provider, domein, backupopslag, monitoring, licenties, betaal/administratiekosten en reële beheertijd. Vergelijk opbrengst €24,90 of €59 excl. btw met werkelijke kosten; Care bevat Hosting. Geen marge berekend zonder providerinput.
- [ ] Accounts: klant als overeengekomen eigenaar, LK beperkte beheer-/resellerrechten; MFA, recovery, bevoegde personen en exittoegang vastgelegd. Klant blijft domeinhouder.
- [ ] Backupscope: sitebestanden/content, database indien aanwezig, configuratie en herstelbare afhankelijkheden benoemd. Repository alleen niet automatisch volledige backup; e-mail/Formspree-data niet stilzwijgend inbegrepen.
- [ ] Frequentie, retentie, versie-/verwijdergedrag, versleuteling/toegang, off-site/onafhankelijke kopie waar nodig en bewaarkosten gekozen. Geen aantallen dagen of RPO/RTO ingevuld zonder besluit.
- [ ] Restore-runbook: wie aanvraagt/goedkeurt, verificatie van backup, veilige testomgeving, herstelstappen, controle, productieautorisatie en verslag. Geslaagde proefrestore bewaren met datum en dekking.
- [ ] Realistisch hersteldoel en mogelijk gegevensverlies bespreken; geen zero-data-loss, gegarandeerde hersteltijd of absolute herstelbelofte. Leg inbegrepen herstelwerk versus apart werk vast.
- [ ] Beschikbaarheidsmonitoring: welke URLs/protocols, frequentie, alarmontvanger, fallback, onderhoudsvensters, logbewaring. Alerttest bewijsbaar; geen bezoekersanalytics toevoegen.
- [ ] SSL-verlenging, DNS-beheer en wijzigingenlog: verantwoordelijke en verval-/foutmelding vastgelegd; mailrecords beschermen bij webwijzigingen.
- [ ] Incidentrunbook: melding → classificatie/triage → providerstatus/support → klant informeren → goedgekeurde herstelactie → verificatie → verslag. Bij mogelijk datalek afgesproken privacyprocedure/legal inschakelen; geen wettelijke beoordeling door gokwerk.
- [ ] Provideroutage en afwezigheid Lorenz: haalbare escalatie/fallback, communicatie en bevoegdheden. Geen 24/7-support impliceren.
- [ ] Schaalgrens: capaciteit en kostprijs bij meer klanten periodiek beoordelen; limieten/overstap alleen met vooraf afgesproken klantimpact. Geen onbeperkte opslag, verkeer of wijzigingen beloven.
- [ ] Billing/start/opzegging: één Hosting óf Care-bedrag, domein apart, betaalopvolging, export/transfer, toegangsintrekking en verwijdering na contractuele/juridische beoordeling.

### G2. Domeinworkflow

1. Controleer bestaand domein, werkelijke houder, registrar, toegang, vervaldatum, nameservers en bestaande DNS/e-mail. Bewaar een export vóór latere geautoriseerde wijzigingen.
2. Verzamel door klant bevestigde officiële registrantgegevens en registreer **vanaf dag 1 op naam van de klant**. LK mag technisch contact, beheerder of reseller zijn. Leg accounttoegang en recovery vast.
3. Leg keuze vast: klant factureert rechtstreeks met provider of LK factureert als reseller. Domeinregistratie/verlenging afzonderlijke jaarlijkse kost, extensie/bedrag/renewal en betaalverantwoordelijke expliciet.
4. Documenteer DNS-zone, nameservers, hostkoppeling, mailrecords, beheerbevoegdheid en wijzigingsakkoord; geen verplichte verhuizing bij eigen provider.
5. Regel renewal-notificaties, vervaldatumopvolging, betaalmislukking/escalatie en klantcommunicatie. Geen onuitgesproken aanname dat “auto-renew” alles oplost.
6. Leg authcode-/transferprocedure, providerbeperkingen, vereiste verificatie, toegang bij beëindiging en overdrachtsdocument vast. Bewaar authcodes veilig buiten Git; lever alleen aan bevoegde klant.
7. Bij vertrek: afgesproken export/toegang en medewerking, behoud van klantregistrant, continuïteit/e-mailafstemming en verwijderen van overtollige LK-rechten. Betalingsafspraken juridisch afhandelen zonder domeineigendom als lock-in.

### G3. Care-proces voor één persoon

Dit is een voorgestelde eenvoudige werkvolgorde; **kanaal, werkdagen en termijnen zijn nog ownerbesluiten H05**, geen nieuwe publieke toezeggingen.

1. Eén gekozen aanvraagkanaal. Klant vermeldt URL, gewenste tekst/beeld en gewenste timing; geen wachtwoorden per ticket/mail. Lorenz registreert datum, klant en verzoek in een eenvoudig overzicht.
2. Triage: kleine wijziging binnen bestaande structuur, technische storing of nieuw scopewerk? Kleine tekstcorrectie/bestaand beeld vervangen kan binnen Care; nieuwe pagina, redesign, functie, webshop, API, integratie of omvangrijke contentcreatie niet automatisch.
3. Controleer resterende maandtijd en maak een tijdinschatting. Maximaal 30 minuten per maand; ongebruikte tijd vervalt, geen rollover/tegoed. Leg kalender-/contractmaand en behandeling startmaand eerst vast.
4. Houd per taak bestede minuten en resterend saldo bij. Geen niet-goedgekeurd afrondings- of minimumfacturatieblok invoeren. Leg aan klant uit welke werkzaamheden tijd verbruiken.
5. Dreigt overschrijding of valt werk buiten scope? Stop en vraag vooraf schriftelijk akkoord op raming/maximum tegen €65/u excl. btw of afzonderlijke offerte. Geen verrassing op factuur; akkoord bewaren.
6. Plan uitvoering binnen door Lorenz vastgelegde werkdagen en haalbare reactie-/uitvoeringsvensters. Onderscheid ontvangstbevestiging van oplossing. Geen dezelfde-dag- of 24/7-belofte.
7. Voer beperkte wijziging uit, controleer relevante werking, leg resultaat/tijd vast en bevestig aan klant. Technische incidenten via G1; beslis contractueel welk herstel onder Hosting valt in plaats van stilzwijgend alles van Care-minuten af te trekken.
8. Sluit maand af: noteer tijdgebruik, reset volgens afgesproken periode, laat ongebruikte minuten vervallen; factureer alleen vooraf geaccordeerd extra werk. Bewaar dossier volgens bevestigd beleid.
9. Bij urgent technisch probleem: gekozen urgentiekanaal en providerescalatie; bij afwezigheid afgesproken fallback. Preventieve checks/backups en reactieve contentwijzigingen hebben ieder een duidelijke eigenaar.

## Afsluiting en wijzigingslog

Deze opdracht voegt uitsluitend `LK-PRELAUNCH-CHECKLIST.md` toe. Publieke websitecode en QA-configuratie zijn niet gewijzigd. Bestaande technische goedkeuring blijft aan de huidige snapshot gekoppeld; latere bedrijfs-/privacywijzigingen moeten hun eigen impactcontrole krijgen. Alle open punten hebben een primaire fase, verantwoordelijke en verlangd bewijs. Er zijn geen bewaartermijnen, grondslagen, officiële gegevens, providers, garanties of fiscale status ingevuld zonder bevestiging.

**LK PRELAUNCH AUDIT: READY FOR OWNER ACTION**
