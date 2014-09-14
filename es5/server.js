"use strict";
var $__traceur_64_0_46_0_46_58__,
    $__path__,
    $__quiver_45_http__;
($__traceur_64_0_46_0_46_58__ = require("traceur"), $__traceur_64_0_46_0_46_58__ && $__traceur_64_0_46_0_46_58__.__esModule && $__traceur_64_0_46_0_46_58__ || {default: $__traceur_64_0_46_0_46_58__});
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__}).default;
var startServer = ($__quiver_45_http__ = require("quiver-http"), $__quiver_45_http__ && $__quiver_45_http__.__esModule && $__quiver_45_http__ || {default: $__quiver_45_http__}).startServer;
var step = process.argv[2] || '01';
console.log('Running demo', step);
var subdir = path.join(__dirname, step);
var configPath = path.join(subdir, 'config.js');
var componentPath = path.join(subdir, 'component.js');
var config = require(configPath).config;
var main = require(componentPath).main;
startServer(main, config).then((function(server) {
  console.log('Demo server running at port 8080...');
})).catch((function(err) {
  console.log('error starting server:', err.stack);
}));
