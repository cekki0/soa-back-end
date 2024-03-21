FROM node:21-alpine

RUN npm install -g nodemon

WORKDIR /home/node/app

COPY package.json .

RUN npm install

CMD ["npm","run","dev"]