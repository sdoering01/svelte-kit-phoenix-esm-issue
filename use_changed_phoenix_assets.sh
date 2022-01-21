#!/bin/sh

if [ -z $1 ]; then
    echo Please provide the full path to the cloned phoenix repository as an argument
    exit 1
else
    # Get absolute path
    repo_path="$(cd "$(dirname "$1")"; pwd -P)/$(basename "$1")"
    echo Using local repo path: $repo_path
fi

mv ./deps/phoenix/package.json ./deps/phoenix/_package.json
mv ./deps/phoenix/assets/ ./deps/phoenix/_assets
mv ./deps/phoenix/priv/ ./deps/phoenix/_priv

ln -s "$repo_path"/package.json ./deps/phoenix/package.json
ln -s "$repo_path"/priv ./deps/phoenix/priv
ln -s "$repo_path"/assets ./deps/phoenix/assets

