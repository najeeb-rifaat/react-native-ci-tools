/*
 * Update manifest file
 */
const updateManifest = (gradelFileObj, bundleId) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: gradelFileObj.path,
            content: gradelFileObj.content.replace(/applicationId\s"[\w|\.]+"/i, `applicationId "${bundleId}"`)
        });
    } catch (updateError) {
        reject(updateError);
    }
});

module.exports = updateManifest;
