
const path = require('path');
const webpack = require('webpack');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
  pixi = path.join(phaserModule, 'build/custom/pixi.js'),
  p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    context: path.join(__dirname, 'gameApp'),
    entry: {
      vendor: ['pixi', 'p2', 'phaser'],
      app : './gameApp.js'
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            { loader: 'file-loader', options: { name: '[name].html' } },
            { loader: 'extract-loader' },
            { loader: 'html-loader' },
            { loader: 'pug-html-loader' },
          ]
        },
        {
          test: /\.html$/,
          use: [
            { loader: 'file-loader', options: { name: '[name].html' } },
            { loader: 'extract-loader' },
            { loader: 'html-loader' },  
          ]
        },
        {
          test: /\.sass$/,
          use: [
            { loader: 'file-loader', options: { name: '[name].css' } },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            //{ loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
            { loader: 'sass-loader' },
          ]
        },
        {
            test: /\.css$/,
            use: [
              { loader: 'file-loader', options: { name: '[name].css' } },
              //{ loader: 'style-loader' },
              //{ loader: 'css-loader' },
            ]
          },
        /*{
          test: /phaser\.js$/,
          use: { loader : 'file-loader'},
          //use: 'babel-loader',
          exclude: __dirname + '/node_modules',
        },*/
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
              {loader: 'file-loader'}
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
              'file-loader'
          ]
        },
        //{ test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'gameApp')},
        { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
        { test: /phaser-split\.js$/, use: ['expose-loader?Phaser']},
        { test: /p2\.js/, use: ['expose-loader?p2']},
      ],
    },
    /*plugins: [
      new HtmlWebpackPlugin({
        template : './gameApp.html',
        filename : 'gameApp.html'  
      })
    ],*/
    devServer: {
        contentBase: __dirname/*[path.join(__dirname, 'gameTest'), path.join(__dirname, 'img')]*/,
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, '') 
    },
    resolve: {
      alias: {
          'phaser': phaser,
          'pixi': pixi,
          'p2': p2,
          'jquery' : './jquery-3.2.1.js',
      }
    },

  }