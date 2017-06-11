const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const plistBuild = require('./plist_build');

describe('PList Build', () => {
    /*
     * Test Structures
     */
    describe('1- Structure', () =>
        it('Exports a function with 2 arguments', () => {
            assert.isFunction(plistBuild);
            assert.equal(plistBuild.length, 2, 'plistParse did not expose 3 arguments')
        })
    );

    /*
     * Test Validation
     */
    describe('2- Validations', () => {
        it('Throws if plist is null or empty', () =>
            plistBuild(null, {})
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, 'Provided plist parser is not object');
                })
        );

        it('Throws if plist.build() is null or empty', () =>
            plistBuild({ plistBuildWongName: () => null }, {})
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, 'Provided plist do not have parse (parse()) function');
                })
        );

        it('Throws build error occures', () => {
            var expectedError = 'parsing error has happend!';
            return plistBuild({ build: () => { throw new Error(expectedError); } }, {})
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
        it('Call build and generate content', () => {
            var dummyPath = '/var/lib/cSharp';
            var dummyContent = 'this is dummy content';
            return plistBuild({ build: (contnetToParse) => `build_${contnetToParse}` }, { path: dummyPath, content: dummyContent })
                .then(result => assert.equal(result.content, `build_${dummyContent}`, 'Content not as expected after built'))
        });

        it('Generate payload shape', () => {
            var dummyPath = '/var/lib/cSharp';
            var dummyContent = 'this is dummy content';
            return plistBuild({ build: (contnetToParse) => `build_${contnetToParse}` }, { path: dummyPath, content: dummyContent })
                .then(result => {
                    assert.equal(result.content, `build_${dummyContent}`, 'Content not as expected after parsed');
                    assert.equal(result.path, dummyPath, 'Diffrent path not same path that was fed in')
                });
        });
    });
});