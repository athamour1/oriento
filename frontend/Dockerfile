FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code and build Quasar SPA
COPY . .
RUN npx quasar build -m pwa

# Production runtime stage using NGINX
FROM nginx:alpine

# The default quasar output folder is dist/spa
COPY --from=builder /app/dist/spa /usr/share/nginx/html

# Expose the default NGINX port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
