"use strict"

// -- DEPENDENCIES -------------------------------------------------------------
var gulp    = require('gulp');
var coffee  = require('gulp-coffee');
var concat  = require('gulp-concat');
var connect = require('gulp-connect');
var header  = require('gulp-header');
var uglify  = require('gulp-uglify');
var gutil   = require('gulp-util');
var stylus  = require('gulp-stylus');
var yml     = require('gulp-yml');
var pkg     = require('./package.json');

// -- FILES --------------------------------------------------------------------
var assets = './www/assets';

var bower = {
  js : ['bower_components/hope/hope.js',
        'bower_components/atoms/atoms.js',
        'bower_components/atoms/atoms.app.js',
        'bower_components/appnima/*.js',
        'bower_components/atoms-app-*/*.js'],
  css: [
        'bower_components/atoms/atoms.app.css',
        'bower_components/atoms-icons/atoms.icons.css',
        'bower_components/atoms-app-*/*.css']};

var source = {
  coffee: [ 'source/entities/*.coffee',
            'source/atoms/*.coffee',
            'source/molecules/*.coffee',
            'source/organisms/*.coffee',
            'source/*.coffee',
            'source/*.*.coffee'],
  styl  : [ 'source/style/__init.styl',
            'source/style/__vendor.styl',
            'source/style/atom.*.styl',
            'source/style/molecule.*.styl',
            'source/style/organism.*.styl',
            'source/style/app.styl',
            'source/style/app.*.styl'],
  yml   : [ 'source/organisms/*.yml']};

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link    <%= pkg.homepage %>',
  ' * @author  <%= pkg.author.name %> (<%= pkg.author.site %>)',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

// -- TASKS --------------------------------------------------------------------
gulp.task('bower', function() {
  gulp.src(bower.js)
    .pipe(concat('atoms.js'))
    .pipe(gulp.dest(assets + '/js'));

  gulp.src(bower.css)
    .pipe(concat('atoms.css'))
    .pipe(gulp.dest(assets + '/css'));
});

gulp.task('coffee', function() {
  gulp.src(source.coffee)
    .pipe(concat('atoms.' + pkg.name + '.coffee'))
    .pipe(coffee().on('error', gutil.log))
    .pipe(uglify({mangle: false}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/js'))
    .pipe(connect.reload());
});

gulp.task('styl', function() {
  gulp.src(source.styl)
    .pipe(concat('atoms.' + pkg.name + '.styl'))
    .pipe(stylus({compress: true, errors: true}))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest(assets + '/css'))
    .pipe(connect.reload());
});

gulp.task('yml', function() {
  console.log(source.yml)
  gulp.src(source.yml)
    .pipe(yml().on('error', gutil.log))
    .pipe(gulp.dest(assets + '/scaffold'))
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({ port: 8000, root: 'www/', livereload: true });
});

gulp.task('init', function() {
  gulp.run(['bower', 'coffee', 'styl', 'yml'])
});

gulp.task('default', function() {
  gulp.run(['webserver'])
  gulp.watch(source.coffee, ['coffee']);
  gulp.watch(source.styl, ['styl']);
  gulp.watch(source.yml, ['yml']);
});
