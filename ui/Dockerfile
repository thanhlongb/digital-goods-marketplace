FROM node:14-alpine 

WORKDIR /usr/src/app

COPY . ./

EXPOSE 3000

# install dependencies
RUN npm i

# build the app
RUN npm run build

CMD ["npm", "run", "start"]