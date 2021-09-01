FROM public.ecr.aws/lambda/nodejs:14

ARG FUNCTION_DIR="/var/task"

RUN mkdir -p ${FUNCTION_DIR}


COPY package.json ${FUNCTION_DIR}

RUN npm install
COPY . .

EXPOSE 8000
ENTRYPOINT npx serverless offline