const pkg = require('./package');
const webpack = require('webpack');
const path = require('path');

const uglify_options = {
  compress: {
    drop_debugger: true,
    drop_console: true
  },
  output: {
    comments: false
  }
}

module.exports = {
  entry: {
    'demo': './src/demo.js',
    'customdashform': './src/customdashform.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {
              targets: {
                browsers: pkg.browserlist
              },
              useBuiltins: true,
              //debug: true
            }]]
          }
        }
      }
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(uglify_options),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    filename: './dist/[name].js'
  }
}