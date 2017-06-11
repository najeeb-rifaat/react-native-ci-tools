const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const plistParse = require('./plist_parse');

describe('PList Parse', () => {
    /*
     * Test Structures
     */
    describe('1- Structure', () =>
        it('Exports a function with 2 arguments', () => {
            assert.isFunction(plistParse);
            assert.equal(plistParse.length, 2, 'plistParse did not expose 3 arguments')
        })
    );

    /*
     * Test Validation
     */
    describe('2- Validations', () => {
        it('Throws if plist is null or empty', () =>
            plistParse(null, {})
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, 'Provided plist parser is not object');
                })
        );

        it('Throws if plist.parse() is null or empty', () =>
            plistParse({ plistWongName: () => null }, {})
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, 'Provided plist do not have parse (parse()) function');
                })
        );

        it('Throws parse error occures', () => {
            var expectedError = 'parsing error has happend!';
            return plistParse({ parse: () => { throw new Error(expectedError); } }, {})
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, expectedError);
                })
        });
    });

    /*
     * Test Logic
     */
    describe('2- Logic', () => {
        it('Call parse and generate content', () => {
            var dummyPath = '/var/lib/cSharp';
            var dummyContent = 'this is dummy content';
            return plistParse({ parse: (contnetToParse) => `parsed_${contnetToParse}` }, { path: dummyPath, content: dummyContent })
                .then(result => assert.equal(result.content, `parsed_${dummyContent}`, 'Content not as expected after parsed'))
        });

        it('Generate payload shape', () => {
            var dummyPath = '/var/lib/cSharp';
            var dummyContent = 'this is dummy content';
            return plistParse({ parse: (contnetToParse) => `parsed_${contnetToParse}` }, { path: dummyPath, content: dummyContent })
                .then(result => {
                    assert.equal(result.content, `parsed_${dummyContent}`, 'Content not as expected after parsed');
                    assert.equal(result.path, dummyPath, 'Diffrent path not same path that was fed in')
                });
        });
    });
});