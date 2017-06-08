const nestedPadding = '     ';
const stringsFileDefaultPath = 'app/src/main/res/values/strings.xml';
const defaultPathIgnorePattern = '**/build/**';

const process = (androidProjectValidPath, payload, strategy) => {
    const stringsFilePath = `${androidProjectValidPath}/${stringsFileDefaultPath}`;
    strategy.utils.log.info(`Cheking strings file ${stringsFilePath}`);
    return strategy.utils.checkPath(strategy.fileSystem, stringsFilePath, false)
        .then(androidStringsFilePath => {
            strategy.utils.log.sucess(`+ Android strings file is accessable and writeable was`);
            strategy.utils.log.info(`Reading strings file`);
            return strategy.utils.readFile(strategy.fileSystem, androidStringsFilePath);
        }).then(androidStringFileObj => {
            strategy.utils.log.sucess(`+ Android strings file loaded into memory`);
            strategy.utils.log.info(`Parsing strings file`);
            return strategy.utils.xmlParse(strategy.xml.parser, androidStringFileObj);
        }).then(androidStringsFileXmlObj => {
            strategy.utils.log.sucess(`+ Parsed Android strings file loaded into memory`);
            strategy.utils.log.info(`Updating strings file in memory`);
            return strategy.updaters.stringsUpdater(androidStringsFileXmlObj, payload.displayName);
        }).then(androidStringsUpdatedXmlObj => {
            strategy.utils.log.info(`Building strings file in memory`);
            return strategy.utils.xmlBuild(strategy.xml.builder, androidStringsUpdatedXmlObj)
        });;
};

module.exports = { process };