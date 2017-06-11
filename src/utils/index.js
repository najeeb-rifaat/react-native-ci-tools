const checkPath = require('./check_path');
const readFile = require('./read_file');
const writeFile = require('./write_file');
const globSearch = require('./glob_search')
const plistParse = require('./plist_parse');
const plistBuild = require('./plist_build');
const xmlParse = require('./xml_parse');
const xmlBuild = require('./xml_build');
const log = require('./log');

module.exports = {
    checkPath,
    globSearch,
    readFile,
    writeFile,
    plistParse,
    xmlParse,
    plistBuild,
    xmlBuild,
    log: log(console.log)
};