const plist = require('./plist');

const processUpdates = (payload, strategy) =>
    new Promise((resolve, reject) => {
        strategy.utils.log.info(`Checking base project path (${payload.projectPath})`);
        resolve(strategy.utils.checkPath(strategy.fileSystem, payload.projectPath, true)
            .then(basePath => {
                strategy.utils.log.sucess(`+ Base path exists and writeable`);
                return basePath;
            }).then(basePath => {
                strategy.utils.log.info(`Checking ios project path (${payload.iosProjectSubDir})`);
                return strategy.utils.checkPath(strategy.fileSystem, `${basePath}/${payload.iosProjectSubDir}`, true);
            }));
    }).then(iosProjectValidPath => plist.process(iosProjectValidPath, payload, strategy) // process IOS plist files
    ).catch(error => {
        strategy.utils.log.error(error);
        throw error;
    });

module.exports = { processUpdates };
