# Prompt Lab

| Datei | Was |
|---|---|
| `prompt-lab-lite.html` | Neuer, schlanker Kleidungs-Baukasten für Nano Banana. Einfach im Browser öffnen. |
| `prompt-lab-v7_12.html` | Prompt Lab 7 bereinigt: Schule, Kinder und jugendliche Altersanmutungen entfernt. Umkleide bleibt. |

## Lite in drei Schritten
1. **Würfeln** (oder Leertaste)
2. **Feld antippen → Wert wählen.** Was du wählst, wird automatisch fixiert (gelber Rand) und bleibt beim nächsten Würfeln stehen.
3. **Kopieren.**

- *Kompakt / Normal / Detailliert*: wie viele Details pro Teil (0 / max. 2 / max. 5).
- *Foto bearbeiten*: Prompt für Nano Banana mit Referenzfoto. Nur die Kleidung wird getauscht.
- Der Prompttext ist frei editierbar. Mit ↶ machst du Schritte rückgängig.

## Neu bauen (`src/`)
```
python3 src/clean.py <original.html> prompt-lab-v7_12.html     # Bereinigung
node src/export.js prompt-lab-v7_12.html data.json              # Listen + Regeln exportieren
node src/pack.js data.json data.min.json                        # verkleinern
python3 src/build-lite.py src/lite.template.html data.min.json prompt-lab-lite.html
```
