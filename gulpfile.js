var gulp = require('gulp'),
    server = require("gulp-webserver");


gulp.task('server', function() {
  gulp.watch('*.html')
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: 'libs/index.html'
    }));
});