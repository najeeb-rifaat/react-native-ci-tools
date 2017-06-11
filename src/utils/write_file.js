/*
 * Write file off to disk in {CONSTANTS::defaultFileEncoding} format
 */
module.exports = (fileSystem, filePath, fileData) => new Promise((resolve, reject) =>
    fileSystem.writeFile(filePath, fileData, (writeFileError) => {
        if (writeFileError) {
            throw writeFileError;
        }
        return filePath;
    })
);
