
#!/bin/bash
###############

#running the whole app stack with docker and WITHOUT docker-compose
# for user with properly installed docker-compose,
#The docker-compose version is stille the prefered option

NETWK="stacknet"
WEBAPP_NAME="interface_bio4t"
NEO_NAME="neo4j_dummy"

function log (){

echo "================="
echo  "   $@"
echo "================="
}

##############network##############################
function conf_network(){


 docker network remove $NETWK

 docker network create --driver bridge $NETWK
}

################neo4j############################
function run_neo(){

 NAME1="$NEO_NAME"
 IMG1="neo4j:4.4.3-enterprise"
 

 V1="-v $PWD/data:/var/lib/neo4j/import"

 VA="$V1"

 P1="-p 7474:7474"
 P2="-p 7687:7687"

 PA="$P1 $P2"

 E1="-e NEO4J_ACCEPT_LICENSE_AGREEMENT=yes"
 E2="-e NEO4J_AUTH=neo4j/bio4tdummy"
 E3="-e NEO4JLABS_PLUGINS=[\"apoc\"]"
 E4="-e NEO4J_apoc_import_file_enabled=true"

 EA=" $E1 $E2 $E3 $E4 "

 docker rm $NAME1 2&> /dev/null
 log docker run $VA $PA $EA --rm -d --network $NETWK --name $NAME1   $IMG1
 docker run $VA $PA $EA -d --rm --network $NETWK --name $NAME1   $IMG1
 }

function build_webapp(){
    mkdir -p ./data
    chmod -R 777 ./data
    log docker build -t $WEBAPP_NAME ./
    docker build -t $WEBAPP_NAME ./

}

###############webapp:GUI=backend-django############################

function run_webapp(){


 NAME1="$WEBAPP_NAME"
 IMG1="$WEBAPP_NAME:django"
 

 V1="-v $PWD/interface:/django"
 V2="-v $PWD/databaseUtils:/django/databaseUtils"

 VA="$V1 $V2"

 P1="-p 8000:8000"
 
 PA="$P1"
 CMD1=" 'python manage.py runserver 0.0.0.0:8000' "
 #ENTRYPOINT="--entrypoint=/bin/bash"
 EA=" "

 docker rm $NAME1 2&> /dev/null
  
 log docker run $VA $PA $EA -d --rm --network $NETWK  \
    --name $NAME1   $IMG1 \
    /bin/bash -c 'python manage.py runserver 0.0.0.0:8000'

 docker run $VA $PA $EA -d --rm --network $NETWK  \
    --name $NAME1   $IMG1 \
    /bin/bash -c 'python manage.py runserver 0.0.0.0:8000'
}
function dockerps(){
    log docker ps
    docker ps

}

function dockerstop(){
    log docker stop $1
    docker stop $1 2&> /dev/null

}



function dockerlogs(){
    log docker logs $1 
    docker logs $1 

}


function ncwait(){
 PO=$1
 LABEL=$2
 echo "Waiting $LABEL to launch on $PO..."

 while ! nc -z localhost $PO; do   
    sleep 2.0 # wait(sec) 
 done

 echo "$LABEL launched"

}

############main############
dockerstop $NEO_NAME
dockerstop $WEBAPP_NAME

build_webapp


conf_network
run_neo
ncwait 7474 "neo4j"

run_webapp
sleep 2
dockerps
dockerlogs $WEBAPP_NAME

