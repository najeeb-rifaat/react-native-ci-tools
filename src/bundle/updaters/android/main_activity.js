/*
 * Update Main App file
 */
const updateMainActivity = (mainActivityFileObj, bundleId) => new Promise((resolve, reject) => {
    try {
        resolve({
            path: mainActivityFileObj.path,
            content: mainActivityFileObj.content.replace(/package\s[\w|\.]+;/i, `package ${bundleId};`)
        });
    } catch (updateError) {
        reject(updateError);
    }
});

module.exports = updateMainActivity;
