'use strict';


var path = require('path');

module.exports = {
    mode: "development",
    entry: './src/app.jsx',
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, './src'),
        filename: './bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            }
        ]
    }
};
