const productRoute = require("./routes/product");
const reviewRoute = require("./routes/review");
const purchaseRoute = require("./routes/purchase");
const categoryRoute = require("./routes/category");

const { Op } = require("sequelize");


exports.handler = async (event, context, callback) => {
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
            case `GET ${productsResourcePath}/recent`: {
                let limit = "queryStringParameters" in event 
                    ? event.queryStringParameters.limit
                    : 6;
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
            case `GET ${productsResourcePath}/topseller`: {
                let limit = "queryStringParameters" in event 
                    ? event.queryStringParameters.limit
                    : 6;
                responseBody = await productRoute.getTopSellers(limit);
                break;
            }
            case `GET ${productsResourcePath}/search`: {
                const VALID_ORDER_BY_TYPES = ["views", "ratings", "sales", "time"];
            
                let queryParams = "queryStringParameters" in event 
                    ? event.queryStringParameters
                    : {};
                let where = {};
                let order = ['published', 'DESC'];
                let limit = 6;
                let pageIdx = 0;
                let searchRes;
                
                if ('query' in queryParams) {
                    where.name = {[Op.like]: `%${queryParams.query}%`};
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
                    VALID_ORDER_BY_TYPES.includes(queryParams.orderBy)) 
                {
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
                
                responseBody = {"totalResults": searchRes.count, "products": searchRes.rows};
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
                    const purchase =  await purchaseRoute.getOneByProductAndBuyer(productId, buyerId);
                    responseBody = purchase ?? {};
                } else {
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
                responseBody = {'success': success };
                break;                                                                                    
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        console.log(err);
        responseCode = 400;
        responseBody = {"error": err.message};
    } finally {
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