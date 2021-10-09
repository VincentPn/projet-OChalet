#definition des variables
DB_URI="ochalet:ochalet@ochalet_postgres:5432/ochalet"
REPO_NAME="linode-test"
DEBIAN_CONTAINER_NAME="ochalet_debian"
POSTGRES_CONTAINER_NAME="ochalet_postgres"
PATH_TO_REPO="/root/"
PATH_TO_COMPOSE_FILE="/root/linode-test/docker/docker-compose.yml"

# build et lance tous les containers
docker-compose -f $PATH_TO_COMPOSE_FILE -p ochalet_stack up --build -d
sleep 1

#installe sqitch dans le container debian sur le meme network que l'api
docker exec -it ochalet_debian bash -c "apt-get update && apt-get install sqitch cron rsync nano-tiny -y"

#copie des fichiers necessaires pour sqitch
docker cp $PATH_TO_REPO$REPO_NAME/api/migrations $DEBIAN_CONTAINER_NAME:/usr/src/
docker cp $PATH_TO_REPO$REPO_NAME/api/data/seeding.sql $DEBIAN_CONTAINER_NAME:/usr/src/

#deploiement de la structure de la base de donnée via sqitch
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "sqitch init ochalet --target db:pg://$DB_URI --top-dir /usr/src/migrations"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "sqitch deploy"

#seeding de la base de donné avec le fichier de seeding
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "psql postgres://$DB_URI -f /usr/src/seeding.sql"

#dump de la bdd avec la date actuelle dans le dossier /home du container
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "pg_dump postgres://$DB_URI > /home/$POSTGRES_CONTAINER_NAME\_$(date +"%F-%H:%M").sql"

#mise en place du cronjob pour effectuer les dump et les 
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "touch db_dump_cron"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo '*/1 * * * * /bin/sh /backup-moving.sh >> /backup-moving.log 2>&1' >> db_dump_cron"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "crontab db_dump_cron && rm db_dump_cron" 




# Autoriser les connexions entrantes pour ces ports
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT 
iptables -A INPUT -p tcp --dport 9443 -j ACCEPT 
# Autoriser les connexions sortantes pour ces ports
iptables -A OUTPUT -p tcp --dport 3000 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 9443 -j ACCEPT

