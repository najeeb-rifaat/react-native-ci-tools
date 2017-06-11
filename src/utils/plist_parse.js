/*
 * Parse .plist files into DOM
 */
module.exports = (plist, fileObj) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: fileObj.path,
            content: plist.parse(fileObj.content)
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});
