FROM node:lts-alpine

WORKDIR /app

RUN apk --no-cache add curl

COPY package.json package.json
RUN npm install

COPY tsconfig.json tsconfig.json

COPY db.sqlite db.sqlite
COPY src src

CMD npm start