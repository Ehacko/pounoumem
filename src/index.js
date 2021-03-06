const 
  { app, BrowserWindow, Menu, autoUpdater, nativeImage, dialog } = require('electron'),
  path = require('path'),
  log = require('electron-log');
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');
// const server = 'serveur_name';
// const url = `${server}/update/${process.platform}/${app.getVersion()}`;
// autoUpdater.setFeedURL({ url });

let win, appIcon;

Menu.setApplicationMenu(require('./menu'));
appIcon = nativeImage.createFromPath(path.join(__dirname, '/img/logo512.png'));
const createWindow = () => {
  // Create the browser window
  console.log(appIcon);
  win = new BrowserWindow({
    width: 1000,
    minWidth: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    // icon: path.join(__dirname, '/img/logo.png'),
    icon: appIcon,
    frame: false,
    titleBarStyle: "hidden",
    show: false,
    transparent: true,
  });
  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'));
  setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 60000);
  win.once('ready-to-show', () => {
    win.show()
  })
  // Open the DevTools.
  win.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
require('update-electron-app')();

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: "A new version has been downloaded. Redémarrez l'application pour appliquer les mises à jour."
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  })
})
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application');
  console.error(message);
})