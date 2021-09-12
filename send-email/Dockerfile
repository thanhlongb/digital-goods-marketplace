FROM public.ecr.aws/lambda/nodejs:14

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
ENTRYPOINT node index.js