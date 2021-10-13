#!/bin/bash

# variables definition
green_text=`tput setaf 2`
red_text=`tput setaf 1`
reset_color=`tput sgr0`

# REQUIERED VARIABLES
DB_USERNAME="exemple"
DB_PASSWORD="exemple"
DB_PORT="5432"
DB_NAME="exemple"

PATH_TO_REPO="/exemple/exemple/"
REPO_NAME="exemple"

PATH_TO_MAIN_COMPOSE_FILE="$PATH_TO_REPO$REPO_NAME/docker/docker-compose.main.yml"
PATH_TO_DEBIAN_COMPOSE_FILE="$PATH_TO_REPO$REPO_NAME/docker/docker-compose.debian.yml"

#OPTIONAL VARIABLES
ENABLE_OPTIONAL_MODULES="true"

## db dump and send to another server via ssh for backup
ENABLE_BACKUP_SSH="true"
BACKUP_SERVER_SSH="exemple"
BACKUP_SERVER_SSH_PORT="exemple"
PATH_ON_BACKUP_SERVER="exemple"


## setup cronjob for periodical dump
ENABLE_DUMP_CRON="true"
CRONJOB="*/1 * * * *"
DELETE_OLDER_THAN_DAYS=5

## use sqitch for db structure
ENABLE_SQITCH="true"
PATH_TO_SQITCH_FOLDER="$PATH_TO_REPO$REPO_NAME/api/migrations"
# if you have seeding file
PATH_TO_SEEDING_FILE="$PATH_TO_REPO$REPO_NAME/api/data/seeding.sql"

## seeding database
ENABLE_SEEDING="true"
PATH_TO_SEEDING_FILE="$PATH_TO_REPO$REPO_NAME/api/data/seeding.sql"



#NOT TOUCH THIS VARIABLE
DB_URI="$DB_USERNAME:$DB_PASSWORD@postgres:$DB_PORT/$DB_NAME"

#-------------------------------------------------------------------------------------------------------------------#
while true; do
    read -p "Have you completed the conf file ? y/n " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

touch .env_postgres
echo " " >> .env_postgres
sed -i "1c POSTGRES_USER=$DB_USERNAME" .env_postgres
echo " " >> .env_postgres
sed -i "2c POSTGRES_PASSWORD=$DB_PASSWORD" .env_postgres
echo " " >> .env_postgres
sed -i "3c POSTGRES_DB=$DB_NAME" .env_postgres


touch .env_api
echo " " >> .env_api
sed -i "1c DATABASE_URL=postgres://$DB_URI" .env_api
echo " " >> .env_api
sed -i "2c REDIS_TLS_URL=redis://redis:6379" .env_api
echo " " >> .env_api
sed -i "3c NODE_ENV=docker" .env_api


case $ENABLE_OPTIONAL_MODULES in

  [tT]* | [yY]*) docker-compose -p $REPO_NAME -f $PATH_TO_DEBIAN_COMPOSE_FILE -f $PATH_TO_MAIN_COMPOSE_FILE up -d ;;

  [fF]* | "" | [nN]*) docker-compose -p $REPO_NAME -f $PATH_TO_MAIN_COMPOSE_FILE up -d ;;
esac

# SETUP SQITCH TO DEPLOY DATABASE STRUCTURE
case $ENABLE_SQITCH in

  [tT]* | [yY]*)

        case $ENABLE_OPTIONAL_MODULES in

        [tT]* | [yY]*)
        sed -i "1c REPO_NAME=\"$REPO_NAME\"" modules/sqitch.sh
        sed -i "2c PATH_TO_DEBIAN_COMPOSE_FILE=\"$PATH_TO_DEBIAN_COMPOSE_FILE\"" modules/sqitch.sh
        sed -i "3c PATH_TO_SQITCH_FOLDER=\"$PATH_TO_SQITCH_FOLDER\"" modules/sqitch.sh
        sed -i "4c PATH_TO_SEEDING_FILE=\"$PATH_TO_SEEDING_FILE\"" modules/sqitch.sh
        sed -i "5c DB_URI=\"$DB_URI\"" modules/sqitch.sh
        sh modules/sqitch.sh
        ;;

        [fF]* | "" | [nN]*) break;;
        esac 
  ;;

  [fF]* | [nN]* | "") break;;
esac

# SETUP SEEDING IN DATABASE
case $ENABLE_SEEDING in
[tT]* | [yY]*)

    case $ENABLE_OPTIONAL_MODULES in
    [tT]* | [yY]*)

        case $ENABLE_SQITCH in
        [tT]* | [yY]*)

            sed -i "1c PATH_TO_SEEDING_FILE=\"$PATH_TO_SEEDING_FILE\"" modules/seeding.sh
            sed -i "2c DB_URI=\"$DB_URI\"" modules/seeding.sh
            sh modules/seeding.sh
            ;;
        
        [fF]* | "" | [nN]*) 
            sed -i "1c PATH_TO_SEEDING_FILE=\"$PATH_TO_SEEDING_FILE\"" modules/seeding.sh
            sed -i "2c DB_URI=\"$DB_URI\"" modules/seeding.sh
            sed -i '4c docker exec -it debian bash -c \"apt-get update && apt-get install postgresql-client -y \"' modules/seeding.sh
            sh modules/seeding.sh
            ;;
        esac

    ;;
    [fF]* | "" | [nN]*) break;;
    esac 
