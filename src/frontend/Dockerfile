<<<<<<< HEAD
# =============================================================================
# MULTI-STAGE BUILD — Frontend Jacaranda 22 Studio (Vue 3 + Vite)
# =============================================================================

# Etapa 1: Dependencias y código base
FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Etapa 2: Stage de test / verificación (para build --target test)
FROM build AS test
# Valida la compilación del bundle para certificar que no haya errores de sintaxis o imports
RUN npm run build
CMD ["echo", "Frontend tests/build check completado exitosamente"]

# Etapa 3: Desarrollo / Ejecución normal (al estar al final, es la etapa por defecto)
FROM build AS development

# =============================================================================
# SEGURIDAD: USUARIO NO-ROOT
# =============================================================================
# Para ejecutar como usuario seguro (no-root): dejar activa la línea 'USER node'.
# Para volver a ejecutar como root: comentar 'USER node' (o colocar 'USER root').
USER node

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
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
RUN npm run build

EXPOSE 80

#falta terminar este dockerfile
>>>>>>> c929ec0690a35226130180262185f063947eb3f1
