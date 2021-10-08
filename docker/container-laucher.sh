docker-compose -p ochalet_stack up --build -d
#Autoriser les connexions entrantes pour ces ports
iptables -A INPUT -p tcp --dport 3000 -j ACCEPT

#Autoriser les connexions sortantes pour ces ports
iptables -A OUTPUT -p tcp --dport 3000 -j ACCEPT

