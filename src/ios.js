var fs = require('fs')
var glob = require("glob")
var plist = require('plist');

/*
 * Validate paths and build matching pattern
 */
const buildPathPattern = (basePath, iosProjectDirectory) => new Promise((resolve, reject) => {
    if (fs.existsSync(basePath)) {
        if (fs.existsSync(`${basePath}/${iosProjectDirectory}`)) {
            resolve(`${basePath}/${iosProjectDirectory}/**/Info.plist`)
        }
        reject(new Error('IOS project path DO NOT exist'));
    }
    reject(new Error('Project base path DO NOT exist'));
});


/*
 * Files search based on patten provided (patten includes path)
 */
const getMatchingFiles = (searchPattern) => new Promise((resolve, reject) => {
    try {
        glob(
            searchPattern,
            { ignore: "**/build/**" },
            function (fileMatchError, matchFileList) {
                if (fileMatchError) {
                    reject(fileMatchError)
                }
                resolve(matchFileList);
            }
        );
    } catch (error) {
        reject(error)
    }
});


/*
 * Parse .plist files
 */
const parsePlistFiles = (matchingFilesList) => new Promise((resolve, reject) => {
    try {
        resolve(matchingFilesList.map(thisPlistFilePath => {
            return {
                path: thisPlistFilePath,
                originalContent: plist.parse(fs.readFileSync(thisPlistFilePath, 'utf8'))
            };
        }));
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});


/*
 * Apply updates (edit plist files - IN MEMORY)
 */
const applyUpdates = (plistFiles, newDisplayName, newBundleId, newBundleName) => new Promise((resolve, reject) => {
    try {
        resolve(plistFiles.map(thisPlistFile => {
            //update CFBundleName
            if (thisPlistFile.originalContent.CFBundleName !== undefined) {
                thisPlistFile.originalContent.CFBundleName = newBundleName || newBundleId;
            }

            // update CFBundleIdentifier
            if (thisPlistFile.originalContent.CFBundleIdentifier !== undefined) {
                thisPlistFile.originalContent.CFBundleIdentifier = newBundleId;
            }

            // update CFBundleDisplayName
            if (thisPlistFile.originalContent.CFBundleDisplayName !== undefined) {
                thisPlistFile.originalContent.CFBundleDisplayName = newDisplayName;
            }

            return {
                path: thisPlistFile.path,
                originalContent: thisPlistFile.originalContent,
                updatedContent: plist.build(thisPlistFile.originalContent)
            };
        }))
    } catch (mutationError) {
        reject(mutationError)
    }
});


/*
 * main export
 */
module.exports = updateIosProject = (basePath, iosProjectDirectory, newDisplayName, newBundleId, newBundleName) => {
    return buildPathPattern(basePath, iosProjectDirectory)
        .then(searchPath => getMatchingFiles(searchPath))
        .then(matchingFiles => parsePlistFiles(matchingFiles))
        .then(plistFiles => applyUpdates(plistFiles, newDisplayName, newBundleId, newBundleName))
}
