# LK consent & conversion measurement — P4

Status: lokale, provideronafhankelijke foundation. Productie-analytics staat **uit**.
Geen provider, measurement-ID, cookie van een meetdienst of externe analytics-endpoint
is ingesteld. Dit document is een technisch contract, geen juridische goedkeuring
of toestemming voor publicatie. P4-bewijs: `LK-P4-EVIDENCE-REVIEW.md`.

## Bestaande situatie en implementatie

Vóór P4 waren er lokale `lk:interaction`-events voor CTA's, calculator, FAQ,
assistent en formulierresultaten. Er was geen analyticsprovider, tracking-ID,
consentmodule of analytics-opslag. De assistent gebruikte reeds tijdelijke,
categorische `sessionStorage` onder `lk.assistant.v2`. Formspree is een bestaande
formulierdienst; Google Fonts zijn bestaande externe stijl/fontdependencies.
Geen van beide wordt door P4 als analyticsprovider gebruikt.

De drie LK-pagina's laden vier kleine lokale assets: `measurement-config.js`,
`consent.js`, `analytics.js` en `consent.css`. Er is één consentstaat en één
analyticsadapter. Componenten gebruiken bestaande applicatiehooks en één
gedelegeerde kliklistener. FAQ-/assistent-micro-events blijven lokaal.
Demo's worden niet geïnstrumenteerd of aangepast.

## Consentstaat en UX

`NECESSARY` blijft actief; `ANALYTICS` is standaard uit. De centrale API is
`LKConsent.get()` / `LKConsent.choose(boolean)`. De configuratie blijft:

```js
{ enabled: false, policy: 'lk-analytics-v1-unconfigured', provider: null }
```

Zonder provider wordt geen toestemming voor toekomstige tracking gevraagd.
De footerknop **Privacyvoorkeuren** opent een toegankelijk venster dat expliciet
zegt dat statistieken uitstaan. Het analyticsvakje is uitgeschakeld. Bij een
later ingerichte provider volgt een nieuwe beleidsversie en een nieuwe keuze.
De volledige bannerflow wordt lokaal getest met een herkenbare fictieve provider.

Met een geldige, expliciet geactiveerde provider toont een eerste bezoek
**Accepteren**, **Weigeren** en **Voorkeuren**. Acceptatie/weigering gebruiken
dezelfde knopstijl en minimale bedieningshoogte. Het analyticsvakje is aanvankelijk
uit. De banner steelt geen focus; reserveruimte houdt de footer bereikbaar.
Een native dialoog beheert modaliteit; Tab blijft binnen het venster, Escape
sluit en focus keert terug naar de opener. Na een keuze verdwijnt de initiële
banner en gaat focus naar de hoofdinhoud; niet naar een footerknop buiten beeld.
Bij voorkeuren geopend vanuit de footer keert focus terug naar die footerknop.
Er worden geen consentanimaties toegevoegd. Zonder JavaScript blijft de nieuwe
footerknop verborgen en blijft de site zonder analytics bruikbaar.

## Opslag, verval en intrekken

Alleen na een expliciete keuze wordt noodzakelijke voorkeurenopslag geschreven:

| Veld | Contract |
|---|---|
| Mechanisme/key | lokale `localStorage`, `lk.consent.v1` |
| Schema | `schema: 1`, exacte toegestane velden |
| Categorieën | `necessary: true`, `analytics: boolean` |
| Beleid | `policy`, exact gelijk aan huidige configuratie |
| Tijd | `updatedAt`, `expiresAt = updatedAt + 180 dagen` |
| Ongeldige/verlopen/toekomstige keuze | analytics uit; opnieuw kiezen |
| Geblokkeerde opslag | alleen geheugen voor dit geopende document; melding in voorkeuren |

Verval wordt gecontroleerd bij gebruik, paginahervatting, zichtbaarheid en een
timer; wijzigingen in een andere tab worden via `storage` verwerkt. Geen
automatische verlenging bij ieder bezoek. Een nieuwe keuze vervangt de oude.

Intrekken blokkeert direct nieuwe events, breekt providerinitialisatie af via
`AbortSignal`, roept `stop()` en `clear()` aan en verwijdert de optionele
geheugenadministratie. Een laat terugkerende provider wordt eveneens opgeruimd.
De noodzakelijke weigering blijft bewaard. Reeds verzonden gegevens worden
hiermee niet automatisch gewist; een provider moet eigen bewaartermijnen en
eventuele verwijderprocedure aantoonbaar ondersteunen.

## Eén eventtaxonomie

Elk verzonden event krijgt uitsluitend `page: home | approach | contact`.
`location` is `hero | header | content | footer | assistant`.
Geen automatische pageviews, scroll-, hover- of losse veldwijzigingevents.

| Event | Werkelijke trigger | Toegestane extra velden |
|---|---|---|
| `primary_cta_click` | klik op primaire knop/header-contactlink naar ondersteunde bestemming | `location`, `destination: calculator | contact | projects` |
| `secondary_cta_click` | bestaande secundaire project-/prijs-CTA | dezelfde velden |
| `project_view` | uitgaande klik naar één van de drie portfolio-demo's; geen bewijs dat de demo geladen is | `location`, `project: kelmora | velune | avren` |
| `calculator_start` | eerste interactie met calculator na toestemming/providerbeschikbaarheid | geen |
| `calculator_complete` | bestaande actie om de indicatie mee te nemen naar contact | `pages: small | medium | large | custom | unknown` |
| `contact_start` | eerste focus op een zichtbaar aanvraagveld na toestemming/providerbeschikbaarheid | geen |
| `generate_lead` | Formspree-response HTTP succesvol **én** JSON `ok === true` | geen |
| `phone_click` | `tel:`-link, indien later aanwezig; momenteel geen telefoonkoppeling | `location`; nooit het nummer |
| `email_click` | `mailto:`-link | `location`; nooit het adres |

