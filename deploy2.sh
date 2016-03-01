#!/usr/bin/env bash

set -e

gulp jsx html css

root='/var/www'
dest=${root}/static

host=wcm@172.18.9.7

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
