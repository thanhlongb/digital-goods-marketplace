const { models } = require("../sequelize");
const sequelize = require("../sequelize");

const create = async (body) => {
    try {
        const product = JSON.parse(body)
        return await models.product.create(product)
    } catch (error) {
        return error
    }
};

const getAll = async () => {
    return await models.product.findAll();
};

const getOne = async (str_id) => {
    const id = Number.parseInt(str_id, 10);
    const row = await models.product.findByPk(id);
    
    return (row ? row : {});
}

const getRecent = async (limit) => {
    console.log(models.product_tag);
    return await models.product.findAll({
        order: [['published', 'DESC']],
        limit: limit
    })
}

const getSearch = async (where, order, limit, pageIdx) => {
    return await models.product.findAndCountAll({
        where: where,
        order: [[order, 'DESC']],
        offset: pageIdx,
        limit: limit
    })
}

const getTopSellers = async (limit) => {
    return await models.product.findAll({
        attributes: ['seller', [sequelize.fn('count', sequelize.col('seller')), 'sales']],
        group: 'seller',
        order: sequelize.literal('sales DESC'),
        limit: limit
    })
}

const getSelling = async (userId) => {
    return await models.product.findAll({
        where: {
            seller: userId
        }
    })
}

module.exports = {
    create,
    getAll,
    getOne,
    getRecent,
    getSearch,
    getTopSellers,
    getSelling
};
