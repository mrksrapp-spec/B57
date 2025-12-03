const { contextBridge, ipcRenderer } = require('electron');

// Expose sichere APIs zum Renderer-Prozess
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  version: process.versions.electron,
  // Hier können bei Bedarf weitere APIs hinzugefügt werden
  // z.B. für Dateisystem-Zugriff, Benachrichtigungen, etc.
});

// Touch-Events für Tablets optimieren
window.addEventListener('DOMContentLoaded', () => {
  console.log('Tablet Gallery App - Electron Ready');
});
