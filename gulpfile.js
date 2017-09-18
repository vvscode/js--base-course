'use strict';

const gulp = require('gulp');
const livereload = require('gulp-livereload');
const http = require('http');
const st = require('st');

const FILES_TO_WATCH_FOR = ['./**/*.*', '!node_modules/**/*.*'];

gulp.task('watch', ['server'], function() {
	gulp.watch(FILES_TO_WATCH_FOR, (e) => {
		console.log(e);
		gulp.src(e.path || FILES_TO_WATCH_FOR)
			.pipe(livereload());
	});
});

gulp.task('server', function(done) {
	http.createServer(
		st({
			path: __dirname + '/',
			index: true,
			cache: false,
		})
	).listen(8080, done);
	livereload.listen();
});
