'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'js/build.[contenthash].js'
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([
            './src/index.html',
            { from: './src/styles.css', to: 'css/' },
            { from: './src/icons', to: 'icons/'}
        ]),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ]
    }
};
