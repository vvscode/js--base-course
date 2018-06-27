var gulp = require('gulp');
var browserSync = require('browser-sync'); 
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('browser-sync', function() {
  browserSync({ 
        server: {
          baseDir: 'app'
        },
      notify: false 
  });
});

gulp.task('js', function() {
  gulp.src('app/**/*.js')
      .pipe(babel({
          presets: ['env']
      }))
      .pipe(concat('index.js'))
      .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['js', 'browser-sync'], function() {
  console.log(new Date());
  gulp.watch('app/js/*.js', browserSync.reload); 
  gulp.watch('app/*.js', browserSync.reload); 
  gulp.watch('app/index.html', browserSync.reload);
});
