const {
    addCategory,
    getCategory,
    getAllCategories,
    deleteCategory
} = require("./dynamo");

exports.handler = async (event, context) => {
    let body;
    let statusCode = 200;
    const resourcePath = "/categories"

    const headers = {
        "Content-Type": "application/json"
    };

    try {
        switch (event.routeKey) {
            case `GET ${resourcePath}`:
                var rawBody = await getAllCategories();
                if (!rawBody.Items) throw new Error("Unable to find any category.");
                body = rawBody.Items;
                break;
            case `GET ${resourcePath}/{id}`:
                var rawBody = await getCategory(event.pathParameters.id);
                if (!rawBody.Item) throw new Error("Category not exist.");
                body = rawBody.Item;
                break;
            case `PUT ${resourcePath}`:
                let requestJSON = JSON.parse(event.body);
                await addCategory(context.awsRequestId, requestJSON);
                body = {"id": context.awsRequestId};
                break;
            case `DELETE ${resourcePath}/{id}`:
                // TODO: This doesn't throws error when deleting non-exist item
                await deleteCategory(event.pathParameters.id);
                body = {"id": event.pathParameters.id};
                break;                
            default:
                throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    } catch (err) {
        statusCode = 400;
        body = {"error": err.message};
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};