const webpack = require('webpack');
const resolve = require('path').resolve;

const config = {
       devtool: 'eval-source-map',
       entry: __dirname + '/templates/static/js/index.jsx',
       output: {
              path: resolve('templates/public'),
              filename: 'bundle.js',
              publicPath: resolve('templates/public')
       },
       resolve: {
              extensions: ['.js', '.jsx', '.css']
       },
       module: {
              rules: [
                     {
                            test: /\.jsx?/,
                            loader: 'babel-loader',
                            exclude: /node_modules/
                     },
                     {
                            test: /\.s$/,
                            loader: 'style-loader!css-loader?modules'
                     },
                     {
                            test: /\.css$/,
                            use: [
                                   'style-loader',
                                   'css-loader'
                            ]
                     }]
       }
};
module.exports = config;
