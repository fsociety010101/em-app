FROM node:alpine AS build

WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine AS ngx

COPY --from=build /app/dist/em-app-front/ /usr/share/nginx/html

EXPOSE 80
