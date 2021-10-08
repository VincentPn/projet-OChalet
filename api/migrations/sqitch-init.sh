sqitch init ochalet --target db:pg://ochalet:ochalet@ochalet_postgres:5432/ochalet --top-dir ./migrations/
sqitch deploy
psql postgres://ochalet:ochalet@ochalet_postgres:5432/ochalet -f migrations/seeding/seeding.sql




