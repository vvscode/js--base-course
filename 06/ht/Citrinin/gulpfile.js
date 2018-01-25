'use strict';

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const browserSync = require('browser-sync').create();
const del = require('del');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const watchify = require('watchify');
const plumber = require('gulp-plumber');
const assign = require('lodash.assign');

gulp.task('clean', function() {
    return del('public');
});

gulp.task('cssmin', function() {
    return gulp.src('src/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'));
});

gulp.task('assets', function() {
    return gulp.src('src/assets/**', { since: gulp.lastRun('assets') })
        .pipe(gulp.dest('public'));
})

var customOpts = {
    entries: ['./src/js/main.js'],
    debug: true,
    transform: [
        ['babelify', { presets: ["es2015"] }]
    ]
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('bundle', function() {
    return b.bundle()
        .on('error', function(err) {
            console.log(err.message);
            browserSync.notify(err.message, 3000);
            this.emit('end');
        })
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('cssmin', 'assets', 'bundle')
));

gulp.task('watch', function() {
    gulp.watch('src/assets/**/*.*', gulp.series('assets'));
    gulp.watch('src/js/**/*.*', gulp.series('bundle'));
    gulp.watch('src/css/**/*.*', gulp.series('cssmin'));
});

gulp.task('serv', function() {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serv')));