# Stage 1: Construcción (build de dependencias y código)
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos solo los archivos de dependencias para aprovechar la caché
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código de la aplicación
COPY . .

# Stage 2: Producción (imagen final optimizada)
FROM node:20-alpine
WORKDIR /app

# Metadatos OCI de la imagen
LABEL org.opencontainers.image.source="https://github.com/FranCampora/Jacaranda-22-Studio-Website" \
    org.opencontainers.image.description="Jacaranda Backend - Node.js API" \
    org.opencontainers.image.authors="Francisco Campora" \
    org.opencontainers.image.licenses="MIT"

# Argumentos para inyectar configuración de New Relic
#ARG NEW_RELIC_APP_NAME
#ARG NEW_RELIC_LICENSE_KEY

# Copiamos el resultado del build al contenedor final
COPY --from=build /app ./

# Limpiamos caché de npm para reducir el tamaño de la imagen
RUN npm cache clean --force

# Variables de entorno para producción y monitoreo
#ENV NODE_ENV=production \
#    NEW_RELIC_APP_NAME=$NEW_RELIC_APP_NAME \
#    NEW_RELIC_LICENSE_KEY=$NEW_RELIC_LICENSE_KEY \
#    NEW_RELIC_NO_CONFIG_FILE=true \
#    NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
#    NEW_RELIC_LOG=stdout \
#    PORT=4000

# Damos permisos al usuario 'node' sobre la app
RUN chown -R node:node /app

# Ejecutamos la app con usuario sin privilegios
USER node

# Puerto de escucha del backend
EXPOSE 4000

# Comando de inicio del servidor
CMD ["node", "server.js"]