# Velune — Beauty portfolio-demo

Fictieve huid- en ruststudio, premium en toegankelijk. Zelfstandige vanilla HTML/CSS/JS-pagina; geen framework, externe fontrequests, analytics, opslag van persoonsgegevens of boekingsbackend. Systeemfonts: Georgia en Arial met lokale fallbacks.

## Ontwerp

Editorial fotografie, ivoor en diep aubergine. Hero → filosofie → behandelmenu met signature facial → treatment finder → studio/werkwijze → expliciete voorbeeldreview → FAQ → afspraakdemo → footer. Mobiele fotografie wordt bewust anders uitgesneden; de behandelkeuzes blijven een compacte lijst.

De finder doorloopt drie voorkeurvragen. Alle 27 combinaties blijven binnen de opgegeven tijd. De boekingsdemo vraagt alleen behandeling en dagdeel, verzendt niets en bewaart niets. Native dialog met focuslus, Escape en focusherstel. Geen medische diagnose of resultaatclaims.

## Lokale preview en QA

Start vanuit de projectroot `node scripts/qa-server.cjs` en open `http://127.0.0.1:4173/demos/beauty/`.

Beauty is geregistreerd in de bestaande V2-runners. `npm run qa:medium -- --site beauty` en `npm run qa:final -- --site beauty` tonen eerst een plan. Uitvoeren vereist `--run`. Alleen Beauty-referenties bijwerken na bewuste visuele review; nooit bestaande LK/Kelmora-referenties wijzigen.

## Beeldherkomst

Drie sfeerbeelden gemaakt met de ingebouwde OpenAI imagegen-tool op 21 september 2026. Geen echte studio, klant, review of behandelresultaat. De website vermeldt AI-sfeerbeelden. Lokale WebP-varianten zijn alleen resized/cropped/gecomprimeerd met het beschikbare Sharp-runtimepakket; geen dependency toegevoegd.

Bestanden: `assets/portrait-{600,1200}.webp`, `assets/ritual-{500,1000}.webp`, `assets/studio-{500,1000}.webp`.

Gebruikte prompts:

1. Use case: photorealistic-natural. Create one premium editorial skincare photography asset, portrait 3:4 composition, for fictional accessible-premium wellness studio Velune. Close-up of an adult woman about 32 with dark brown hair swept back, eyes gently closed, naturally textured luminous skin, no makeup glamour, head tilted slightly upward, one relaxed hand resting at her collarbone, wearing simple ivory linen top, softly lit warm grey plaster backdrop, indirect afternoon side light, rich restrained shadows, desaturated warm cream and muted plum color grade. Beautiful magazine photography, authentic pores and anatomy, intimate calm, generous breathing room around head, upper torso visible. No text, logos, borders, medical instruments, exaggerated retouching or watermark.
2. Use case: photorealistic-natural. Premium editorial skincare photograph for fictional Velune studio. Landscape 5:4, close side view of an adult woman resting on ivory linen treatment bed, eyes closed, dark hair wrapped in an ivory towel, naturally textured skin, practitioner's two anatomically correct hands gently massaging her cheek and temple. No tools. Soft indirect window light with sculptural soft shadows, warm ivory, taupe, desaturated plum shadows. Calm contemporary magazine aesthetic, candid not posed smiling stock, tactile linen, shallow depth of field, face in center, no text/logos/watermarks, no medical procedures, no exaggerated before-after or retouching.
3. Use case: photorealistic-natural. Architectural editorial photograph for a fictional premium-accessible Belgian skincare studio Velune. Vertical 10:11. One intimate treatment room in indirect late afternoon natural light, ivory linen-covered treatment bed in foreground lower center, deep warm walnut cabinet and unlabelled cream ceramic vessels on right, softly textured chalk plaster walls, gently curving doorway to left and full height sheer linen curtain over large window to right, small branch in ceramic vase. Warm restrained palette ivory, sand, walnut, muted plum shadow. Authentic inviting space, asymmetric sophisticated composition, natural depth, no people, no signs/text/logos, no candle cliches, no gold, no extreme luxury, no watermark.

## Publicatiegrenzen

Geen echte afspraak mogelijk; alle prijzen en review zijn demonstratief. Er is bewust geen LocalBusiness-schema of fictief adres toegevoegd. Canonical en een absolute Open Graph-afbeeldings-URL worden pas vastgelegd zodra de definitieve publieke URL bekend is. De huidige Open Graph-afbeelding is relatief.
