/* jshint node:true, camelcase:false */
var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var ngHtml2Js = require("gulp-ng-html2js");
var browserSync = require('browser-sync');
var pkg = require('./package.json');
var plug = require('gulp-load-plugins')();
var sass = require('gulp-ruby-sass');
var reload = browserSync.reload;
var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;
var port = 3010;

gulp.task('help', plug.taskListing);

gulp.task('scripts', function() {
  gulp.src(['./client/*.js', './client/**/*.js', '!./client/bower_components', '!./client/app.min.js'])
    .pipe(sourcemaps.init())
      .pipe(concat('./app.min.js'))
      .pipe(gulp.dest('client'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('client'));
});

gulp.task('watch', function() {
  watch(['./client/**/*.js', '!./client/**/*.test.js', '!./client/app.min.js'], function () {
    gulp.start('scripts');
  });
});

gulp.task('styles', function () {
    return sass('./client/scss/master.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('./client/css/'));
});

gulp.task('watch:styles', function() {
  watch(['./client/scss/*.scss'], function () {
    gulp.start('styles');
  });
});

/**
 * serve the dev environment
 */
gulp.task('serve', function() {
    serve();
    // startBrowserSync();
});

gulp.task('default', ['watch','watch:styles','serve']);

function serve() {
    var options = {
        script: 'server/server.js',
        delayTime: 1,
        ext: 'html js',
        env: {'PORT': port},
        watch: ['./server/']
    };

    return plug.nodemon(options)
        .on('start', function() {
            startBrowserSync();
        })
        .on('restart', function() {
            log('restarted browser-sync!');
            setTimeout(function () {
                browserSync.reload({stream: false});
            }, 1000);
        });
}

/**
 * Start BrowserSync
 */
function startBrowserSync() {
    if (browserSync.active) {
        return;
    }

    log('Starting BrowserSync');
    browserSync({
        proxy: 'localhost:' + port,
        port: 3000,
        files: ['./client/**/**/*.*'],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        logLevel: 'debug',
        logPrefix: 'jj',
        notify: true,
        reloadDelay: 1000
    });
}
