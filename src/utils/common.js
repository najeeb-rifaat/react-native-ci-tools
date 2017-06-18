const notEmpty = (toCheck) =>
    (toCheck !== null)
    && (toCheck !== undefined)
    && (
        (toCheck instanceof String || (typeof (toCheck) === 'string'))
            ? (toCheck !== '')
            : true
    );



const isObject = (objectToTest) =>
    (notEmpty(objectToTest) && objectToTest instanceof Object);


const isFunction = (functionToTest) =>
    (notEmpty(functionToTest) && functionToTest instanceof Function);


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