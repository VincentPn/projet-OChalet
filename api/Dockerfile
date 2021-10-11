FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
RUN npm install dotenv
COPY ./ ./
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "dev" ]