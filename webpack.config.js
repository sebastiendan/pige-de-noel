var webpack = require('webpack');
var merge = require('webpack-merge');
var validate = require('webpack-validator');
var path = require('path');
var fs = require('fs');
const pkg = require('./package.json');

const server = {
  context: __dirname + '/src',
  entry: {
    api: './api/server.ts',
  },
  output: {
    filename: '[name].js',
    publicPath: 'dist/',
    path: 'dist'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },
  target: 'node',
  externals: fs.readdirSync("node_modules")
    .reduce(function(acc, mod) {
      if (mod === ".bin") {
        return acc
      }

      acc[mod] = "commonjs " + mod
      return acc
    }, {}),
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}

const client = {
  context: __dirname + '/src',
  entry: {
    app: './app/start.ts',
  },
  output: {
    filename: '[name].js',
    publicPath: 'dist/',
    path: 'dist'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },
  plugins: [    
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      mangle: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "autoprefixer-loader?{browsers:['last 2 version']}", "sass"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
}

module.exports = [server, client];