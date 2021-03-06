#!/bin/bash

MAIN_BRANCH='main'
PACKAGE_BRANCH='package'

set -e
git checkout $MAIN_BRANCH
npm run package -w dev
cp -r package _package
git checkout $PACKAGE_BRANCH
GLOBIGNORE='.git:_package'
rm -rf *
unset GLOBIGNORE
mv _package/* .
rmdir _package
git add .
git commit -m "Update $(date +"%m-%d-%Y %H:%M:%S")"
git push
git checkout $MAIN_BRANCH
