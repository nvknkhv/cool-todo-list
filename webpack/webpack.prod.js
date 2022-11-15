const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    target: 'browserslist',
    devtool: 'cheap-source-map',
    output: {
        filename: 'js/[name].[hash:8].js',
        publicPath: '/cool-todo-list/',
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        }),
    ],
    performance: {
        hints: false,
        maxAssetSize: 512000, //512kb,
    },
});