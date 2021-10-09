# build et lance tous les containers
docker-compose -p ochalet_stack up --build -d
sleep 1
apt-get update
apt-get install rsync -y
# docker exec -it ochalet_api sh "migrations/sqitch-init.sh" 
docker cp ./db_dump.sh ochalet_postgres:/db_dump.sh

crontab -l > db_dump_cron
echo "*/1 * * * * /bin/sh /root/linode-test/docker/backup-moving.sh >> /root/linode-test/docker/backup-moving.log 2>&1" >> db_dump_cron
crontab db_dump_cron
rm db_dump_cron



# Autoriser les connexions entrantes pour ces ports
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT 
iptables -A INPUT -p tcp --dport 9443 -j ACCEPT 
# Autoriser les connexions sortantes pour ces ports
iptables -A OUTPUT -p tcp --dport 3000 -j ACCEPT
iptables -A OUTPUT -p tcp --dport 9443 -j ACCEPT

