import { create } from 'domain'
import { app, BrowserWindow, crashReporter, ipcMain} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// webFrame.setZoomLevelLimits(1, 1);


let mainWindow = null;
let preferenceWindow = null;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

const preferenceURL = process.env.NODE_ENV === 'development'
? `http://localhost:9080/#/preferencepage`
: `file://${__dirname}/index.html#preferencepage`


function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    title: "BART",
    height: 563,
    width: 1000,  
    useContentSize: true,
    resizable: false,
  })


  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createPreferenceWindow(){
  preferenceWindow = new BrowserWindow({
    height: 450,
    width: 600,
    useContentSize: true,
    resizable: false,
    parent: mainWindow,
    modal: true, 
  })

  preferenceWindow.loadURL(preferenceURL)

  preferenceWindow.on('closed', ()=>{
    preferenceWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('openPreference',(event, args) => {
  if (preferenceWindow === null){
    createPreferenceWindow();
  }
})

ipcMain.on('closePreference',(event, args) => {
  if (preferenceWindow !== null){
    preferenceWindow.close();
  }
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
