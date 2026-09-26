# LK Final — commerciële afspraken

Status: door de eigenaar goedgekeurde Commercial Lock, vastgelegd op 23 september
2026. Dit document is de enige bron voor de commerciële regels van LK Webdesign.
Het vervangt strijdige eerdere commerciële voorstellen, bedragen en pakketnamen.
Wijzigingen vereisen een expliciet nieuw owner-besluit; niet stilzwijgend aanpassen.

Herzien op 24 september 2026 volgens owner-opdracht “Final Premium Rebuild”,
deel 3 (§62–85). Dit besluit autoriseert de lokale implementatie en QA van de
hybride paginastructuur; geen publicatie, commit, push of echte formulierinzending.
Migratie: legacy Start/Groei en Basis/Plus vervallen. De onderstaande prijsranges,
Hosting €24,90, Care €59 inclusief 30 minuten, optioneel beheer en domeineigendom
blijven behouden. Webshops en complexe automatisering vallen expliciet onder maatwerk.

Herzien op 25 september 2026 volgens expliciet owner-besluit bij “Compact Premium
Homepage”: LK Care kost €59/mnd excl. btw inclusief LK Hosting. LK Hosting blijft
ook afzonderlijk beschikbaar voor €24,90/mnd excl. btw. Hosting en Care worden niet
opgeteld; dit vervangt de eerdere afspraak over twee afzonderlijke diensten.
De eigenaar autoriseert uitsluitend deze commerciële wijziging ook in Aanpak &
prijzen, LK Assistent en de contactcontext. Domeinregistratie/verlenging blijft
een aparte jaarlijkse kost. De bestaande lokale LK Assistent blijft een vaste
keuzehulp zonder externe AI of persoonsgegevensopslag. Websitebouwprijzen en
alle overige niet-tegenstrijdige afspraken blijven behouden.

Buiten de hierboven expliciet goedgekeurde opdracht autoriseert deze lock geen
volgende bouwslice, publicatie, commit, push of echte
formulierinzending. De goedgekeurde creatieve richting C blijft gelden. De
[Development Standard](LK-DEVELOPMENT-STANDARD.md) bezit de technische werkwijze;
de [projectregistratie](scripts/qa-projects.json) bezit scope, freeze en publicatiefase.
Goedgekeurd aanbod is niet hetzelfde als geverifieerde operationele gereedheid.

## 1. Positionering, vertrouwen en contact

- Hoofdaanbod: professionele bedrijfswebsites voor zelfstandigen en kleine bedrijven.
- AI, API's, automatisering, koppelingen en complexe functies zijn optioneel maatwerk
  op afzonderlijke offerte; geen gelijkwaardige hoofdpropositie. De oude regel
  “Websites · AI · Automatisering” is geen geldige overkoepelende positionering meer.
- De klant werkt rechtstreeks met Lorenz: persoonlijk contact, korte lijnen,
  duidelijke afspraken en continuïteit. Geen onbevestigde beschikbaarheidsclaims.
- Verkoop door sterk werk, helderheid, prijsrichting, transparant eigendom,
  technische kwaliteit en laagdrempelig contact. Geen valse urgentie, verzonnen
  reviews, klanten, kwalificaties, prijzen/awards of omzet- en conversieresultaten.
- Eerste contact vraagt naam, e-mail en een korte toelichting op zaak/project.
  Alleen relevante context toevoegen: nieuw/redesign, paginaomvang, bijzondere
  wensen, huidige website en calculatorselecties. Geen uitgebreide verplichte intake.
- Bestaande Formspree-betrouwbaarheid behouden waar compatibel: validatie,
  foutfocus, honeypot, verzendvergrendeling, timeout, invoerbehoud, geen automatische
  retry, gecontroleerde successtatus en afzonderlijke projectsamenvatting.
  Ontwikkeling en QA gebruiken uitsluitend mocks/blokkering, nooit echte inzendingen.

## 2. Bezoekersroute en informatieverdeling

Gewenste route: uitstekende eerste indruk → zichtbaar verschillend werk → begrip
van zakelijke bezoekersvragen → prijsrichting → duidelijk proces → Lorenz → gesprek.

- **Home:** hero/positionering, portfoliobewijs, beknopte aanpak + prijsoriëntatie,
  compacte service-, calculator-, proces-, support- en FAQ-ingangen,
  Lorenz/direct contact, footer. Geen duplicatie van volledige dedicated flows.
