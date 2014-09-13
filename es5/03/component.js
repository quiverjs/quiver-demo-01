"use strict";
Object.defineProperties(exports, {
  main: {get: function() {
      return main;
    }},
  __esModule: {value: true}
});
var $__quiver_45_file_45_component__,
    $__quiver_45_component__;
var fileHandler = ($__quiver_45_file_45_component__ = require("quiver-file-component"), $__quiver_45_file_45_component__ && $__quiver_45_file_45_component__.__esModule && $__quiver_45_file_45_component__ || {default: $__quiver_45_file_45_component__}).fileHandler;
var $__1 = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}),
    router = $__1.router,
    simpleHandler = $__1.simpleHandler,
    argsFilter = $__1.argsFilter,
    configAliasMiddleware = $__1.configAliasMiddleware;
var helloHandler = simpleHandler((function(args) {
  return 'Hello Quiver';
}), 'void', 'text');
var greetHandler = simpleHandler((function(args) {
  return 'Hello, ' + args.name;
}), 'void', 'text');
var userHandler = fileHandler().addMiddleware(argsFilter((function(args) {
  args.path = '/' + args.username + '.json';
  return args;
}))).addMiddleware(configAliasMiddleware({dirPath: 'userDir'}));
var main = router().addStaticRoute(helloHandler, '/').addParamRoute(greetHandler, '/greet/:name').addParamRoute(userHandler, '/user/:username');
