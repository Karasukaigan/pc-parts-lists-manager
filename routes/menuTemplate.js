const { Menu, shell, dialog} = require('electron');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const template = [
    {
        label: '文件',
        submenu: [
            {
                role: 'quit',
                label: '退出'
            },
            { type: 'separator' },
            {
                label: '导入',
                click: () => {
                    importJsonFiles();
                }
            },
            {
                label: '备份/导出',
                click: () => {
                    backupFiles();
                }
            },
            {
                label: '查看',
                click: () => {
                    openJsonDirectory();
                }
            },
            {
                label: '删除所有',
                click: () => {
                    clearJsonDirectory();
                }
            }
        ]
    },
    {
        label: '窗口',
        submenu: [
            { role: 'reload', label: '重新加载' },
            { role: 'forcereload', label: '强制重新加载' },
            { type: 'separator' },
            { role: 'resetzoom', label: '重置缩放' },
            { role: 'zoomin', label: '放大' },
            { role: 'zoomout', label: '缩小' },
            { type: 'separator' },
            { role: 'togglefullscreen', label: '切换全屏' }
        ]
    },
    {
        label: '支持',
        submenu: [
            {
                label: 'Gitee',
                click: () => {
                    shell.openExternal('https://gitee.com/karasukaigan/pc-parts-lists-manager');
                }
            },
            {
                label: 'Github',
                click: () => {
                    shell.openExternal('https://github.com/karasukaigan/pc-parts-lists-manager');
                }
            }
        ]
    }
];

function importJsonFiles() {
    const jsonDirectory = path.join(__dirname, '..', 'public', 'json');

    dialog.showOpenDialog({
        title: '选择要导入的配置清单',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'JSON Files', extensions: ['json'] }]
    }).then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
            result.filePaths.forEach((filePath) => {
                const fileName = path.basename(filePath);
                const targetPath = path.join(jsonDirectory, fileName);

                fs.copyFile(filePath, targetPath, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            });
        }
    });
}

function clearJsonDirectory() {
    const jsonDirectory = path.join(__dirname, '..', 'public', 'json');

    dialog.showMessageBox({
        type: 'warning',
        title: '删除所有配置清单',
        message: '此操作不可逆！请在删除前做好备份。你将删除所有配置清单。',
        buttons: ['确认', '取消'],
        defaultId: 0,
        cancelId: 1
    }).then((response) => {
        if (response.response === 0) {
            fs.readdir(jsonDirectory, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }

                files.forEach((file) => {
                    fs.unlink(path.join(jsonDirectory, file), (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            });
        }
    });
}

function openJsonDirectory() {
    const jsonDirectory = path.join(__dirname, '..', 'public', 'json');

    shell.openPath(jsonDirectory)
        .catch((err) => {
            console.error(err);
        });
}

function backupFiles() {
    const outputDir = path.join(__dirname, '..', 'public', 'json');
    const backupFileName = `配置清单备份${getCurrentDate()}.zip`;

    dialog.showSaveDialog({
        title: '备份/导出所有配置清单',
        defaultPath: backupFileName,
        filters: [{ name: backupFileName, extensions: ['zip'] }]
    }).then((result) => {
        if (!result.canceled && result.filePath) {
            const zipFilePath = result.filePath;
            const output = fs.createWriteStream(zipFilePath);
            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            archive.on('error', (err) => {
                console.error(err);
            });
            archive.pipe(output);
            archive.directory(outputDir, false);
            archive.finalize();
        }
    });
}

function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = template;
