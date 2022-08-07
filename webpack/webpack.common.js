const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const jsLoaders = require('./loaders/js-loaders');
const cssLoaders = require('./loaders/css-loaders');
const imageLoaders = require('./loaders/image-loaders');

const buildFolder = '../build';
const sourceFolder = '../src';
const modulesFolder = '../node_modules';

module.exports = {
    context: path.resolve(__dirname, sourceFolder),
    devServer: {
        host: '0.0.0.0',
        port: 9000,
        historyApiFallback: true,
    },
    entry: './index',
    output: {
        path: path.resolve(__dirname, buildFolder),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.json'],
        modules: [path.resolve(__dirname, sourceFolder), 'node_modules'],
        alias: {
            '~': path.resolve(__dirname, sourceFolder),
        },
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: path.resolve(__dirname, modulesFolder),
                use: jsLoaders,
            },
            {
                test: /\.(tsx?)$/,
                exclude: path.resolve(__dirname, modulesFolder),
                use: 'ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: imageLoaders,
            },
            {
                test: /\.(css|s[ac]ss)$/,
                use: cssLoaders,
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, sourceFolder, 'index.html'),
        }),
    ],
};