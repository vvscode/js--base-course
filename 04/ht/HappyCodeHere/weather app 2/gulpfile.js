
const gulp = require('gulp'),

    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),

    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    // plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),

    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),

    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,

    rimraf = require('rimraf');


var path = {
    dist: {
        html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/style/main.scss',
        js: 'src/js/app.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/style/**/*.scss',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './dist'
};

var config = {
    server: {
        baseDir: "./dist"
    },
    open: false,
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend",

    insertGlobals : true,
    require : ['src/js/app.js'],
    debug : !gulp.env.production
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.dist.html)) //Сохраним их в папку dist
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(autoprefixer()) //Добавим вендорные префиксы
        .pipe(cleanCSS()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css)) //И в dist
        .pipe(reload({stream: true}));
});

// function onError(err) {
//     console.log(err); //or other way you may prefer to log
//     this.emit('end');
// }

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        // .on('error', (error) => { console.log(error.toString()); this.emit('end') })
        // .pipe(plumber(onError)) not working


        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap

        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))

        .pipe(babel({
            presets: ['es2015']
        }))

        // .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.dist.js)) //Сохраним готовый файл в dist
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.dist.img)) //И бросим в dist
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('build', [
    'html:build',
    'style:build',
    'js:build',
    'image:build',
    'fonts:build'
]);


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
