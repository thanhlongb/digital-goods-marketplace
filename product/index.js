const AWS = require('aws-sdk');
const sesClient = new AWS.SES();
const https = require('https');
const productRoute = require("./routes/product");
const reviewRoute = require("./routes/review");
const purchaseRoute = require("./routes/purchase");
const categoryRoute = require("./routes/category");

const { Op } = require("sequelize");


exports.handler = async(event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    console.log(event);
    const productsResourcePath = "/products";
    const reviewsResourcePath = "/reviews";
    const categoriesResourcePath = "/categories";
    const purchasesResourcePath = "/purchases";

    let responseHeaders = {
        "Content-Type": "application/json",
    };
    let responseCode = 200;
    let responseBody = {};

    try {
        /**
         * DO NOT remove the curly braces
         * at the end of the case statements.
         */
        switch (event.routeKey) {
            case `GET ${productsResourcePath}`:
                responseBody = await productRoute.getAll();
                break;
            case `POST ${productsResourcePath}`:
                if (!("body" in event)) throw new Error("Request body is empty.");
                responseBody = await productRoute.create(event.body);
                break;
            case `GET ${productsResourcePath}/recent`:
                {
                    let limit = "queryStringParameters" in event ?
                        event.queryStringParameters.limit : 6;
                    responseBody = await productRoute.getRecent(limit);
                    break;
                }
            case `GET ${productsResourcePath}/selling`:
                if (!("queryStringParameters" in event))
                    throw new Error("Missing query params.");
                if (!("user" in event.queryStringParameters))
                    throw new Error("Missing query param 'user'.");
                responseBody = await productRoute.getSelling(event.queryStringParameters.user);
                break;
            case `GET ${productsResourcePath}/bought`:
                if (!("queryStringParameters" in event))
                    throw new Error("Missing query params.");
                if (!("user" in event.queryStringParameters))
                    throw new Error("Missing query param 'user'.");
                responseBody = await productRoute.getBought(event.queryStringParameters.user);
                break;
            case `GET ${productsResourcePath}/topseller`:
                {
                    let limit = "queryStringParameters" in event ?
                        event.queryStringParameters.limit : 6;
                    responseBody = await productRoute.getTopSellers(limit);
                    break;
                }
            case `GET ${productsResourcePath}/search`:
                {
                    const VALID_ORDER_BY_TYPES = ["views", "ratings", "sales", "time"];

                    let queryParams = "queryStringParameters" in event ?
                        event.queryStringParameters : {};
                    let where = {};
                    let order = ['published', 'DESC'];
                    let limit = 6;
                    let pageIdx = 0;
                    let searchRes;

                    if ('query' in queryParams) {
                        where.name = {
                            [Op.like]: `%${queryParams.query}%`
                        };
                    }
                    if ('filterCategories' in queryParams) {
                        where.category = queryParams.filterCategories.split(',').map(Number);
                    }
                    if ('priceFrom' in queryParams || 'priceTo' in queryParams) {
                        where.price = {
                            [Op.between]: [
                                'priceFrom' in queryParams ? queryParams.priceFrom : 0,
                                'priceTo' in queryParams ? queryParams.priceTo : 999999999 // max value for numeric(9,2)
                            ]
                        };
                    }
                    if ('orderBy' in queryParams &&
                        VALID_ORDER_BY_TYPES.includes(queryParams.orderBy)) {
                        switch (queryParams.orderBy) {
                            case 'ratings':
                                order = ['ratings', 'DESC'];
                                break;
                            case 'sales':
                                order = ['sales', 'DESC'];
                                break;
                            case 'time':
                                order = ['published', 'DESC'];
                                break;
                            default:
                                order = ['published', 'DESC'];
                        }
                    }
                    if ('pageLimit' in queryParams) {
                        limit = queryParams.pageLimit;
                    }
                    if ('pageNumber' in queryParams) {
                        pageIdx = (Number.parseInt(queryParams.pageNumber, 10) - 1) * limit;
                    }

                    searchRes = await productRoute.getSearch(where, order, limit, pageIdx);

                    responseBody = { "totalResults": searchRes.count, "products": searchRes.rows };
                    break;
                }
            case `GET ${productsResourcePath}/{id}`:
                if (!event.pathParameters.id) throw new Error("User id not provided.");
                responseBody = await productRoute.getOne(event.pathParameters.id);
                break;
            case `GET ${reviewsResourcePath}`:
                var productId = null;
                if (("queryStringParameters" in event) &&
                    ("productid" in event.queryStringParameters)) {
                    productId = event.queryStringParameters.productid;
                }
                responseBody = await reviewRoute.getAll(productId);
                break;
            case `POST ${reviewsResourcePath}`:
                if (!("body" in event)) throw new Error("Request body is empty.");
                responseBody = await reviewRoute.create(event.body);
                break;
            case `GET ${reviewsResourcePath}/{id}`:
                if (!event.pathParameters.id) throw new Error("Review id not provided.");
                responseBody = await reviewRoute.getOne(event.pathParameters.id);
                break;
            case `GET ${categoriesResourcePath}`:
                responseBody = await categoryRoute.getAll();
                break;
            case `POST ${categoriesResourcePath}`:
                if (!("body" in event)) throw new Error("Request body is empty.");
                responseBody = await categoryRoute.create(event.body);
                break;
            case `GET ${categoriesResourcePath}/{id}`:
                if (!event.pathParameters.id) throw new Error("Category id not provided.");
                responseBody = await categoryRoute.getOne(event.pathParameters.id);
                break;
            case `GET ${purchasesResourcePath}`:
                var productId = null;
                var buyerId = null;
                var filterConfirmed = false;
                if ("queryStringParameters" in event) {
                    if ("product" in event.queryStringParameters) {
                        productId = event.queryStringParameters.product;
                    }
                    if ("buyer" in event.queryStringParameters) {
                        buyerId = event.queryStringParameters.buyer;
                    }
                    if ("filterConfirmed" in event.queryStringParameters) {
                        filterConfirmed = event.queryStringParameters.filterConfirmed;
                    }
                }
                if (productId !== null && buyerId !== null) {
                    const purchase = await purchaseRoute.getOneByProductAndBuyer(productId, buyerId);
                    responseBody = purchase ?? {};
                }
                else {
                    responseBody = await purchaseRoute.getAll(productId, buyerId, filterConfirmed);
                }
                break;
            case `POST ${purchasesResourcePath}`:
                if (!("body" in event)) throw new Error("Request body is empty.");
                responseBody = await purchaseRoute.create(event.body);
                break;
            case `GET ${purchasesResourcePath}/{id}`:
                if (!event.pathParameters.id) throw new Error("Purchase id not provided.");
                responseBody = await purchaseRoute.getOne(event.pathParameters.id);
                break;
            case `PATCH ${purchasesResourcePath}`:
                var productId = null;
                var buyerId = null;
                if ("queryStringParameters" in event) {
                    if ("product" in event.queryStringParameters) {
                        productId = event.queryStringParameters.product;
                    }
                    if ("buyer" in event.queryStringParameters) {
                        buyerId = event.queryStringParameters.buyer;
                    }
                }
                if (productId === null || buyerId === null)
                    throw new Error(`Missing productId or buyer param.`);
                const success = await purchaseRoute.confirmPurchase(productId, buyerId);
                responseBody = { 'success': success };

                // Send Email to Buyer
                let product = productRoute.getOne(productId);
                let dataString = '';
                const response = await new Promise((resolve, reject) => {
                    const req = https.get(`https://htxpt3v1gg.execute-api.ap-southeast-1.amazonaws.com/v1/users/${buyerId}`, function(res) {
                        res.on('data', chunk => {
                            dataString += chunk;
                        });
                        res.on('end', () => {
                            resolve({
                                statusCode: 200,
                                body: JSON.stringify(JSON.parse(dataString), null, 4)
                            });
                        });
                    });

                    req.on('error', (e) => {
                        reject({
                            statusCode: 500,
                            body: 'Something went wrong!'
                        });
                    });
                });
                if (response.statusCode == 200) {
                    const fromEmail = "no-reply@digital-market-app.link";
                    const toEmail = JSON.parse(dataString)['email'];
                    var params = getEmailMessage(fromEmail, toEmail, "Order Completed", "Transaction complete", productId, product["name"]);
                    const e = await sesClient.sendEmail(params).promise();
                }
                break;
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    }
    catch (err) {
        console.log(err);
        responseCode = 400;
        responseBody = { "error": err.message };
    }
    finally {
        responseBody = JSON.stringify(responseBody);
    }

    const response = {
        statusCode: responseCode,
        headers: responseHeaders,
        body: responseBody,
        isBase64Encoded: false,
    };

    callback(null, response);
};

function getEmailMessage(SENDER, RECIPIENT, SUBJECT, BODY_TEXT, PRODUCT_ID, PRODUCT_NAME) {
    var params = {
        Destination: {
            ToAddresses: [RECIPIENT],
        },
        Message: {
            Body: {
                Html: {
                    Charset: CHARSET,
                    Data: getHtmlBody(PRODUCT_ID, PRODUCT_NAME),
                },
                Text: {
                    Charset: CHARSET,
                    Data: BODY_TEXT,
                },
            },
            Subject: {
                Charset: CHARSET,
                Data: SUBJECT,
            },
        },
        Source: SENDER,
        ReplyToAddresses: [RECIPIENT],
    };
    return params;
}

const CHARSET = "UTF-8";
// Email body template
const getHtmlBody = (product_id, product_name) => `
<!DOCTYPE html>
<html>
  <body style="background-color: #eaeced">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
    <style>
      @import url("https://fonts.googleapis.com/css?family=Open+Sans");
    </style>
    <table align="center" bgcolor="#EAECED" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr style="font-size: 0; line-height: 0">
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td align="center" valign="top">
            <table width="600">
              <tbody>
                <tr>
                  <td align="center"></td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" style="overflow: hidden !important; border-radius: 3px" width="580">
                      <tbody>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="center">
                            <table width="85%">
                              <tbody>
                                <tr>
                                  <td align="center">
                                    <h2
                                      style="
                                        margin: 0 !important;
                                        font-family: 'Open Sans', helvetica, arial, sans-serif !important;
                                        font-size: 28px !important;
                                        line-height: 38px !important;
                                        font-weight: 200 !important;
                                        color: #252b33 !important;
                                      "
                                    >
                                      New Order Confirmation
                                    </h2>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="78%">
                              <tbody>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      font-family: 'Open Sans', helvetica, arial, sans-serif !important;
                                      font-size: 16px !important;
                                      line-height: 30px !important;
                                      font-weight: 100 !important;
                                      color: #7e8890 !important;
                                    "
                                  >
                                    <p>
                                      Your order for "${product_name}" on Digital Marketplace has been successfully confirmed.
                                      You can now download the product by clicking <a href="https://www.digital-market-app.link/product/${product_id}" target="_blank">here</a>
                                    </p>
                                    <p>If the link above doesn't work, use the full link: 
                                      <a href="https://www.digital-market-app.link/product/${product_id}" target="_blank">https://www.digital-market-app.link/product/${product_id}</a>
                                    </p>
                                    <p>As always, we are here to help should you have any questions.</p>
                                    <p>Kind regards</p>
                                    <p>Digital Marketplace Team</p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    align="center"
                    style="
                      font-family: 'Open Sans', sans-serif !important;
                      font-weight: 400 !important;
                      color: #7e8890 !important;
                      font-size: 11px !important;
                      letter-spacing: 0.05em !important;
                    "
                    valign="top"
                  >
                    <em></em>
                  </td>
                </tr>
                <tr style="padding: 0; margin: 0; font-size: 0; line-height: 0">
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <p
                      style="
                        margin-bottom: 1em;
                        font-family: Open Sans, sans-serif !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        color: #7e8890 !important;
                        font-size: 12px !important;
                        font-weight: 300 !important;
                      "
                    >
                      <span>Digital Marketplace Ltd. Ho Chi Minh city, Vietnam</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;
