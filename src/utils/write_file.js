const constants = require('../constants');


/*
 * Write file off to disk in {CONSTANTS::defaultFileEncoding} format
 */
module.exports = (fileSystem, filePath, fileData) =>
    new Promise(
        (resolve, reject) =>
            fileSystem.writeFile(filePath, fileData, { encoding: constants.defaultFileEncoding }, (writeFileError) => {
                if (writeFileError) {
                    reject(writeFileError);
                }
                resolve(filePath);
            })
    );