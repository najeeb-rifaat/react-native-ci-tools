const notEmpty = (toCheck) =>
    (toCheck !== undefined && toCheck !== null && toCheck !== '')

/*
 * Common shared functions
 */
module.exports = {
    notEmpty,
    isObject: (objectToTest) =>
        (notEmpty(objectToTest) && typeof objectToTest === 'object'),
    isFunction: (functionToTest) =>
        (notEmpty(functionToTest) && typeof functionToTest === 'function'),
};