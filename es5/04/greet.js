"use strict";
Object.defineProperties(exports, {
  greetHandler: {get: function() {
      return greetHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_component__;
var simpleHandlerBuilder = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}).simpleHandlerBuilder;
var greetHandler = simpleHandlerBuilder((function(config) {
  var $__2;
  var $__1 = config,
      greet = ($__2 = $__1.greet) === void 0 ? 'Hello' : $__2;
  return (function(args) {
    return greet + ', ' + args.name;
  });
}), 'void', 'text');
