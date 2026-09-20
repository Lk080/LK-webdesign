# LK workspace workflow

Lees voor development/QA [LK Development Standard V2](LK-DEVELOPMENT-STANDARD.md).
Standaard: impact bepalen → gerichte LIGHT QA; MEDIUM bij mijlpalen; FULL FINAL
vóór oplevering. Herhaal geen geldig PASS-bewijs zonder relevante wijziging.
Nieuwe `qa:light`, `qa:medium`, `qa:final` tonen eerst een plan; uitvoeren met `--run`.
Kelmora (`docs/demos/vakman`, bijbehorende tests/baselines) is bevroren na checkpoint
`4c8674f629e4c4e78dd4571bba6b4fbd0609fb9a`: alleen aanpassen/hertesten op nieuwe opdracht.
Behoud bestaande ongecommitte wijzigingen. Geen automatische baseline-updates,
dependency-installaties, echte Formspree-inzendingen, commits of push.
Na FINAL PASS stoppen; geen extra redesigns zonder nieuwe opdracht.
