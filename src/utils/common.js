const notEmpty = (toCheck) =>
    (toCheck !== undefined && toCheck !== null && toCheck !== '')

const isObject = (objectToTest) =>
    (notEmpty(objectToTest) && typeof objectToTest === 'object');

const isFunction = (functionToTest) =>
    (notEmpty(functionToTest) && typeof functionToTest === 'function');

/*
 * Common shared functions
 */
module.exports = {
    notEmpty,
    isObject,
    isFunction,
    throwIfEmpty: (toCheck, errorText) => { if (!notEmpty(toCheck)) throw new Error(errorText) },
    throwIfNotObject: (objectToTest, errorText) => { if (!isObject(objectToTest)) throw new Error(errorText) },
    throwIfNotFuction: (functionToTest, errorText) => { if (!isFunction(functionToTest)) throw new Error(errorText) }
};