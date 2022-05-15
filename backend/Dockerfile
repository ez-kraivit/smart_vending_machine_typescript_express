FROM node:14.18.2-buster-slim as builder
WORKDIR /usr/app
COPY package.json ./
RUN npm install --production
COPY build/ ./build/
WORKDIR ./build
EXPOSE 5230
CMD ["npm","run","docker:server"]
