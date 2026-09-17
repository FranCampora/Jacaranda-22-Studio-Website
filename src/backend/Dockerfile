#build
FROM node:lts-alpine AS build
WORKDIR /app

#copio solo dependencias en package.json y package-lock.json para que no se reinstalen dependencias si solo cambio el código
COPY package*.json ./
RUN npm ci
#ci es mejor que install porque instala exactamente las dependencias que están en package-lock.json

#copio el resto del code
COPY . .

#produccion
FROM node:lts-alpine AS production
WORKDIR /app

COPY --from=build /app ./

#Limpio el cache de npm para bajar el tamaño de la imagen
RUN npm cache clean --force

EXPOSE 3000

CMD ["node", "server.js"]


#Crear la imagen 'docker build -t server-express-1 .'

#Levantar contenedor 'docker run -d --name app-1 -p 3000:3000 -v "%cd%":/app server-express-1'

#Eliminar contenedor 'docker rm -f app-1'

#Reiniciar contenedor 'docker restart app-1'