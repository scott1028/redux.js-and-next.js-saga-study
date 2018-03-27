'use strict';


var path = require('path');

module.exports = {
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname, './'),
        filename: './bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.coffee$/,
                loader: 'coffee-loader'
            }, {
                test: /\.css$/,
                loader: "css-loader"
            }, {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015','react']
                }
            },
        ],
    }
};
