const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const xmlParse = require('./xml_parse');

describe('XML Parse', () => {
    /*
     * Test Structures
     */
    describe('1- Structure', () => {
        it('Exports a function with 2 arguments', () => {
            assert.isFunction(xmlParse);
            assert.equal(
                xmlParse.length
                , 2
                , `xmlParse did not expose 2 arguments, found ${xmlParse.length}`
            )
        })
    });

    describe('2- Validation', () => {
        it('Throws if provided XML is null', () =>
            xmlParse(null, null)
                .catch(error => {
                    assert.equal(
                        error.message
                        , 'Provided XML helper is NULL or empty'
                    );
                })
        );


        it('Throws if provided XML do not have a parseString function', () =>
            xmlParse({ otherObjectFunctions: () => null }, null)
                .catch(error => {
                    assert.equal(
                        error.message
                        , 'Provided XML helper do not have parseString() function'
                    );
                })
        );


        it('Throws if provided xml document content is empty/Null', () =>
            xmlParse({ parseString: () => null }, null)
                .catch(error => {
                    assert.equal(
                        error.message
                        , 'Provided XML file object is NULL or empty'
                    );
                })
        );

    });

    describe('3- Logic', () => {
        it('Use parseString function from the XML parser', () => {
            var parseStringCalled = false;
            var dummyContent = '<xml><this_is_dummy/></xml>';
            var dummyPath = '/happy/life/path';
            var usedContnet = '';
            var mockXmlParser = {
                parseString(xmlContent, callBack) {
                    parseStringCalled = true;
                    usedContnet = xmlContent;
                    callBack(null, { xml: xmlContent });
                }
            };

            return xmlParse(mockXmlParser, { path: '/happy/life/path', content: dummyContent })
                .then(result => {
                    assert.equal(dummyContent, usedContnet, 'Content used to parse is not same as provided content');
                    assert.isTrue(parseStringCalled, 'parseString function was not called');
                    assert.equal(dummyPath, result.path, 'Retruned path is not same as provided path');
                });
        });
    });
});