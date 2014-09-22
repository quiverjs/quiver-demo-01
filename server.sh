#!/bin/bash

cd `dirname $0`

  node_modules/.bin/traceur --dir src es5 --modules commonjs

node es5/server.js $1