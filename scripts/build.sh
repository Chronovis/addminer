#! /bin/bash

rm -rf build
mkdir -p build/server build/client/js build/client/css
cp -r static/* build/client/

npm run build-server
npm run build-client-libs
npm run build-client
npm run build-stylus

