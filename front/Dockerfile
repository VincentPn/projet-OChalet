FROM nginx:stable-alpine
COPY build/ /bin/www
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443
CMD [ "nginx", "-g", "daemon off;" ]