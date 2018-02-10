let src = `weather`, // папка проекта
  css = `weather/style/*.css`, // все файлы стилей
  script = `weather/script/**/*.js`, // все скрипты
  html = `weather/index.html`, // все скрипты
  other = `weather/other/**`; // остальные файлы

// `npm i -D gulp gulp-newer gulp-sourcemaps gulp-error-notifier gulp-concat-css gulp-clean-css gulp-uglify browser-sync babelify browserify vinyl-source-stream gulp-rename vinyl-buffer gulp-debug del`

const gulp = require(`gulp`),
  newer = require(`gulp-newer`),
  sourcemaps = require(`gulp-sourcemaps`),
  notify = require('gulp-error-notifier').notify,
  concat = require(`gulp-concat-css`),
  cleanCSS = require(`gulp-clean-css`),
  // babel = require(`gulp-babel`),
  uglify = require('gulp-uglify'),
  browserSync = require(`browser-sync`).create(),
  babelify = require('babelify'),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  rename = require('gulp-rename'),
  buffer = require('vinyl-buffer'),
  debug = require(`gulp-debug`),
  del = require(`del`);

gulp.task(`html`, () => {
  return gulp.src(html)
    .pipe(gulp.dest(`complete`));
});

gulp.task(`copy`, () => {
  return gulp.src(other, {since: gulp.lastRun(`copy`), base: src})
    .pipe(newer(`complete`))
    .pipe(gulp.dest(`complete`));
});

gulp.task(`style`, () => {
  return gulp.src(css)
    .pipe(sourcemaps.init())
    .pipe(concat(`style.css`))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`complete`));
});

gulp.task(`script`, () => {
  return browserify({
    entries: [`weather/script/local.js`,
      `weather/script/observer.js`,
      `weather/script/request.js`,
      `weather/script/route.js`,
      `weather/script/script.js`
    ]
  })
    .transform(babelify.configure({
      presets: [`es2015`]
    }))
    .bundle()
    .on('error', function (err) {
      console.log(err.stack);
      notify(new Error(err));
      this.emit(`end`);
    })
    .pipe(source(`script.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(`complete`));
});

gulp.task(`clean`, () => del(`complete`));

gulp.task(`render`, gulp.series(`clean`, gulp.parallel(`html`, `copy`, `style`, `script`)));

gulp.task(`watch`, () => {
  gulp.watch(html, gulp.series(`html`));
  gulp.watch(other, gulp.series(`copy`));
  gulp.watch(css, gulp.series(`style`));
  gulp.watch(script, gulp.series(`script`));
});

gulp.task(`serve`, () => {
  browserSync.init({
    server: `complete`
  });
  browserSync.watch(`complete/**/*.*`).on(`change`, browserSync.reload);
});

gulp.task(`run`, gulp.series(`render`, gulp.parallel(`watch`, `serve`)));
