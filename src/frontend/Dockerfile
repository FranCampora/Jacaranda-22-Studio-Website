# =============================================================================
# MULTI-STAGE BUILD — Frontend Jacaranda 22 Studio (Vue 3 + Vite)
# =============================================================================

# Etapa 1: Dependencias y código base
FROM node:lts-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Etapa 2: Desarrollo / Ejecución normal (usada por Docker Compose por defecto)
FROM build AS development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Etapa 3: Stage de test / verificación (para build --target test)
FROM build AS test
# Valida la compilación del bundle para certificar que no haya errores de sintaxis o imports
RUN npm run build
CMD ["echo", "Frontend tests/build check completado exitosamente"]
