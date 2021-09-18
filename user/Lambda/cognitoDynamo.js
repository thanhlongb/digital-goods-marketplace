const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

exports.handler = async (event, context) => {
  console.log(event);
  // Remember to set the environment variable
  const tableName = process.env.TABLE_NAME;
  const region = process.env.REGION;
  const defaultAvatar =
    "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png";
  // const fbRegex = new RegExp("/(facebook_)+(\d+)/g");
  // const gglRegex = new RegExp("/(google_)+(\d+)/g");
  console.log("table=" + tableName + " -- region=" + region);

  AWS.config.update({ region: region });

  // If the required parameters are present, proceed
  if (event.request.userAttributes.sub) {
    let avatar;
    // Check the sign up source (Facebook / Google / Original Form) to map avatar
    if (event.userName.includes("facebook_")) {
      const txt = event.request.userAttributes.picture;
      const response = JSON.parse(txt);
      avatar = response.data.url;
    } else if (event.userName.includes("google_")) {
      avatar = event.request.userAttributes.picture;
    } else avatar = defaultAvatar;
    // Write data to DDB
    let ddbParams = {
      Item: {
        id: { S: event.userName },
        name: { S: event.request.userAttributes.name },
        email: { S: event.request.userAttributes.email },
        avatar: { S: avatar },
      },
      TableName: tableName,
    };

    // Call DynamoDB
    try {
      await ddb.putItem(ddbParams).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    console.log("Error: Nothing was written to DDB");
    context.done(null, event);
  }
};
