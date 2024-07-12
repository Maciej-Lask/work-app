'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

function main() {
  // Ensure that the screen module is required after the app is ready
  const { screen } = require('electron');

  // Get the primary display dimensions
  let primaryDisplay = screen.getPrimaryDisplay();
  let { width, height } = primaryDisplay.workAreaSize;

  // Create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: width,
    height: height,
    frame: false,
    fullscreen: false,
  });

  // Load app/index.html as the window content
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile(path.join('app', 'index.html'));
}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});
