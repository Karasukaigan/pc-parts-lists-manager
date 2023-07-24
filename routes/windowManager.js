const { BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow(port) {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, '..', 'public', 'img', 'totem.png')
    });

    mainWindow.loadURL(`http://localhost:${port}/`);

    // mainWindow.webContents.openDevTools(); // 打开开发者工具

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    return mainWindow;
}

module.exports = {
    createWindow,
    mainWindow,
};
