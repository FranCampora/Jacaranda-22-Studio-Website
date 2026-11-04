# Etapa 1: Construcción e instalación de dependencias
FROM node:lts-alpine AS build
WORKDIR /app

# Copiar solo archivos de definición de dependencias para aprovechar el cache de capas
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar el resto del código fuente del backend
COPY . .

# Etapa 2: Imagen final liviana de producción
FROM node:lts-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copiar la aplicación con sus dependencias ya listas
COPY --from=build /app ./

# Limpiar cache de npm para minimizar peso
RUN npm cache clean --force

EXPOSE 3000

CMD ["node", "server.js"]
