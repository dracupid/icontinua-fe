#!/usr/bin/env bash

set -e

export NODE_ENV="production"


root='/var/www'
dest=${root}/static

if [ $1 ]; then
    host=$1
else
    host=wcm@172.18.9.7
fi

echo -e "\033[0;32mDeploy to ${host}\033[0m"


echo "Building..."
npm run build

mkdir -p upload

cd dist
echo "Packing..."
tar --exclude="**/.DS_Store" -jcf ../upload/static.tar.bz2 *

echo "Uploading..."
cd ..
scp upload/static.tar.bz2 ${host}:${dest}

echo "Unpacking..."
ssh ${host} "mkdir -p ${dest} && cd ${dest} && tar -mxjf static.tar.bz2 && rm static.tar.bz2"

echo "Cleaning..."
rm -rf upload

echo "Done!"
