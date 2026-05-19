#Stage 1: Build the application
#FROM
WORKDIR /app



COPY package*.json ./
RUN npm ci

# Stage 2: Servir la app con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

LABEL org.opencontainers.image.source="https://github.com/FranCampora/Jacaranda-22-Studio-Website" \
    org.opencontainers.image.description="Jacaranda Frontend - React App" \
    org.opencontainers.image.authors="Francisco Campora" \
    org.opencontainers.image.licenses="MIT"

COPY --from=build --chown=nginx:nginx /app/build .

EXPOSE 80

# Ejecutamos con usuario sin privilegios
USER nginx

CMD ["nginx", "-g", "daemon off;"]