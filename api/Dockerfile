FROM node:lts-alpine as builder
WORKDIR /home
COPY ./package.json ./
RUN npm install
RUN npm install -g nodemon
COPY ./ ./
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]