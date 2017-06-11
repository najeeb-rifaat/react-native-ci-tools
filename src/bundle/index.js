const fileSystem = require('fs');
const globber = require("glob")
const plistParser = require('plist');
const program = require('commander');
const xml2js = require('xml2js');

const ios = require('./ios');
const android = require('./android');
const updaters = require('./updaters');
const utils = require('../utils');

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