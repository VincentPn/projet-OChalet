now=$(date +"%F-%H:%M")
pg_dump postgres://ochalet:ochalet@ochalet_postgres:5432/ochalet > /home/ochalet_dump_$now.sql