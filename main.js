const { app, BrowserWindow, screen, ipcMain} = require('electron')

var window;
var primaryDisplay;

const createWindow = () => {
   primaryDisplay = screen.getPrimaryDisplay()
   var { width, height } = primaryDisplay.workAreaSize

  const win = new BrowserWindow({
    frame: false, //would remove close buttons that dont work so the only option would be the exit button that works
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.maximize();

  win.loadFile('index.html')
return win;
}
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})


app.whenReady().then(() => {
 window = createWindow()
})

ipcMain.on('close', () => {
  app.quit()
})
ipcMain.on('minimize', () => {
window.minimize();
})

ipcMain.on('reSize', () => {


  if(window.isMaximized()){
    window.unmaximize();
  }else{
    window.maximize();
  }
  })
  



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  
  