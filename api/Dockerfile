FROM node:lts-alpine as build1
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]