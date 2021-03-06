var gulp = require("gulp");

gulp.task("copy:html", gulp.series(function() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("dist/amd"))
    .pipe(gulp.dest("dist/commonjs"))
    .pipe(gulp.dest("dist/es2015"))
    .pipe(gulp.dest("dist/native-modules"))
    .pipe(gulp.dest("dist/system"));
}));

gulp.task("copy:css", gulp.series(function() {
  return gulp.src("src/**/*.css")
    .pipe(gulp.dest("dist/amd"))
    .pipe(gulp.dest("dist/commonjs"))
    .pipe(gulp.dest("dist/es2015"))
    .pipe(gulp.dest("dist/native-modules"))
    .pipe(gulp.dest("dist/system"));
  }));

gulp.task("copy:json", gulp.series(function() {
  return gulp.src("src/**/*.json")
    .pipe(gulp.dest("dist/amd"))
    .pipe(gulp.dest("dist/commonjs"))
    .pipe(gulp.dest("dist/es2015"))
    .pipe(gulp.dest("dist/native-modules"))
    .pipe(gulp.dest("dist/system"));
  }));

gulp.task("default", gulp.series(["copy:html", "copy:css", "copy:json"]));
