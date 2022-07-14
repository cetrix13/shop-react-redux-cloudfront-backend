module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // Make Jest aware of resolve.modules
  moduleDirectories: ['src', 'node_modules'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js', 'json'],

  modulePaths: [
    "<rootDir>",
  ],

  verbose: true,
};
