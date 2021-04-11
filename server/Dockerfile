FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .
#COPY ormconfig.env ormconfig.env

RUN npm run build

ENV NODE_ENV production

CMD ["node", "dist/index.js"]
USER node