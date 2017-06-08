/*
 * Parse .plist files
 */
const plistParse = (plist, fileObj) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: fileObj.path,
            content: plist.parse(fileObj.content)
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});

module.exports = plistParse;

