# ─── Etapa 1: Build ───────────────────────────────────────
FROM node:20-alpine AS build

# Directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY vue-project/package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY vue-project/ .

# Compilar la app para producción
RUN npm run build

# ─── Etapa 2: Producción con Nginx ────────────────────────
FROM nginx:alpine AS production

# Copiar el build al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Arrancar Nginx
CMD ["nginx", "-g", "daemon off;"]