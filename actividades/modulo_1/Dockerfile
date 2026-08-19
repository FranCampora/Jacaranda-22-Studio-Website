FROM node:lts-alpine

WORKDIR /app

#COPY package*.json ./
#RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]


#Crear la imagen 'docker build -t node-server-1 .'

#Levantar contenedor 'docker run -d --name app-1 -p 3000:3000 -v "%cd%":/app node-server-1'

#Eliminar contenedor 'docker rm -f app-1'

#Reiniciar contenedor 'docker restart app-1'