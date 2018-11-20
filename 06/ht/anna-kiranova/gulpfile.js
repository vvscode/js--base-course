'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var clean = require('gulp-clean');
var image = require('gulp-image');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var runSequence = require('run-sequence');

gulp.task('clean', function() {
    return gulp.src('./dist').pipe(clean());
});

gulp.task('js-index-html', function() {
    return gulp
        .src('./src/main.js')
        .pipe(
            webpack({
                mode: 'production',
                devtool: 'source-map',
                output: {
                    filename: 'js/build.[contenthash].js'
                },
                plugins: [
                    new HtmlWebpackPlugin({
                        template: './src/index.html'
                    })
                ],
                module: {
                    rules: [
                        {
                            test: /\.html$/,
                            use: 'raw-loader'
                        }
                    ]
                }
            })
        )
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
    return gulp.src('./src/styles.css').pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
    return gulp
        .src('./src/icons/*')
        .pipe(image())
        .pipe(gulp.dest('./dist/icons'));
});

gulp.task('default', function() {
    runSequence('clean', 'js-index-html', 'css', 'images');
});
