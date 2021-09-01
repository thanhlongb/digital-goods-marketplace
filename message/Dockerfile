FROM node:6-alpine

WORKDIR /chat

COPY package.json package.json

RUN npm install && npm install -g serverless
COPY serverless.yml  ./

RUN npm run install:dynamodb
VOLUME /chat/

CMD ["npm", "run", "start"]