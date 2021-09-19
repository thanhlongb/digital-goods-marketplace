// Create the S3 service object

const AWS = require('aws-sdk');
// AWS.config.update({ region: process.env.AWS_REGION })
AWS.config.update({
    region: 'ap-southeast-1',
    signatureVersion: 'v4'
});
const s3 = new AWS.S3();

// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300;

// Main Lambda entry point
exports.handler = async (event, context, callback) => {
    return await getUploadURL(event, context, callback);
};

const getUploadURL = async function (event, context, callback) {
    var statusCode = 500;
    var responseBody = {};

    try {
        let method = event.requestContext.http.method;
        let path = event.requestContext.http.path;
        let resource = method + " " + path
        
        if (resource == "GET /upload") {
            if (!("queryStringParameters" in event))
                throw new Error("Query params is empty.");
            const queryParams = event.queryStringParameters;

            if ("fileType" in queryParams && 
                "dir" in queryParams) {
                const fileName = context.awsRequestId; 
                const fileType = queryParams.fileType.toLowerCase();
                const file = `${fileName}.${fileType}`;
                const dir = queryParams.dir;

                // Get signed URL from S3
                const s3Params = {
                    Bucket: process.env.UploadBucket,
                    Key: `${dir}/${file}`,
                    Expires: URL_EXPIRATION_SECONDS,
                    ContentType: fileType
                    // ContentType: `image/${fileType}`,
    
                    // This ACL makes the uploaded object publicly readable. You must also uncomment
                    // the extra permission for the Lambda function in the SAM template.
                    // ACL: 'public-read'
                };
    
                console.log('Params: ', s3Params);
    
                const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
                responseBody = JSON.stringify({
                    uploadURL: uploadURL,
                    file: `${dir}/${file}`,
                    expiration: Math.floor(Date.now()/1000) + URL_EXPIRATION_SECONDS
                });
                statusCode = 200;   // success            
            } else {
                statusCode = 400;   // client error
                responseBody = {
                    "error": "Missing `dir` or `fileType` params."
                };
            }
        } else {
            throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 500;   // server error
        responseBody = { "error": err };
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,PUT,POST,GET",
            "Content-Type": "application/json",
        },
        body: responseBody,
    };

    return response;
};