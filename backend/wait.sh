#!/bin/bash

function ncwait(){
 PORT=$2
 SERVER=$1
 LABEL=$3

 echo "== Waiting $LABEL to launch on $PORT..."

 while ! nc -z $SERVER $PORT; do   
    sleep 2.0 # wait(sec) 
 done

 echo " ====================== $LABEL launched"

}

sudo apt install netcat
ncwait $1 $2 "$3"