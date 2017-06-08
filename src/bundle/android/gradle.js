const gradleDefaultPath = 'app/build.gradle';

const process = (androidProjectValidPath, payload, strategy) => {
    const gradlePath = `${androidProjectValidPath}/${gradleDefaultPath}`;
    strategy.utils.log.info(`Cheking gradle file ${gradlePath}`);
    return strategy.utils.checkPath(strategy.fileSystem, `${gradlePath}`, false)
        .then(androidGradleFilePath => {
            strategy.utils.log.sucess(`+ Android gradle file is accessable and writeable was`);
            strategy.utils.log.info(`Reading gradle file`);
            return strategy.utils.readFile(strategy.fileSystem, androidGradleFilePath);
        }).then(androidGradleFileObj => {
            strategy.utils.log.sucess(`+ Loaded Android gradle file loaded into memory`);
            strategy.utils.log.info(`Updating gradle file in memory`);
            return strategy.updaters.gradleUpdater(androidGradleFileObj, payload.bundleId);
        });
};

module.exports = { process };