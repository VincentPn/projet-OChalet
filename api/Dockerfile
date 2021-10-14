FROM node:lts-alpine as builder
WORKDIR /home
COPY ./package.json .
RUN yarn
COPY . .
EXPOSE 3000
EXPOSE 3001
ENTRYPOINT [ "yarn" ]
CMD [ "run", "start" ]