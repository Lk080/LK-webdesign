# Lighthouse

Zie [foundation](QA-FOUNDATION.md). `node scripts/qa-lighthouse.cjs <project-id>
[desktop|mobile]` vereist een niet-bevroren project; zonder mode worden beide uitgevoerd.
Bestaande Chromium/Lighthouse en lokale QA-server worden hergebruikt. Geen installaties.

Rapporten staan in de unieke runmap onder lighthouse/<project>/<mode>. Projecttargets
komen uit qa-projects.json; lagere/ontbrekende scores en netwerkfouten zijn machineleesbaar
en geven niet-nul exitcode. Menselijke duiding blijft nodig; geen scoregaming.

Alleen expliciet toegestane externe read-origins mogen laden. Formspree/writes en
onbekende dependencies worden geblokkeerd. Afwijkingen staan in de summary.
Lokale no-store/on-gecomprimeerde server, gesimuleerde throttling en een single run
zijn geen bewezen productieprestaties. Andere bewijsbestanden worden niet opgeruimd.
