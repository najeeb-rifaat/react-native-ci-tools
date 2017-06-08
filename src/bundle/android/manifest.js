const nestedPadding = '     ';
const manifestFileDefaultPath = 'app/src/main/AndroidManifest.xml';
const defaultPathIgnorePattern = '**/build/**';

const process = (androidProjectValidPath, payload, strategy) => {
    const manifestFilePath = `${androidProjectValidPath}/${manifestFileDefaultPath}`;
    strategy.utils.log.info(`Cheking manifest file ${manifestFilePath}`);
    return strategy.utils.checkPath(strategy.fileSystem, manifestFilePath, false)
        .then(androidManifestFilePath => {
            strategy.utils.log.sucess(`+ Android manifest file is accessable and writeable was`);
            strategy.utils.log.info(`Reading manifest file`);
            return strategy.utils.readFile(strategy.fileSystem, androidManifestFilePath);
        }).then(androidManifestFileObj => {
            strategy.utils.log.sucess(`+ Android manifest file loaded into memory`);
            strategy.utils.log.info(`Parsing manifest file`);
            return strategy.utils.xmlParse(strategy.xml.parser, androidManifestFileObj);
        }).then(androidManifestFileXmlObj => {
            strategy.utils.log.sucess(`+ Parsed Android manifest file loaded into memory`);
            strategy.utils.log.info(`Updating manifest file in memory`);
            return strategy.updaters.manifestUpdater(androidManifestFileXmlObj, payload.bundleId);
        }).then(androidManifestUpdatedXmlObj => {
            strategy.utils.log.info(`Building manifest file in memory`);
            return strategy.utils.xmlBuild(strategy.xml.builder, androidManifestUpdatedXmlObj)
        });
};

module.exports = { process };