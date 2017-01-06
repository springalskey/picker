var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

var cssLoader = isProd
  ? ExtractTextPlugin.extract('css!sass')
  : 'style!css?sourceMap!sass?sourceMap'

var path = require('path');
var https = require('https');
var ip = require('ip');

var port = 9998;
var url = 'http://'+ip.address()+':' + port + '/';

var config = {
  devtool: '#eval-source-map',
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].[hash:7].js',
    publicPath: isProd ? '' : url,
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
    })
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'stage-1'],
      }
    },
    { test: /\.(scss|css)$/, loader: cssLoader },
    {
      test: /\.(png|jpg|gif|ico)$/,
      loader: 'url-loader?limit=8192&name=assets/[name].[ext]'
    }]
  },

  devServer: {
    port: port,
    host: ip.address(),
    contentBase: "./app",
    historyApiFallback: true,
    compress: true,
    stats: 'minimal',
  }
};

if (isProd) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('app.[hash:8].css', {allChunks: true})
  );
}

module.exports = config;
