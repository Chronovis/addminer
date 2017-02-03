#!/usr/bin/env bash

if [ -z "$1" ]; then
    command='browserify'
elif [ "$1" = 'watch' ]; then
    command='watchify'
else
    echo "[ERROR] \"$1\" is not a valid command!"
    echo "Without a command, the code is build."
    echo "With the \"watch\" command, the code is build and watched."
    exit 0
fi

"./node_modules/.bin/$command" \
    src/client/index.ts \
    --plugin [ tsify --project src/client/tsconfig.json ] \
	--require classnames \
	--require react \
    --outfile build/client/js/index.js \
    --verbose
