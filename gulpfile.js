
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

gulp.task('lint', function () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['./app/**/*.js','!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('cp-static', function() {
  gulp.src('app/index.html').pipe(gulp.dest('dist'));
  gulp.src('app/assets/style/*').pipe(gulp.dest('dist'));
});

gulp.task('webpack', function(callback) {
  // run webpack
  webpack(require('./webpack.config'), function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function() {
  var compiler = webpack(require('./webpack.config'));
  new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'dist')
  }).listen(8080, 'localhost', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
  });
});

gulp.task('default', ['cp-static', 'webpack-dev-server']);