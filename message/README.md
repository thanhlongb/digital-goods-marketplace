# Documentation

This service uses the following AWS services:

1. API Gateway (for manage WebSocket API)
2. Lambda function
3. CloudWatch (for monitoring log and debugging)
4. CloudFormation ( for automating the setup of AWS resources)
5. DynamoDB (for storing message chat log)
6. S3 (for storing static file)
7. ECR (for deploying docker container)

## Prerequisite

1. Please make sure that you run `npm install -g serverless`

2. Run `npm install`

## Guide to testing the API

1. `cd message`

2. Run `npm install -g wscat`

3. Run `serverless deploy` to deploy the services to AWS

Note: if you are running to profile error when running `serverless deploy`, please refer to this article for some help: <https://www.serverless.com/framework/docs/providers/aws/cli-reference/config-credentials/>

4. After deployed, you should see the wss:// link in endpoint section. Copy it for the next step.

Note: Before going to next step, make sure to trigger 4 lambda functions inside DynamoDB stream with batch size = 1 for development

5. Run `wscat -c ${PASTE HERE}`. For instance, `wscat -c  wss://1tno267nkc.execute-api.us-east-1.amazonaws.com/dev`

6. After connected, type in this format:

```bash
{"action": "message", "message": "whatever to chat here"}
```

7. Go to DynamoDB database, then go to WebsocketUsers table to see the message in messages column

## Guide to testing API locally

1. `cd message`

2. Run `npx serverless offline` command

3. Then open new terminal and type `wscat -c ws://localhost:3001`

4. Send the message

```bash
{"action": "message", "message", "whatever to chat here"}
```

## Docker container setup

1. For the docker , build the image first by running this command `docker build . -t chatservice`

2. To run the container, run the following command `docker run chatservice`

Note: You can also pull the docker image which I already deployed to ECR by this command `docker pull 920509648361.dkr.ecr.us-east-1.amazonaws.com/chatservice:latest`

## For Postman

Refer to this documentation for more info: <https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-how-to-call-websocket-api-connections.html>
