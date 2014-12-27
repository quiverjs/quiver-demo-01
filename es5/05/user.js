"use strict";
Object.defineProperties(exports, {
  userHandler: {get: function() {
      return userHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_core_47_component__,
    $__quiver_45_file_45_component__;
var simpleHandlerLoader = ($__quiver_45_core_47_component__ = require("quiver-core/component"), $__quiver_45_core_47_component__ && $__quiver_45_core_47_component__.__esModule && $__quiver_45_core_47_component__ || {default: $__quiver_45_core_47_component__}).simpleHandlerLoader;
var fileHandler = ($__quiver_45_file_45_component__ = require("quiver-file-component"), $__quiver_45_file_45_component__ && $__quiver_45_file_45_component__.__esModule && $__quiver_45_file_45_component__ || {default: $__quiver_45_file_45_component__}).fileHandler;
var userHandler = fileHandler().argsFilter((function(args) {
  args.path = '/' + args.username + '.json';
})).configAlias({dirPath: 'userDir'}).setLoader(simpleHandlerLoader('void', 'json'));
