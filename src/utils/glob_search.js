const globSearch = (globber, searchPattern, options) => new Promise((resolve, reject) => {
    try {
        options = options || {};
        globber(
            searchPattern,
            options,
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


module.exports = globSearch;