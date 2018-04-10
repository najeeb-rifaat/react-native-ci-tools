const common = require('./common');
/*
 * Parse .xml files into DOM
 */
module.exports = (xml, xmlFileObject) => new Promise((resolve, reject) => {
    common.throwIfNotObject(xml, 'Provided XML helper is NULL or empty');
    common.throwIfNotFuction(xml.parseString, 'Provided XML helper do not have parseString() function');
    common.throwIfNotObject(xmlFileObject, 'Provided XML file object is NULL or empty');
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
