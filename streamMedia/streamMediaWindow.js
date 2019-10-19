/*
 * @Date: 2019-10-18 21:41:12
 * @LastEditors: fashandian
 * @LastEditTime: 2019-10-19 23:26:06
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
const createStreamMediaWindow = () => {
    return createWindow(options, path.join(__dirname, './streamMedia.html'));
};

module.exports = {
    createStreamMediaWindow
};
