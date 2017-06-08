/*
 * Update Main App file
 */
const updateMainApp = (mainAppFileObj, bundleId) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: mainAppFileObj.path,
            content: mainAppFileObj.content.replace(/package\s[\w|\.]+;/i, `package ${bundleId};`)
        });
    } catch (updateError) {
        reject(updateError);
    }
});

module.exports = updateMainApp;
