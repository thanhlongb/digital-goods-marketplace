#### THIS README SHOULD ONLY FOCUS ON LAMBDA FUNCTION. OTHER SERVICES WILL BE MODIFIED TO A SEPARATE DOCS FOR POLICY AND SETTING.

The topics should be covered:

1. Set up User Pools (with SES (implementing))
2. Create a DynamoDB
3. Set up Lambda Function (this README)
4. Create a new API Gateway

If didn't have enough time, AWS official document for setting up each service can be reference

## I. Setup Lambda function to copy data from Cognito User Pool -> DynamoDB with default avatar.

Before getting start, we need to create Role & Policy for the Lambda function to access other AWS services.

1. Access `IAM Management`, select `Create role`
2. Under "Common use cases", select `Lambda` and process to `Next Permissions`
   3.Search in the policies and select:

   3.1. DynamoDBFullAccess

   3.2. AmazonCognitoDeveloperAuthenticatedIdentities

   3.3. AmazonCognitoPowerUser

   3.4. CloudWatchFullAccess (Debug purpose)

3. Just skip the tag and head to preview, name the Role + give it a description, review the selected policy and create role.
4. In order to hide our access key to the service, the best practice is to utilize Lambda's built-in `Environment variables` to secure the privacy. After successfully create the function, head to `Configuration`
5. Select `Environment variables` in the left panel. Press `Edit` to start add new variables.
6. Add the variable name for `key` and the access key to `value`. For example:

- `TABLE_NAME`: user-service-dmp // Change your table name here
- `REGION`: ap-southeast-1 // Change your region here

From the Cognito User Pool, in `General Settings`, select `Triggers`. In `Post Confirmation` select the name of Lambda function to send information to DynamoDB.

Copy the lambda function: `cognitoDynamo.js`

## II. Setup Lambda function to CRUD data from DynamoDB

Reference the Lambda x API Gateway x DynamoDB from the tutorial (week 5)

1. Repeat the setting policy process from Lambda and ensure these policies below:
   1.1. DynamoDBFullAccess

   1.2. CloudWatchFullAccess (Debug purpose)

2. Copy the lambda function: `crudDynamo.js`
