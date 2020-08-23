const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}
let temp = [
  {
    label: 'aide',
    submenu: [
      {
        label:'Apprendre plus', 
        click() { 
          shell.openExternal('www.pounoumenm.fr')
        } 
      },
      {
        label:'Documentation', 
        click() { 
          shell.openExternal('http://www.pounoumenm.fr/documentation')
        } 
      },
      {
        label:'Communauté', 
        click() {
          shell.openExternal('http://www.pounoumenm.fr/forum')
        }
      }
    ]
  }
]
let menu = Menu.buildFromTemplate(temp)
//Menu.setApplicationMenu(menu); 
const createWindow = () => {
  // Create the browser window
  
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: path.join(__dirname, '/img/logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });
  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'));
  //win.loadURL('http://www.pounoumem.fr/');
  
  // Open the DevTools.
  //win.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
})
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
});
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
