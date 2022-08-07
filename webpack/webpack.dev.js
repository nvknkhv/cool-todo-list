const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    target: 'web',
    devtool: 'eval-source-map',
    devServer: {
        hot: true,
    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ],
});