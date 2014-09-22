"use strict";
Object.defineProperties(exports, {
  userHandler: {get: function() {
      return userHandler;
    }},
  getUserFilter: {get: function() {
      return getUserFilter;
    }},
  __esModule: {value: true}
});
var $__nedb__,
    $__quiver_45_error__,
    $__quiver_45_promise__,
    $__quiver_45_component__,
    $__database_46_js__;
var Datastore = ($__nedb__ = require("nedb"), $__nedb__ && $__nedb__.__esModule && $__nedb__ || {default: $__nedb__}).default;
var error = ($__quiver_45_error__ = require("quiver-error"), $__quiver_45_error__ && $__quiver_45_error__.__esModule && $__quiver_45_error__ || {default: $__quiver_45_error__}).error;
var $__2 = ($__quiver_45_promise__ = require("quiver-promise"), $__quiver_45_promise__ && $__quiver_45_promise__.__esModule && $__quiver_45_promise__ || {default: $__quiver_45_promise__}),
    async = $__2.async,
    promisifyMethods = $__2.promisifyMethods;
var $__3 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    argsBuilderFilter = $__3.argsBuilderFilter,
    simpleHandlerBuilder = $__3.simpleHandlerBuilder,
    inputHandlerMiddleware = $__3.inputHandlerMiddleware;
var databaseMiddleware = ($__database_46_js__ = require("./database.js"), $__database_46_js__ && $__database_46_js__.__esModule && $__database_46_js__ || {default: $__database_46_js__}).databaseMiddleware;
var userHandler = simpleHandlerBuilder((function(config) {
  var db = config.db;
  return async($traceurRuntime.initGeneratorFunction(function $__7(args) {
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
            return db.findOne({username: username});
          case 2:
            user = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            if (!user)
              throw error(404, 'user not found');
            $ctx.state = 10;
            break;
          case 10:
            $ctx.returnValue = user;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__7, this);
  }));
}), 'void', 'json').addMiddleware(databaseMiddleware);
var getUserFilter = argsBuilderFilter((function(config) {
  var getUser = config.getUser;
  return async($traceurRuntime.initGeneratorFunction(function $__7(args) {
    var username;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (args.user) ? 1 : 2;
            break;
          case 1:
            $ctx.returnValue = args;
            $ctx.state = -2;
            break;
          case 2:
            username = args.username;
            $ctx.state = 11;
            break;
          case 11:
            $ctx.state = 5;
            return getUser({username: username});
          case 5:
            args.user = $ctx.sent;
            $ctx.state = 7;
            break;
          case 7:
            $ctx.returnValue = args;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__7, this);
  }));
})).addMiddleware(inputHandlerMiddleware(userHandler, 'getUser'));
