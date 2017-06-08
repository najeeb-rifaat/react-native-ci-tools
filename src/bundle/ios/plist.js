const plistSearchPattern = '**/Info.plist';
const defaultPathIgnorePattern = '**/build/**';

const process = (iosProjectPath, payload, strategy) => {
    const iosSearchPattern = `${iosProjectPath}/${plistSearchPattern}`;
    strategy.utils.log.info(`Searching path (${payload.iosProjectSubDir}) for file pattern (${iosSearchPattern})`);
    return strategy.utils.globSearch(strategy.globber, iosSearchPattern, { ignore: defaultPathIgnorePattern })
        .then(matchList => {
            strategy.utils.log.sucess(`+ IOS plist files found : `);
            matchList.map(thisMatch => strategy.utils.log.sucess(`- Found ${thisMatch}`));
            return matchList;
        }).then(matchList => {
            strategy.utils.log.info(`Reading files contents`);
            return Promise.all(matchList.map(thisMatchFile => strategy.utils.readFile(strategy.fileSystem, thisMatchFile)));
        }).then(fileObjList => {
            strategy.utils.log.info(`Parsing plist files`);
            return Promise.all(fileObjList.map(thisFileObj => strategy.utils.plistParse(strategy.plistParser, thisFileObj)));
        }).then(parsedObjList => {
            strategy.utils.log.info(`Updating files in memory`);
            return Promise.all(parsedObjList.map(thisParsedObjFile => strategy.updaters.plistUpdater.applyUpdates(thisParsedObjFile, payload.displayName, payload.bundleId, payload.bundleName)));
        }).then(updatedObjList => {
            strategy.utils.log.info(`Building plists`);
            return Promise.all(updatedObjList.map(thisUpdatedObjFile => strategy.utils.plistBuild(strategy.plistParser, thisUpdatedObjFile)));
        }).catch(error => { strategy.utils.log.error(error); throw error });
};

module.exports = { process };
