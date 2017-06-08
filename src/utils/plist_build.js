/*
 * Parse .plist files
 */
const plistBuild = (plist, fileObj) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: fileObj.path,
            content: plist.build(fileObj.content)
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});

module.exports = plistBuild;

