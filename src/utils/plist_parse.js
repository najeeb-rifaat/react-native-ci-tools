const common = require('./common');

/*
 * Parse .plist files into DOM
 */
module.exports = (plist, fileObj) => new Promise((resolve, reject) => {
    try {
        common.throwIfNotObject(plist, 'Provided plist parser is not object');
        common.throwIfNotFuction(plist.parse, 'Provided plist do not have parse (parse()) function');
        resolve({
            path: fileObj.path,
            content: plist.parse(fileObj.content)
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});
