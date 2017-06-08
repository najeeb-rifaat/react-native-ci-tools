/*
 * Parse .plist files
 */
const xmlParse = (xml, xmlFileObject) => new Promise((resolve, reject) => {
    try {
        xml.parseString(xmlFileObject.content, (parseError, parsedXmlData) => {
            if (parseError) {
                reject(parseError);
            }
            resolve({
                path: xmlFileObject.path,
                content: parsedXmlData
            })
        });
    } catch (parseOrReadError) {
        reject(parseOrReadError);
    }
});

module.exports = xmlParse;
