'use strict';

let gulp = require('gulp'),
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

gulp.task('default', ['build','webserver','watch']);

gulp.task('html:build', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('./public/'))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
	gulp.src('./src/styles/*.css')
        .pipe(concat('style.css'))
		.pipe(csso())
		.pipe(gulp.dest('./public/css/'))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function() {
    return browserify({
        entries: ['./src/javascripts/components/main.js'],
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
    gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images/'))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'images:build'
]);

gulp.task('watch', function () {
    gulp.watch('./src/*.html', ['html:build']);
	gulp.watch('./src/styles/**/*.css', ['style:build']);
	gulp.watch('./src/javascripts/**/*.js', ['js:build']);
	gulp.watch('./src/images/**/*', ['images:build']);
});

gulp.task('webserver', function () {
    browserSync(config);
});

let config = {
    server: {
        baseDir: "./public"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};