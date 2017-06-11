/*
 * Build .plist object
 */
module.exports = (plist, fileObj) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: fileObj.path,
            content: plist.build(fileObj.content)
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});
