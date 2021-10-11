PATH_TO_SEEDING_FILE=
DB_URI=
docker cp $PATH_TO_SEEDING_FILE debian:/
docker exec -it debian bash -c "apt-get update && apt-get install postgresql-client -y "
docker exec -it debian bash -c "psql postgres://$DB_URI -f /seeding.sql"