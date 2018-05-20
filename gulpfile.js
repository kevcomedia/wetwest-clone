const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const cache = require('gulp-cache');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const {reload} = browserSync;

gulp.task('html', function() {
  return gulp
    .src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'));
});

gulp.task('css', function() {
  const plugins = [
    autoprefixer({browsers: ['last 2 versions'], cascade: false}),
    cssnano(),
  ];
  return gulp
    .src('src/stylesheets/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/stylesheets'));
});

gulp.task('js', function() {
  return gulp
    .src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('docs/scripts'));
});

gulp.task('images', function() {
  return gulp
    .src('src/images/**/*.+(png|jpg)')
    .pipe(cache(imagemin({interlaced: true})))
    .pipe(gulp.dest('docs/images'));
});

gulp.task('clean:docs', function() {
  return del.sync('docs');
});

gulp.task('clean:cache', function(callback) {
  return cache.clearAll(callback);
});

gulp.task('live-server', function() {
  browserSync({server: {baseDir: 'src'}});

  gulp.watch(['*.html', 'stylesheets/**/*.css'], {cwd: 'src'}, reload);
});

gulp.task('build', ['clean:docs', 'html', 'css', 'js', 'images']);
gulp.task('default', ['live-server']);
