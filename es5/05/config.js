"use strict";
Object.defineProperties(exports, {
  config: {get: function() {
      return config;
    }},
  __esModule: {value: true}
});
var $__path__;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
var config = {dbPath: path.join(process.cwd(), 'private/user.db')};
