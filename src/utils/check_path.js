const common = require('./common');

/*
 * Check path permission and existence and type
 */
module.exports = (fileSystem, fullPath, isDirectory) => {
    return new Promise(
        (resolve, reject) => {
            if (!common.isObject(fileSystem)) {
                reject(new Error('Provided fileSystem argument was empty or not and object!'))
            } else if (!common.isFunction(fileSystem.access)) {
                reject(new Error('Provided filesSystems has no files access (access) function'))
            } else if (!common.notEmpty(fullPath)) {
                reject(new Error('Empty or NULL file poath was provided'))
            }
            resolve({ fileSystem, fullPath, isDirectory: isDirectory || false })
        }).then(payload => payload.fileSystem.access(payload.fullPath, payload.fileSystem.constants.W_OK, (fileAccessError) => {
            if (fileAccessError) {
                throw fileAccessError;
            }
            return payload;
        })).then(payload => fileSystem.lstat(payload.fullPath, (statsError, pathStats) => {
            if (statsError) {
                throw statsError;
            }
            return pathStats;
        })).then(pathStats => new Promise((resolve, reject) => {
            pathStats.isDirectory() == (isDirectory || false)
                ? resolve(fullPath)
                : reject(
                    new Error(
                        `Path is ${(pathStats.isDirectory() ? 'Directory' : 'File')}, should be a ${isDirectory ? 'Directory' : 'File'}`
                    )
                )
        }));
};
