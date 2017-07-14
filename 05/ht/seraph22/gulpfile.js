'use strict';

// Сборка JS
const gulp = require('gulp');
const browserify = require('browserify');             // Сборка модулей
const babelify = require('babelify');                 // ES6 -> ES5
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');                // Минификация

// CSS
const prefix = require('gulp-autoprefixer');          // Вендорные префиксы
const minifyCSS = require('gulp-clean-css');

// Обработка изображений
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

// Доп. модули
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');                // Импорт одного файла в другой

// Сервер
const browserSync = require('browser-sync');          // Перезагрузка страницы после изменения исходных файлов
const reload = browserSync.reload;
const watch = require('gulp-watch');

// Удаление билда
const rimraf = require('rimraf');

let path = {
	build: {
		html: 'build/',
		css: 'build/css/',
		js: 'build/js/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		css: 'src/css/style.css',
		js: 'src/js/app.js',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		css: 'src/css/**/*.css',
		js: 'src/js/**/*.js',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

let config = {
	server: {
		baseDir: './build'
	},
	open: false,
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: 'Frontend',

	insertGlobals: true,
	require: ['src/js/app.js']
};

//----------------------------------------HTML----------------------------------------
gulp.task('html:build', () =>
{
	return gulp.src(path.src.html)
	           .pipe(rigger())
	           .pipe(gulp.dest(path.build.html))
	           .pipe(reload({stream: true}));
});
//-------------------------------------END OF HTML-------------------------------------

//-----------------------------------------CSS-----------------------------------------
gulp.task('css:build', () =>
{
	return gulp.src(path.src.css)                       // Исходник
	           .pipe(sourcemaps.init())                 // Инициализация
	           .pipe(prefix())                          // Добавим вендорные префиксы
	           .pipe(minifyCSS())                       // Минификация
	           .pipe(sourcemaps.write())
	           .pipe(gulp.dest(path.build.css))
	           .pipe(reload({stream: true}));
});
//--------------------------------------END OF CSS--------------------------------------

//------------------------------------------JS------------------------------------------
gulp.task('js:prebuild', () =>
{
	return browserify({
		entries: [path.src.js],
		debug: true
	})
		.transform(babelify.configure({
			presets: ['es2015']
		}))
		.bundle()
		.pipe(source('app.js'))                         // Вложенный путь в папку build
		.pipe(gulp.dest(path.build.js))                 // В папку build
		.pipe(reload({stream: true}));                  // Перезагрузка сервера
});

gulp.task('js:minify', () =>
{
	return gulp.src('build/js/**')
	           .pipe(uglify())                              // Минификация
	           .pipe(gulp.dest(path.build.js))
	           .pipe(reload({stream: true}));
});

gulp.task('js:build', gulp.series('js:prebuild', 'js:minify'));
//--------------------------------------END OF JS---------------------------------------

//-----------------------------------------IMG------------------------------------------
gulp.task('image:build', () =>
{
	return gulp.src(path.src.img)
	           .pipe(imagemin({                           // Минификация
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()],
	            interlaced: true
	            }))
	           .pipe(gulp.dest(path.build.img))
	           .pipe(reload({stream: true}));
});
//--------------------------------------END OF IMG--------------------------------------

//----------------------------------------FONTS-----------------------------------------
gulp.task('fonts:build', () =>
{
	return gulp.src(path.src.fonts)
	           .pipe(gulp.dest(path.build.fonts));
});
//-------------------------------------END OF FONTS-------------------------------------

gulp.task('webserver', () =>
{
	browserSync(config);
});

// Watch.
gulp.task('watch', () =>
{
	gulp.watch(path.watch.html, gulp.series('html:build'));
	gulp.watch(path.watch.css, gulp.series('css:build'));
	gulp.watch(path.watch.js, gulp.series('js:build'));
	gulp.watch(path.watch.img, gulp.series('image:build'));
	gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

gulp.task('clean', (cb) =>
{
	return rimraf(path.clean, cb);
});

gulp.task('build', gulp.series('html:build', 'css:build', 'js:build', 'image:build', 'fonts:build'));
gulp.task('web', gulp.parallel('webserver', 'watch'));
gulp.task('default', gulp.series('build', 'web'));