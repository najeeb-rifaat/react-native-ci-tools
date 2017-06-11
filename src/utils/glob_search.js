module.exports = (globber, searchPattern, options) => new Promise((resolve, reject) => {
    try {
        globber(
            searchPattern,
            options || {},
            function (fileMatchError, matchFilePaths) {
                if (fileMatchError) {
                    reject(fileMatchError)
                }
                resolve(matchFilePaths);
            }
        );
    } catch (globberExp) {
        reject(globberExp)
    }
});