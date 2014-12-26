"use strict";
Object.defineProperties(exports, {
  databaseMiddleware: {get: function() {
      return databaseMiddleware;
    }},
  __esModule: {value: true}
});
var $__nedb__,
    $__quiver_45_core_47_error__,
    $__quiver_45_core_47_promise__,
    $__quiver_45_core_47_component__;
var Datastore = ($__nedb__ = require("nedb"), $__nedb__ && $__nedb__.__esModule && $__nedb__ || {default: $__nedb__}).default;
var error = ($__quiver_45_core_47_error__ = require("quiver-core/error"), $__quiver_45_core_47_error__ && $__quiver_45_core_47_error__.__esModule && $__quiver_45_core_47_error__ || {default: $__quiver_45_core_47_error__}).error;
var $__2 = ($__quiver_45_core_47_promise__ = require("quiver-core/promise"), $__quiver_45_core_47_promise__ && $__quiver_45_core_47_promise__.__esModule && $__quiver_45_core_47_promise__ || {default: $__quiver_45_core_47_promise__}),
    async = $__2.async,
    promisifyMethods = $__2.promisifyMethods;
var configMiddleware = ($__quiver_45_core_47_component__ = require("quiver-core/component"), $__quiver_45_core_47_component__ && $__quiver_45_core_47_component__.__esModule && $__quiver_45_core_47_component__ || {default: $__quiver_45_core_47_component__}).configMiddleware;
var createDb = (function(dbPath) {
  var db = new Datastore({filename: dbPath});
  return promisifyMethods(db, ['loadDatabase', 'find', 'findOne']);
});
var databaseMiddleware = configMiddleware(async($traceurRuntime.initGeneratorFunction(function $__5(config) {
  var dbPath,
      db;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.state = (config.db) ? 1 : 2;
          break;
        case 1:
          $ctx.returnValue = config;
          $ctx.state = -2;
          break;
        case 2:
          dbPath = config.dbPath;
          db = createDb(dbPath);
          $ctx.state = 11;
          break;
        case 11:
          $ctx.state = 5;
          return db.loadDatabase();
        case 5:
          $ctx.maybeThrow();
          $ctx.state = 7;
          break;
        case 7:
          config.db = db;
          $ctx.state = 13;
          break;
        case 13:
          $ctx.returnValue = config;
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__5, this);
})));
