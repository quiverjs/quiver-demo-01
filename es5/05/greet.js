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
var $__1 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    loadSimpleHandler = $__1.loadSimpleHandler,
    simpleHandlerBuilder = $__1.simpleHandlerBuilder,
    inputHandlerMiddleware = $__1.inputHandlerMiddleware;
var userHandler = ($__user__ = require("./user"), $__user__ && $__user__.__esModule && $__user__ || {default: $__user__}).userHandler;
var greetHandler = simpleHandlerBuilder(async($traceurRuntime.initGeneratorFunction(function $__6(config) {
  var $__4,
      $__3,
      greet,
      getUser;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $__3 = config, greet = ($__4 = $__3.greet) === void 0 ? 'Hello' : $__4;
          $ctx.state = 8;
          break;
        case 8:
          $ctx.state = 2;
          return loadSimpleHandler(config, userHandler, 'void', 'json');
        case 2:
          getUser = $ctx.sent;
          $ctx.state = 4;
          break;
        case 4:
          $ctx.returnValue = async($traceurRuntime.initGeneratorFunction(function $__7(args) {
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
            }, $__7, this);
          }));
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__6, this);
})), 'void', 'text');
