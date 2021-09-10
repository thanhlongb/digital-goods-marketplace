const route = require("./routes/product");
const { Op } = require("sequelize");


exports.handler = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    console.log(event);
    
    try {
        let method = event.requestContext.http.method;
        let path = event.requestContext.http.path;
        let rows = null;
        
        console.log(event);
    
        if (path == "/products") {
            if (method == "GET") {
                rows = await route.getAll();
            } else if (method == "POST") {
                if (event.body) {
                    const body = event.body
                    rows = await route.create(body)
                }
            }
        } 
        else if (path == "/products/recent") {
            let limit = "queryStringParameters" in event 
                ? event.queryStringParameters.limit
                : 6;
            rows = await route.getRecent(limit);
        }
        else if (path == "/products/selling") {
            if ('queryStringParameters' in event) {
                rows = await route.getSelling(event.queryStringParameters.user);
            }
        }
        else if (/\/products\/\d+/.test(path)) {
            if (method == "GET") {
                rows = await route.getOne(event.pathParameters.id);
            }
        } 
        else if (path == "/products/topseller") {
            let limit = "queryStringParameters" in event 
                ? event.queryStringParameters.limit
                : 6;
            rows = await route.getTopSellers(limit);
        } 
        else if (path == "/products/search") {
            let queryParams = "queryStringParameters" in event 
                ? event.queryStringParameters
                : {};
            let where = {};
            let order = 'published';
            let limit = 6;
            let pageIdx = 0;
            let searchRes;
            
            if ('query' in queryParams) {
                where.name = queryParams.query;
            }
            if ('filterCategories' in queryParams) {
                where.category = queryParams.filterCategories.split(',').map(Number);
            }
            if ('priceFrom' in queryParams && 'priceTo' in queryParams) {
                where.price = {[Op.between]: [queryParams.priceFrom, queryParams.priceTo]};
            }
            // if ('orderBy' in queryParams) {
            //     order = queryParams.orderBy
            // }
            if ('pageLimit' in queryParams) {
                limit = queryParams.pageLimit;
            }
            if ('pageNumber' in queryParams) {
                pageIdx = queryParams.pageNumber;
            }
            
            searchRes = await route.getSearch(where, order, limit, pageIdx);
            
            rows = {"totalResults": searchRes.count, "products": searchRes.rows};
        }
        
        let response = (rows == null) ? {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({message: "Bad request"}),
            isBase64Encoded: false,
        } : {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rows),
            isBase64Encoded: false,
        };
    
        callback(null, response);
    } catch (err) {
        console.log(err);
        callback(err);
    }
};
