FROM node:14.18.3-alpine3.15 as builder 
WORKDIR /app
COPY backend/package.json /app
RUN npm install 
COPY backend/. /app
RUN npm run build
COPY backend/src/public /app/build/src/public
RUN npm install --production

FROM node:14.18.3-alpine3.15
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 5230
ENTRYPOINT ["npm","run","docker:server"]
