#!/usr/bin/env bash

cd /var/www
if [ ! -d bak/static ]
then
    mkdir -p bak/static
fi
tar --exclude="*.tar.bz2" -jcf bak/static/$(date "+%Y-%m-%d_%H-%M-%S").tar.bz2 static
