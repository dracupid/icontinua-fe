#!/usr/bin/env bash

root='/var/www/'
host='wcm@172.18.9.7'
if [ ! -d upload ]
then
    mkdir upload
fi
cd dist
echo "Packing..."
tar --exclude="**/.DS_Store" -jcf ../upload/static.tar.bz2 *

echo "Backup files on the server..."
ssh $host "sh ${root}bak_static.sh"

echo "Uploading..."
cd ..
scp -r upload/static.tar.bz2 ${host}:${root}static

echo "Unpacking..."
ssh $host "cd ${root}static && tar -xjf static.tar.bz2"

echo "Cleaning..."
rm -rf upload

echo "Done!"
