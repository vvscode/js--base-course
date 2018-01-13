
const gulp = require('gulp'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create();


// сборка html
gulp.task('html', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build'));
});
// сжимаем картинки
gulp.task('compress', function () {
  return gulp.src('app/pictures/*', { since: gulp.lastRun('compress') })
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('build/pictures'));
});
// сборка css
gulp.task('minify-css', function () {
  return gulp.src('app/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('build'));
});
// сборка js
gulp.task('scripts', function () {
  return gulp.src('app/js/*')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});
// очистка
gulp.task('clean', function () {
  return del('build');
});
// сборка всего
gulp.task('build', gulp.series('clean', gulp.parallel('html','minify-css','scripts', 'compress')));

//
gulp.task('watch', function () {
  gulp.watch('app/**/*.html', gulp.series('html'));
  gulp.watch('app/**/*.css', gulp.series('minify-css'));
  gulp.watch('app/js/*.js', gulp.series('scripts'));
  gulp.watch('app/pictures/*', gulp.series('compress'));
});

// статический сервер и автоперезагрузка
gulp.task('serve', function () {
  browserSync.init({
    server: 'build',
  });
  gulp.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

