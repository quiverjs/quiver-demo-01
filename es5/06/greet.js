"use strict";
Object.defineProperties(exports, {
  greetHandler: {get: function() {
      return greetHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_core_47_promise__,
    $__quiver_45_core_47_component__,
    $__user__;
var async = ($__quiver_45_core_47_promise__ = require("quiver-core/promise"), $__quiver_45_core_47_promise__ && $__quiver_45_core_47_promise__.__esModule && $__quiver_45_core_47_promise__ || {default: $__quiver_45_core_47_promise__}).async;
var simpleHandlerBuilder = ($__quiver_45_core_47_component__ = require("quiver-core/component"), $__quiver_45_core_47_component__ && $__quiver_45_core_47_component__.__esModule && $__quiver_45_core_47_component__ || {default: $__quiver_45_core_47_component__}).simpleHandlerBuilder;
var userHandler = ($__user__ = require("./user"), $__user__ && $__user__.__esModule && $__user__ || {default: $__user__}).userHandler;
var greetHandler = simpleHandlerBuilder((function(config) {
  var $__4;
  var $__3 = config,
      getUser = $__3.getUser,
      greet = ($__4 = $__3.greet) === void 0 ? 'Hello' : $__4;
  return async($traceurRuntime.initGeneratorFunction(function $__6(args) {
    var username,
        user;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            username = args.username;
            $ctx.state = 8;
            break;
          case 8:
            $ctx.state = 2;
            return getUser({username: username});
          case 2:
            user = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            $ctx.returnValue = greet + ', ' + user.name;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__6, this);
  }));
}), 'void', 'text').inputHandler(userHandler, 'getUser');
