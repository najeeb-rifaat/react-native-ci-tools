var plistUpdater = require('./ios/plist');
var stringsUpdater = require('./android/strings');
var manifestUpdater = require('./android/manifest');
var gradleUpdater = require('./android/gradle');
var mainAppUpdater = require('./android/main_app');
var mainActivityUpdater = require('./android/main_activity');

module.exports = { plistUpdater, stringsUpdater, manifestUpdater, gradleUpdater, mainAppUpdater, mainActivityUpdater };