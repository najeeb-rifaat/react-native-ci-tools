/*
 * Parse .plist files
 */
const xmlBuild = (xml, xmlFileObject) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: xmlFileObject.path,
            content: xml.buildObject(xmlFileObject.content)
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});

module.exports = xmlBuild;
