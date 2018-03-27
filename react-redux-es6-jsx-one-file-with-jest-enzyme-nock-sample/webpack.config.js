'use strict';


var path = require('path');

module.exports = {
    mode: "development",
    entry: './src/app.jsx',
    devtool: "source-map",  // this is only for "webpack", but "webpack-dev-server -d" dosen't need this devtool.
    output: {
        path: path.resolve(__dirname, './src'),
        publicPath: "/src/",  // for "webpack-dev-server & webpack" change "/bundle.js" to "/src/bundle.js"
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
