/*
 * @Date: 2019-10-19 22:19:17
 * @LastEditors: fashandian
 * @LastEditTime: 2019-10-20 13:27:28
 */
const electron = require('electron');
const path = require('path');

const { app, Menu } = electron;

const { createStreamMediaWindow } = require('./streamMedia/streamMediaWindow');
const { createScreenshotWindow } = require('./screenshot/screenshotWindow');
const { createWindow } = require('./utils/createWindow');

let mainWindow, screenshotWindow, streamMediaWindow;
const isMac = process.platform === 'darwin';

// create menu template
const mainMenuTemplate = (() => {
    let template = [
        // { role: 'appMenu' },
        ...(isMac
            ? [
                  {
                      label: app.name,
                      submenu: [
                          { role: 'about' },
                          { type: 'separator' },
                          { role: 'services' },
                          { type: 'separator' },
                          { role: 'hide' },
                          { role: 'hideothers' },
                          { role: 'unhide' },
                          { type: 'separator' },
                          { role: 'quit' }
                      ]
                  }
              ]
            : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [isMac ? { role: 'close' } : { role: 'quit' }]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac
                    ? [
                          { role: 'pasteAndMatchStyle' },
                          { role: 'delete' },
                          { role: 'selectAll' },
                          { type: 'separator' },
                          {
                              label: 'Speech',
                              submenu: [
                                  { role: 'startspeaking' },
                                  { role: 'stopspeaking' }
                              ]
                          }
                      ]
                    : [
                          { role: 'delete' },
                          { type: 'separator' },
                          { role: 'selectAll' }
                      ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac
                    ? [
                          { type: 'separator' },
                          { role: 'front' },
                          { type: 'separator' },
                          { role: 'window' }
                      ]
                    : [{ role: 'close' }])
            ]
        },
        {
            role: 'help',
            submenu: [
                {
                    label: 'Learn More',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal('https://electronjs.org');
                    }
                },
                {
                    label: 'About',
                    click: async () => {
                        const { shell } = require('electron');
                        await shell.openExternal(
                            'https://github.com/fashandian/remote-monitor'
                        );
                    }
                }
            ]
        },
        {
            label: 'Remote',
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
                // or use role, but the hotkey is ctrl+shift+i
                //{ role: 'toggledevtools' },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'F12',
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
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
