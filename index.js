#!/usr/bin/env node

var fileSystem = require('fs');
var chalk = require('chalk');


var args = process.argv.slice(2);
var appBase = args[0] || process.cwd();
var iosSubDir = args[1] || 'ios';
var androidSubDir = args[2] || 'android';
var appName = args[3];
var bundleId = args[4];

if (!appName) {
    throw new Error('Please provide application display name (ordinal 4)');
}

if (!bundleId) {
    throw new Error('Please provide bundel id (ordinal 5)');
}


var main = require('./src/main');

main(appBase, iosSubDir, androidSubDir, appName, bundleId);