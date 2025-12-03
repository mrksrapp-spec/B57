# Quick Start Guide 🚀

## ⚡ 3 Schritte zur fertigen Windows App

### 1️⃣ Installieren
```bash
cd TabletGalleryAppV4-1764739886333
npm install
```
⏱️ Dauer: ~2 Minuten

---

### 2️⃣ Testen
```bash
npm run electron:dev
```
✅ App öffnet sich in nativem Fenster
🔧 Perfekt zum Testen vor dem Build

---

### 3️⃣ Windows App bauen
```bash
npm run electron:build:win
```
⏱️ Dauer: ~5-10 Minuten

📦 **Fertige App:**
```
dist-electron/
├── Tablet Gallery App Setup 1.0.0.exe  ← Installer
└── Tablet Gallery App 1.0.0.exe        ← Portable (USB-Stick)
```

---

## 🎨 Bilder ändern (in 30 Sekunden)

**Datei öffnen:** `src/Component.tsx`

**Bilder finden (Zeile 52):**
```typescript
const INITIAL_ITEMS: GalleryItem[] = [
  {
    id: 'item-2',
    type: 'image',
    src: 'DIESE-URL-ÄNDERN',  // ← Hier deine Bild-URL
    title: 'Titel ändern'      // ← Hier Titel ändern
  }
];
```

**Speichern → App neu starten → Fertig!**

---

## 📁 Lokale Bilder verwenden

**1. Bilder kopieren:**
```
public/
└── images/
    ├── foto1.jpg
    └── video1.mp4
```

**2. In Code referenzieren:**
```typescript
src: '/images/foto1.jpg'  // ← Pfad zu deiner Datei
```

**Vorteil:** Bilder sind offline in der App verfügbar!

---

## 🔧 Nützliche Befehle

| Befehl | Was es macht |
|--------|--------------|
| `npm run dev` | Web-Version (Browser) |
| `npm run electron:dev` | Windows-App (Entwicklung) |
| `npm run electron:build:win` | Finale .exe erstellen |

---

## 📖 Mehr Details?

Siehe **[ANLEITUNG.md](ANLEITUNG.md)** für:
- Schritt-für-Schritt Erklärungen
- Erweiterte Anpassungen
- Troubleshooting
- App-Icon ändern
- Videos einbinden
- Texte anpassen

---

## ⚠️ Voraussetzungen

✅ Node.js installiert (Download: https://nodejs.org/)
✅ Windows 10 oder 11
✅ ~2 GB freier Speicher

---

**Fragen?** Siehe [ANLEITUNG.md](ANLEITUNG.md) oder [WINDOWS_BUILD.md](WINDOWS_BUILD.md)
