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
# PERMISOS EN DESARROLLO
# =============================================================================
# 1. Damos permisos recursivos a node_modules para el usuario node
RUN mkdir -p /app/node_modules/.vite && chown -R node:node /app/node_modules

# 2. En desarrollo con Vite se ejecuta como root (o el usuario que monta volúmenes)
# para evitar que Vite falle al preparar dependencias en caché (error 504 / EACCES).
# Si en algún momento se desea forzar usuario no-root en producción, descomentar:
# USER node

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