- **Projecten en projectverhalen:** Kelmora (techniek/vakbedrijven), Velune
  (beauty/wellness), AVREN (premium automotive). Altijd herkenbaar als fictieve
  demoprojecten, nooit betalende klanten. Verhaal: opgave → creatieve oplossing →
  nuttige bezoekersinteractie → wat dit over LK aantoont. Geen één-template-indruk.
- **Aanpak & prijzen:** volledige prijsindicator, werkwijze, scope, aan te leveren
  inhoud, verwachte duur, redesign, Hosting/Care, domein, eigen provider en meerwerk.
- **Contact:** korte aanvraag, zichtbare/bewerkbare projectcontext, vervolgstap en
  rechtstreeks contact met Lorenz. Geen onbevestigde reactietermijn.
- **Privacy/bedrijfsinformatie:** uitsluitend werkelijke, bevestigde gegevens.
- **Offerte/voorwaarden/serviceafspraak:** exacte inclusies, operationele scope,
  verantwoordelijkheden, grenzen en contractuele uitwerking.

Home krijgt geen volledige calculator/contactformulier, grote FAQ, hosting- of
onderhoudstabel, AI-/automatiseringssectie, groot dienstenraster of herhaalde
voordelen/procesblokken. Belangrijke informatie verhuist naar de passende pagina.
Beoordeel mobiel op informatiewaarde, herhaling, cognitieve belasting, beslisnut en
scrollbelasting; geen universele hoogtecap, eindeloze kaartstapels of verplichte
carrousels. Bezwaren contextueel beantwoorden, niet verzamelen in één grote FAQ.

## 3. Prijzen en btw

**Herzien op 27 september 2026 volgens expliciet owner-besluit “Ultimate Prelaunch Master Control”, §4–8.** B2B én B2C; beoogd normale Belgische btw-regeling, 21%. De netto basisbedragen hieronder blijven exact ongewijzigd. Publieke presentatie zodra fiscaal toepasbaar: **inclusief 21% btw primair, exclusief btw secundair en kleiner eronder**, beide direct zichtbaar, zonder toggle. De eerdere exclusief-only presentatie is **SUPERSEDED**.

Lokale implementatie is in deze opdracht geautoriseerd; dit bevestigt geen registratie of btw-activering en verleent geen publicatietoestemming. Lorenz heeft nog geen definitief ondernemings-/btw-nummer. Vóór publicatie moeten inschrijving, fiscale toepasbaarheid en ingangsdatum worden bevestigd. Geen fictieve nummers of vrijstellingsclaim.

`docs/commercial.js` blijft de centrale netto bron. Eerst de bestaande netto calculatorweging/€25-afronding toepassen, daarna 21% btw afleiden en op centen afronden. Bruto website-indicaties worden momenteel exact met centen weergegeven; Hosting/Care/uurwerk eveneens met centen. `scripts/lk-price-fallbacks.cjs` genereert (`--write`) of controleert de statische HTML-fallbacks uit diezelfde bron; geen onafhankelijke bruto prijstabel. Gewone historische bruto voorbeelden zijn geen nieuwe prijsbesluiten.

| Websiteomvang | Goedgekeurde prijsrichting |
|---|---|
| 1–3 pagina’s | €995–€1.290 excl. btw |
| 4–5 pagina’s | €1.390–€1.790 excl. btw |
| 6–8 pagina’s | €1.790–€2.290 excl. btw |
| 9+ pagina’s | Vanaf ongeveer €2.300 excl. btw / persoonlijke offerte |
| Complexe AI/API/automatisering/webshop/maatwerkfunctionaliteit | Afzonderlijke offerte |

Dit zijn indicaties; de echte scope bepaalt de offerte. Geen verzonnen exacte
totalen, toeslagen of impliciete inclusie van complexe functies. Bestaande
Start/Groei- en Basis/Plus-logica geldt niet als bron voor LK Final. Exacte
inclusies en benodigde klantinhoud worden in de offerte vastgelegd; onbevestigde
oude pakketvoorwaarden niet automatisch overnemen.

## 4. Prijsindicator en redesign

De volledige indicator hoort primair op Aanpak & prijzen; Home geeft prijsrichting
en een CTA. Toon een nuttige indicatie zonder persoonsgegevens te vragen.
Ondersteun nieuwbouw, redesign, paginagroepen, “Ik weet het nog niet”, bijzondere
wensen en AI/API/maatwerk, plus wijzigen, reset en overdracht naar Contact.
Complex maatwerk blijft zichtbaar afzonderlijk begroot. Neem alleen niet-persoonlijke
projectcontext mee; geen persoonsgegevens in een URL. Eigen berichttekst niet
overschrijven en geen verouderde/tegenstrijdige selectie stilzwijgend meesturen.

