"use strict";
Object.defineProperties(exports, {
  greetHandler: {get: function() {
      return greetHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_promise__,
    $__quiver_45_component__,
    $__user__;
var async = ($__quiver_45_promise__ = require("quiver-promise"), $__quiver_45_promise__ && $__quiver_45_promise__.__esModule && $__quiver_45_promise__ || {default: $__quiver_45_promise__}).async;
var simpleHandlerBuilder = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}).simpleHandlerBuilder;
var getUserFilter = ($__user__ = require("./user"), $__user__ && $__user__.__esModule && $__user__ || {default: $__user__}).getUserFilter;
var greetHandler = simpleHandlerBuilder((function(config) {
  var $__4;
  var $__3 = config,
      greet = ($__4 = $__3.greet) === void 0 ? 'Hello' : $__4;
  return (function(args) {
    var user = args.user;
    return greet + ', ' + user.name;
  });
}), 'void', 'text').addMiddleware(getUserFilter);
