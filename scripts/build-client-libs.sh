#!/usr/bin/env bash

./node_modules/.bin/browserify \
	--require classnames \
	--require react \
	--require react-dom \
	--require react-router > build/client/js/libs.js
