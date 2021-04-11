var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

gulp.task('default', watch);
gulp.task('sass', compilerSassDev);
gulp.task('sassProd', compilerSassProd);
gulp.task('imagemin', imageMinProd);

function compilerSassDev() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"));
}

function compilerSassProd() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass({outputStyle:"compressed"}).on("error", sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/css/"))
}

function imageMinProd() {
    return gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
}

function watch() {
    gulp.watch("src/scss/**/*.scss", compilerSassDev);
    gulp.watch("src/scss/**/*.scss", compilerSassProd);
    gulp.watch("src/images/*", imageMinProd);
}