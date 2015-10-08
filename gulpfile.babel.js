//node imports
import path from 'path'
// gulp imports
import gulp from 'gulp'
import del from 'del'
import webpack from 'webpack-stream'
import named from 'vinyl-named'
import env from 'gulp-env'


/**
 * Build entry point.
 */
gulp.task('build', ['clean'], () => {
    return gulp.src(path.join(__dirname, "src", "main.js"))
               .pipe(named())
               .pipe(webpack(require(path.join(__dirname, "webpack.config.js"))))
               .pipe(gulp.dest(path.join(__dirname, "build")))
})


/**
 * Watch entry point.
 */
gulp.task('watch', ['clean'], () => {
    const config = {
        ...require(path.join(__dirname, "webpack.config.js")),
        watch: true,
    }

    return gulp.src(path.join(__dirname, "src", "main.js"))
               .pipe(named())
               .pipe(webpack(config))
               .pipe(gulp.dest(path.join(__dirname, "build")))
})


/**
 * Build entry point for production.
 */
gulp.task('build-production', ['clean'], () => {
    // set the environment variable
    env({
        vars: {
            NODE_ENV: 'production',
        },
    })
    // build the client
    return gulp.src(path.join(__dirname, "src", "main.js"))
               .pipe(named())
               .pipe(webpack(require(path.join(__dirname, "webpack.config.js"))))
               .pipe(gulp.dest(path.join(__dirname, "build")))
})


/**
 * Remove all ouptut files from previous builds.
 */
gulp.task('clean', () => {
    del.sync(path.join(__dirname, "build"))
})