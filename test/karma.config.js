const webpack = require("webpack");
var webpackConfig = require('../webpack.config');
const path = require('path');

delete webpackConfig.entry;
// Add istanbul-instrumenter as webpack postloader:
webpackConfig.module.rules.push({
  enforce: 'post',
  test: /\.js/,
  exclude: /(test|node_modules|bower_components|vendor)/,
  loader: 'istanbul-instrumenter-loader'
});

module.exports = function(config) {
  config.set({

    files: [
      // all files ending in "test"
      //'./node_modules/phantomjs-polyfill/bind-polyfill.js',
      'karma/test.js'
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha'],

    preprocessors: {
      // only specify one entry point
      // and require all tests in there
      './karma/test.js': ['webpack']
    },

    reporters: ['spec', 'coverage-istanbul'],

    // coverageReporter: {

    //   dir: 'build/coverage/',
    //   reporters: [
    //       { type: 'html' },
    //       { type: 'text' },
    //       { type: 'text-summary' }
    //   ]
    // },
    coverageIstanbulReporter: {
      reports: ['html'],
      dir: path.join(__dirname, 'coverage', '%browser%')
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("istanbul-instrumenter-loader"),
      require('karma-coverage-istanbul-reporter'),
      //require("karma-coverage"),
      require("karma-phantomjs-launcher"),
      require("karma-spec-reporter")
    ],

    browsers: ['PhantomJS']
  });
};