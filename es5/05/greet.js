"use strict";
Object.defineProperties(exports, {
  greetHandler: {get: function() {
      return greetHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_promise__,
    $__quiver_45_component__,
    $__user_46_js__;
var async = ($__quiver_45_promise__ = require("quiver-promise"), $__quiver_45_promise__ && $__quiver_45_promise__.__esModule && $__quiver_45_promise__ || {default: $__quiver_45_promise__}).async;
var $__1 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    simpleHandlerLoader = $__1.simpleHandlerLoader,
    simpleHandlerBuilder = $__1.simpleHandlerBuilder,
    inputHandlerMiddleware = $__1.inputHandlerMiddleware;
var userHandler = ($__user_46_js__ = require("./user.js"), $__user_46_js__ && $__user_46_js__.__esModule && $__user_46_js__ || {default: $__user_46_js__}).userHandler;
var greetHandler = simpleHandlerBuilder((function(config) {
  var getUser = config.getUser;
  return async($traceurRuntime.initGeneratorFunction(function $__4(args) {
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
            $ctx.returnValue = 'Hello, ' + user.name;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__4, this);
  }));
}), 'void', 'text').addMiddleware(inputHandlerMiddleware(userHandler, 'getUser'));
