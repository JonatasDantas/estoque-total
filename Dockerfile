# Stage 1 - Responsible for building app
FROM node:12.18 as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install
COPY ./ /app/
ARG env=prod
RUN npm run build-prod

# Stage 2 - Responsible for deploy app
FROM nginx:1.13
COPY --from=node /app/build /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf