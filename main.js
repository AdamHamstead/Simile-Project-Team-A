const { app, BrowserWindow, ipcMain} = require('electron')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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
  
  