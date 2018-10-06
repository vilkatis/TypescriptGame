const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'development',
    context: SRC,
    entry: {
        index: './index.ts'
    },
    output: {
        filename: '[name].bundle.js',
        path: DIST,
        publicPath: '/'
    },
    resolve: {
        extensions: [ '.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [ 'awesome-typescript-loader' ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Typescript Game Engine',
            template: 'index.html'
        })
    ],
    devServer: {
        port: 8000,
        contentBase: DIST,
        compress: true,

        quiet: false,
        noInfo: false,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    },
    devtool: 'inline-source-map'
};