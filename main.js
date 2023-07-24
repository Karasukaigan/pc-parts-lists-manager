const { app, Menu } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const express = require('express');
const port = 8023;

app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('lang', 'zh-CN');

// 引入拆分的模块
const jsonRouter = require('./routes/json');
const deleteRouter = require('./routes/delete');
const newRouter = require('./routes/new');
const { createWindow } = require('./routes/windowManager'); // 窗口管理
const template = require('./routes/menuTemplate'); // 引入菜单模板

let mainWindow;

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    const expressApp = express();
    expressApp.use(express.static(path.join(__dirname, 'public')));
    expressApp.use(express.json());
    expressApp.use(express.urlencoded({ extended: true }));

    expressApp.use('/new', newRouter);
    expressApp.use('/json', jsonRouter);
    expressApp.use('/delete', deleteRouter);

    expressApp.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    server = expressApp.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    });

    createWindow(port);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow(port);
    }
});