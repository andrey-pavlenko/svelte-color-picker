#!/bin/bash

MAIN_BRANCH='main'
PACKAGE_BRANCH='package'

git checkout $MAIN_BRANCH
cp -r package _package
git checkout $PACKAGE_BRANCH
GLOBIGNORE='.git:_package'
rm -rf *
mv _package/* .
rmdir _package
