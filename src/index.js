const { app, BrowserWindow, ipcMain } = require('electron'); 
const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 250,  // Width of the window
    height: 125,  // Height of the window
    frame: false,  // By adding this can remove the window frame 
    resizable: false, // By adding this can prevent resize the window
    transparent: true,  // For transparent Background
    
    // Change this to false after developpig
    // Adding this will make the window appear top of the other windows
    alwaysOnTop: true,

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Listen for messages from renderer and send back the basePath
  ipcMain.handle('getBasePath', () => {
    return path.join(__dirname, 'numbers');  // Return the path to the 'numbers' folder
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
