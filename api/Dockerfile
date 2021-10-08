FROM node:16-slim
WORKDIR /usr/src/app
RUN apt update
RUN apt install sqitch -y
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]