const { series, gulp, src, dest, watch } = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const typescript = require('gulp-tsc');

async function cleanfiles(cb) {
  await src('dist/**',{read: false}).pipe(clean());
  cb();
}

async function htmlcopy(cb) {
  await src('public/*.*').pipe(dest('dist/'));
  cb();
}


// process JS files and return the stream.
async function jscopy(cb) {
  await src('src/*.ts')
    .pipe(typescript())
    .pipe(browserify({insertGlobals : true}))
    .pipe(dest('dist/'));
  cb();
}

// reloading browsers
async function reload(cb) {
  browserSync.reload();
  cb();
}

function live(){
  // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    watch("src/*.js", series(cleanfiles,htmlcopy,jscopy,reload));
}

// use default task to launch Browsersync and watch JS files
exports.default = series(cleanfiles,htmlcopy,jscopy,live);
