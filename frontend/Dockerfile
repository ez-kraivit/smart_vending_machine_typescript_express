FROM node:14.18.2-alpine
WORKDIR /app
COPY frontend/. /app/

RUN apk update && apk upgrade

RUN npm install

RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm","start" ]
