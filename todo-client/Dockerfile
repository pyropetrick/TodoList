FROM node:18-bullseye AS builder
WORKDIR /app/static

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.23-alpine
WORKDIR /static
COPY --from=builder /app/static /static
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf