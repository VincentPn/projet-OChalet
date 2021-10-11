docker-compose -p linode-test -f docker-compose.main.yml -f docker-compose.debian.yml down -v
docker image rm api:v1.0.0