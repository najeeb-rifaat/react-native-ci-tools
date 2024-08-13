const mainActivityDefaultPathPattern = 'app/src/main/java/**/*/MainActivity.{java,kt}';

const process = (androidProjectValidPath, payload, strategy) => {
    var mainActivityPathPattern = `${androidProjectValidPath}/${mainActivityDefaultPathPattern}`;
    strategy.utils.log.info(`Searching main activity file ${mainActivityPathPattern}`);
    return strategy.utils.globSearch(strategy.globber, mainActivityPathPattern, false)
        .then(fileSearchResults => {
            if (fileSearchResults) {
                if (fileSearchResults.length == 1) {
                    return fileSearchResults[0];
                }
                throw new Error(`Unable to determine MainActivity.{java,kt} file, found (${fileSearchResults.length}) matches`);
            }
            throw new Error(`Unable to find MainActivity.{java,kt} file, search directory (${fileSearchResults.length}) matches`);
        }).then(androidMainActivityFilePath => {
            strategy.utils.log.sucess(`+ Android main activity file is found : ${androidMainActivityFilePath}`);
            strategy.utils.log.info(`Reading main app  file`);
            return strategy.utils.checkPath(strategy.fileSystem, androidMainActivityFilePath, false)
        }).then(androidMainActivityFilePathValid => {
            strategy.utils.log.sucess(`+ Android main activity file is accessable and writeable was`);
            strategy.utils.log.info(`Reading main activity file`);
            return strategy.utils.readFile(strategy.fileSystem, androidMainActivityFilePathValid);
        }).then(androidMainActivityFileObj => {
            strategy.utils.log.sucess(`+ Loaded Android main activity file loaded into memory`);
            strategy.utils.log.info(`Updating main activity file in memory`);
            return strategy.updaters.mainActivityUpdater(androidMainActivityFileObj, payload.bundleId);
        });
};

module.exports = { process };
