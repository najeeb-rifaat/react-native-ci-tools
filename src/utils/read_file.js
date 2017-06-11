const constants = require('../constants');

/*
 * Read file off the disk in {CONSTANTS::defaultFileEncoding} format
 */
module.exports = (fileSystem, fullPath) => {
    return new Promise(
        (resolve, reject) => {
            try {
                fileSystem.access(fullPath, fileSystem.constants.R_OK, (accessError) => {
                    if (accessError) {
                        throw accessError;
                    }
                    resolve(fullPath);
                });
            } catch (fileAccessExp) {
                reject(fileAccessExp)
            }
        }).then(fullPath => new Promise(
            (resolve, reject) =>
                fileSystem.lstat(fullPath, (statsError, stats) => {
                    if (statsError) {
                        reject(statsError);
                    }
                    resolve(stats);
                })
        )).then(pathStat => new Promise(
            (resolve, reject) => {
                if (!pathStat.isFile()) {
                    reject(Error(`Found path ${fullPath}, BUT it is not a file! it is a directory`));
                }
                resolve(fullPath);
            }
        )).then(filePath => new Promise(
            (resolve, reject) => {
                try {
                    resolve({
                        path: filePath,
                        content: fileSystem.readFileSync(filePath, constants.defaultFileEncoding)
                    });
                } catch (fileReadError) {
                    reject(fileReadError);
                }
            }
        ));
};
