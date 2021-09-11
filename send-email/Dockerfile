# syntax=docker/dockerfile:1
FROM public.ecr.aws/lambda/nodejs:14

ENV NODE_ENV=production
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]