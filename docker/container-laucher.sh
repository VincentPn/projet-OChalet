#definition des variables
green_text=`tput setaf 2`
reset_color=`tput sgr0`
DB_URI="ochalet:ochalet@ochalet_postgres:5432/ochalet"
REPO_NAME="linode-test"
DEBIAN_CONTAINER_NAME="ochalet_debian"
POSTGRES_CONTAINER_NAME="ochalet_postgres"
PATH_TO_REPO="/root/"
PATH_TO_COMPOSE_FILE="/root/linode-test/docker/docker-compose.yml"
DB_DUMP_BACKUP_SERVER="pi@rpiweb.hopto.org:/home/pi/test2/"
BACKUP_SERVER_SSH_PORT="5000"

# build et lance tous les containers
docker-compose -f $PATH_TO_COMPOSE_FILE -p ochalet_stack up --build -d
sleep 1

#installe sqitch dans le container debian sur le meme network que l'api
docker exec -it ochalet_debian bash -c "apt-get update && apt-get install sqitch cron rsync openssh-server -y"

#copie des fichiers necessaires pour sqitch
docker cp $PATH_TO_REPO$REPO_NAME/api/migrations $DEBIAN_CONTAINER_NAME:/usr/src/
docker cp $PATH_TO_REPO$REPO_NAME/api/data/seeding.sql $DEBIAN_CONTAINER_NAME:/usr/src/

#deploiement de la structure de la base de donnée via sqitch
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "sqitch init ochalet --target db:pg://$DB_URI --top-dir /usr/src/migrations"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "sqitch deploy"

#seeding de la base de donné avec le fichier de seeding
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "psql postgres://$DB_URI -f /usr/src/seeding.sql"

#generation des clés ssh
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo | ssh-keygen -P ''"

#script de dump de la bdd
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "touch test.sh && chmod +x test.sh"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo 'echo \"db dump in progress ...\"' >> test.sh"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo 'DATE=\$(date +"%F-%H:%M")' >> test.sh"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo 'pg_dump postgres://$DB_URI > /home/$POSTGRES_CONTAINER_NAME\$DATE.sql' >> test.sh"

docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo 'echo \"sending dump for backup..\"' >> test.sh"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo 'rsync --delete -avrhe \"ssh -p $BACKUP_SERVER_SSH_PORT\" /home/ $DB_DUMP_BACKUP_SERVER' >> test.sh"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo 'echo \"dump sent on backup server !\"' >> test.sh"


#mise en place du cronjob pour effectuer les dump et les 
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "service cron start"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "touch db_dump_cron"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "echo '*/1 * * * * /bin/sh /backup-moving.sh >> /backup-moving.log 2>&1' >> db_dump_cron"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "crontab db_dump_cron && rm db_dump_cron" 
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "service cron restart" 




# Autoriser les connexions entrantes pour ces ports
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT 
iptables -A INPUT -p tcp --dport 9443 -j ACCEPT 
# Autoriser les connexions sortantes pour ces ports
iptables -A OUTPUT -p tcp --dport 3000 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 9443 -j ACCEPT



echo "${green_text}COPY THIS CONTAINER SSH KEY${reset_color}"
docker exec -it $DEBIAN_CONTAINER_NAME bash -c "cat /root/.ssh/id_rsa.pub"