var fs = require('fs');
var xml2js = require('xml2js');
var util = require('util');

var parser = new xml2js.Parser();
var xmlBuilder = new xml2js.Builder();

/*
 * Validate paths and build matching pattern
 */
const getStringsResourceFile = (basePath, androidProjectDirectory) => new Promise((resolve, reject) => {
    if (fs.existsSync(basePath)) {
        if (fs.existsSync(`${basePath}/${androidProjectDirectory}`)) {
            if (fs.existsSync(`${basePath}/${androidProjectDirectory}/app/src/main/res/values/strings.xml`)) {
                resolve(`${basePath}/${androidProjectDirectory}/app/src/main/res/values/strings.xml`)
            }
            reject(new Error('Strings resource files DO NOT exist'));
        }
        reject(new Error('IOS project path DO NOT exist'));
    }
    reject(new Error('Project base path DO NOT exist'));
});


/*
 * Validate paths and build matching pattern
 */
const updateStringsResourceFile = (stringsResourceFilePath, displayName) => new Promise((resolve, reject) => {
    try {
        fs.readFile(stringsResourceFilePath, 'utf8', function (err, stringsResourceFileContent) {
            parser.parseString(stringsResourceFileContent, function (err, parsedData) {

                // Update display name
                var appNameNode = parsedData.resources.string.find(thisStringRecource => thisStringRecource.$.name === 'app_name');
                appNameNode._ = displayName;

                resolve({
                    path: stringsResourceFilePath,
                    originalContent: stringsResourceFileContent,
                    updatedContent: xmlBuilder.buildObject(parsedData)
                });
            });
        });
    } catch (updateError) {
        reject(updateError);
    }
});

/*
 * Validate paths and build matching pattern
 */
const getManifestFile = (basePath, androidProjectDirectory) => new Promise((resolve, reject) => {
    if (fs.existsSync(basePath)) {
        if (fs.existsSync(`${basePath}/${androidProjectDirectory}`)) {
            if (fs.existsSync(`${basePath}/${androidProjectDirectory}/app/src/main/AndroidManifest.xml`)) {
                resolve(`${basePath}/${androidProjectDirectory}/app/src/main/AndroidManifest.xml`)
            }
            reject(new Error('Manifest files DO NOT exist'));
        }
        reject(new Error('IOS project path DO NOT exist'));
    }
    reject(new Error('Project base path DO NOT exist'));
});


/*
 * Validate paths and build matching pattern
 */
const updateManifestFile = (manifestFilePath, packageName) => new Promise((resolve, reject) => {
    try {
        fs.readFile(manifestFilePath, function (err, manifestFileContent) {
            parser.parseString(manifestFileContent, function (err, parsedData) {

                // Update package name
                parsedData.manifest.$.package = packageName;

                resolve({
                    path: manifestFilePath,
                    originalContent: manifestFileContent,
                    updatedContent: xmlBuilder.buildObject(parsedData)
                });
            });
        });
    } catch (updateError) {
        reject(updateError);
    }
});


/*
 * Validate paths and build matching pattern
 */
const getGradelFile = (basePath, androidProjectDirectory) => new Promise((resolve, reject) => {
    if (fs.existsSync(basePath)) {
        if (fs.existsSync(`${basePath}/${androidProjectDirectory}`)) {
            if (fs.existsSync(`${basePath}/${androidProjectDirectory}/app/build.gradle`)) {
                resolve(`${basePath}/${androidProjectDirectory}/app/build.gradle`)
            }
            reject(new Error('Gradle resource file DO NOT exist'));
        }
        reject(new Error('IOS project path DO NOT exist'));
    }
    reject(new Error('Project base path DO NOT exist'));
});


/*
 * Validate paths and build matching pattern
 */
const updateGradleFile = (gradleFilePath, newPackageName) => new Promise((resolve, reject) => {
    fs.readFile(gradleFilePath, 'utf8', function (err, gradleFileContent) {
        resolve({
            path: gradleFilePath,
            originalContent: gradleFileContent,
            updatedContent: gradleFileContent.replace(/applicationId\s"[\w|\.]+"/i, `applicationId "${newPackageName}"`)
        });
    });
});


/*
 * Validate paths and build matching pattern
 */
const getMainAppFile = (basePath, androidProjectDirectory) => new Promise((resolve, reject) => {
    if (fs.existsSync(basePath)) {
        if (fs.existsSync(`${basePath}/${androidProjectDirectory}`)) {
            if (fs.existsSync(`${basePath}/${androidProjectDirectory}/app/src/main/java/com/jenius2/MainApplication.java`)) {
                resolve(`${basePath}/${androidProjectDirectory}/app/src/main/java/com/jenius2/MainApplication.java`)
            }
            reject(new Error('Main Application resource file DO NOT exist'));
        }
        reject(new Error('IOS project path DO NOT exist'));
    }
    reject(new Error('Project base path DO NOT exist'));
});


/*
 * Validate paths and build matching pattern
 */
const updateMainAppFile = (mainAppFilePath, newPackageName) => new Promise((resolve, reject) => {
    fs.readFile(mainAppFilePath, 'utf8', function (err, mainAppFileContent) {
        resolve({
            path: mainAppFilePath,
            originalContent: mainAppFileContent,
            updatedContent: mainAppFileContent.replace(/package\s[\w|\.]+;/i, `package ${newPackageName};`)
        });
    });
});



/*
 * Validate paths and build matching pattern
 */
const getMainActivityFile = (basePath, androidProjectDirectory) => new Promise((resolve, reject) => {
    if (fs.existsSync(basePath)) {
        if (fs.existsSync(`${basePath}/${androidProjectDirectory}`)) {
            if (fs.existsSync(`${basePath}/${androidProjectDirectory}/app/src/main/java/com/jenius2/MainActivity.java`)) {
                resolve(`${basePath}/${androidProjectDirectory}/app/src/main/java/com/jenius2/MainActivity.java`)
            }
            reject(new Error('Main Activity file DO NOT exist'));
        }
        reject(new Error('IOS project path DO NOT exist'));
    }
    reject(new Error('Project base path DO NOT exist'));
});


/*
 * Validate paths and build matching pattern
 */
const updateMainActivityFile = (mainActivityFilePath, newPackageName) => new Promise((resolve, reject) => {
    fs.readFile(mainActivityFilePath, 'utf8', function (err, mainActivityFileContent) {
        resolve({
            path: mainActivityFilePath,
            originalContent: mainActivityFileContent,
            updatedContent: mainActivityFileContent.replace(/package\s[\w|\.]+;/i, `package ${newPackageName};`)
        });
    });
});



/*
 * main export
 */
module.exports = updateAndroidProject = (basePath, androidProjectDirectory, newDisplayName, newPackageName) => {
    return Promise.all([
        getStringsResourceFile(basePath, androidProjectDirectory)
            .then(stringsFilePath => updateStringsResourceFile(stringsFilePath, newDisplayName)),
        getManifestFile(basePath, androidProjectDirectory)
            .then(manifestFilePath => updateManifestFile(manifestFilePath, newPackageName)),
        getGradelFile(basePath, androidProjectDirectory)
            .then(gradleFilePath => updateGradleFile(gradleFilePath, newPackageName)),
        getMainAppFile(basePath, androidProjectDirectory)
            .then(mainAppFilePath => updateMainAppFile(mainAppFilePath, newPackageName)),
        getMainActivityFile(basePath, androidProjectDirectory)
            .then(mainActivityFilePath => updateMainActivityFile(mainActivityFilePath, newPackageName))
    ])
}