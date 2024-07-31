var gulp = require('gulp');

function defaultTask(cb) {
  // place code for your default task here

  //copy public files to dist
  gulp.src('public/*.*').pipe(gulp.dest('dist/'));
  //copy src files to dist
  gulp.src('src/*.js').pipe(gulp.dest('dist/'));

  cb();
}

exports.default = defaultTask