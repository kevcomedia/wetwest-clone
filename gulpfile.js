const browserSync = require('browser-sync');
const gulp = require('gulp');

const {reload} = browserSync;

gulp.task('live-server', function() {
  browserSync({server: {baseDir: 'src'}});

  gulp.watch(['*.html', 'stylesheets/**/*.css'], {cwd: 'src'}, reload);
});

gulp.task('default', ['live-server']);
