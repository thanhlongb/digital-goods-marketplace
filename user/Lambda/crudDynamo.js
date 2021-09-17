const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

// Check if the response object is empty
function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

exports.handler = async (event) => {
  const table = process.env.TABLE_NAME; // Remember to set the environment variable
  let resource = event.httpMethod + " " + event.resource;
  let response;
  let body;
  let statusCode;
  console.log(resource);
  try {
    switch (resource) {
      // Get all users
      case "GET /users":
        response = await dynamo.scan({ TableName: table }).promise();
        body = response.Items;
        break;
      // Get single user's info
      case "GET /users/{id}":
        response = await dynamo
          .get({
            TableName: table,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        if (isEmpty(response)) {
          statusCode = 400;
          body = { error: "User not found" };
        } else {
          statusCode = 200;
          body = response.Item;
        }
        break;
      // Get single user's avatar
      case "GET /users/{id}/avatar":
        response = await dynamo
          .get({
            TableName: table,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        if (isEmpty(response)) {
          statusCode = 400;
          body = { error: "User not found" };
        } else {
          statusCode = 200;
          body = { avatar: response.Item.avatar };
        }
        break;
      // Update single user's avatar
      case "PATCH /users/{id}/avatar":
        let requestJSON = JSON.parse(event.body);
        // Find if the user exist:
        response = await dynamo
          .get({
            TableName: table,
            Key: {
              id: event.pathParameters.id,
            },
          })
          .promise();
        if (isEmpty(response)) {
          statusCode = 400;
          body = { error: "User not found" };
        } else {
          statusCode = 200;
          await dynamo
            .update({
              TableName: table,
              Key: {
                id: event.pathParameters.id,
              },
              UpdateExpression: "set avatar = :a",
              ExpressionAttributeValues: {
                ":a": requestJSON.avatar,
              },
              ReturnValues: "UPDATED_NEW",
            })
            .promise();
          body = { avatar: requestJSON.avatar };
        }
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,PATCH",
    },
    body: body,
  };
};
