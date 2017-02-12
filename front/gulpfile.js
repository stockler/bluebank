'use strict';

var gulp = require('gulp');
var gulpConfig = require('./gulp.config.js');
var concat = require('gulp-concat');
//var minifier = require('gulp-uglify/minifier');
var minifier = require('gulp-uglify');
var uglifyjs = require('uglify-js-harmony');
var gzip = require('gulp-gzip');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
let babelify = require('babelify');
let browserify = require("browserify");
let vinylSourceStream = require("vinyl-source-stream");
let vinylBuffer = require("vinyl-buffer");

gulp.task('build-app', ['build-html'], function() {
	let sources = browserify({
	    entries: 'app/app.js',
	    debug: true
	})
	.transform(babelify.configure({
        presets : ["es2015"]
    }));

  return sources.bundle()
	.pipe(vinylSourceStream('app.min.js'))
    .pipe(vinylBuffer())
    //.pipe(sourcemaps.init())
    .pipe(ngAnnotate({
    	add: true,
    	single_quotes: true
    }))
    .pipe(minifier(gulpConfig.uglify))
    //.pipe(gzip(gulpConfig.gzip))
    //.pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(gulpConfig.scripts.dest));
});

gulp.task('build-html', function() {
  return gulp
    .src(gulpConfig.templates.src)
    .pipe(gulp.dest(gulpConfig.templates.dest));
});

