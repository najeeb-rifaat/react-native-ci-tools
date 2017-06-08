var fileSystem = require('fs');
var globber = require("glob")
var plistParser = require('plist');
var program = require('commander');
var xml2js = require('xml2js');

var utils = require('../utils');

var ios = require('./ios');
var android = require('./android');
var updaters = require('./updaters');

const processBundle = (payload) => {
    var xml = {
        parser: new xml2js.Parser(),
        builder: new xml2js.Builder()
    };

    var strategy = {
        fileSystem,
        globber,
        plistParser,
        xml,
        updaters,
        utils
    }

    return Promise.all(
        [
            new Promise((resolve, reject) => {
                if (program.ios) {
                    utils.log.info('####### Processing IOS')
                    resolve(
                        ios.processUpdates(payload, strategy)
                            .then(updatedObjList => Promise.all(
                                updatedObjList.map(thisUpdatedFile => {
                                    utils.log.sucess(`++ Writing file ${thisUpdatedFile.path}`)
                                    return strategy.utils.writeFile(strategy.fileSystem, thisUpdatedFile.path, thisUpdatedFile.content)
                                })
                            )).catch(error => console.log(error))
                    );
                }
            }),
            new Promise((resolve, reject) => {
                if (program.android) {
                    utils.log.info('####### Processing ANDROID')
                    resolve(
                        android.processUpdates(payload, strategy)
                            .then(updatedObjList => Promise.all(
                                updatedObjList.map(thisUpdatedFile => {
                                    utils.log.sucess(`++ Writing file ${thisUpdatedFile.path}`)
                                    return strategy.utils.writeFile(strategy.fileSystem, thisUpdatedFile.path, thisUpdatedFile.content)
                                })
                            )).catch(error => console.log(error))
                    );
                }
            })
        ]
    )
}

module.exports = { processBundle };