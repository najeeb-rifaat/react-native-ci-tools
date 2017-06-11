const defaultFileEncoding = 'utf8';

/*
 * Read file off the disk in {CONSTANTS::defaultFileEncoding} format
 */
module.exports = (fileSystem, fullPath) => {
    return new Promise(
        (resolve, reject) => {
            try {
                fileSystem.access(fullPath, fileSystem.constants.W_OK, (accessError) => {
                    if (accessError) {
                        throw accessError;
                    }
                    resolve(fullPath);
                });
            } catch (fileAccessExp) {
                reject(fileAccessExp)
            }
        }).then(fullPath => fileSystem.lstat(fullPath, (statsError, stats) => {
            if (statusError) {
                throw statsError
            }
            return stats;
        })).then(pathStat => new Promise((resolve, reject) => {
            if (!pathStat.isFile()) {
                throw new Error(`Found path ${fullPath}, BUT it is not a file! it is a directory`);
            }
            resolve(fullPath);
        })).then(filePath => new Promise((resolve, reject) => {
            try {
                resolve({
                    path: filePath,
                    content: fileSystem.readFileSync(filePath, defaultFileEncoding)
                });
            } catch (fileReadError) {
                reject(fileReadError);
            }
        }));
};
