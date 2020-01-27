'use strict'

const gulp = require('gulp')
const configPaths = require('../../config/paths.json')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const taskArguments = require('./task-arguments')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const eol = require('gulp-eol')
const rename = require('gulp-rename')
const cssnano = require('cssnano')
const webpack = require('webpack-stream')
const named = require('vinyl-named-with-path')
const postcsspseudoclasses = require('postcss-pseudo-classes')({
  // Work around a bug in pseudo classes plugin that badly transforms
  // :not(:whatever) pseudo selectors
  blacklist: [':not(', ':disabled)', ':last-child)', ':focus)', ':active)', ':hover)']
})

// Compile CSS and JS task --------------
// --------------------------------------

// check if destination flag is dist
const isDist = taskArguments.destination === 'dist' || false

// Set the destination
const destinationPath = function () {
  // Public & Dist directories do no need namespaced with `lbh`
  if (taskArguments.destination === 'dist' || taskArguments.destination === 'public') {
    return taskArguments.destination
  } else {
    return `${taskArguments.destination}/lbh/`
  }
}

const errorHandler = function (error) {
  // Log the error to the console
  console.error(error.message)

  // Ensure the task we're running exits with an error code
  this.once('finish', () => process.exit(1))
  this.emit('end')
}
// different entry points for both streams below and depending on destination flag
const compileStyleshet = isDist ? configPaths.src + 'all.scss' : configPaths.app + 'assets/scss/app.scss'

gulp.task('scss:compile', () => {
  const compile = gulp.src(compileStyleshet)
    .pipe(plumber(errorHandler))
    .pipe(sass())
    // minify css add vendor prefixes and normalize to compiled css
    .pipe(gulpif(isDist, postcss([
      autoprefixer,
      cssnano
    ])))
    .pipe(gulpif(!isDist, postcss([
      autoprefixer,
      // Auto-generate 'companion' classes for pseudo-selector states - e.g. a
      // :hover class you can use to simulate the hover state in the review app
      postcsspseudoclasses
    ])))
    .pipe(gulpif(isDist,
      rename({
        basename: 'boilerplate',
        extname: '.min.css'
      })
    ))
    .pipe(gulp.dest(taskArguments.destination + '/'))

  return compile
})

// Compile js task for preview ----------
// --------------------------------------
gulp.task('js:compile', () => {
  // for dist/ folder we only want compiled 'all.js' file
  // const srcFiles = isDist ? configPaths.src + 'all.js' : configPaths.src + '**/*.js'
  const srcFiles = configPaths.app + 'assets/js/main.js'
  return gulp.src([
    srcFiles,
    '!' + configPaths.src + '**/*.test.js'
  ])
    .pipe(named())
    .pipe(webpack({
      mode: isDist ? 'production' : 'development',
      output: {
        library: 'Boilerplate',
        libraryTarget: 'umd'
      }
    }))
    .pipe(gulpif(isDist, uglify({
      ie8: true
    })))
    .pipe(gulpif(isDist,
      rename({
        basename: 'boilerplate',
        extname: '.min.js'
      })
    ))
    .pipe(eol())
    .pipe(gulp.dest(destinationPath))
})
