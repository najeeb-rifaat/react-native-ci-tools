/*
 * Update manifest file
 */
const updateManifest = (manifestFileObj, bundleId) => new Promise((resolve, reject) => {
    try {
        // Update package name
        manifestFileObj.content.manifest.$.package = bundleId;

        resolve({
            path: manifestFileObj.path,
            content: manifestFileObj.content
        });
    } catch (updateError) {
        reject(updateError);
    }
});

module.exports = updateManifest;
