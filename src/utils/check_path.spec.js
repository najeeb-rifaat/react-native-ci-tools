const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const checkPath = require('./check_path');

const getMockedFileSystem = () => { return { access: () => null, lstat: () => null, constants: require('fs').constants }; }

describe('Check Path', () => {
  
  /*
   * Test Structures
   */
  describe('1- Structure', () =>
    it('Exports a function with 3 arguments', function () {
      assert.isFunction(checkPath);
      assert.equal(checkPath.length, 3, 'checkPath did not expose 3 as arguments')
    })
  );

  /*
   * Test Validation
   */
  describe('2- Validations', () => {
    it('Throws if provided NULL as a file system ', () =>
      checkPath(null, undefined, false)
        .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
        .catch(error =>
          assert.equal(error.message, 'Provided fileSystem argument was empty or not and object!')
        ));

    it('Throws if provided file system has no access function', () =>
      checkPath({ someOtherFunction: () => { } }, undefined, false)
        .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
        .catch(error =>
          assert.equal(error.message, 'Provided filesSystems has no files access (access) function')
        )
    );

    it('Throws if provided path is empty', () =>
      checkPath(getMockedFileSystem(), '', false)
        .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
        .catch(error =>
          assert.equal(error.message, 'Empty or NULL file poath was provided')
        )
    );
  });

  /*
   * Test Logic
   */
  describe('3- Logic', function () {
    it('Uses access() and lstat() to check write permission on file and isDirectory to check if is file or folder', function () {
      var fileSystem = getMockedFileSystem();
      var usedPermission = null;
      var usedFilePath = null;
      var usedLstatPath = null;
      var dummyPath = '/path/to/the/unknown';
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

      return checkPath(fileSystem, dummyPath)
        .then(result => {
          assert.equal(result, dummyPath, 'Path returned as result do not match expected dummy file');
          assert.equal(usedLstatPath, dummyPath, 'Path used for Lstat did not match provided dummy path')
          assert.equal(usedFilePath, dummyPath, 'Path used for access function is not the same path as provided dummy path');
          assert.equal(usedPermission, fileSystem.constants.W_OK, 'path was checked but not with given criteria (fs.constants.W_OK)');
        });
    });

    it('Throws access exception if requiered permissions are not met', () => {
      var expectedError = 'This is a mocked error to mock an access permission error';
      var fileSystem = getMockedFileSystem();
      var dummyPath = '/path/to/glory';
      fileSystem.access = (filePath, permissionFlag, callBack) => {
        usedFilePath = filePath
        usedPermission = permissionFlag;
        return callBack(new Error(expectedError));
      };

      return checkPath(fileSystem, dummyPath)
        .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
        .catch(error =>
          assert.equal(error.message, expectedError)
        )
    });


    it('Check if provided path is file or directory', () => {
      var isDirectory = false;
      var fileSystem = getMockedFileSystem();
      var accessWasCalled = false;
      var statsWasCalled = false;
      var usedLstatPath = null;
      var dummyPath = '/path/to/glory';
      fileSystem.access = (filePath, permissionFlag, callBack) => {
        accessWasCalled = true;
        usedFilePath = filePath
        usedPermission = permissionFlag;
        return callBack(null);
      };

      fileSystem.lstat = (filePath, callBack) => {
        statsWasCalled = true;
        usedLstatPath = filePath
        return callBack(null, { isDirectory: () => !isDirectory });
      };

      return checkPath(fileSystem, dummyPath /* isDiretory is ommited */)
        .then(result => assert.fail(0, 1, 'Expcected and exception, but got a result!'))
        .catch(error => {
          assert.equal(accessWasCalled, true);
          assert.equal(statsWasCalled, true);
          assert.equal(error.message, 'Path is Directory, should be a File');
        })
    });

    it('Full run sucess', () => {
      var isDirectory = true;
      var fileSystem = getMockedFileSystem();
      var accessWasCalled = false;
      var statsWasCalled = false;
      var usedLstatPath = null;
      var dummyPath = '/path/to/glory';

      fileSystem.access = (filePath, permissionFlag, callBack) => {
        accessWasCalled = true;
        usedFilePath = filePath
        usedPermission = permissionFlag;
        return callBack(null);
      };

      fileSystem.lstat = (filePath, callBack) => {
        statsWasCalled = true;
        usedLstatPath = filePath
        return callBack(null, { isDirectory: () => isDirectory }); // negate what was provided for assertion
      };

      return checkPath(fileSystem, dummyPath, isDirectory)
        .then(result => {
          assert.equal(accessWasCalled, true);
          assert.equal(statsWasCalled, true);
          assert.equal(usedLstatPath, result, 'Path used for Lstat did not match provided dummy path')
          assert.equal(usedFilePath, result, 'Path used for access function is not the same path as provided dummy path');
        })
    });
  });
});
