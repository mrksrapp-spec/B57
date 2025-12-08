# Profilbilder für Kontakte

## 📸 So fügst du Profilbilder hinzu

Platziere deine Profilbilder hier:

```
public/images/profiles/
├── person1.jpg  ← Bild für "Lena Odenthal"
├── person2.jpg  ← Bild für "Nico Langenkamp"
└── README.md
```

## ✅ Empfohlene Format

- **Format**: JPG oder PNG
- **Größe**: 200x200 Pixel (quadratisch)
- **Dateigröße**: Max 200 KB pro Bild

## 🔧 Weitere Kontakte hinzufügen

In `src/Component.tsx` (ca. Zeile 107):

```typescript
const CONTACTS = [
  {
    id: 'c1',
    name: 'Lena Odenthal',
    role: 'Hauptkommissarin',
    type: 'person',
    image: './images/profiles/person1.jpg'  // ← Dein Bild
  },
  // Weitere Kontakte...
];
```

## 💡 Tipps

- **Dateinamen ohne Leerzeichen**: `person1.jpg` statt `person 1.jpg`
- **Bilder komprimieren**: Nutze TinyPNG.com für kleinere Dateigrößen
- **Quadratische Bilder**: Werden am besten im runden Avatar-Format angezeigt