Goedgekeurde calculatorweging: eenvoudig +€0; gemiddeld +€200–€350;
uitgebreid +€450–€750. Functies: extra formulier +€100–€175,
blog/nieuws +€150–€250, portfolio +€150–€300, animatie/interactie +€200–€400,
meertaligheid +€250–€450, boeking +€300–€550, externe integratie +€300–€600.
Tel ondergrenzen en bovengrenzen afzonderlijk bij de basisrange. Behoud de
ongewogen basisranges exact; rond gewogen ranges naar buiten op €25, nooit onder
de basisrange. Vanaf een afgeronde bovengrens van €5.000 volgt persoonlijke
offerte. Ook 9+, onbekende omvang, AI/API, webshop en complex maatwerk krijgen
altijd “Persoonlijke offerte nodig”. Dit zijn interne indicatieve wegingen, geen
losse vaste prijslijst. Centrale runtimeconfiguratie: `docs/commercial.js`.
Contact reconstrueert range/offertestatus uit de niet-persoonlijke keuzes.

Bij redesign eerst beoordelen wat behouden kan blijven: website/techniek, inhoud,
domein, hosting, e-mail, analytics, integraties en externe diensten. Offerte hangt
mede af van migratie, toegangen en functionaliteit. Geen verplichte verhuizing naar
LK en geen automatische korting omdat al een website bestaat.

## 5. Optionele ondersteuning na oplevering

| Keuze | Prijs | Commerciële scope |
|---|---|---|
| Geen terugkerende LK-dienst | Geen LK-abonnement vereist | Eigen provider toegestaan; ondersteuning afzonderlijk afspreken |
| LK Hosting | €24,90/mnd excl. btw | Technisch hostingbeheer volgens onderstaande scope |
| LK Care | €59/mnd excl. btw | Inclusief LK Hosting, relevant websiteonderhoud, technische checks en maximaal 30 minuten kleine content-/beeldwijzigingen per maand |

LK Hosting is optioneel voor €24,90/mnd excl. btw; LK Care is optioneel voor
€59/mnd excl. btw inclusief Hosting. Geen apart hostingbedrag boven op Care. Geen verplichte aankoop
bij een website en geen extra pakketladder of verzonnen korting. Een eigen provider
is toegestaan; eventuele dienstverlening op die infrastructuur wordt afgestemd.

**Hosting-scope:** beheerde websitehosting, SSL/HTTPS, automatische back-ups passend
bij de hostingopzet, basis-uptimemonitoring, technisch hostingbeheer en hulp bij
hostinggerelateerde configuratie. Geen contentwijzigingen, redesign of nieuwe
functionaliteit. Geen onbeperkte opslag, verkeer of support, 100% uptime of
24/7-incidentrespons beloven. Provider, back-up/herstelprocessen en rendabiliteit
moeten vóór publicatie worden geverifieerd; goedgekeurde scope bewijst geen
operationele gereedheid.

**Care-scope:** relevante website-updates, technische checks, back-up-/securityopvolging
waar van toepassing, maximaal 30 minuten kleine content-/beeldaanpassingen per maand
en het afgesproken support-/contactkanaal. De volledige LK Hosting-scope is inbegrepen.

**Care-grens:** kleine aanpassingen binnen de bestaande structuur, zoals beperkte
tekstcorrecties of een bestaand beeld vervangen. Maximaal 30 minuten per maand;
niet overdraagbaar, niet opspaarbaar en niet cumulatief. Ongebruikte tijd vervalt
aan het maandeinde: geen tegoed, geldwaarde of recht op later werk. Dit hoort
duidelijk in de servicevoorwaarden, zonder de marketing te domineren.

**Niet automatisch inbegrepen:** nieuwe pagina’s, grote redesigns, nieuwe functies,
complexe integraties/API’s, uitgebreide inhoudscreatie, nieuwe boekingssystemen,
webshops, structurele wijzigingen of werk boven de kleinewijzigingenlimiet.
Dit werk wordt apart begroot. Nooit “onbeperkt onderhoud”, “onbeperkte wijzigingen”
of “alles inbegrepen” beloven.

**Meerwerk:** €65/u excl. btw als commerciële referentie voor passend werk buiten de
afgesproken scope. Groter werk kan een afzonderlijke offerte krijgen; niet elk
project automatisch op uren prijzen. Geen onbevestigd minimumfacturatieblok overnemen.

## 6. Domein, eigendom en overdracht

