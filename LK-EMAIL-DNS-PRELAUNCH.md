# LK Webdesign — e-mail & DNS herstelonderzoek

Repositoryversie: privétestadres, intern mailbox-ID en uniek Message-ID geanonimiseerd voor de Git-checkpoint. De oorspronkelijke diagnose blijft uitsluitend lokaal buiten Git bewaard.

## Formspree-bezorgtest — 27 september 2026, 00:11 CEST

**Huidige status: LK FORMSPREE END-TO-END: PASS — huidige publieke formulierroute en antwoordroute bewezen; Hotmail-junkplaatsing blijft een afzonderlijke bevinding.** Owner autoriseerde expliciet één echte formulierinzending en, bij correct Reply-To, één neutraal antwoord. Geen tweede inzending toegestaan of uitgevoerd. Dit onderdeel wacht niet op de afzendernaam; volgens owner loopt daarvoor inmiddels een Combell-supportticket, providerantwoord nog open.

- **Origin:** `https://lkwebdesign.be`, huidig publiek contactformulier op `/#contact`. De lokaal verwachte `/contact.html` geeft publiek een GitHub Pages 404. Publieke site wijkt dus af van lokale `docs/contact.html`; dit resultaat bewijst de huidige publieke formulierroute, niet de niet-gepubliceerde lokale release.
- **Endpoint:** `https://formspree.io/f/mjyvnevy`, uit publiek DOM gelezen en direct vóór verzenden opnieuw gecontroleerd. Geen localhost, endpoint- of codewijziging.
- **Vooraf:** Formspree-workflow heeft één zichtbare e-mailactie, Enabled aan, ontvanger exact `info@lkwebdesign.be`. Project Restrict to Domain leeg. Geen instellingen aangepast. Dashboard vóór test één oud inboxrecord en Spam (1).
- **Testdata:** naam `LK Prelaunch Test`; e-mail `[extern testadres van owner]` (visueel in invoerveld bevestigd); interesse `Een nieuwe website`; budget standaard `Nog te bepalen`; optionele bedrijf/telefoon/website en projectcontext leeg. Bericht: `Geautoriseerde LK Webdesign prelaunch Formspree-bezorgtest. Geen echte klantaanvraag. Test-ID: LK-FORMSPREE-20260927-01.` Honeypot leeg; verplichte velden valide.
- **Eén klik:** tijdens verzending velden en submitknop disabled, tekst `Aanvraag versturen…`, status `Je aanvraag wordt verstuurd. Even geduld.` Geen dubbelklik of tweede submit uitgevoerd.
- **Resultaat:** formulier gereset; zichtbare status `Bedankt! Je aanvraag is succesvol verzonden. Ik neem zo snel mogelijk contact met je op.` Geen technische of gevoelige fouttekst. Browserconsole vóór en na test geen geregistreerde errors/warnings.
- **HTTP-dekking:** numerieke HTTP-status, responsebody en ruwe netwerkrequesttelling niet rechtstreeks vastgelegd door de beschikbare inspectie. Geen verzonnen HTTP 200/JSON-resultaat. Werkelijke verzending en verwerking zijn onafhankelijk bewezen door het nieuwe dashboardrecord en ontvangen notificatie. Eén UI-submit en één geregistreerde aanvraag bewezen; geen algemene idempotentieclaim.
- **Formspree:** één nieuw testrecord in Inbox, Sep 26 at 22:11 UTC = Sep 27 00:11 CEST; Spam (1) ongewijzigd. Naam, e-mail, interesse, budget en volledige beschrijving exact. Geen dubbele testregistratie aangetroffen; oude aanvraag blijft intact.
- **Outlook:** één notificatie in zakelijke **Postvak IN**, 00:11 CEST, From `Formspree <noreply@formspree.io>`, To `info@lkwebdesign.be`, onderwerp `Nieuwe aanvraag via LK Webdesign`. Alle opgegeven velden en test-ID volledig; optionele velden leeg. Externe afbeeldingen standaard geblokkeerd door Outlook, tekst wel volledig leesbaar; instelling niet gewijzigd.
- **Reply-To:** Antwoorden selecteert automatisch **`[extern testadres van owner]`**, verzendaccount **`info@lkwebdesign.be`**. Dus geen reply naar noreply@formspree.io.
- **Handtekening:** automatisch één compacte `LK Website- Antwoord` boven het citaat, zonder dubbele LK-handtekening. Mailto `mailto:info@lkwebdesign.be`; website tooltip `https://www.lkwebdesign.be/`. Toewijzingen nieuwe berichten `LK WEBDESIGN` en antwoorden `LK Website- Antwoord` onveranderd teruggelezen.
- **Antwoordtest afgerond:** vanuit het bestaande antwoordconcept precies één neutraal antwoord verzonden: `Dit is de geautoriseerde LK Webdesign prelaunch antwoordtest.` Outlook bevestigde `E-mail is verzonden`. Op 27 september 2026 om **00:22 CEST** bij `[extern testadres van owner]` ontvangen, onderwerp `Re: Nieuwe aanvraag via LK Webdesign`, afzender `info@lkwebdesign.be`. Bericht geopend: juiste antwoordtekst, één compacte `LK Website- Antwoord`, intact geciteerd testbericht met `LK-FORMSPREE-20260927-01`. Ontvangen linkdoelen gecontroleerd: `mailto:info@lkwebdesign.be` en `https://www.lkwebdesign.be`. Geen dubbele LK-handtekening. Geen tweede formulierinzending.
- **Deliverability-bevinding:** het antwoord staat in **Hotmail Ongewenste e-mail**, ondanks de eerdere geautoriseerde veilige-afzenderactie. De oorzaak daarvan is niet onderzocht binnen deze resterende antwoordtest. Outlook blokkeert in Junk het activeren van links/antwoordfuncties; linkdoelen zijn read-only gecontroleerd. Niet als niet-ongewenst gemarkeerd, niet verplaatst, geen spaminstellingen gewijzigd. Aankomst is bewezen; inboxplaatsing niet.
- **Afzonderlijk open:** gewenste afzendernaam `Lorenz | LK Webdesign` wacht op het Combell-providerantwoord; in deze ontvangen reply blijft `info@lkwebdesign.be` zichtbaar. Dit is volgens owner geen blokkade voor de Formspree-keten.

