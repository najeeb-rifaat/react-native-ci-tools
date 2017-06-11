const realFs = require('fs');
const chai = require('chai');

const checkPath = require('./check_path');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should

describe('Check Path', function () {
  describe('1- Validations', function () {
    it('Exports a function', function () {
      assert.isFunction(checkPath);
    });

    it('Throws if provided NULL as a file system ', function () {
      return checkPath(null, undefined, false)
        .catch(error =>
          assert.equal(error.message, 'Provided fileSystem argument was empty or not and object!')
        );
    });

    it('Throws if provided file system has no access function', function () {
      return checkPath({ someOtherFunction: () => { } }, undefined, false)
        .catch(error =>
          assert.equal(error.message, 'Provided filesSystems has no files access (access) function')
        );
    });

    it('Throws if provided path is empty', function () {
      return checkPath({ access: () => null }, '', false)
        .catch(error =>
          assert.equal(error.message, 'Empty or NULL file poath was provided')
        );
    });
  });

  describe('2- Logic', function () {
    it('Uses access() and lstat() to check write permission on file and isDirectory to check if is file or folder', function () {
      var fileSystem = {};
      var usedPermission = null;
      var usedFilePath = null;
      var usedLstatPath = null;
      var dummyFilePath = '/path/to/the/unknown';
      var isDirectory = false;

      fileSystem.access = (filePath, permissionFlag, callBack) => {
        usedFilePath = filePath
        usedPermission = permissionFlag;
        return callBack(null);
      };

      fileSystem.lstat = (filePath, callBack) => {
        usedLstatPath = filePath;
        return callBack(null, { isDirectory: () => isDirectory });
      };

      fileSystem.constants = realFs.constants;
      return checkPath(fileSystem, dummyFilePath)
        .then(result => {
          assert.equal(result, dummyFilePath, 'Path returned as result do not match expected dummy file');
          assert.equal(usedLstatPath, dummyFilePath, 'Path used for Lstat did not match provided dummy path')
          assert.equal(usedFilePath, dummyFilePath, 'Path used for access function is not the same path as provided dummy path');
          assert.equal(usedPermission, realFs.constants.W_OK, 'path was checked but not with given criteria (fs.constants.W_OK)');
        });
    });

    it('Throws access exception if requiered permissions are not met', function () {
      var expectedError = 'This is a mocked error to mock an access permission error';
      var fileSystem = {};

      fileSystem.access = (filePath, permissionFlag, callBack) => {
        usedFilePath = filePath
        usedPermission = permissionFlag;
        return callBack(new Error(expectedError));
      };

      fileSystem.constants = realFs.constants;
      return checkPath(fileSystem, '/path/to/glory')
        .catch(error =>
          assert.equal(error.message, expectedError)
        )
    });


    it('Check if provided path is file or directory', function () {
      var isDirectory = false;
      var fileSystem = {};
      var accessWasCalled = false;
      var statsWasCalled = false;

      fileSystem.access = (filePath, permissionFlag, callBack) => {
        accessWasCalled = true;
        usedFilePath = filePath
        usedPermission = permissionFlag;
        return callBack(null);
      };

      fileSystem.lstat = (filePath, callBack) => {
        statsWasCalled = true;
        return callBack(null, { isDirectory: () => !isDirectory }); // negate what was provided for assertion
      };

      fileSystem.constants = realFs.constants;
      return checkPath(fileSystem, '/path/to/glory')
        .catch(error => {
          assert.equal(accessWasCalled, true);
          assert.equal(statsWasCalled, true);
          assert.equal(error.message, 'Path is Directory, should be a File');
        })
    });
  });
});
