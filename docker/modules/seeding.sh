PATH_TO_SEEDING_FILE=
SEEDING_FILE_NAME=
DB_URI=
docker cp $PATH_TO_SEEDING_FILE$SEEDING_FILE_NAME debian:/
docker exec -it debian bash -c "apt-get update && apt-get install postgresql-client -y "
docker exec -it debian bash -c "psql postgres://$DB_URI -f /$SEEDING_FILE_NAME"