const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/app',
    entry: './app.js',
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
        {
          test: /\.js$/,
          //use: 'babel-loader',
          exclude: __dirname + '/node_modules',
        },
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
        }
      ]
    },
    /*plugins: [
        new HtmlWebpackPlugin({

        })
    ],*/
    devServer: {
        contentBase: './dist'
    },
    output: {
      filename: 'app.js',
      path: __dirname + '/dist'
    }
  }
  