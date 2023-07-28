const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
var gls = require('gulp-live-server');

function compileEjs() {
  return gulp
    .src('./src/pages/*.ejs')
    .pipe(
      ejs({
        msg: 'Hello Gulp!',
      }),
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest('./dist'));
}

function buildStyles() {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function liveServer() {
  var server = gls.static('dist', 8888);
  server.start();
}

exports.default = function () {
  gulp.watch(
    ['./src/**/*.scss', './src/**/*.ejs', './src/**/*.js'],
    gulp.series(buildStyles, compileEjs, liveServer),
  );
};
