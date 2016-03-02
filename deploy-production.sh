#!/usr/bin/env bash

set -e

npm run build

root='/var/www'
dest=${root}/static

host=root@114.215.176.66

mkdir -p upload

cd dist
echo "Packing..."
tar --exclude="**/.DS_Store" -jcf ../upload/static.tar.bz2 *

echo "Uploading..."
cd ..
scp upload/static.tar.bz2 ${host}:${dest}

echo "Unpacking..."
ssh $host "mkdir -p ${dest} && cd ${dest} && tar -xjf static.tar.bz2"

echo "Cleaning..."
rm -rf upload

echo "Done!"
