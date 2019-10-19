/*
 * @Date: 2019-10-19 22:19:17
 * @LastEditors: fashandian
 * @LastEditTime: 2019-10-19 23:33:36
 */
const electron = require('electron');
const path = require('path');

const { app, BrowserView, Menu } = electron;

const { createStreamMediaWindow } = require('./streamMedia/streamMediaWindow');
const { createScreenshotWindow } = require('./screenshot/screenshotWindow');
const { createWindow } = require('./utils/createWindow');

let mainWindow, screenshotWindow, streamMediaWindow;
// create menu template
const mainMenuTemplate = (() => {
    let template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Quit',
                    // 'darwin': Mac, 'win32': window
                    // 实际上快捷键操作时，大小写都可以触发
                    accelerator:
                        process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Remote Screenshot',
                    click() {
                        screenshotWindow = createScreenshotWindow();
                    }
                },
                {
                    label: 'Remote Stream Media',
                    click() {
                        streamMediaWindow = createStreamMediaWindow();
                    }
                }
            ]
        }
    ];

    // add developer tools item if not in prod
    if (process.env.NODE_ENV !== 'production') {
        template.push({
            label: 'Debug',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'F12',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        });
    }
    return template;
})();

app.on('ready', () => {
    mainWindow = createWindow(
        {
            webPreferences: {
                // Whether node integration is enabled. Default is false.
                nodeIntegration: true
            }
        },
        path.join(__dirname, './index.html')
    );

    mainWindow.on('closed', () => {
        app.quit();
        mainWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
