BASEDIR="db-dump"

echo "db dump in progress ..."
docker exec -i ochalet_postgres sh "/db_dump.sh"

echo "sending dump for backup..."
rsync --delete -avrhe "ssh -p 26" $BASEDIR/ pi@192.168.1.10:/home/pi/test/
echo "dump sent on backup server !"

echo "deleting files older than 3 days..."
docker exec -i ochalet_postgres bash -c "find /home/ -type f -ctime +3 -execdir rm -- '{}' \;"



