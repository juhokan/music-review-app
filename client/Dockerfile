# Source: https://medium.com/@fullstackmatt/running-a-react-vite-app-in-docker-using-nginx-414ff9a302c5

# ===== BUILD =====
FROM node:18-alpine as build

# Strapi URL is acquired from "VITE_STRAPI_URL" env variable.
ENV VITE_STRAPI_URL=https://hifi-app-strapi.fly.dev

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

# ===== SERVE =====
FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/app/html
COPY nginx/ /etc/nginx/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]