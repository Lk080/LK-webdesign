# LK Webdesign — frontend en externe koppelingen

Status: lokale wijzigingen voor beoordeling; geen toestemming voor een volgende
bouwslice, commit, push of publicatie. Bestaande LK-site-inrichting: GitHub Pages
`main` → `/docs`, met https://lkwebdesign.be/ in de bronconfiguratie. De
[projectregistratie](scripts/qa-projects.json) blijft eigenaar van de publicatiefase;
de aanwezige domeinconfiguratie bewijst geen launchgoedkeuring.

[Commercial Requirements](LK-COMMERCIAL-REQUIREMENTS.md) zijn de enige bron voor
positionering, prijzen, btw, Hosting/Care en eigendomsafspraken. Dit bestand beschrijft
technische implementatie, geen alternatieve commerciële voorwaarden. De huidige
LK-sitehosting is niet automatisch de geverifieerde provider voor het klantaanbod
LK Hosting; daarvoor blijven de pre-launch bedrijfschecks open.

## Contactformulier: endpoint gekoppeld, echte bezorgtest nog open

Het publieke endpoint `https://formspree.io/f/mjyvnevy` is gekoppeld in `docs/index.html`. Er is geen geheime API-key nodig of toegevoegd. GitHub Pages-/DNS-instellingen zijn ongewijzigd.

`docs/contact.js` stuurt een JSON POST via fetch met `Accept: application/json` en `Content-Type: application/json`. Alleen een succesvolle HTTP-status én JSON `{ "ok": true }` worden als bevestigde ontvangst behandeld. Daarna wordt het formulier gereset en de projectsamenvatting gewist; de bezoeker blijft op dezelfde pagina. Bij fouten blijft de invoer behouden. Er wordt nooit automatisch opnieuw verstuurd.

Meegestuurde velden: `name`, `business`, `email`, `phone`, `interest`, `selected_package`, `website`, `budget`, `message`, `project_summary`, `_subject` en `_gotcha`. Formspree gebruikt `email` voor Reply-To. Een pakketkeuze staat apart in `selected_package`, ook als de bezoeker zelf al berichttekst had ingevoerd.

De bestaande CSP staat `connect-src https://formspree.io` al toe en is niet gewijzigd. `form-action 'none'` voorkomt gewone HTML-verzending buiten de JavaScript-flow. Zonder JavaScript blijft de verzendknop uitgeschakeld.

De honeypot `_gotcha`, Nederlandse validatie, bescherming tegen gelijktijdig en identiek dubbel verzenden, statusmeldingen en tijdelijke vergrendeling blijven aanwezig. De tests onderscheppen alle Formspree-verzoeken met gesimuleerde antwoorden. Er zijn geen echte testaanvragen verstuurd.

### Te controleren in Formspree

- Het formulier en ontvangstadres `info@lkwebdesign.be` zijn geactiveerd/bevestigd; e-mailmeldingen staan aan.
- Spamfilters blijven actief. Als dit account een CAPTCHA vereist, is daarvoor nog een expliciete integratie nodig. Schakel beveiliging niet alleen uit om een test te laten slagen.
- Eventuele domeinrestricties moeten bij de productie-URL passen. Lokale tests kunnen daardoor geweigerd worden; de huidige `strict-origin-when-cross-origin`-instelling kan ook relevant zijn. Wijzig dit pas op basis van een concrete fout.
- Controleer de gegevensverwerking, bewaartermijnen en gebruikslimieten van het account; stem de privacy-informatie af op de werkelijke verwerking.

### Latere productiebezorgcontrole — niet tijdens ontwikkeling of QA

Alleen door de eigenaar of na afzonderlijke expliciete toestemming, buiten de
ontwikkel-/QA-runs. Deze documentatietaak geeft die toestemming niet.

1. Open de afzonderlijk afgesproken testlocatie en vernieuw de pagina.
2. Kies een projectindicatie en eventueel een bijzondere functie; neem de zichtbare samenvatting mee naar Contact. Controleer tegen de Commercial Requirements zodra de betreffende bouwslice is geïmplementeerd.
3. Gebruik je eigen naam en een e-mailadres waar je toegang toe hebt; vul optioneel bedrijf, telefoon en website in.
4. Zet in het bericht: `TEST LK Webdesign – controle Formspree – geen klantaanvraag`.
5. Klik één keer op “Verstuur je aanvraag”. Controleer de laadstatus en daarna de Nederlandse succesmelding. Alleen na bevestigde ontvangst mogen de velden leeg zijn.
6. Controleer één nieuwe inzending in het Formspree-dashboard en één melding in de ontvangende mailbox (ook spam). Controleer alle velden en de volledige projectsamenvatting.
7. Klik in de melding op “Beantwoorden” en controleer dat jouw ingevulde testadres als ontvanger verschijnt; daadwerkelijk antwoorden is niet nodig.
8. Bij een fout: noteer de melding en controleer eerst het dashboard. Verstuur niet herhaaldelijk dezelfde test; bij een netwerkfout kan de aanvraag toch ontvangen zijn.

Een browserbevestiging bewijst acceptatie door Formspree, niet afzonderlijk aflevering in de mailbox. Die bezorging moet met deze ene echte test nog worden bevestigd. Niet committen of publiceren zonder expliciete toestemming.

Bronnen:
- https://help.formspree.io/articles/building-your-form/email-reply-to-address/
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/

