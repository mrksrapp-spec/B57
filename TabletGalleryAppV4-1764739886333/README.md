# Tablet Gallery App V4

Finale Version für Filmsets mit optimiertem Magic-Keyboard und Kontakt-Liste.

## Änderungen in V4

- **Cursor Fix**: Der Cursor befindet sich jetzt immer korrekt hinter dem letzten Buchstaben, da das Rendering von `textarea` auf ein dynamisches `div` umgestellt wurde.
- **Kein Key-Highlight**: Alle visuellen Feedbacks (Active/Focus/Hover) auf der Tastatur wurden entfernt, um ein komplett statisches, realistisches Gefühl zu erzeugen.
- **Neue Kontakte**: Die Empfängerliste wurde aktualisiert (Lena Odenthal, Nico Langenkamp, Messenger, E-Mail, Weitere Kontakte).
- **Eigene Bilder**: Im Code (`INITIAL_ITEMS`) ist nun eine Anleitung integriert, wie eigene Bilder eingefügt werden können.

## Features

- **Einzelbild-Navigation**: Klick für nächstes Bild.
- **Magic Keyboard**: Automatisches Tippen des Zieltextes ("Wir sollten mit Fiona Markovic sprechen. Dringend!!!").
- **Video Autoplay**: Startet sofort.
- **Loop**: Galerie beginnt von vorne nach dem Teilen.

## Usage

```tsx
import { TabletGalleryAppV4 } from '@/sd-components/0ba01959-9810-4131-85d7-604d98d9e783';

function SetApp() {
  return <TabletGalleryAppV4 />;
}
```
