var gulp = require("gulp"), 
    plumber = require("gulp-plumber"),
    sass = require("gulp-ruby-sass") ,
    autoprefixer = require("gulp-autoprefixer"),
    minifycss = require("gulp-minify-css"),
    newer = require("gulp-newer"),
    notify = require("gulp-notify"), 
    bower = require("gulp-bower"),
    concat = require("gulp-concat");

var config = {
     sassPath: './src/sass',
     bowerDir: './src/assets/_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./static/fonts')); 
});

gulp.task('css', function() { 
    return sass( config.sassPath + "/style.scss", {
             style: 'expanded',
             loadPath: [
                 config.sassPath,
                config.bowerDir,
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
         .pipe(gulp.dest('./static/css/')); 
});

gulp.task('script', function() {
    return gulp.src([
      config.bowerDir + "/jquery/dist/jquery.min.js",
      config.bowerDir + "/bootstrap-sass-official/assets/javascripts/bootstrap.min.js",
      config.bowerDir + "/infinite-scroll/jquery.infinitescroll.min.js",
      config.bowerDir + "/salvattore/dist/salvattore.js",
      config.bowerDir + "/images-loaded/imagesloaded.pkgd.min.js"
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./static/js/'));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css', 'script']);
