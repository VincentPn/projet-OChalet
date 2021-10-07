FROM debian:stable-slim
WORKDIR /usr/src/app
COPY ./ ./
RUN apt-get update
RUN apt-get install sqitch -y
CMD [ "sh", "sqitch-init.sh" ]
