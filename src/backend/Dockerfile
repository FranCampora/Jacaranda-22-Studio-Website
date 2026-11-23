<<<<<<< HEAD
# =============================================================================
# MULTI-STAGE BUILD — Backend Jacaranda 22 Studio
# =============================================================================
#
# Este Dockerfile usa Multi-Stage Building con 3 etapas:
#
#   stage "build"      → Instala SOLO dependencias de producción (sin devDeps).
#   stage "production" → Imagen final liviana lista para correr la API.
#   stage "test"       → Imagen con devDependencies (jest, supertest) para CI.
#
# IMPORTANTE — Separación de responsabilidades:
#   • docker compose up --build       → Usa el stage "production". No instala Jest.
#   • docker build --target test ...  → Usa el stage "test". Solo para verificación.
#   • El docker-compose.yml NO SE MODIFICA. Puertos 3000 y 5173 sin cambios.
#   • El stage "test" es 100% opcional y nunca se usa en producción ni en Compose.
#
# Para correr los tests en Docker manualmente (sin Compose):
#   docker build --target test -t jacaranda-test ./src/backend
#   docker run --rm jacaranda-test
# =============================================================================

# -----------------------------------------------------------------------------
# Etapa 1 — build: instala dependencias de producción y copia el código fuente
# -----------------------------------------------------------------------------
FROM node:lts-alpine AS build
WORKDIR /app

# Copiar solo archivos de definición de dependencias para aprovechar el cache de capas
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el resto del código fuente del backend
COPY . .

# -----------------------------------------------------------------------------
# Etapa 2 — test: imagen con devDependencies (jest + supertest) para correr tests
#
# Esta etapa NO es usada por defecto por docker-compose up. Es exclusiva para
# verificación manual o cuando se selecciona target test.
# -----------------------------------------------------------------------------
FROM build AS test
WORKDIR /app

ENV NODE_ENV=test

# Reinstalar incluyendo devDependencies (jest, supertest, nodemon)
RUN npm ci

CMD ["npm", "test"]

# -----------------------------------------------------------------------------
# Etapa 3 — production: imagen final liviana lista para servir la API REST
#
# Al estar al final del archivo, es la etapa por defecto si no se especifica target.
# -----------------------------------------------------------------------------
FROM node:lts-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copiar la aplicación con sus dependencias ya listas desde el stage build
COPY --from=build /app ./

# Limpiar cache de npm para minimizar peso de la imagen
RUN npm cache clean --force

# Crear directorio de datos y otorgar permisos al usuario no-root 'node'
# 'node' es un usuario estándar preconfigurado en las imágenes oficiales de Node Alpine.
RUN mkdir -p /app/data && chown -R node:node /app

# =============================================================================
# SEGURIDAD: USUARIO NO-ROOT
# =============================================================================
# Para ejecutar como usuario seguro (no-root): dejar activa la línea 'USER node'.
# Para volver a ejecutar como root: comentar 'USER node' (o colocar 'USER root').
USER node

EXPOSE 3000

CMD ["node", "server.js"]
=======
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
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
