FROM nginx:stable-alpine
COPY build/ /bin/www
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/privkey.pem /etc/ssl/
COPY ./ssl/fullchain.pem /etc/ssl/
EXPOSE 80
EXPOSE 443
CMD [ "nginx", "-g", "daemon off;" ]