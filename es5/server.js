"use strict";
var $__quiver_45_core_47_traceur__,
    $__path__,
    $__quiver_45_core_47_http__;
($__quiver_45_core_47_traceur__ = require("quiver-core/traceur"), $__quiver_45_core_47_traceur__ && $__quiver_45_core_47_traceur__.__esModule && $__quiver_45_core_47_traceur__ || {default: $__quiver_45_core_47_traceur__});
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
var startServer = ($__quiver_45_core_47_http__ = require("quiver-core/http"), $__quiver_45_core_47_http__ && $__quiver_45_core_47_http__.__esModule && $__quiver_45_core_47_http__ || {default: $__quiver_45_core_47_http__}).startServer;
var step = process.argv[2] || '01';
console.log('Running demo', step);
var subdir = path.join(__dirname, step);
var configPath = path.join(subdir, 'config');
var componentPath = path.join(subdir, 'component');
var config = require(configPath).config;
var main = require(componentPath).main;
startServer(main, config).then((function(server) {
  console.log('Demo server running at port 8080...');
})).catch((function(err) {
  console.log('error starting server:', err.stack);
}));
