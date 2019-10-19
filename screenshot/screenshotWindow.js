/*
 * @Date: 2019-10-18 21:41:12
 * @LastEditors: fashandian
 * @LastEditTime: 2019-10-19 23:31:52
 */
const path = require('path');
const { createWindow } = require('../utils/createWindow');

let options = {
    webPreferences: {
        // Whether node integration is enabled. Default is false.
        nodeIntegration: true
    }
};

// handle create stream media window
const createScreenshotWindow = () => {
    return createWindow(options, path.join(__dirname, './screenshot.html'));
};

module.exports = {
    createScreenshotWindow
};
