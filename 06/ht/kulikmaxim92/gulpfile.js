'use strict';

const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const connect = require('gulp-connect');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');

var path = {
    build: { 
        html: 'build/',
        js: 'build/',
        css: 'build/',
        img: 'build/img/',
        root: 'build/',
    },
    src: {
        html: 'src/*.html', 
        js: 'src/js/app.js',
        css: 'src/css/*.css',
        img: 'src/img/*',
        root: 'src/'
    }
}

gulp.task('build', ['html:build', 'css:build', 'js:build', 'img:build']);

gulp.task('html:build', function(){
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('css:build', function(){
    return gulp.src(path.src.css)
        .pipe(gulp.dest(path.build.css));
});

gulp.task('js:build', function(){
    return browserify({
        entries: [path.src.js]
        })
        .transform(babelify.configure({
            presets : ['es2015']
        }))
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js))
});

gulp.task('img:build', function(){
    return gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img));
});

gulp.task('startServer', function(){
    connect.server({
        root : path.build.root,
        livereload: true,
        port : 9001
    });
});