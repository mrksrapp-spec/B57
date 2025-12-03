const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    // Touch-optimiert für Tablets
    backgroundColor: '#000000',
    show: false
  });

  // In Entwicklung: Lade von Vite Dev Server
  // In Produktion: Lade die gebaute App
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // Öffne DevTools in Entwicklung
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Zeige Fenster erst, wenn Inhalt geladen ist (verhindert Flackern)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Touch-Events aktivieren
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(1.0);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App-Lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // Auf macOS ist es üblich, das Fenster bei Klick auf das Dock-Icon neu zu erstellen
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Beende App, wenn alle Fenster geschlossen sind (außer auf macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Vollbild-Toggle mit F11
app.on('browser-window-created', (_, window) => {
  window.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F11' && input.type === 'keyDown') {
      window.setFullScreen(!window.isFullScreen());
      event.preventDefault();
    }
  });
});
