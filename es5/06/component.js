"use strict";
Object.defineProperties(exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var $__quiver_45_core_47_component__,
    $__user__,
    $__greet__;
var $__0 = ($__quiver_45_core_47_component__ = require("quiver-core/component"), $__quiver_45_core_47_component__ && $__quiver_45_core_47_component__.__esModule && $__quiver_45_core_47_component__ || {default: $__quiver_45_core_47_component__}),
    router = $__0.router,
    simpleHandler = $__0.simpleHandler;
var userHandler = ($__user__ = require("./user"), $__user__ && $__user__.__esModule && $__user__ || {default: $__user__}).userHandler;
var greetHandler = ($__greet__ = require("./greet"), $__greet__ && $__greet__.__esModule && $__greet__ || {default: $__greet__}).greetHandler;
var helloHandler = simpleHandler((function(args) {
  return 'Hello Quiver';
}), 'void', 'text');
var main = router().staticRoute('/', helloHandler).paramRoute('/greet/:username', greetHandler).paramRoute('/user/:username', userHandler);
