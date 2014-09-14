"use strict";
Object.defineProperties(exports, {
  userHandler: {get: function() {
      return userHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_component__,
    $__quiver_45_file_45_component__;
var $__0 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    argsFilter = $__0.argsFilter,
    configAliasMiddleware = $__0.configAliasMiddleware;
var fileHandler = ($__quiver_45_file_45_component__ = require("quiver-file-component"), $__quiver_45_file_45_component__ && $__quiver_45_file_45_component__.__esModule && $__quiver_45_file_45_component__ || {default: $__quiver_45_file_45_component__}).fileHandler;
var userHandler = fileHandler().addMiddleware(argsFilter((function(args) {
  args.path = '/' + args.username + '.json';
  return args;
}))).addMiddleware(configAliasMiddleware({dirPath: 'userDir'}));
