

const gulp = require('gulp'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  browserSync = require('browser-sync').create();
// аудио
gulp.task('sound', function () {
  return gulp.src('src/**/*.mp3')
    .pipe(gulp.dest('build'));
});

// сборка html
gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('build'));
});
// сжимаем картинки
gulp.task('compress', function () {
  return gulp.src('src/pic/*', { since: gulp.lastRun('compress') })
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest('build/pic'));
});
// сборка css
gulp.task('minify-css', function () {
  return gulp.src('src/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('build'));
});
// сборка js
gulp.task('scripts', function () {
  return gulp.src('src/js/*')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});
// очистка
gulp.task('clean', function () {
  return del('build');
});
// сборка всего
gulp.task('build', gulp.series('clean', gulp.parallel('html','sound','minify-css','scripts', 'compress')));

//
gulp.task('watch', function () {
  gulp.watch('src/**/*.mp3', gulp.series('sound'));
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.css', gulp.series('minify-css'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/pictures/*', gulp.series('compress'));
});

// статический сервер и автоперезагрузка
gulp.task('serve', function () {
  browserSync.init({
    server: 'build',
  });
  gulp.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

