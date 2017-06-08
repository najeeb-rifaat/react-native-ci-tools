const checkPath = (fileSystem, fullPath, isDirectory) => {
    isDirectory = isDirectory || false;
    return new Promise((resolve, reject) => {
        try {
            fileSystem.accessSync(fullPath, fileSystem.constants.W_OK);
        } catch (fileAccessExp) {
            reject(fileAccessExp)
        }
        resolve(fullPath);
    })
    .then(fullPath => fileSystem.lstatSync(fullPath))
    .then(pathStat => new Promise((resolve, reject) => {
        pathStat.isDirectory() == isDirectory
            ? resolve(fullPath)
            : reject(
                new Error(`Path is ${(pathStat.isDirectory() ? 'Directory' : 'File')}, should be a ${isDirectory ? 'Directory' : 'File'}`)
            )
    })
    );
};

module.exports = checkPath;