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
# SEGURIDAD & PERMISOS EN DESARROLLO
# =============================================================================
# Vite necesita escribir carpetas temporales y caché (.vite-temp, .vite) en /app/node_modules.
# Aseguramos la existencia y propiedad para el usuario 'node'.
RUN mkdir -p /app/node_modules/.vite-temp /app/node_modules/.vite && \
    chown -R node:node /app

# Para ejecutar como usuario seguro (no-root): dejar activa la línea 'USER node'.
# Para volver a ejecutar como root: comentar 'USER node' (o colocar 'USER root').
USER node

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
