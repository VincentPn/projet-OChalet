docker-compose -p linode-test -f ./deployement/docker-compose.database.yml -f ./deployement/docker-compose.front.yml -f ./deployement/docker-compose.main.yml -f ./deployement/docker-compose.debian.yml down -v && docker image rm api:v1.0.0 front:v1.0.0
 
