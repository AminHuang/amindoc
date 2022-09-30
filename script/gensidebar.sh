#!/bin/bash

# which docsify

SHELL_FOLDER=$(dirname "$0")
echo SHELL_FOLDER: $SHELL_FOLDER

cd $SHELL_FOLDER

current_path=$(pwd)
gensidebar_path=$current_path/gensidebar.js

echo gensidebar_path: $gensidebar_path


docsify_path=$(which docsify) 

echo docsify_path: $docsify_path

docsify_real_path=$(./getlink.sh $docsify_path) 

echo docsify_real_path: $docsify_real_path

cd $docsify_real_path/../lib

pwd

node $gensidebar_path



