var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');

gulp.task('default',['copyStaticFiles', 'build', 'startServer', 'runTests', 'watch']);

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
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
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
    .pipe(gulp.dest('./dist/tests'))
    .pipe(connect.reload());
});

gulp.task('runTests', ['copyTestFiles', 'buildTests']);

gulp.task('watch', function () {
  gulp.watch(['./app/tests/tests.*'], ['runTests']);
  gulp.watch(['./app/js/*'], ['build', 'runTests']);
  gulp.watch(['./app/*.html'], ['copyStaticFiles']);
  gulp.watch(['./app/img/*'], ['copyStaticFiles']);
  gulp.watch(['./app/css/*.css'], ['copyStaticFiles']);
});

gulp.task('startServer', function() {
    connect.server({
        root : './dist',
        livereload : true,
        port : 3001
    });
});

