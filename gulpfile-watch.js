// 
// this gulpfile can be use in development to speed up compiliation time
// it must be ran using node 8+ and gulp 4+
// gulp --gulpfile gulpfile-watch.js
//

var gulp = require('gulp');
var ts = require('gulp-typescript');
//var util = require("gulp-util");
var log = require('fancy-log');
var c = require('ansi-colors');
 
var tsProject = ts.createProject({
    declaration: true,
    module: 'es2015',
    rootDir: 'src',
    moduleResolution: 'node',
    "target": "es5",
    lib: [
      "es2017",
      "dom"
    ],
    "typeRoots": ["node_modules/@types", "custom_typings"],
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "strictNullChecks": false,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "noEmitHelpers": false,
    "allowSyntheticDefaultImports": true
});
 
function scripts(done) {
  return gulp.src('src/**/*.ts')
      .pipe(tsProject())
      .pipe(gulp.dest('dist/native-modules'));
}

function copyHTML() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist/native-modules"));
}

function copyCSS() {
  return gulp.src("src/**/*.css")
    .pipe(gulp.dest("dist/native-modules"));
}

function copyJSON() {
  return gulp.src("src/**/*.json")
    .pipe(gulp.dest("dist/native-modules"));
}

function copySCSS() {
  return gulp.src("src/**/*.scss")
    .pipe(gulp.dest("dist/native-modules"));
}

function watchFiles() {
  gulp.watch('src/**/*.html', copyHTML);
  gulp.watch('src/**/*.css', copyCSS);
  gulp.watch('src/**/*.scss', copySCSS);
  gulp.watch('src/**/*.json', copyJSON);
  gulp.watch('src/**/*.ts', scripts);
}

function runTaskAndCopyToDep(task) {
  return function runTaskAndCopyToDep(done) {
    log('Child task: \'', c.magenta(task.name), '\'');
    return task(done)
      .pipe(gulp.dest('../aurelia-deco/node_modules/aurelia-resources/dist/native-modules'))
      .pipe(gulp.dest('../aurelia-swissdata/node_modules/aurelia-resources/dist/native-modules'));
  }
}
function watchFilesAndCopyToDep() {
  gulp.watch('src/**/*.html', runTaskAndCopyToDep(copyHTML));
  gulp.watch('src/**/*.css', runTaskAndCopyToDep(copyCSS));
  gulp.watch('src/**/*.scss', runTaskAndCopyToDep(copySCSS));
  gulp.watch('src/**/*.json', runTaskAndCopyToDep(scripts));
  gulp.watch('src/**/*.ts', runTaskAndCopyToDep(scripts));
}

var copy = gulp.parallel(
  copyHTML, 
  copyCSS, 
  copySCSS, 
  copyJSON);
var copyAndCopyToDep = gulp.parallel(
  runTaskAndCopyToDep(copyHTML), 
  runTaskAndCopyToDep(copyCSS), 
  runTaskAndCopyToDep(copySCSS),
  runTaskAndCopyToDep(copyJSON)); 
var build = gulp.parallel(
  scripts, 
  copy);
var buildAndCopyToDep = gulp.parallel(
  runTaskAndCopyToDep(scripts), 
  copyAndCopyToDep);
var watch = gulp.series(
  build, 
  watchFiles);
var watchAndCopyToDep = gulp.series(
  buildAndCopyToDep, 
  watchFilesAndCopyToDep);

exports.default = build;
exports.copy = copy;
exports.copyAndCopyToDep = copyAndCopyToDep;
exports.build = build;
exports.buildAndCopyToDep = buildAndCopyToDep;
exports.scripts = scripts;
exports.watch = watch;
exports.watchAndCopyToDep = watchAndCopyToDep;
