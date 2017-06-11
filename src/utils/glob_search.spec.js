const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const globSearch = require('./glob_search');

/*
 * 
 */
describe('Glob Search', () => {
    /*
     * Test Structures
     */
    describe('1- Structure', () =>
        it('Exports a function with 3 arguments', () => {
            assert.isFunction(globSearch);
            assert.equal(globSearch.length, 3, 'globSearch did not expose 3 arguments')
        })
    );

    /*
     * Test Validation
     */
    describe('2- Validation', () => {
        it('Throws if provided globber is not a function', () =>
            globSearch({ name: 'object' }, 'Search_pattern_here')
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, 'Provided globber is not a function')
                })
        );

        it('Throws if provided search patten is empty', () =>
            globSearch(() => null, '')
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, 'Empty or NULL search patten was provided')
                })
        )
    });


    /*
     * Test Logic
     */
    describe('3- Logic', () => {
        it('Ployfill options if provided was empty', () => {
            var usedOptions = null;
            var mockedGlobber = (patten, options, callBack) => {
                usedOptions = options;
                return callBack(null, ['path/1', 'path/2']);
            }
            return globSearch(mockedGlobber, 'Search_pattern_here')
                .then(result => {
                    assert.isNotNull(usedOptions);
                });
        });

        it('Throw globber as rejection if any has occured', () => {
            var dummyError = 'globber was unabler to glob ;)';
            var mockedGlobber = (patten, options, callBack) => {
                return callBack(new Error(dummyError));
            }
            return globSearch(mockedGlobber, 'Search_pattern_here')
                .catch(error => {
                    assert.equal(error.message, dummyError);
                });
        });

        it('Throw globber exception if any has occured', () => {
            var dummyError = 'globber was unabler to glob ;)';
            var mockedGlobber = (patten, options, callBack) => {
                throw new Error(dummyError);
            }
            return globSearch(mockedGlobber, 'Search_pattern_here')
                .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
                .catch(error => {
                    assert.equal(error.message, dummyError);
                });
        });

        it('Call globber with patten, options and callback', () => {
            var dummyOptions = { option1: true, option2: false };
            var dummyPatten = '/**/*.*';

            var usedOptions = null;
            var usedPattern = null;
            var expectedResult = ['path/1', 'path/2'];
            var mockedGlobber = (patten, options, callBack) => {
                usedOptions = options;
                usedPattern = patten;
                return callBack(null, expectedResult);
            }
            return globSearch(mockedGlobber, dummyPatten, dummyOptions)
                .then(result => {
                    assert.equal(result, expectedResult);
                    assert.equal(dummyOptions, usedOptions);
                    assert.equal(dummyPatten, usedPattern);
                });
        });
    });
})
