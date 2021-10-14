#!/bin/bash

# variables definition
green_text=`tput setaf 2`
red_text=`tput setaf 1`
reset_color=`tput sgr0`

# REQUIERED VARIABLES
DB_USERNAME="ochalet"
DB_PASSWORD="ochalet"
DB_PORT="5432"
DB_NAME="ochalet"

PATH_TO_REPO="../../"
REPO_NAME="linode-test"

PATH_TO_MAIN_COMPOSE_FILE="./deployement/docker-compose.main.yml"
PATH_TO_DEBIAN_COMPOSE_FILE="./deployement/docker-compose.debian.yml"
PATH_TO_DATABASE_COMPOSE_FILE="./deployement/docker-compose.database.yml"
PATH_TO_FRONT_COMPOSE_FILE="./deployement/docker-compose.front.yml"

#OPTIONAL VARIABLES
ENABLE_OPTIONAL_MODULES="true"

## db dump and send to another server via ssh for backup
ENABLE_BACKUP_SSH="false"
BACKUP_SERVER_SSH="rpiweb.hopto.org"
BACKUP_SERVER_SSH_PORT="26"
PATH_ON_BACKUP_SERVER="/home/pi/ochalet_dump/"


## setup cronjob for periodical dump
ENABLE_DUMP_CRON="false"
CRONJOB="*/1 * * * *"
DELETE_OLDER_THAN_DAYS=5

## use sqitch for db structure
ENABLE_SQITCH="true"
PATH_TO_SQITCH_FOLDER="$PATH_TO_REPO$REPO_NAME/api/migrations"

## seeding database
ENABLE_SEEDING="true"
PATH_TO_SEEDING_FILE="$PATH_TO_REPO$REPO_NAME/api/data/seeding.sql"

#NOT TOUCH THIS VARIABLE
DB_URI="$DB_USERNAME:$DB_PASSWORD@postgres:$DB_PORT/$DB_NAME"

#-------------------------------------------------------------------------------------------------------------------#
#SETUP shorcuts for managing containers without relauching this looooooong script

touch container-stopper.sh
echo " " >> container-stopper.sh
sed -i "1c docker-compose -p $REPO_NAME -f $PATH_TO_DATABASE_COMPOSE_FILE -f $PATH_TO_FRONT_COMPOSE_FILE -f $PATH_TO_MAIN_COMPOSE_FILE -f $PATH_TO_DEBIAN_COMPOSE_FILE down -v && docker image rm api:v1.0.0 front:v1.0.0" container-stopper.sh

touch api-stopper.sh
echo " " >> api-stopper.sh
sed -i "1c docker stop api && docker rm api && docker image rm api:v1.0.0" api-stopper.sh

touch api-rebuilder.sh
echo " " >> api-rebuilder.sh
sed -i "1c docker-compose -p $REPO_NAME -f $PATH_TO_DATABASE_COMPOSE_FILE -f $PATH_TO_MAIN_COMPOSE_FILE -f $PATH_TO_DEBIAN_COMPOSE_FILE up -d" api-rebuilder.sh

touch front-stopper.sh
echo " " >> front-stopper.sh
sed -i "1c docker stop front && docker rm front && docker image rm front:v1.0.0" front-stopper.sh

touch front-rebuilder.sh
echo " " >> front-rebuilder.sh
sed -i "1c docker-compose -p $REPO_NAME -f $PATH_TO_DATABASE_COMPOSE_FILE -f $PATH_TO_FRONT_COMPOSE_FILE -f $PATH_TO_DEBIAN_COMPOSE_FILE up -d" front-rebuilder.sh



#Config file confirmation before run
while true; do
    read -p "Have you completed the conf file ? y/n " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

#-------------------------------------------------------------------------------------------------------------
# Populating .env files for compose files
touch ./environnement/.env_postgres
echo " " >> ./environnement/.env_postgres
sed -i "1c POSTGRES_USER=$DB_USERNAME" ./environnement/.env_postgres
echo " " >> .env_postgres
sed -i "2c POSTGRES_PASSWORD=$DB_PASSWORD" ./environnement/.env_postgres
echo " " >> .env_postgres
sed -i "3c POSTGRES_DB=$DB_NAME" ./environnement/.env_postgres

touch ./environnement/.env_api
echo " " >> ./environnement/.env_api
sed -i "1c DATABASE_URL=postgres://$DB_URI" .env_api
echo " " >> ./environnement/.env_api
sed -i "2c REDIS_TLS_URL=redis://redis:6379" .env_api
echo " " >> ./environnement/.env_api
sed -i "3c NODE_ENV=docker" ./environnement/.env_api

#-------------------------------------------------------------------------------------------------------------
# Enabling or not optionnal modules, if not the debian container compose file not be used
case $ENABLE_OPTIONAL_MODULES in

  [tT]* | [yY]*) docker-compose -p $REPO_NAME -f $PATH_TO_FRONT_COMPOSE_FILE -f $PATH_TO_DATABASE_COMPOSE_FILE -f $PATH_TO_DEBIAN_COMPOSE_FILE -f $PATH_TO_MAIN_COMPOSE_FILE up -d ;;

  [fF]* | "" | [nN]*) docker-compose -p $REPO_NAME -f $PATH_TO_FRONT_COMPOSE_FILE -f $PATH_TO_DATABASE_COMPOSE_FILE -f $PATH_TO_MAIN_COMPOSE_FILE up -d ;;
esac

#------------------------------------------------------------------------------------------------------------
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

#------------------------------------------------------------------------------------------------------------
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

#---------------------------------------------------------------------------------------------------------------
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

#---------------------------------------------------------------------------------------------------------------
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

#------------------------------------------------------------------------------#
#UNPOPULATING FILES AFTER SCRIPT RUN

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


#--------------------------------------------------------------------------------------------------#

#Setup iptables rules for cloud vm to accept only authorized port incoming and outgoing

# #Flush
# iptables -F INPUT
# iptables -F OUTPUT

# #Policies
# iptables -P OUTPUT DROP
# iptables -P INPUT DROP

# #Authorize DNS port
# iptables -A INPUT -p tcp --dport 53 -j ACCEPT
# iptables -A INPUT -p udp --dport 53 -j ACCEPT

# #Authorize loopback
# iptables -A INPUT -i lo -j ACCEPT
# iptables -A OUTPUT -o lo -j ACCEPT

# #Authorize established connections
# iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
# iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# #Authorize connections (outgoing and incoming) for this ip => must be fix ip or domain name.
# iptables -A INPUT -s rpiweb.hopto.org -j ACCEPT
# iptables -A OUTPUT -s rpiweb.hopto.org -j ACCEPT
# iptables -A FORWARD -s rpiweb.hopto.org -j ACCEPT

# #Incoming authorized ports
# iptables -A INPUT -p udp --dport 2525 -j ACCEPT #mailtrap
# iptables -A INPUT -p tcp --dport 2525 -j ACCEPT #mailtrap
# iptables -A INPUT -p tcp --dport 3000 -j ACCEPT #API

# #Outgoing authorized ports
# iptables -A OUTPUT -p udp --dport 2525 -j ACCEPT #mailtrap
# iptables -A OUTPUT -p tcp --dport 2525 -j ACCEPT #mailtrap
# iptables -A OUTPUT -p tcp --dport 3000 -j ACCEPT #API
 

