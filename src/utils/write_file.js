const writeFile = (fileSystem, filePath, fileData) => new Promise((resolve, reject) => {
    try {
        fileSystem.writeFileSync(filePath, fileData);
    } catch (writeFileError) {
        reject(writeFileError)
    }
});

module.exports = writeFile;
