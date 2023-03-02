FROM nginx:latest

COPY ./conf /etc/nginx/

COPY ./ssl /usr/share/nginx/ssl

EXPOSE 80
