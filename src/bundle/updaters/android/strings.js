const appNameNodeName = 'app_name';

/*
 * Update strings file
 */
const updateStrings = (stringsResourceFileObj, displayName) => new Promise((resolve, reject) => {
    try {
        // Update display name
        var appNameNode = stringsResourceFileObj.content.resources.string.find(thisStringRecource => thisStringRecource.$.name === appNameNodeName);
        appNameNode._ = displayName;

        resolve({
            path: stringsResourceFileObj.path,
            content: stringsResourceFileObj.content
        });
    } catch (updateError) {
        reject(updateError);
    }
});

module.exports = updateStrings;