- Domeinregistratie en verlenging zijn niet automatisch inbegrepen in Hosting of
  Care. Jaarlijkse kosten afzonderlijk volgens extensie, registrar/provider en afspraak.
- LK kan registratie, configuratie, DNS-koppeling, technische DNS-instellingen en
  verlengingen beheren. Klantgegevens gebruiken waar technisch/providergewijs passend.
- Overdracht/medewerking bij vertrek blijft mogelijk, rekening houdend met openstaande
  contractuele/betalingsverplichtingen en providerprocedures. Geen nieuwe transferkosten
  of contractvoorwaarden verzinnen.
- De klant is vanaf dag één de officiële domeinhouder. LK kan beheerder, reseller
  of technisch contact zijn; geen domeineigendom gebruiken als kunstmatige lock-in.
- Een bestaand klantdomein kan behouden blijven waar technisch mogelijk.
- LK-hosting is optioneel; later naar een andere provider verhuizen is toegestaan.
- Na volledige betaling kunnen de overeengekomen websiteleveringen worden
  overgedragen. Diensten, fonts, stock, platforms en licenties van derden blijven
  onder hun eigen voorwaarden vallen; geen onbeperkte overdraagbaarheid beloven.
- Het principe kort op de website; juridische/contractuele details in offerte,
  voorwaarden en serviceafspraak. Dit document vervangt die documenten niet.

## 7. Planning, ondersteuning en schaalbaarheid

Goedgekeurde publieke verwachting:

> Een gemiddeld websiteproject duurt doorgaans circa 2–4 weken, afhankelijk van
> omvang, functionaliteit, aangeleverde inhoud, feedback en planning.

Dit is geen gegarandeerde deadline of minimumduur. Sneller opleveren mag zodra het
werk klaar is, de relevante LK Quality Gate is doorlopen en de klant heeft
goedgekeurd; nooit kunstmatig vertragen om de indicatie te halen.

Geen agressieve SLA, permanente bereikbaarheid, onmiddellijke antwoorden,
24/7 menselijke ondersteuning, gegarandeerde wijzigingen dezelfde dag, onbeperkte
interventie/ontwikkeling, uptimepercentage of hersteltijd beloven zonder afzonderlijke
goedkeuring én operationele onderbouwing. Specifieke verwachtingen horen bij de
offerte/serviceafspraak zodra capaciteit bekend is. Elke toezegging moet beheersbaar
blijven bij 10, tientallen en mogelijk circa 100 goede terugkerende klanten.

## 8. Pre-launch bedrijfschecks — allemaal nog TODO

De eigenaar bevestigt onderstaande gegevens en processen vóór publieke lancering;
goedkeuring van deze lock sluit deze checks niet. Geen fictieve invulling.

- [ ] Officiële bedrijfs-/handelsnaam, ondernemingsnummer en facturatie-identiteit.
- [ ] Werkelijke btw-status en btw-nummer waar van toepassing; publieke prijs-/btw-tekst consequent afstemmen na owner-besluit.
- [ ] Verplichte bedrijfs-/contactinformatie en identiteit van de privacyverantwoordelijke.
- [ ] Werkelijke Formspree-verwerking, bewaring, accountconfiguratie en ontvangst/bezorging; echte bezorgtest alleen afzonderlijk geautoriseerd buiten ontwikkel-QA.
- [ ] Offerte-, voorwaarden- en serviceafspraakstructuur, inclusief exacte scope, Care-tijd en rechten van derden.
- [ ] Hostingprovider/infrastructuur en economische haalbaarheid van Hosting/Care.
- [ ] Back-up-, monitoring- en herstelproces: dekking, verantwoordelijkheid en uitvoerbaarheid.
- [ ] Domeinregistratie-/verlengingsworkflow met klant als officiële houder vanaf dag één en afzonderlijke kosten.
- [ ] Werkelijk supportproces en haalbare contact-/reactieafspraken, ook bij groei.

## 9. Implementatiestatus en documentgrenzen

De owner-opdracht van 24 september 2026 autoriseert de migratie van de lokale
Slice 1 plus legacysecties naar de hybride website. Technische en visuele QA en
owner-review blijven afzonderlijk; deze commerciële migratie bewijst geen gate-PASS.
[INTEGRATIONS.md](INTEGRATIONS.md) beschrijft bestaande techniek en toekomstige
aansluitpunten; [BRAND.md](BRAND.md) bezit de merkassets. Zij verwijzen voor
commerciële besluiten hierheen in plaats van bedragen of voorwaarden te dupliceren.
