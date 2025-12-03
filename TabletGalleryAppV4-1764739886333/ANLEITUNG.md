# Detaillierte Anleitung - Windows Tablet App

## 📋 Inhaltsverzeichnis
1. [Installation & Entwicklung](#installation--entwicklung)
2. [Windows App bauen](#windows-app-bauen)
3. [Bilder und Inhalte ändern](#bilder-und-inhalte-ändern)
4. [Erweiterte Anpassungen](#erweiterte-anpassungen)

---

## Installation & Entwicklung

### Schritt 1: Vorbereitung
Du benötigst **Node.js** auf deinem Computer. Falls nicht installiert:
- Download: https://nodejs.org/
- Empfohlen: LTS Version (aktuell v20 oder v18)

Überprüfen ob Node.js installiert ist:
```bash
node --version
npm --version
```

### Schritt 2: Dependencies installieren
Öffne eine **Kommandozeile** (CMD oder PowerShell) und navigiere zum Projekt:

```bash
cd TabletGalleryAppV4-1764739886333
npm install
```

Das lädt alle benötigten Pakete herunter (dauert 1-3 Minuten).

### Schritt 3: App testen (Entwicklungsmodus)

**Option A - Web-Version (schnell zum Testen):**
```bash
npm run dev
```
- Öffnet automatisch http://localhost:5173 im Browser
- Änderungen am Code werden sofort sichtbar (Hot Reload)
- Mit `Strg+C` beenden

**Option B - Electron-Version (wie die finale App):**
```bash
npm run electron:dev
```
- Startet die App in einem nativen Fenster
- Sieht aus wie die finale Windows-App
- DevTools sind geöffnet (für Debugging)
- Mit `Strg+C` beenden

---

## Windows App bauen

### Schritt 1: Build vorbereiten
Stelle sicher, dass du alle Dependencies installiert hast (siehe oben).

### Schritt 2: Build starten
```bash
npm run electron:build:win
```

**Was passiert jetzt?**
1. TypeScript wird kompiliert ✓
2. React-App wird gebaut (Vite Build) ✓
3. Electron-Builder erstellt die Windows-App ✓

Das dauert **5-10 Minuten** beim ersten Mal.

### Schritt 3: Fertige App finden
Nach dem Build findest du die Dateien in:
```
TabletGalleryAppV4-1764739886333/
└── dist-electron/
    ├── Tablet Gallery App Setup 1.0.0.exe  <- Installer
    ├── Tablet Gallery App 1.0.0.exe        <- Portable Version
    └── win-unpacked/                        <- Entpackte App (zum Testen)
```

### Schritt 4: App verteilen
Du kannst jetzt folgende Dateien an andere weitergeben:

**Installer-Version:**
- `Tablet Gallery App Setup 1.0.0.exe`
- Benutzer installiert die App wie gewohnt
- Erscheint im Startmenü

**Portable Version:**
- `Tablet Gallery App 1.0.0.exe`
- Kann direkt ausgeführt werden
- Keine Installation nötig
- Ideal für USB-Sticks oder schnelles Testen

---

## Bilder und Inhalte ändern

### Methode 1: URLs ändern (einfachste Methode)

**Datei öffnen:**
```
TabletGalleryAppV4-1764739886333/src/Component.tsx
```

**Bilder finden** (ab Zeile 52):
```typescript
const INITIAL_ITEMS: GalleryItem[] = [
  {
    id: 'item-1',
    type: 'video',
    src: 'https://assets.mixkit.co/videos/preview/...',  // <-- HIER ändern
    thumbnail: 'https://images.unsplash.com/...',        // <-- Vorschaubild
    title: 'Hinter den Kulissen'                         // <-- Titel ändern
  },
  {
    id: 'item-2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-...',        // <-- HIER ändern
    title: 'Drehortsuche'                                 // <-- Titel ändern
  },
  // ... weitere Bilder
];
```

**Beispiel - Eigenes Bild einfügen:**
```typescript
{
  id: 'item-2',
  type: 'image',
  src: 'https://meine-website.de/mein-foto.jpg',
  title: 'Mein eigenes Foto'
}
```

**Beispiel - Video einfügen:**
```typescript
{
  id: 'item-1',
  type: 'video',
  src: 'https://meine-website.de/mein-video.mp4',
  thumbnail: 'https://meine-website.de/video-thumbnail.jpg',
  title: 'Mein Video'
}
```

### Methode 2: Lokale Dateien verwenden

**Schritt 1: Public-Ordner erstellen**
```
TabletGalleryAppV4-1764739886333/
└── public/
    └── images/
        ├── bild1.jpg
        ├── bild2.jpg
        └── video1.mp4
```

**Schritt 2: In Component.tsx referenzieren**
```typescript
const INITIAL_ITEMS: GalleryItem[] = [
  {
    id: 'item-1',
    type: 'image',
    src: '/images/bild1.jpg',  // <-- Pfad relativ zu public/
    title: 'Mein lokales Bild'
  },
  {
    id: 'item-2',
    type: 'video',
    src: '/images/video1.mp4',
    thumbnail: '/images/bild2.jpg',
    title: 'Mein lokales Video'
  }
];
```

**Vorteil:** Bilder sind in der App eingebettet (offline verfügbar!)

### Weitere Inhalte ändern

**Text der Magic Keyboard Nachricht** (Zeile ~100+):
Suche nach:
```typescript
const TARGET_TEXT = "Wir sollten mit Fiona Markovic sprechen. Dringend!!!";
```

Ändere zu:
```typescript
const TARGET_TEXT = "Deine eigene Nachricht hier!";
```

**Kontaktliste ändern** (suche nach "CONTACTS"):
```typescript
const CONTACTS = [
  {
    id: 'c1',
    name: 'Lena Odenthal',        // <-- Name ändern
    avatar: '👤',                  // <-- Icon ändern
    type: 'contact' as const
  },
  // ... weitere Kontakte
];
```

### Nach Änderungen: App neu bauen

**Für Entwicklung (Test):**
```bash
npm run dev
# oder
npm run electron:dev
```

**Für finale Windows-App:**
```bash
npm run electron:build:win
```

---

## Erweiterte Anpassungen

### Mehr Bilder hinzufügen
In `Component.tsx`, füge weitere Items hinzu:
```typescript
const INITIAL_ITEMS: GalleryItem[] = [
  // ... bestehende Items
  {
    id: 'item-6',  // ID muss einzigartig sein!
    type: 'image',
    src: 'https://...',
    title: 'Neues Bild'
  }
];
```

### App-Name ändern
In `package.json`:
```json
"build": {
  "productName": "Meine Custom App",  // <-- Hier ändern
}
```

### Fenstergröße ändern
In `electron/main.js`:
```javascript
mainWindow = new BrowserWindow({
  width: 1920,      // <-- Breite ändern
  height: 1080,     // <-- Höhe ändern
  fullscreen: true, // <-- true = Startet im Vollbild
  // ...
});
```

### App-Icon ändern
1. Erstelle ein Icon (256x256 Pixel, .ico Format)
2. Speichere es als `build/icon.ico`
3. Rebuild: `npm run electron:build:win`

**ICO erstellen:**
- Online: https://convertio.co/de/png-ico/
- Oder: https://icoconvert.com/

---

## Häufige Probleme

### "npm nicht gefunden"
→ Node.js ist nicht installiert oder nicht im PATH
→ Lösung: Node.js neu installieren

### Build schlägt fehl mit "out of memory"
→ Zu wenig RAM
→ Lösung: Andere Programme schließen

### Bilder werden nicht angezeigt
→ Überprüfe die URLs (müssen öffentlich zugänglich sein)
→ Oder verwende lokale Dateien im `public/` Ordner

### App startet nicht nach Build
→ Lösche `dist-electron/` und `node_modules/`
→ Führe aus: `npm install` dann `npm run electron:build:win`

---

## Zusammenfassung

**Schneller Test:**
```bash
npm install
npm run electron:dev
```

**Bilder ändern:**
1. Öffne `src/Component.tsx`
2. Ändere URLs in `INITIAL_ITEMS`
3. Speichern und neu starten

**Finale App bauen:**
```bash
npm run electron:build:win
```

**Fertige App:** `dist-electron/Tablet Gallery App 1.0.0.exe`

---

Viel Erfolg! 🚀
