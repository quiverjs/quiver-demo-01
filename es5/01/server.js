"use strict";
var $__quiver_45_core_47_traceur__,
    $__quiver_45_core_47_http__,
    $__component__;
($__quiver_45_core_47_traceur__ = require("quiver-core/traceur"), $__quiver_45_core_47_traceur__ && $__quiver_45_core_47_traceur__.__esModule && $__quiver_45_core_47_traceur__ || {default: $__quiver_45_core_47_traceur__});
var startServer = ($__quiver_45_core_47_http__ = require("quiver-core/http"), $__quiver_45_core_47_http__ && $__quiver_45_core_47_http__.__esModule && $__quiver_45_core_47_http__ || {default: $__quiver_45_core_47_http__}).startServer;
var main = ($__component__ = require("./component"), $__component__ && $__component__.__esModule && $__component__ || {default: $__component__}).main;
var config = {};
startServer(main, config).then((function(server) {
  console.log('Demo server running at port 8080...');
})).catch((function(err) {
  console.log('error starting server:', err.stack);
}));
