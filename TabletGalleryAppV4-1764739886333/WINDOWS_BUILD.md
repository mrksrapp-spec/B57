# Windows Tablet App - Build Anleitung

Diese Anleitung erklärt, wie du die Tablet Gallery App als native Windows-Anwendung baust und ausführst.

## Voraussetzungen

- Node.js (v18 oder höher)
- npm oder yarn
- Windows 10/11 (für das Bauen der .exe)

## Installation

```bash
cd TabletGalleryAppV4-1764739886333
npm install
```

## Entwicklung

### Variante 1: Web-Version (schnell zum Testen)
```bash
npm run dev
```
Öffne dann http://localhost:5173 im Browser.

### Variante 2: Electron-Version (wie die finale App)
```bash
npm run electron:dev
```
Startet die App in einem nativen Windows-Fenster.

## Windows App Bauen

### Portable Version (.exe)
```bash
npm run electron:build:win
```

Die fertige App findest du dann in:
- `dist-electron/` - Hier ist die installierbare .exe-Datei

### Was wird gebaut?

Der Build-Prozess erstellt:
1. **NSIS Installer** - Eine Setup.exe zum Installieren der App
2. **Portable Version** - Eine einzelne .exe-Datei, die ohne Installation läuft

## Features der Windows App

- ✅ Native Windows-Anwendung
- ✅ Touch-optimiert für Tablets
- ✅ Vollbildmodus mit F11
- ✅ Kein Browser nötig
- ✅ Schneller Start
- ✅ Offline nutzbar

## Tablet-Optimierungen

Die App ist speziell für Windows Tablets optimiert:
- Touch-Gesten werden nativ unterstützt
- Automatisches Verstecken der Menüleiste
- Optimierte Darstellung für Touch-Displays
- Vollbildmodus für immersives Erlebnis

## Vollbildmodus

- Drücke **F11** um in den Vollbildmodus zu wechseln
- Drücke erneut **F11** um zurück zu wechseln
- Ideal für Film-Sets und Präsentationen

## Troubleshooting

### App startet nicht
- Überprüfe, ob alle Dependencies installiert sind: `npm install`
- Lösche `node_modules` und installiere neu

### Build schlägt fehl
- Stelle sicher, dass du auf Windows baust (für Linux/Mac: Cross-Compilation möglich)
- Prüfe, ob genug Speicherplatz vorhanden ist

### Touch funktioniert nicht
- Stelle sicher, dass dein Tablet Touch-Eingaben unterstützt
- Neustart der App kann helfen

## Anpassungen

### App-Icon ändern
Ersetze das Icon in `build/icon.ico` mit deinem eigenen Icon (256x256 PNG oder ICO-Format).

### App-Name ändern
Bearbeite in `package.json`:
```json
"build": {
  "productName": "Dein App Name"
}
```

### Fenstergröße anpassen
Bearbeite `electron/main.js`:
```javascript
width: 1280,  // Breite
height: 800,  // Höhe
fullscreen: true,  // Startet im Vollbild
```

## Verteilung

Die gebaute App kann direkt verteilt werden:
1. **Installer**: `dist-electron/Tablet Gallery App Setup.exe` - Benutzer können die App installieren
2. **Portable**: `dist-electron/Tablet Gallery App.exe` - Kann direkt ausgeführt werden, keine Installation nötig

Beide Versionen funktionieren ohne Node.js oder andere Dependencies auf dem Ziel-Tablet.

## Support

Bei Problemen erstelle ein Issue im Repository.
