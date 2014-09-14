"use strict";
Object.defineProperties(exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var $__quiver_45_component__,
    $__user_46_js__,
    $__greet_46_js__;
var $__0 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    router = $__0.router,
    simpleHandler = $__0.simpleHandler;
var userHandler = ($__user_46_js__ = require("./user.js"), $__user_46_js__ && $__user_46_js__.__esModule && $__user_46_js__ || {default: $__user_46_js__}).userHandler;
var greetHandler = ($__greet_46_js__ = require("./greet.js"), $__greet_46_js__ && $__greet_46_js__.__esModule && $__greet_46_js__ || {default: $__greet_46_js__}).greetHandler;
var helloHandler = simpleHandler((function(args) {
  return 'Hello Quiver';
}), 'void', 'text');
var main = router().addStaticRoute(helloHandler, '/').addParamRoute(greetHandler, '/greet/:username').addParamRoute(userHandler, '/user/:username');
