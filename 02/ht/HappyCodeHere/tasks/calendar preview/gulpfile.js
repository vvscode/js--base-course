
var gulp = require('gulp'),

    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),

    uglify = require('gulp-uglify'),

    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),

    watch = require('gulp-watch'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,

    rimraf = require('rimraf');

const babel = require('gulp-babel');


var path = {
    dist: {
        html: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
    },
    src: {
        html: 'src/*.html',
        style: 'src/style/main.scss',
        js: 'src/js/main.js',
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/style/**/*.scss',
        js: 'src/js/**/*.js',
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
    logPrefix: "Frontend"
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

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.dist.js)) //Сохраним готовый файл в dist
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('build', [
    'html:build',
    'style:build',
    'js:build'
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
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
