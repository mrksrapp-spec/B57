# Eigene Bilder & Videos hier platzieren

## 📸 So verwendest du eigene Medien

### Schritt 1: Dateien hierher kopieren
Kopiere deine Bilder und Videos in diesen Ordner:
```
public/images/
├── mein-foto1.jpg
├── mein-foto2.png
├── mein-video.mp4
└── README.md (diese Datei)
```

### Schritt 2: In Component.tsx referenzieren
Öffne `src/Component.tsx` und ändere die URLs:

**Vorher (Online-URL):**
```typescript
{
  id: 'item-2',
  type: 'image',
  src: 'https://images.unsplash.com/photo-...',
  title: 'Bild'
}
```

**Nachher (Lokale Datei):**
```typescript
{
  id: 'item-2',
  type: 'image',
  src: '/images/mein-foto1.jpg',  // ← Deine Datei
  title: 'Mein Foto'
}
```

### Schritt 3: App neu starten
```bash
npm run electron:dev
```

## ✅ Unterstützte Formate

**Bilder:**
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

**Videos:**
- `.mp4` (empfohlen)
- `.webm`
- `.ogg`

## 💡 Tipps

1. **Dateinamen ohne Leerzeichen:** `mein-foto.jpg` statt `mein foto.jpg`
2. **Nicht zu große Dateien:** Max 10-20 MB pro Bild/Video für beste Performance
3. **Bilder komprimieren:** Online-Tools wie TinyPNG.com nutzen
4. **Videos optimieren:** H.264 Codec für beste Kompatibilität

## 🎯 Beispiel

**Diese Dateien:**
```
public/images/
├── teamfoto.jpg
├── behind-scenes.mp4
└── produktshot.png
```

**In Component.tsx:**
```typescript
const INITIAL_ITEMS: GalleryItem[] = [
  {
    id: 'item-1',
    type: 'image',
    src: '/images/teamfoto.jpg',
    title: 'Unser Team'
  },
  {
    id: 'item-2',
    type: 'video',
    src: '/images/behind-scenes.mp4',
    thumbnail: '/images/produktshot.png',
    title: 'Making Of'
  },
  {
    id: 'item-3',
    type: 'image',
    src: '/images/produktshot.png',
    title: 'Produkt'
  }
];
```

## 📦 In der finalen App

Wenn du `npm run electron:build:win` ausführst, werden alle Dateien aus diesem Ordner automatisch in die .exe gepackt. Die App funktioniert dann komplett offline!
