// "use strict";

// var gulp = require("gulp");
// var plumber = require("gulp-plumber");
// var sourcemap = require("gulp-sourcemaps");
// var rename = require("gulp-rename");
// var server = require("browser-sync").create();
// var sass = require("gulp-sass");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var csso = require("gulp-csso");
// var htmlmin = require("gulp-htmlmin");
// var imagemin = require("gulp-imagemin");
// var webp = require("gulp-webp");
// var svgstore = require("gulp-svgstore");
// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");
// var del = require("del");
// var uglify = require("gulp-uglify");

// // минифицируем стили
// gulp.task("css", function () {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(csso())
//     .pipe(rename("style.min.css"))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });

// // очистим папку build
// gulp.task("clean", function() {
//   return del("build");
// });

// // сделаем svg спрайт
// gulp.task("sprite", function() {
//   return gulp.src("source/img/icon-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img"));
// });

// // заберем html, используем шаблонизатор
// gulp.task("html", function() {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
// });

// // создадим webp картинки
// gulp.task("webp", function () {
//   return gulp.src("build/img/*.{jpg,png}")
//     .pipe(webp({
//       quality: 90,
//       method: 6
//     }))
//     .pipe(gulp.dest("build/img"));
// });

// // оптимизируем картинки
// gulp.task("images", function () {
//   return gulp.src("build/img/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true}),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("build/img"));
// });

// // скопируем в build шрифты, картинки, скрипты
// gulp.task("copy", function() {
//   return gulp.src([
//     "source/fonts/*.{woff,woff2}",
//     "source/img/**",
//     "source/js/**",
//     ], {
//       base: "source"
//     })
//     .pipe(gulp.dest("build"));
// });

// gulp.task("js", function () {
//   return gulp.src("source/js/**/*.js")
//     .pipe(uglify())
//     .pipe(rename(function (path) {
//       path.basename += ".min";
//     }))
//     .pipe(gulp.dest("build/js"));
// });

// gulp.task("server", function () {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });

//   gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
//   gulp.watch("source/img/icon-*", gulp.series("sprite", "html", "refresh"));
//   gulp.watch("source/*.html*", gulp.series("html", "refresh"));
//   gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));

//   // gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css")).on("change", server.reload);
//   // gulp.watch("source/*.html", gulp.series("html")).on("change", server.reload);
// });

// gulp.task("refresh", function(done) {
//   server.reload();
//   done();
// });

// // запустим всё что нужно для билда
// gulp.task("build", gulp.series(
//     "clean",
//     "sprite",
//     "webp",
//     "images",
//     "css",
//     "copy",
//     "html",
//     "js"
//   )
// );

// gulp.task("start", gulp.series(
//     "build",
//     "server"
//   )
// );
//************************

"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const pipeline = require("readable-stream").pipeline;

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(rename("style.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("source/img/**/*.svg", gulp.series("sprite", "minify-html", "refresh"));
  gulp.watch("source/*.html", gulp.series("minify-html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("minify-js", "refresh"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/logo-*.svg",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("minify-html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("minify-js", function () {
  return pipeline(
    gulp.src("source/js/*.js"),
    uglify(),
    rename("script.min.js"),
    gulp.dest("build/js")
  );
});

gulp.task("build", gulp.series(
  "clean",
  "images",
  "webp",
  "css",
  "sprite",
  "copy",
  "minify-js",
  "minify-html"));
gulp.task("start", gulp.series("build", "server"));
