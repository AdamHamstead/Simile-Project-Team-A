const { app, BrowserWindow, screen, ipcMain} = require('electron')


const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('index.html')
  
}

app.whenReady().then(() => {
 createWindow()
})

ipcMain.on('close', () => {
  app.quit()
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  
  