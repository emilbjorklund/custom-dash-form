import 'core-js/es6/map';
import 'core-js/es6/promise';
import 'core-js/es6/symbol';
import 'core-js/es6/array';
import 'document-register-element';
import 'dom4';
import '../../vendor/validityState-polyfill.js';

const context = require.context(
  '../../src/elements/',
  true,
  /^.*\.test\.js$/
);
context.keys().forEach(context);