TRACEUR_FLAGS=--modules commonjs --generators parse --block-binding parse

build: src
	traceur --dir src/ out/ $(TRACEUR_FLAGS)

server: build
	node out/server.js

.PHONY: build test