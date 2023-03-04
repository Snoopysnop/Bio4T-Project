FROM node:17-alpine as build

WORKDIR /usr/local/app/frontend

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /usr/local/app/frontend/build . 

COPY --from=build /usr/local/app/frontend/conf /etc/nginx

EXPOSE 80