Geen websitecode, Formspree-, spam-, DNS-, authenticatie-, server-, credential- of handtekeningwijzigingen; geen dependencies, commit, push of deployment. Oudere resultaten hieronder blijven historisch bewijs.


## Actuele Outlook-finalisatie — bijgewerkt 27 september 2026 (CEST)

**Status: NEEDS OWNER ACTION.** Zakelijke Outlook-accountverbinding, SMTP-verzending en ontvangst van de echte Hotmail-reply zijn bevestigd. De gewenste zichtbare afzendernaam is nog niet ingesteld. Apple Mail blijft buiten scope.

### Definitieve werkende verbinding — ongewijzigd behouden

| Instelling | In Outlook gelezen |
|---|---|
| Account | IMAP, `info@lkwebdesign.be`, Verbonden, synchronisatietechnologie van Microsoft |
| IMAP | `imap.mailprotect.be`, 993, SSL aan |
| SMTP | `smtp-auth.mailprotect.be`, 465, SSL aan |
| Outgoing Server Authentication | **Inkomende servergegevens gebruiken: aan** |
| Volledige naam | `info@lkwebdesign.be` — alleen-lezen |
| Gewenste naam | `Lorenz | LK Webdesign` — nog niet toegepast |
| Nieuwe berichten | **LK WEBDESIGN** (hoofdletters, door owner verduidelijkt) |
| Antwoorden/doorgestuurd | **LK Website- Antwoord** |

Owner bevestigde dat inschakelen van ‘Inkomende servergegevens gebruiken’ de SMTP-fout oploste. Deze instelling is read-only teruggelezen en behouden. Geen wachtwoord opgevraagd, gelezen, gewijzigd of gedeeld. Geen nieuwe accountconfiguratie, reset, verwijdering of DNS-wijziging uitgevoerd.