;;
[fF]* | [nN]* | "") break;;
esac

# SETUP CRONJOB FOR PERIODICALY DUMP OF DATABASE
case $ENABLE_DUMP_CRON in

  [tT]* | [yY]*)

        case $ENABLE_OPTIONAL_MODULES in

        [tT]* | [yY]*)
        sed -i "1c CRONJOB=\"$CRONJOB\"" modules/cron.sh
        sed -i "2c DB_URI=\"$DB_URI\"" modules/cron.sh
        sed -i "3c DELETE_OLDER_THAN_DAYS=\"$DELETE_OLDER_THAN_DAYS\"" modules/cron.sh
        docker cp modules/cron.sh debian:/
        docker exec -it debian sh "/cron.sh"
        ;;

        [fF]* | "" | [nN]*) break;;
        esac 
  ;;

  [fF]* | [nN]* | "") break;;
esac

# SEND DUMPED DATABASE BACKUP FILES OVER SSH
case $ENABLE_BACKUP_SSH in

  [tT]* | [yY]*)

        case $ENABLE_OPTIONAL_MODULES in

        [tT]* | [yY]*)
        sed -i "1c BACKUP_SERVER_SSH=\"$BACKUP_SERVER_SSH\"" modules/ssh1.sh
        sed -i "2c PATH_ON_BACKUP_SERVER=\"$PATH_ON_BACKUP_SERVER\"" modules/ssh1.sh
        sed -i "3c BACKUP_SERVER_SSH_PORT=\"$BACKUP_SERVER_SSH_PORT\"" modules/ssh1.sh
        docker cp modules/ssh1.sh debian:/
        docker exec -it debian sh "/ssh1.sh"
        echo "${green_text}COPY THIS KEY INTO YOUR authorized_keys FILE${reset_color}"
        echo "${green_text}----------------------------------------------------------------------------${reset_color}"
        docker exec -it debian bash -c "cat ~/.ssh/id_rsa.pub"
        echo "${green_text}----------------------------------------------------------------------------${reset_color}"

        while true; do
            read -p "Type yes when key is copied or no to abort this script ? y/n " yn
            case $yn in
                [Yy]* ) break;;
                [Nn]* ) docker-compose -p $REPO_NAME -f $PATH_TO_MAIN_COMPOSE_FILE -f $PATH_TO_DEBIAN_COMPOSE_FILE down -v  
                exit;;
            * ) echo "Please answer yes or no.";;
            esac
        done

        sed -i "1c BACKUP_SERVER_SSH=\"$BACKUP_SERVER_SSH\"" modules/ssh2.sh
        sed -i "2c PATH_ON_BACKUP_SERVER=\"$PATH_ON_BACKUP_SERVER\"" modules/ssh2.sh
        sed -i "3c BACKUP_SERVER_SSH_PORT=\"$BACKUP_SERVER_SSH_PORT\"" modules/ssh2.sh
        docker cp modules/ssh2.sh debian:/
        docker exec -it debian sh "/ssh2.sh"
        
        ;;

        [fF]* | "" | [nN]*) break;;
        esac 
  ;;

  [fF]* | [nN]* | "") break;;
esac


sed -i '1c BACKUP_SERVER_SSH=' modules/ssh1.sh
sed -i '2c PATH_ON_BACKUP_SERVER=' modules/ssh1.sh
sed -i '3c BACKUP_SERVER_SSH_PORT=' modules/ssh1.sh

sed -i '1c BACKUP_SERVER_SSH=' modules/ssh2.sh
sed -i '2c PATH_ON_BACKUP_SERVER=' modules/ssh2.sh
sed -i '3c BACKUP_SERVER_SSH_PORT=' modules/ssh2.sh

sed -i '1c CRONJOB=' modules/cron.sh
sed -i '2c DB_URI=' modules/cron.sh
sed -i '3c DELETE_OLDER_THAN_DAYS=' modules/cron.sh

sed -i '1c PATH_TO_SEEDING_FILE=' modules/seeding.sh
sed -i '2c DB_URI=' modules/seeding.sh

sed -i '1c REPO_NAME=' modules/sqitch.sh
sed -i '2c PATH_TO_DEBIAN_COMPOSE_FILE=' modules/sqitch.sh
sed -i '3c PATH_TO_SQITCH_FOLDER=' modules/sqitch.sh
sed -i '4c PATH_TO_SEEDING_FILE=' modules/sqitch.sh
sed -i '5c DB_URI=' modules/sqitch.sh







