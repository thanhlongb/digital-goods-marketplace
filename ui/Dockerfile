FROM node:14-alpine 

WORKDIR /usr/src/app

COPY . ./

EXPOSE 3000

RUN npm i
# RUN npm run build

CMD ["npm", "run", "dev"]