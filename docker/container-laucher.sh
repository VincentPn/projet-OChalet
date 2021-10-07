docker-compose -p ochalet_stack up --build -d
sleep 10
docker stop ochalet_sqitch 
docker rm ochalet_sqitch
docker image rm ochalet_stack_ochalet_sqitch
docker image rm a59bf83b71db