const { models } = require("../sequelize");
const sequelize = require("../sequelize");

const create = async (body) => {
    try {
        const review = JSON.parse(body)
        return await models.review.create(review)
    } catch (error) {
        throw error
    }
};

const getAll = async (productId) => {
    if (productId) {
        return await models.review.findAll({
            where: {
                productid: productId
            }
        });
    }
    return await models.review.findAll();
};

const getOne = async (str_id) => {
    const id = Number.parseInt(str_id, 10);
    const row = await models.review.findByPk(id);
    
    return (row ? row : {});
}

module.exports = {
    create,
    getAll,
    getOne,
};
