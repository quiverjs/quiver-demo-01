"use strict";
Object.defineProperties(exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var $__quiver_45_file_45_component__,
    $__quiver_45_component__;
var fileHandler = ($__quiver_45_file_45_component__ = require("quiver-file-component"), $__quiver_45_file_45_component__ && $__quiver_45_file_45_component__.__esModule && $__quiver_45_file_45_component__ || {default: $__quiver_45_file_45_component__}).fileHandler;
var $__1 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    router = $__1.router,
    simpleHandler = $__1.simpleHandler,
    simpleHandlerBuilder = $__1.simpleHandlerBuilder;
var helloHandler = simpleHandler((function(args) {
  return 'Hello Quiver';
}), 'void', 'text');
var greetHandler = simpleHandlerBuilder((function(config) {
  var $__3;
  var $__2 = config,
      greet = ($__3 = $__2.greet) === void 0 ? 'Hello' : $__3;
  return (function(args) {
    return greet + ', ' + args.name;
  });
}), 'void', 'text');
var userHandler = fileHandler();
var main = router().addStaticRoute(helloHandler, '/').addParamRoute(greetHandler, '/greet/:name').addParamRoute(userHandler, '/user/:restpath');