**Naamblokkade:** ‘Bewerken’ naast Beschrijving opent alleen de beschrijving. Volledige naam blijft statische tekst; ook visueel geen bewerkoptie. Servergegevens bieden geen naamveld. Het menu Beheren biedt alleen verwijderen/opnieuw instellen, niet uitgevoerd. [Microsofts documentatie](https://support.microsoft.com/en-us/outlook/change-the-display-name-recipients-see-in-outlook-for-mac) onderscheidt een bewerkbare naam van een alleen-lezen veld en verwijst in dat laatste geval naar provider/beheerder. Niet bewezen dat een Combell-webmailidentiteit doorwerkt naar deze Outlook-cloudconfiguratie; daarom niet als oplossing gewijzigd of gepresenteerd.

### Handtekeningen en verzendtest

De oorspronkelijk geselecteerde volledige variant was `LK WEBDESIGN`. Op basis van de aanvankelijk opgegeven schrijfwijze is kort `LK Webdesign` geselecteerd en één test verzonden. De owner verduidelijkte vervolgens dat de hoofdlettervariant juist is. **De selectie is direct hersteld naar `LK WEBDESIGN` en in het zakelijke account teruggelezen.** De korte variant stond al correct en is ongewijzigd. Bij de vervolgcontrole is uitsluitend de foutieve mailto-hyperlink in `LK WEBDESIGN` hersteld; de andere handtekening en de standaardkeuzes zijn behouden.

Volledige variant `LK WEBDESIGN`: logo, Lorenz Kokke, Webdesigner, Oud Turnhout, zakelijk e-mailadres en website. De onvolledige mailto-link `mailto:info@lkwebdesign.` is via het contextmenu van de bestaande hyperlink gecorrigeerd naar **`mailto:info@lkwebdesign.be`**. De zichtbare tekst blijft `info@lkwebdesign.be`. Het veld Webadres (URL) van de websitelink bevatte al exact **`https://www.lkwebdesign.be`**; daarom niet gewijzigd. Na verlaten en opnieuw selecteren van de handtekening is de opgeslagen e-maillink teruggelezen. Logo, vetgedrukte naam, regels, opmaak en overige tekst zijn behouden; geen emoji of extra bedrijfsnaam toegevoegd. De bestaande plaatsnaam is letterlijk `Oud Turnhout` (zonder koppelteken); vanwege de opdracht uitsluitend hyperlinks te herstellen is die tekst behouden. Korte variant: Lorenz Kokke, Webdesigner, Oud Turnhout, `mailto:info@lkwebdesign.be` en website, zonder logo.

| Test | Actueel resultaat |
|---|---|
| Eén Outlook-zakelijk → Hotmail | `LK OUTLOOK FINAL TEST 20260926-01`, ontvangen 23:47 CEST |
| Oorspronkelijke aflevermap | **Hotmail Ongewenste e-mail**; vastgelegd vóór enige vrijgaveactie |
| Afzender bij ontvanger | **info@lkwebdesign.be**; gewenste naam niet weergegeven |
| Handtekening in ontvangen mail | Bevat de tijdelijk gekozen `LK Webdesign`-variant; **geen eindbewijs voor de juiste hoofdlettervariant** |
| Afbeeldingen | Na geautoriseerde vrijgave zijn logo en tekst van de tijdelijke variant visueel zichtbaar; nog geen eindbewijs voor `LK WEBDESIGN` |
| Antwoordtest Hotmail → zakelijk | Na vrijgave als echte reply verzonden vanuit Hotmail; **23:51 CEST ontvangen in zakelijke Outlook Postvak IN**, afzender en neutrale inhoud bevestigd |
| Korte antwoordhandtekening | Standaardselectie gecontroleerd én automatisch ingevoegd bij een reply vanuit `info@lkwebdesign.be` naar Hotmail; controleconcept onverzonden |
| Authenticatie nieuwe Outlook-test | Headers niet opnieuw beoordeeld; eerdere SPF/DKIM/DMARC PASS hieronder hoort uitsluitend bij WEB-01 |

Owner gaf eerst toestemming voor alleen deze testmail. Outlook toonde daarna onverwacht ‘Toevoegen aan Veilige afzenders’. Na afzonderlijke uitleg en **expliciete aanvullende toestemming** (‘Ja, dit adres als veilig toestaan’) is OK bevestigd. De testmail is daarna in de Hotmail-inbox teruggevonden. Dit beïnvloedt toekomstige spamfiltering voor deze afzender bij deze ontvanger; latere inboxplaatsing is daardoor geen onafhankelijke deliverabilitytest. Oorspronkelijke junkplaatsing blijft een bewezen bevinding.

De echte reply `Re: LK OUTLOOK FINAL TEST 20260926-01` is vanuit `[extern testadres van owner]` naar `info@lkwebdesign.be` verzonden, met neutrale tekst. De bestaande korte handtekening verscheen ook in de Hotmail-reply (die persoonlijke instelling bestond al en is niet gewijzigd). De reply is om **23:51 CEST in zakelijk Outlook Postvak IN** teruggevonden en geopend. Daarna is een antwoordconcept vanuit `info@lkwebdesign.be` naar Hotmail geopend: de korte handtekening verschijnt automatisch boven de geciteerde conversatie. Dit concept is **onverzonden achtergelaten**; geen derde mail verzonden.

### Ondersteunde Combell-route — aangemeld mailboxbeheer gecontroleerd

[Combell documenteert Identiteiten in webmail](https://www.combell.com/nl/help/kb/hoe-kan-ik-een-e-mail-verzenden-vanuit-een-andere-afzender-mailadres/), met een schermnaam voor uitgaande webmail. Die bron bevestigt niet dat zo’n webmailidentiteit de From-naam van een extern Outlook IMAP-account wijzigt. Geen nieuwe identiteit, alias of Reply-To-truc aangemaakt; geen webmailnaam als bewezen Outlook-oplossing gepresenteerd. De [Basic Mail Outlook-handleiding](https://www.combell.com/nl/help/kb/hoe-kan-ik-mijn-basic-mailbox-configureren-voor-windows-in-outlook/) beschrijft een naamveld in de client, maar levert geen aangetoonde centrale mailboxbeheerinstelling voor deze alleen-lezen Outlook-naam.

De owner heeft op 27 september zelf aangemeld. Daarna is read-only de route **E-mail hosting → lkwebdesign.be / Beheer e-mail → Beheer mailboxen → info@lkwebdesign.be / Beheer** doorlopen. Product is **Basic**, één actieve mailbox. De geopende mailboxdetailpagina is `[interne Combell-mailboxdetailpagina; identifier weggelaten]`.

Op deze mailboxdetailpagina staan verbruik/grootte, connectiegegevens, e-mailadres, wachtwoord wijzigen, automatisch doorsturen, automatisch antwoord en mailbox verwijderen. **Geen display-name-, volledige-naam- of afzendernaamveld aanwezig in dit geïnspecteerde beheer.** Het extra mailboxmenu bevat uitsluitend **Log in op de webmail**. IMAP- en SMTP-host zijn opnieuw zichtbaar als `imap.mailprotect.be` en `smtp-auth.mailprotect.be`. Geen instelling gewijzigd, geen credential gelezen en geen alias of doorverwijzing gemaakt. Dit bewijst de afwezigheid van een selfserviceveld op deze pagina; het sluit een providerinterne supportmogelijkheid niet uit.

Daarna is de bestaande **Contacteer ons**-link geopend. Op `https://my.combell.com/nl/contact` staan **Supportticket openen**, support@combell.com en telefonische support. Geen ticket aangemaakt of bericht verzonden. Safari staat klaar op deze contactpagina.

**Exact één eerstvolgende handmatige stap:** klik op de geopende Combell-contactpagina op **Supportticket openen** en leg onderstaande vraag aan Combell voor:

> Mijn Basic Mailbox info@lkwebdesign.be werkt via IMAP/SMTP in Outlook voor Mac met Microsoft-synchronisatietechnologie. Volledige naam is alleen-lezen en toont het e-mailadres. In Mijn Combell → E-mail hosting → Beheer mailboxen → info@lkwebdesign.be → Beheer staat geen naamveld. Welke ondersteunde Combell/Mailprotect-instelling kan de werkelijk door Outlook verzonden From-weergavenaam op “Lorenz | LK Webdesign” zetten? Bevestig of een webmailidentiteit doorwerkt naar Outlook; wijzig geen wachtwoord, servers, authenticatie, DNS, alias of Reply-To. Als dit niet providerzijdig kan, bevestig dat expliciet.

De geautoriseerde eindtest blijft wachten op een ondersteunde, daadwerkelijk toegepaste naamwijziging. De eerdere loginblokkade is opgelost; de huidige blokkade is het ontbreken van een aangetoonde ondersteunde naaminstelling voor deze Outlook-configuratie.

### Eindteststatus van deze vervolgopdracht

**Geen nieuwe testmail verzonden.** De owner stelt expliciet als voorwaarde dat eerst sender identity én handtekening correct zijn; de gewenste Outlook-afzendernaam is nog niet ingesteld. Bestaande tests hierboven blijven historisch bewijs voor transport/retour en de korte replyhandtekening, niet voor de gecorrigeerde volledige handtekening of gewenste naam. Na succesvolle ondersteunde naamwijziging is één neutrale eindtest plus antwoordtest al geautoriseerd; daarvoor geen nieuwe algemene verzendtoestemming nodig.

Behouden configuratie: IMAP `imap.mailprotect.be:993` SSL, SMTP `smtp-auth.mailprotect.be:465` SSL, authenticatie met inkomende servergegevens. Geen server-, wachtwoord-, DNS-, SPF-, DKIM-, DMARC- of spamwijziging in deze vervolgopdracht. Apple Mail buiten scope. Geen Formspree-inzending, websitecode, commit, push of deployment. Alleen de foutieve bestaande mailto-link en dit rapport gewijzigd. Geen nieuwe website-QA nodig.

**LK OUTLOOK EMAIL FINALIZATION: NEEDS OWNER ACTION**

## Historisch onderzoek — eerdere sessie van 26 september 2026

Onderstaande eerdere diagnose blijft bewaard als historisch bewijs. De actuele Outlook-status boven deze sectie heeft voorrang; eerdere instructies om een wachtwoord te zoeken of een account toe te voegen zijn vervallen.

Onderzocht op **26 september 2026 (CEST)**. Deze versie vervangt de eerdere voorlopige diagnose. Scope: `info@lkwebdesign.be`, Combell, Outlook Mac, mailauthenticatie en Formspree. Extern testadres door owner aangewezen: `[extern testadres van owner]`. Apple Mail is op uitdrukkelijk verzoek buiten scope; niet opnieuw instellen. Websitecode blijft ongewijzigd.

## Conclusie en classificatie

**Combell verzendt en ontvangt aantoonbaar. De zakelijke Outlook-configuratie is nog niet voltooid en de uitgaande test kwam bij Hotmail in spam.** SPF, DKIM en DMARC slagen op diezelfde ontvangen mail.

Werkclassificatie: **MULTIPLE ISSUES**, uitsluitend voor de huidige bevindingen: een aantoonbaar afwijkende SMTP-configuratie in het openstaande Outlook-toevoegvenster, ontbrekende beschikbare logincredentials en ongewenste spamplaatsing. Dit bewijst geen defect in de sleutelhanger en verklaart niet met terugwerkende kracht de vroegere Apple Mail-verificatiefout. Die historische primaire oorzaak blijft **onbewezen**.

**Eerstvolgende handmatige stap:** zoek zelf het bestaande Combell-mailboxwachtwoord in je wachtwoordbeheer en vul het in Outlook bij zowel IMAP als SMTP in. Deel het niet in de chat. Als het nergens beschikbaar is, wijzig het zelf via het beheer van deze mailbox in Combell en gebruik daarna dat nieuwe wachtwoord. Een reset kan bestaande sessies/clients opnieuw om authenticatie laten vragen. De agent heeft geen wachtwoord gelezen of gewijzigd.

## A. Provider en serverinstellingen

| Onderdeel | Bevestigde instelling / status |
|---|---|
| Provider | Combell / Mailprotect; publieke DNS, aangemelde webmail en transportheaders stemmen overeen |
| Mailbox | `info@lkwebdesign.be`; inbox in Safari bereikbaar, inkomende en uitgaande test geslaagd |
| Accounttype | IMAP |
| IMAP | `imap.mailprotect.be`, **993**, SSL/TLS vanaf verbinding |
| SMTP | `smtp-auth.mailprotect.be`, **465**, SSL/TLS vanaf verbinding |
| Gebruikersnaam beide servers | `info@lkwebdesign.be` |
| SMTP-authenticatie | Vereist, met de zakelijke mailboxgegevens |
| Alternatief discovery | SMTP SRV publiceert 587 met STARTTLS; dat is geen conflict met 465/impliciete TLS |
| Webmail-identiteit | Weergavenaam, organisatie en Antwoord-aan leeg; standaardidentiteit is `info@lkwebdesign.be` |
| Gewenste afzendernaam | Nog te kiezen, bijvoorbeeld `LK Webdesign`; niet gewijzigd |

Bronnen: [Combell connectiegegevens](https://www.combell.com/nl/help/kb/hoe-kan-ik-mijn-basic-mailbox-pop3-imap-instellen/) en [Combell Outlook-instructies](https://www.combell.com/nl/help/kb/hoe-kan-ik-mijn-basic-mailbox-configureren-voor-windows-in-outlook/). Gepubliceerde instellingen plus bereikbaarheid zijn bevestigd; een zakelijke Outlook-login is nog geen bewezen resultaat.

## B. Publieke DNS

Read-only `dig` via lokale resolver. SPF en DMARC ook rechtstreeks op autoritatieve `ns3.combell.net` gecontroleerd; antwoorden gelijk. Geen zone-export beschikbaar: dit is een overzicht van bevraagde mailrecords, geen volledige DNS-backup.

| Naam / type | Exact antwoord | Beoordeling |
|---|---|---|
| `@ MX` | `10 mx.mailprotect.be.` | Aanwezig, geldig, Combell-consistent |
| `@ MX` | `50 mx.backup.mailprotect.be.` | Aanwezig, geldig, geen concurrerende provider aangetroffen |
| `@ TXT` SPF | `v=spf1 mx a include:_spf.relay.mailprotect.be ~all` | Eén SPF-record, syntactisch geldig; softfail voor niet-gematchte zenders |
| `_dmarc TXT` | `v=DMARC1;p=none;` | Eén geldig policyrecord; geen gevraagde quarantine/reject en geen `rua`-rapportadres |
| `autodiscover CNAME` | `autodiscover.mailprotect.be.` | Aanwezig, providerconsistent |
| `autoconfig CNAME` | `autoconfig.mailprotect.be.` | Aanwezig, providerconsistent |
| `_autodiscover._tcp SRV` | `1 1 443 autodiscover-s.mailprotect.be.` | Aanwezig, providerconsistent |
| `_imaps._tcp SRV` | `1 1 993 imap.mailprotect.be.` | Aanwezig, providerconsistent |
| `_submission._tcp SRV` | `1 1 587 smtp-auth.mailprotect.be.` | Aanwezig; service discovery verschilt normaal van impliciete-TLS-poort 465 |
| `mail._domainkey.mailprotect.be TXT` | `v=DKIM1; g=*; k=rsa; p=…` | Aanwezig; publieke RSA-sleutel, echte ontvangen handtekening DKIM PASS; provider-domein, niet aligned met LK |

TTL van bovenstaande domeinrecords: 3600 seconden. NS: `ns1.combell.eu`, `ns3.combell.net`, `ns4.combell.net`. Namen/poorten stemmen overeen met [Combell standaard-DNS](https://www.combell.com/en/help/kb/what-is-our-standard-dns/).

**SPF-keten:** `_spf.relay.mailprotect.be` bevat IP-mechanismen en `include:_spf.powermail.be`; dat laatste bevat uitsluitend vier IPv4-ranges en `-all`. Geen cyclische include gevonden. Er zijn vier lookup-veroorzakende SPF-termen in het volledige pad (`mx`, `a`, beide includes), onder de grens van tien. Gesplitste TXT-tekstsegmenten bij het providerrecord horen bij één record en zijn geen dubbele SPF-publicatie. Beide MX-namen resolveerden naar vier adressen in `178.208.39.140–143`.

**Aandachtspunt, geen bewezen storing:** het `a`-mechanisme autoriseert ook de domein-A-adressen `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`. Verifieer later of daar werkelijk mail vandaan mag komen. Niet blind het provider-SPF versmallen; eerst alle legitieme verzendroutes inventariseren. Domein-AAAA leverde NOERROR zonder antwoord. Dit verhindert IMAP/SMTP via providerhosts niet.

**DMARC:** `p=none` is geldig. De ontvangen testmail behaalt DMARC PASS via aligned SPF. DKIM ondertekent met `d=mailprotect.be; s=mail` en is dus niet aligned met `lkwebdesign.be`. Een eigen LK-DKIM-selector is niet vastgesteld. Dit is geen bewijs dat DKIM ontbreekt: de werkelijk gebruikte providersleutel is publiek aanwezig en Microsoft verifieert de handtekening succesvol.

SPF en DMARC opnieuw gelezen circa 16:58 CEST: ongewijzigd. De selector uit de echte testheaders is circa 17:03 CEST gericht opgevraagd, zonder selector te raden. Geen DNS-mutaties. Geen volledige zone-export/backup gemaakt; daarvoor is pas noodzaak bij een afzonderlijk goedgekeurde DNS-wijziging.

## C. Clients, TLS en exact gewijzigde velden

Outlook Accounts bevat alleen het persoonlijke Hotmail-account. In het bestaande venster voor het toevoegen van `info@lkwebdesign.be` waren IMAP-host, poort 993, SSL en gebruikersnaam al correct. Er stond een melding dat aanmelden niet lukte. Die melding alleen onderscheidt een verkeerd wachtwoord niet van een serverconfiguratiefout.

De volgende **niet-geheime invoervelden** zijn gericht gecorrigeerd en in het venster gecontroleerd:

| Veld | Aangetroffen | Klaargezet |
|---|---|---|
| SMTP-host | `smtp.mailprotect.be` | `smtp-auth.mailprotect.be` |
| SMTP-poort | 25 | 465 |
| SMTP-beveiliging | STARTTLS | SSL gebruiken om verbinding te maken |
| SMTP-gebruikersnaam | Leeg | `info@lkwebdesign.be` |

Beide wachtwoordvelden waren leeg. **Account toevoegen is niet uitgevoerd**; dit zijn voorbereide velden, geen bewijs van een opgeslagen, werkend zakelijk Outlook-account. Owner meldde het wachtwoord niet meer te weten. Geen account verwijderd en geen persoonlijke accountinstellingen gewijzigd.

| Overige controle | Resultaat |
|---|---|
| Combell webmail | Aangemelde Safari-sessie, inbox toegankelijk; beide testberichten bevestigd |
| Outlook zakelijk | Nog niet gekoppeld; geen zakelijke IMAP/SMTP-login of synchronisatie bewezen |
| Apple Mail | Buiten scope; historische oorzaak niet vastgesteld |
| iPhone | Niet lokaal toegankelijk; configuratie en werking onbevestigd |
| IMAP 993 TLS | TLS 1.2, hostname en certificaatketen geldig; certificaat tot 30-12-2026; Dovecot-begroeting |
| SMTP 465 TLS | TLS 1.2, hostname en certificaatketen geldig; certificaat tot 21-03-2027; ESMTP 220 |
| Sleutelhanger, eerdere beperkte metadatacheck | Geen match op de twee providerhosts en het zakelijke adres (exit 44); geen wachtwoord gelezen. Dit bewijst geen algemene afwezigheid of defect |

De aparte TLS-probes gebruikten geen credentials. Alleen de hieronder beschreven geautoriseerde tests verzonden echte mail. Historische klantberichten zijn niet gebruikt voor inhoudelijke diagnose.

## D. Uitgevoerde testmatrix en headers

| Test | Resultaat en bewijs |
|---|---|
| Combell webmail → Hotmail | `LK MAIL TEST 20260926-WEB-01`, ontvangen **16:57 CEST**, maar in **Ongewenste e-mail** |
| Hotmail via Outlook → Combell | `LK MAIL TEST 20260926-EXTERN-01`, ontvangen **17:04 CEST** in Combell **INBOX**; neutrale inhoud geopend en gecontroleerd |
| Zakelijk Outlook verzenden/ontvangen | Niet uitgevoerd; account ontbreekt. Verzenden vanuit Hotmail in Outlook bewijst dit niet |
| Afzendernaam | WEB-01 heeft alleen `info@lkwebdesign.be`, zonder zakelijke weergavenaam |
| Reply-To | WEB-01 bevat geen Reply-To; de normale antwoordroute volgt daardoor From = `info@lkwebdesign.be`. Geen daadwerkelijke antwoordtest: Outlook schakelde Antwoorden uit in de junkweergave |
| SPF / DKIM / DMARC | Alle drie PASS volgens ontvangende Microsoft-headers |
| Junkplaatsing | Onverwachte spamplaatsing bij Hotmail bevestigd; retourtest in Combell-inbox |

Beide tests bevatten uitsluitend neutrale technische tekst met het test-ID, geen klantgegevens. De tweede test is een afzonderlijke mail in omgekeerde richting, geen antwoord op WEB-01. Geen berichten verplaatst, verwijderd of als veilig gemarkeerd; het openen kan de gelezen-status hebben veranderd.

Relevante bronheaders van WEB-01, via Outlook **Bron weergeven** gelezen:

```text
From: info@lkwebdesign.be
To: [extern testadres van owner]
Subject: LK MAIL TEST 20260926-WEB-01
Message-ID: [uitsluitend lokaal bewaard]
Return-Path: info@lkwebdesign.be
Reply-To: [header ontbreekt]
Authentication-Results: mx.microsoft.com 1;
 spf=pass (sender IP is 83.217.72.83) smtp.mailfrom=lkwebdesign.be;
 dkim=pass (signature was verified) header.d=mailprotect.be;
 dmarc=pass action=none header.from=lkwebdesign.be;
 compauth=pass reason=100
DKIM-Signature: [relevante velden] d=mailprotect.be; s=mail;
X-MS-Exchange-Organization-SCL: 5
X-Microsoft-Antispam-Mailbox-Delivery: [relevante velden] dest:J; RF:JunkEmail;
```

Combell gebruikte uitgaand `com-out001.mailprotect.be` / `83.217.72.83`. Microsoft ontving rond 14:57:25 UTC. De Date-header vermeldt 16:48:50 CEST, het eerdere opstellen van het bericht; dit is niet het daadwerkelijke transporttijdstip.

**Interpretatie:** SPF is aligned met From en draagt DMARC PASS. Provider-DKIM is geldig maar niet aligned met LK. SCL en `dest:J` bevestigen filtering naar junk; de exacte reden daarvan is niet bewezen. Geen aangetoonde SPF-, DKIM- of DMARC-authenticatiefout. Reputatie of inhoud zijn mogelijke onderzoekspunten, geen vastgestelde hoofdoorzaak. Een andere DNS-policy garandeert geen inboxplaatsing.

Vervolg voor spam: laat Combell het transport van dit Message-ID, tijdstip en uitgaande IP onderzoeken met deze ontvangende headers. Vraag eventueel of ondertekening met het eigen domein beschikbaar is; dit kan alignment robuuster maken maar is geen bewezen oplossing voor deze spamplaatsing. Geen supportbericht verzonden en geen DNS-wijziging voorgesteld voor directe uitvoering.

## E. Formspree — read-only dashboard en lokale bron

Het bestaande aangemelde Formspree-dashboard is via Safari gelezen. Formulier **LK webdesign**, ID `mjyvnevy`, project **My First Project**. Geen inzending geopend of verzonden.

| Controle | Bevinding |
|---|---|
| Endpoint | `https://formspree.io/f/mjyvnevy`; dashboard en lokale bron komen overeen |
| Form Enabled | Aan |
| Notification action | Eén zichtbare e-mailactie, **Enabled aan**, **Send to `info@lkwebdesign.be`** |
| Extra actions | Geen andere actie zichtbaar in de workflow |
| Submission Archive | Aan |
| Formshield | Aan; onderliggende details niet verder onderzocht |
| CAPTCHA | Disabled |
| Project Restrict to Domain | Leeg; `yoursite.com` is de getoonde placeholder, geen ingestelde LK-restrictie |
| Rules | Introductiepagina zichtbaar; geen ingestelde regels zichtbaar |
| Notificatietemplate | Standaard submission-template; custom template vereist Business |
| Werkelijke From / Return-Path / DKIM van notificatie | Niet op een nieuwe testmail gevalideerd |
| Ontvangsthistorie | Inboxlijst bevat een oudere Formspree-notificatie van 14-09-2026; inhoud/headers niet gebruikt en dit is geen actuele end-to-end test |

Lokale bron `docs/contact.html` / `docs/contact.js`: veld `email`, `_subject` = `Nieuwe aanvraag via LK Webdesign`, honeypot `_gotcha`, lokale validatie, dubbele-submitbeperking en foutafhandeling aanwezig. Referrerbeleid `strict-origin-when-cross-origin`. De geregistreerde website is draft, zonder canonicalURL; productie-equivalentie is niet vastgesteld.

Volgens [Formspree Reply-To-documentatie](https://help.formspree.io/articles/building-your-form/email-reply-to-address) stuurt het veld `email` de antwoordroute. Dat is hier structureel voorbereid, maar daadwerkelijke notificationheaders blijven te testen. Een domeinrestrictie kan later gericht worden ingesteld na bevestiging van de echte publicatie-origin; zie [Formspree domeinrestricties](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain). Geen instellingen veranderd. Geen SPF-include toevoegen enkel voor het ontvangen van notificaties.

**Exact testplan, pas na afzonderlijke owner approval:**

1. Owner autoriseert één inzending vanaf de exacte publicatie-origin naar `mjyvnevy`; controleer vooraf nogmaals ontvanger en automations.
2. Naam `LK Technische Test`; e-mail `[extern testadres van owner]`; bericht `Technische prelaunchtest, geen klantaanvraag. Test-ID: LK-FORMSPREE-<datum-tijd>.` Optionele velden en honeypot leeg.
3. Eén normale formulierinzending. Leg tijd, HTTP-resultaat en UI-bevestiging vast. Bij timeout eerst dashboard controleren, niet blind opnieuw verzenden.
4. Controleer dashboardstatus, spam en aflevering in de zakelijke inbox/junk met hetzelfde test-ID.
5. Controleer notificatie-From, Reply-To, Return-Path, DKIM d=/s= en ontvangende Authentication-Results, met alignment tegen de werkelijke From.
6. Controleer dat Antwoorden Hotmail selecteert; eventuele neutrale reply uitsluitend tussen de twee geautoriseerde mailboxen.
7. Rapporteer; geen automatische verwijdering of wijziging van spam-/DNS-instellingen.

## F–H. Eindvalidatie en open owneracties

- **Bewezen:** Combell webmail toegankelijk, uitgaand en inkomend transport, SPF PASS, DKIM PASS, DMARC PASS via aligned SPF.
- **Open:** zakelijk Outlook toevoegen en IMAP/SMTP-login/synchronisatie testen zodra de owner zelf het wachtwoord kan invoeren; vervolgens een zakelijke Outlook-test met headercontrole.
- **Open:** gewenste zakelijke afzendernaam instellen na keuze; echte antwoordtest afronden.
- **Niet geslaagd:** geen onverwachte spamplaatsing — de Microsoft-ontvanger plaatste WEB-01 in junk ondanks geslaagde authenticatie.
- **Extern/ongetest:** iPhone-configuratie en synchronisatie. Apple Mail expliciet buiten scope.
- **Open na aparte toestemming:** één echte Formspree-test volgens bovenstaand plan.

Uitgevoerde wijzigingen: uitsluitend vier niet-geheime SMTP-invoervelden in het nog niet voltooide Outlook-toevoegvenster en dit rapport. Daarnaast twee expliciet geautoriseerde neutrale testmails verzonden en gelezen. Geen DNS-, Formspree-, website- of credentialwijzigingen; geen mailbox/account verwijderd; geen commit, push of deployment. Voor deze rapportwijziging zijn geen website-QA-tests nodig.

De eerstvolgende handmatige stap blijft het zelf beschikbaar maken en invoeren van het mailboxwachtwoord in Outlook. Deel geen wachtwoord met de agent.

**LK EMAIL & DNS RECOVERY: NEEDS OWNER ACTION**
