"use strict";
Object.defineProperties(exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var $__quiver_45_core_47_component__,
    $__quiver_45_file_45_component__;
var $__0 = ($__quiver_45_core_47_component__ = require("quiver-core/component"), $__quiver_45_core_47_component__ && $__quiver_45_core_47_component__.__esModule && $__quiver_45_core_47_component__ || {default: $__quiver_45_core_47_component__}),
    router = $__0.router,
    simpleHandler = $__0.simpleHandler,
    simpleHandlerBuilder = $__0.simpleHandlerBuilder;
var fileHandler = ($__quiver_45_file_45_component__ = require("quiver-file-component"), $__quiver_45_file_45_component__ && $__quiver_45_file_45_component__.__esModule && $__quiver_45_file_45_component__ || {default: $__quiver_45_file_45_component__}).fileHandler;
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
var main = router().staticRoute('/', helloHandler).paramRoute('/greet/:name', greetHandler).paramRoute('/user/:restpath', userHandler);
