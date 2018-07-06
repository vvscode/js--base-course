var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');

gulp.task('default',['copyStaticFiles', 'build', 'startServer', 'runTests']);

gulp.task('copyStaticFiles', function() {
    return gulp.src(['./app/*.html', './app/css/*', './app/img/*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
    return browserify({
        entries: ['./app/js/index.js']
    })
    .transform(babelify.configure({
        presets : ['es2015']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copyTestFiles', function() {
  gulp.src('./app/tests/*.html')
  .pipe(gulp.dest('./dist/tests'));
});

gulp.task('buildTests', function() {
    return browserify({
        entries: ['./app/tests/tests.js']
    })
    .transform(babelify.configure({
        presets : ['es2015']
    }))
    .bundle()
    .pipe(source('tests.js'))
    .pipe(gulp.dest('./dist/tests'));
});

gulp.task('runTests', ['copyTestFiles', 'buildTests']);

gulp.task('startServer', function() {
    connect.server({
        root : './dist',
        livereload : true,
        port : 9001
    });
});
