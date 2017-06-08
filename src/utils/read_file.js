const defaultFileEncoding = 'utf8';

const readFile = (fileSystem, fullPath) => {
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
        if (!pathStat.isFile()) {
            throw new Error(`Found path ${fullPath} is not a file!`);
        }
        resolve(fullPath);
    }))
    .then(filePath => new Promise((resolve, reject) => {
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

module.exports = readFile;