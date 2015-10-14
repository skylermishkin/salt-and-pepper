/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')


// project root directory
var rootDir = path.join(__dirname, '..')
// source directory
var sourceDir = path.join(rootDir, 'src')
// build directory
var buildDir = path.join(rootDir, 'build')
// configuration directory
var configDir = path.join(rootDir, 'config')
// tests directory
var testsDir = path.join(rootDir, 'tests')


// export the project paths|globs object
module.exports = {
    // directories
    rootDir: rootDir,
    sourceDir: sourceDir,
    buildDir: buildDir,
    configDir: configDir,
    testsDir: testsDir,
    // entry points
    entry: path.join(sourceDir, 'index.js'),
    // globs
    testsGlob: path.join(testsDir, 'test_*.js'),
    // configuration files
    eslintConfig: path.join(configDir, 'eslint.json'),
    karmaConfig: path.join(configDir, 'karma.js'),
    webpackConfig: path.join(configDir, 'webpack.js'),
}


// end of file
