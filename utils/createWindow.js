/*
 * @Date: 2019-10-19 23:07:50
 * @LastEditors: fashandian
 * @LastEditTime: 2019-10-19 23:34:29
 */
const electron = require('electron');
const url = require('url');

const { BrowserWindow } = electron;

// handle create new window
const createWindow = (options, htmlPath) => {
    // create new window
    let newWindow = new BrowserWindow(options);
    // load html into window
    newWindow.loadURL(
        url.format({
            pathname: htmlPath,
            protocol: 'file',
            slashes: true
        })
    );
    // garbage collection handle
    newWindow.on('close', () => {
        newWindow = null;
    });
    return newWindow;
};

module.exports = {
    createWindow
};
