CRONJOB=
DB_URI=
DELETE_OLDER_THAN_DAYS=



touch dump.sh
echo " " >> dump.sh
sed -i '1c DATE=$(date +%F-%H:%M)' dump.sh
echo " " >> dump.sh
sed -i "2c pg_dump postgres://$DB_URI > /home/postgres\$DATE.sql" dump.sh
echo "find /home/ -type f -ctime +$DELETE_OLDER_THAN_DAYS -execdir rm -- '{}' \;" >> dump.sh



apt-get update && apt-get install cron -y
service cron start
touch dump_cron
echo "$CRONJOB /bin/sh /dump.sh >> /dump.log 2>&1" >> dump_cron
crontab dump_cron && rm dump_cron
service cron restart



