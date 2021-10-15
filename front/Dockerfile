FROM nginx:stable-alpine
COPY build/ /bin/www
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl/privkey.pem /etc/ssl/private/
COPY ssl/fullchain.pem /etc/ssl/certs/
EXPOSE 80
EXPOSE 443
CMD [ "nginx", "-g", "daemon off;" ]