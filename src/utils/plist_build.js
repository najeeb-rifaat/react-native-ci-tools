const common = require('./common');

/*
 * Build .plist object
 */
module.exports = (plist, fileObj) => new Promise((resolve, reject) => {
    try {
        common.throwIfNotObject(plist, 'Provided plist parser is not object');
        common.throwIfNotFuction(plist.build, 'Provided plist do not have parse (parse()) function');
        resolve({
            path: fileObj.path,
            content: plist.build(fileObj.content)
        });
    } catch (plistBuildError) {
        reject(plistBuildError);
    }
});
