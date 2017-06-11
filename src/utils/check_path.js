const common = require('./common');

/*
 * Check path permission and existence and type
 */
module.exports = (fileSystem, fullPath, isDirectory) => {
    return new Promise(
        (resolve, reject) => {
            try {
                common.throwIfNotObject(fileSystem, 'Provided fileSystem argument was empty or not and object!');
                common.throwIfNotFuction(fileSystem.access, 'Provided filesSystems has no files access (access) function');
                common.throwIfNotFuction(fileSystem.lstat, 'Provided filesSystems has no files stat (lstat) function');
                common.throwIfEmpty(fullPath, 'Empty or NULL file poath was provided');
            } catch (validationsError) {
                reject(validationsError);
            }
            resolve({ fileSystem, fullPath, isDirectory: isDirectory || false })
        }).then(payload => new Promise(
            (resolve, reject) =>
                payload.fileSystem.access(payload.fullPath, payload.fileSystem.constants.W_OK, (fileAccessError) => {
                    if (fileAccessError) {
                        reject(fileAccessError);
                    }
                    resolve(payload);
                })
        )).then(payload => new Promise(
            (resolve, reject) =>
                fileSystem.lstat(payload.fullPath, (statsError, pathStats) => {
                    if (statsError) {
                        reject(statsError);
                    }
                    resolve(pathStats);
                })
        )).then(pathStats => new Promise(
            (resolve, reject) => {
                if (pathStats.isDirectory() !== (isDirectory || false)) {
                    reject(
                        new Error(
                            `Path is ${(pathStats.isDirectory() ? 'Directory' : 'File')}, should be a ${isDirectory ? 'Directory' : 'File'}`
                        )
                    );
                }
                resolve(fullPath);
            }
        ));
};
