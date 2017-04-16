'use strict';

const gulp = require('gulp');
const livereload = require('gulp-livereload');
const http = require('http');
const st = require('st');
const rollup = require('gulp-rollup');
const babel = require('rollup-plugin-babel');
// -----------
const FILES_TO_WATCH_FOR = ['./src/**/*.js', '!node_modules/**/*.*'];
// -----------
gulp.task('server', function (done) {
  http.createServer(
    st({
      path: __dirname + '/',
      index: true,
      cache: false
    })
  ).listen(8080, done);
  livereload.listen();
});

gulp.task('buildAndReload', () => gulp.src(FILES_TO_WATCH_FOR) // с какими файлами работаем
  .pipe(rollup({
    entry: './src/main.js', // главная точка входа приложения
    plugins: [
      babel({ // настройки babel
        presets: ['es2015-rollup'],
        babelrc: false
      })
    ],
  }))
  .pipe(gulp.dest('./dist')) // папка для выходного файла
  .pipe(livereload()) // отправка сообщения на reload
);

gulp.task('watch', ['server', 'buildAndReload'], () => gulp.watch(FILES_TO_WATCH_FOR, ['buildAndReload']));