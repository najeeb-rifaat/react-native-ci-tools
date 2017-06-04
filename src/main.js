var fs = require('fs');
var chalk = require('chalk');

var updateIosProject = require('./ios');
var updateAndroidProject = require('./android');

module.exports = mainProjectUpdater = (appBase, iosSubDir, androidSubDir, appDisplayName, appBundleId) => Promise.all(
    updateIosProject(appBase, iosSubDir, appDisplayName, appBundleId)
        .then((iosFiles) => {
            console.log('Update IOS files:');
            iosFiles.map(thisFile => {
                fs.writeFileSync(thisFile.path, thisFile.updatedContent)
                console.log(chalk.green('  ++ %s'), thisFile.path);
            });
        }),
    updateAndroidProject(appBase, androidSubDir, appDisplayName, appBundleId)
        .then((androidFiles) => {
            console.log('Update ANDROID files:');
            androidFiles.map(thisFile => {
                fs.writeFileSync(thisFile.path, thisFile.updatedContent)
                console.log(chalk.green('  ++ %s'), thisFile.path);
            });
        })
);
