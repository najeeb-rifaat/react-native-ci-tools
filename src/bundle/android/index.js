var stringsProcessor = require('./strings');
var manifestProcessor = require('./manifest');
var gradleProcessor = require('./gradle');
var mainAppProcessor = require('./main_app');
var mainActivityProcessor = require('./main_activity');

const stringsFileDefaultPath = 'app/src/main/res/values/strings.xml';

const processUpdates = (payload, strategy) =>
    new Promise((resolve, reject) => {
        strategy.utils.log.info(`Checking base project path (${payload.projectPath})`);
        resolve(strategy.utils.checkPath(strategy.fileSystem, payload.projectPath, true)
            .then(basePath => {
                strategy.utils.log.sucess(`+ Base path exists and writeable`);
                return basePath;
            }).then(basePath => {
                strategy.utils.log.info(`Checking android project path (${payload.androidProjectSubDir})`);
                return strategy.utils.checkPath(strategy.fileSystem, `${basePath}/${payload.androidProjectSubDir}`, true);
            }))
    }).then(androidValidProjectPath => Promise.all([
        stringsProcessor.process(androidValidProjectPath, payload, strategy), // process android strings file
        manifestProcessor.process(androidValidProjectPath, payload, strategy), // process android manifest file
        gradleProcessor.process(androidValidProjectPath, payload, strategy), // process android gradle file
        mainAppProcessor.process(androidValidProjectPath, payload, strategy), // process android Main App file
        mainActivityProcessor.process(androidValidProjectPath, payload, strategy), // process android Main App file
    ])).catch(error => {
        strategy.utils.log.error(error);
        throw error;
    });



module.exports = { processUpdates };