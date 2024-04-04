# Source: https://docs.strapi.io/dev-docs/installation/docker#production-environments

# ===== BUILD =====
FROM node:18-alpine3.18 as build
# Installing "libvips-dev" for "sharp" compatibility.
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev && rm -rf /var/cache/apk/* > /dev/null 2>&1
ENV NODE_ENV=production
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN npm i --production
WORKDIR /opt/app
COPY ./ .
RUN npm run build

# ===== APP =====
FROM node:18-alpine3.18 as app
# Installing "libvips-dev" for "sharp" compatibility.
RUN apk add vips-dev
RUN rm -rf /var/cache/apk/*
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules
ENV PATH /opt/node_modules/.bin:$PATH
COPY --from=build /opt/app ./
EXPOSE 1337
CMD ["npm", "start"]
