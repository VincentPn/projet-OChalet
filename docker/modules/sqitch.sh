REPO_NAME=
PATH_TO_DEBIAN_COMPOSE_FILE=
PATH_TO_SQITCH_FOLDER=
PATH_TO_SEEDING_FILE=
DB_URI=


#installe sqitch dans le container debian sur le meme network que l'api
docker exec -it debian bash -c "apt-get update && apt-get install sqitch -y"
docker cp $PATH_TO_SQITCH_FOLDER/. debian:/

#deploiement de la structure de la base de donnée via sqitch
docker exec -it debian bash -c "sqitch init $REPO_NAME --target db:pg://$DB_URI"
docker exec -it debian bash -c "sqitch deploy"





