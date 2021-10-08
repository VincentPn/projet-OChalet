# build et lance tous les containers
docker-compose -p ochalet_stack up --build -d
sleep 1
docker exec -it ochalet_api sh "migrations/sqitch-init.sh" 
docker cp ./db_dump.sh ochalet_postgres:/db_dump.sh


#Autoriser les connexions entrantes pour ces ports
# iptables -A INPUT -p tcp --dport 3000 -j ACCEPT #dev-talk api dev
#Autoriser les connexions sortantes pour ces ports
# iptables -A OUTPUT -p tcp --dport 3000 -j ACCEPT #dev-talk api dev

