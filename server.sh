#!/bin/bash

cd `dirname $0`

./node_modules/.bin/gulp

node es5/server.js $1