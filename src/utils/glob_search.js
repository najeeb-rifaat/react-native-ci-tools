const common = require('./common');

/*
 * Globber search path tree for file 
 */
module.exports = (globber, searchPattern, options) => new Promise((resolve, reject) => {
    try {
        common.throwIfNotFuction(globber, 'Provided globber is not a function');
        common.throwIfEmpty(searchPattern, 'Empty or NULL search patten was provided');
        try {
            globber(
                searchPattern,
                options || {},
                (fileMatchError, matchFilePaths) => {
                    if (fileMatchError) {
                        reject(fileMatchError);
                    }
                    resolve(matchFilePaths);
                }
            );
        } catch (globberExp) {
            reject(globberExp)
        }
    } catch (validationsError) {
        reject(validationsError);
    }

});