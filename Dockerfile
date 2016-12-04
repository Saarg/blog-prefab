FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY api /usr/src/app/api
COPY dist /usr/src/app/dist
COPY server.js /usr/src/app
