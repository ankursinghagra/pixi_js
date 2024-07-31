const { series, gulp, src, dest, watch } = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const ts = require('gulp-typescript');

function cleanfiles() {
  return src('dist', {read: false}).pipe(clean({force: true}));
}

function htmlcopy() {
  return src('public/**',{encoding: false}).pipe(dest('dist/'));
}


// process JS files and return the stream.
function jscopy() {
  return src('src/*.ts')
    .pipe(ts())
    .pipe(browserify({insertGlobals : true}))
    .pipe(dest('dist/'));
}

// reloading browsers
function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

function browsersyncServe(){
  // Serve files from the root of this project
    return browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
}

function watchTask(){
  return watch("src/*.ts", { delay: 100 }, series(cleanfiles,htmlcopy,jscopy,browsersyncReload))
}

// use default task to launch Browsersync and watch JS files
exports.default = series(cleanfiles,htmlcopy,jscopy,browsersyncServe,watchTask);
