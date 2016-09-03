#!/bin/bash
DIR=.
if [ -n "$1" ]
then
  DIR=$1
fi

# Find image files in.
FILES=`find $DIR -type f | grep ".*\.\(jpg\|gif\|png\|jpeg\)"`

# Default searcher is grep. If Silver Searcher is installed, use that.
SEARCHER='grep -r -l '
if command -v ag
then
  # Sweet! Let's use Silver Searcher.
  SEARCHER='ag -l '
fi

# Loop over image files.
for f in $FILES
do
  if [[ -f $f ]]
  then
    name=$(basename $f)
    found=$($SEARCHER $name $DIR)
    if [[ -z $found ]]
    then
      echo $f
    fi
  fi
done
