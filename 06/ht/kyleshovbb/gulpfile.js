'use strict';

var gulp = require('gulp'),
    csso = require('gulp-csso'),
    watch = require('gulp-watch'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    buffer = require('vinyl-buffer'),
    browserify = require("browserify"),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-minify-css'),
    browserSync = require("browser-sync"),
    pngquant = require('imagemin-pngquant'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    source = require("vinyl-source-stream"),
    reload = browserSync.reload;

gulp.task('default', ['build', 'watch']);

gulp.task('html:build', function () {
    gulp.src('assets/*.html')
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
	gulp.src('./assets/styles/*.css')
        .pipe(concat('style.css'))
		.pipe(csso())
		.pipe(gulp.dest('./public/css/'))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
    return browserify({
        entries: ['./assets/javascripts/router.js'],
        debug: true
    })
        .transform(babelify.configure({
            presets : ['es2015']
        }))
        .bundle()
        .pipe(source('min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js/'))
        .pipe(reload({stream: true}));
});

gulp.task('images:build', function() {
    gulp.src('./assets/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/'))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'images:build'
]);

gulp.task('watch', function () {
    gulp.watch('./assets/*.html', ['html:build']);
	gulp.watch('./assets/styles/**/*.css', ['style:build']);
	gulp.watch('./assets/javascripts/**/*.js', ['js:build']);
	gulp.watch('./assets/images/**/*', ['images:build']);
});