'use strict';
let gulp = require('gulp'),
  concatCSS = require('gulp-concat-css'),
  concatJS = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  cleanCSS = require('gulp-clean-css'),
  autoPreFix = require('gulp-autoprefixer'),
  useref = require('gulp-useref'),
  uglyfly = require('gulp-uglyfly'),
  assets = require("gulp-assets"),
  connect = require('gulp-connect'),
  livereload = require('gulp-livereload'),
  imgemin = require('gulp-imagemin') ;


//задача подключения локального сервера
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

//html
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(connect.reload())
    .pipe(useref())
    .pipe(gulp.dest('disc/'));
});

//js
gulp.task('js', function (){
  gulp.src('app/js/*.js')
    .pipe(concatJS('myJs.js') )
    .pipe(
      babel({
        presets: ['env']
    })
    )
    .pipe(uglify())
    .pipe(gulp.dest('disc/js'))
});

//css
gulp.task('css', function () {
 return gulp.src('app/css/*.css')
   .pipe(concatCSS('style.css')) //путь к файлам для их конкатенации
   .pipe(autoPreFix('last 2 versions', '> 1%', 'ie 9'))
   .pipe(cleanCSS()) // минифицирует CSS
   .pipe(gulp.dest('disc/css')) //сохранение результата
   .pipe(connect.reload()); //произведены изменения(для сервера)*/
});
//img

gulp.task('img',function () {
    return gulp.src('app/img/*')
        .pipe(imgemin())
        .pipe(gulp.dest('disc/img'))
});

//watch
gulp.task('watch', function () {
  gulp.watch('app/*.html', ['html']); //при изменении файлов запускает задачу transformCSS
  gulp.watch('app/css/*.css', ['css']); //при изменении файлов запускает задачу transformCSS
  gulp.watch('app/js/*.js', ['js']); //при изменении файлов запускает задачу transformCSS
});

gulp.task('default',['connect', 'html', 'css', 'js', 'img', 'watch']);