## Projectindicatie — legacyimplementatie, migratie nog niet gestart

`docs/project.js` leest momenteel vanafprijzen uit `data-start-price` op de oude
Start/Groei-prijskaarten. Deze pakketindeling, paginagroepen en bedragen zijn geen
bron meer voor LK Final. Ook de oude onderhoudspakketten, meerwerkprijs en
budgetkeuzes in de pagina moeten bij een later geautoriseerde slice worden
vervangen volgens de [Commercial Requirements](LK-COMMERCIAL-REQUIREMENTS.md).
De code blijft in deze documentatietaak ongewijzigd.

Bij die latere implementatie moeten zichtbare bedragen, calculatorregels,
keuzelabels, verborgen velden en projectsamenvattingen consequent dezelfde
commerciële bron en btw-conventie gebruiken. De volledige indicator hoort op
Aanpak & prijzen; Home krijgt alleen prijsrichting en een CTA. Exacte inclusies
komen uit de goedgekeurde scope/offerte, niet uit oude pakketcopy.

Behouden principe: `project_summary` blijft afzonderlijk van eigen berichttekst.
Nieuwe keuzes mogen geen tegenstrijdige oude context meesturen. De toekomstige
flow ondersteunt nieuw/redesign, onbekende omvang, extra functies, wijzigen/reset
en niet-persoonlijke overdracht naar Contact. De bestaande overdracht binnen één
pagina bewijst nog geen toekomstige overdracht tussen aparte pagina’s.

## Portfolio: drie bestaande fictieve demo’s

- Kelmora — techniek/vakbedrijven: `docs/demos/vakman/`.
- Velune — beauty/wellness: `docs/demos/beauty/`.
- AVREN — premium automotive: `docs/demos/automotive/`.

Deze demo’s bestaan al; hun bestaan bewijst geen nieuwe technische of publicatie-
goedkeuring. Freeze en publicatiefase uitsluitend uit de projectregistratie lezen.
Alle drie blijven fictieve demonstraties, geen betalende klanten of bewijs van
werkelijke bedrijfsresultaten.

Slice 1 gebruikt al Kelmora-beelden en een link naar de demo. De oude conceptkaarten
lager op Home zijn nog legacyinhoud; zij zijn niet het beoogde definitieve portfolio.
De overige integratie en aparte projectverhalen wachten op bouwautorisatie.
Presenteer echte screenshots met betekenisvolle alt-tekst, expliciete afmetingen
en responsive bronnen. Gebruik lokale links, geen zware live embeds en geen
fictieve klantclaims. Beeldherkomst staat bij de assets/projectdocumentatie.

## Optionele maatwerkfunctionaliteit — historische assistantvoorbereiding

`#assistant-template` en `docs/assistant.js` bevatten een kleine launcher en een toegankelijk dialoogvenster, zonder chatinvoer, AI-antwoorden of netwerkverzoeken. `data-preview="false"` houdt deze component standaard verborgen voor bezoekers. Alleen voor visuele review kan dit lokaal op `true` gezet worden; de tekst zegt dan duidelijk dat de functie nog niet actief is.

Dit is geen toegezegde LK Final-feature, hoofdpropositie of inbegrepen
pakketonderdeel. Alleen bij een afzonderlijk geautoriseerde maatwerkvraag kan deze
voorbereiding worden hergebruikt.

Een mogelijke architectuur voor zo’n latere opdracht: **Cloudflare Worker** als aparte serverless API. GitHub Pages blijft de frontend hosten. Een `workers.dev`-adres kan gebruikt worden zonder nu DNS te veranderen. Een geheime sleutel hoort uitsluitend in de secrets van de Worker.

Voor een echte integratie zijn nodig: een Worker-account/project, modelprovideraccount met gebruiksbudget, server-side secret, gecontroleerde inhoud over diensten/prijzen en een publiek backend-endpoint. Bewaar sleutels rechtstreeks in het providerdashboard, niet in deze repository en niet in een chatbericht.

De backend moet invoerlengte en herkomst controleren, misbruik beperken, limieten op gebruik/kosten instellen en fouten afhandelen. Antwoorden mogen alleen op gecontroleerde bedrijfsinformatie berusten; geen verzonnen prijzen of klantcases. Stem gespreksopslag en privacy-informatie vooraf af. Voeg uitsluitend het gekozen backend-origin aan CSP `connect-src` toe. Nu is geen backend aangemaakt en geen model aangeroepen.

Bronnen:
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/

## SEO, assets en publicatie

Canonical, social metadata, JSON-LD, robots en sitemap gebruiken https://lkwebdesign.be/. Er is geen Search Console-verificatiecode verzonnen. De eigenaar kan later een property bevestigen en `https://lkwebdesign.be/sitemap.xml` indienen. DNS, CNAME en hostinginstellingen zijn ongewijzigd.

`docs/assets/lk-webdesign-logo.webp` is een geoptimaliseerde weergavevariant. De originele PNG blijft behouden als fallback en deelafbeelding. Bewerk bij toekomstige JSON-LD-wijzigingen ook de bijbehorende SHA-256-hash in de CSP.

De `.openai/hosting.json` is een oude Sites-verwijzing en is niet gebruikt of gewijzigd: deze opdracht blijft bij GitHub Pages. Er zijn geen nieuwe runtime-dependencies of buildstappen.
