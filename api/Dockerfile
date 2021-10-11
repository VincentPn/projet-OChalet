FROM node:lts-alpine as builder
WORKDIR /home
COPY ./package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]