var gulp = require('gulp'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    csso = require('gulp-csso');

gulp.task('default', ['build', 'watch']);

gulp.task('html:build', function () {
    gulp.src('./assets/*.html')
        .pipe(gulp.dest('./public/'))
});

gulp.task('style:build', function () {
	gulp.src('./assets/styles/style.css')
		.pipe(csso())
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('js:build', function() {
    gulp.src('./assets/javascripts/*.js')
        .pipe(concat('min.js'))
        .pipe(gulp.dest('./public/js/'))
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