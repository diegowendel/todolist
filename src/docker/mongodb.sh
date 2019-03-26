#!/bin/bash
# Script to run mongodb container

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NAME="--name todolist"
PORTS="-p 27017:27017"
VOLUME="-v $DIR/data:/data/db"

docker run  $NAME \
            $PORTS \
            $VOLUME \
            -d mongo