`website_check_start`, `website_check_complete`, `whatsapp_click` zijn uitsluitend
gereserveerde namen. De runtime weigert ze zolang de bijbehorende feature niet
bestaat. Een toekomstige implementatie vraagt een expliciete contract- en testwijziging.

Calculatorcategorieën blijven bewust beperkt tot paginagrootte. Geen exacte prijs,
combinatieprofielen of ruwe configuratie. `calculator_complete` betekent een
gebruikersactie, geen definitieve offerte, verkoop of afgerond project.

## Adapter- en providercontract

`LKAnalytics.track(eventName, safeProperties)` is de kleine publieke interface.
Alleen bekende eventnamen als string en exact toegestane categorievelden worden geaccepteerd.
Onbekende keys, symbolen, getters, vrije tekst, objectwaarden en URL's worden
geweigerd. De adapter bouwt een nieuw bevroren payloadobject uit gevalideerde
waarden. Ruwe pathname, query, fragment, referrer, linkadres, formuliertekst en
lokale Formspree-receipts worden niet naar de provider doorgestuurd.

De providerconfiguratie moet `enabled: true`, een nieuwe `policy`, begrijpelijke
provider-/doel-/datainformatie in `description` en een lokale factory bevatten:

```js
provider.create({ signal, isAllowed })
// retourneert eventueel asynchroon: { track, stop, clear }
```

De factory mag pas na toestemming externe code of verbindingen openen en moet
het abortsignaal/`isAllowed()` bij asynchrone vervolgstappen respecteren. Initialisatie
gebeurt één keer per toestemmingsperiode per document, met een deadline van drie
seconden. Geen eventqueue, geen terugspelen van vóór toestemming of tijdens laden
gemiste acties, geen automatische retry bij provideruitval. Acceptatie na een
expliciete intrekking mag een nieuwe initialisatie starten.

`track(name, payload, { signal })` mag uitsluitend dit payload gebruiken.
Automatische pageviews, URL-/referrercollectie, fingerprinting, user-ID,
advertising, cross-domainmeting en autocapture moeten uit blijven. Een toekomstige
transportimplementatie moet referrers onderdrukken en een zo klein mogelijke
netwerk/CSP-allowlist hebben. IP-adres/transportmetadata en serverbewaring vragen
provider-specifieke beoordeling; de lokale allowlist maakt niet het hele externe
verwerkingsproces anoniem.

`stop()` stopt eigen listeners/queues; `clear()` ruimt de eigen optionele opslag
op, zonder formulierdata, assistentkeuzes of noodzakelijke consentopslag te wissen.
Exceptions/rejections in alle drie methoden worden afgevangen. Een `true` return
van de adapter betekent geaccepteerd voor een verzendpoging, **geen gegarandeerde
ontvangst** bij een meetdienst. Een toekomstige provider is vertrouwde code en
moet apart worden gereviewd; deze interface is geen sandbox voor een kwaadwillige SDK.

## Leadsemantiek en deduplicatie

Het formulier behoudt zijn bestaande in-flight- en identieke-inzendingbeveiliging.
Pas na bevestigde serverresponse maakt het een oplopende lokale receipt en
signaleert het succes. De adapter telt dezelfde receipt maximaal eenmaal binnen
het actieve document/toestemmingsvenster. Generieke `track('generate_lead')` is
geblokkeerd. Een klik, geldige invoer, requeststart, HTTP-fout, `ok:false` of
ongeldig JSON levert geen lead op. Een reload/back-event speelt geen oude lead af.

Dit is client-side meetdeduplicatie. Het is geen server-side exactly-once-garantie,
bewijs van e-mailaflevering, botbeveiliging of financiële omzetregistratie. Een
nieuwe echte inzending na reload kan een nieuwe lead zijn. Gederfde events door
weigeren, laden, blokkering of netwerkuitval worden niet achteraf aangevuld.

## Activering is een afzonderlijke owner-/launchgate

Vóór externe analytics: provider/account/ownership en facturatie kiezen; doel,
payload, bewaartermijn, eventuele cookies, ontvangers, doorgifte en DPA beoordelen;
publieke privacy-informatie afronden; nieuwe beleidsversie; echte provider testen
op geen verkeer/opslag vóór toestemming, intrekking, referrers en uitval; CSP,
performance en toegankelijkheid opnieuw toetsen. Geen IDs of secrets in dit werk.

De noodzakelijke opslagclassificatie en termijn van 180 dagen vereisen owner/legal
beoordeling vóór publicatie. De Belgische GBA licht toe dat toestemmingsregels ook
op vergelijkbare opslagtechnieken van toepassing kunnen zijn en dat de gebruiker
duidelijk geïnformeerd moet worden: https://www.gegevensbeschermingsautoriteit.be/professioneel/thema-s/cookies.
Dit document claimt geen juridische compliance. Google Fonts/Formspree en bestaande
privacytekst blijven onderdeel van de bredere privacyreview.

De latere launchgate blijft **LOCAL ↔ PREVIEW ↔ PRODUCTION parity** vereisen,
inclusief HTML, assets, canonical/SEO, forms, consent/tracking, redirects,
securityheaders en deploymentversie. P4 wijzigt geen productieconfiguratie.
