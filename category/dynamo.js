const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();
const dynamoTable = "category";

const getCategory = async (categoryId) => {
    var params = {
        TableName: dynamoTable,
        Key: {
            id: categoryId
        }
    };
    return dynamo.get(params).promise();
}

const getAllCategories = async () => {
    var params = {
        TableName: dynamoTable
    }
    return dynamo.scan(params).promise();
}

const addCategory = async (uuid, categoryObject) => {
    var params = {
        TableName: dynamoTable,
        Item: {
            id: uuid,
            name: categoryObject.name
        }
    }
    return dynamo.put(params).promise();
}

const deleteCategory = async (categoryId) => {
    var params = {
        TableName: dynamoTable,
        Key: {
            id: categoryId
        }
    }
    return dynamo.delete(params).promise();
}

module.exports = {
    addCategory,
    getCategory,
    getAllCategories,
    deleteCategory
};