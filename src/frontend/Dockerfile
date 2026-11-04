#build
FROM node:lts-alpine AS build
WORKDIR /app

#copio solo dependencias en package.json y package-lock.json para que no se reinstalen dependencias si solo cambio el código
COPY package*.json ./
RUN npm ci
#ci es mejor que install porque instala exactamente las dependencias que están en package-lock.json

#copio el resto del code
COPY . .
RUN npm run build

EXPOSE 80

#falta terminar este dockerfile