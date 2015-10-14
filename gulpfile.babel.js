// third party imports
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import env from 'gulp-env'
import karma from 'karma'
// local imports
import {
    buildDir,
    entry,
    webpackConfig as webpackConfigPath,
    karmaConfig as karmaConfigPath,
} from './config/projectPaths'
const webpackConfig = require(webpackConfigPath)


/**
 * Build entry point.
 */
gulp.task('build', ['clean'], () => {
    return gulp.src(entry)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(buildDir))
})


/**
 * Watch entry point.
 */
gulp.task('watch', ['clean'], () => {
    const config = {
        ...webpackConfig,
        watch: true,
    }

    return gulp.src(entry)
        .pipe(named())
        .pipe(webpack(config))
        .pipe(gulp.dest(buildDir))
})


/**
 * Build entry point for production.
 */
gulp.task('build-production', ['clean'], () => {
    // set environment variable
    env({
        vars: {
            NODE_ENV: 'production',
        },
    })
    // build entry
    return gulp.src(entry)
        .pipe(named())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(buildDir))
})


/**
 * Remove all ouptut files from previous builds.
 */
gulp.task('clean', () => {
    del.sync(buildDir)
})


/**
 * Run the test suite once.
 */
gulp.task('test', (cb) => {
    const server = new karma.Server({
        configFile: karmaConfigPath,
        singleRun: true
    }, () => cb())

    server.start()
})


/**
 * Watch source and tests for changes, run tests on change.
 */
gulp.task('tdd', () => {
    const server = new karma.Server({
        configFile: karmaConfigPath,
    })

    server.start()
})


// end of file
