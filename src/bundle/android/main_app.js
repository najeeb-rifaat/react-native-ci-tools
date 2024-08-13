const mainAppDefaultPathPattern = 'app/src/main/java/**/*/MainApplication.{java,kt}';

const process = (androidProjectValidPath, payload, strategy) => {
    const mainAppPathPattern = `${androidProjectValidPath}/${mainAppDefaultPathPattern}`;
    strategy.utils.log.info(`Searching main app file ${mainAppPathPattern}`);
    return strategy.utils.globSearch(strategy.globber, mainAppPathPattern, false)
        .then(fileSearchResults => {
            if (fileSearchResults) {
                if (fileSearchResults.length == 1) {
                    return fileSearchResults[0];
                }
                throw new Error(`Unable to determine MainApplication.{java,kt} file, found (${fileSearchResults.length}) matches`);
            }
            throw new Error(`Unable to find MainApplication.{java,kt} file, search directory (${fileSearchResults.length}) matches`);
        }).then(androidMainAppFilePath => {
            strategy.utils.log.sucess(`+ Android main app file is found : ${androidMainAppFilePath}`);
            strategy.utils.log.info(`Reading main app file`);
            return strategy.utils.checkPath(strategy.fileSystem, androidMainAppFilePath, false)
        }).then(androidMainAppFilePathValid => {
            strategy.utils.log.sucess(`+ Android main app file is accessable and writeable was`);
            strategy.utils.log.info(`Reading main app file`);
            return strategy.utils.readFile(strategy.fileSystem, androidMainAppFilePathValid);
        }).then(androidMainAppFileObj => {
            strategy.utils.log.sucess(`+ Loaded Android main app file loaded into memory`);
            strategy.utils.log.info(`Updating main app  file in memory`);
            return strategy.updaters.mainAppUpdater(androidMainAppFileObj, payload.bundleId);
        });
};

module.exports = { process };
