const { models } = require("../sequelize");
const sequelize = require("../sequelize");

const create = async (body) => {
    try {
        const review = JSON.parse(body)
        return await models.purchase.create(review)
    } catch (error) {
        return error
    }
};

const getAll = async (productId, buyerId, filterConfirmed = false) => {
    const where = {};
    if (filterConfirmed) where.confirmed = false;
    if (productId) where.productId = productId;
    if (buyerId) where.buyer = buyerId;
    return await models.purchase.findAll({
        where: where
    });
};

const getOneByProductAndBuyer = async (productId, buyerId) => {
    const where = {
        productId: productId,
        buyer: buyerId
    };
    return await models.purchase.findOne({
        where: where
    }).then(result => result ?? {});
};

const confirmPurchase = async (productId, buyerId) => {
    const purchase = await getOneByProductAndBuyer(productId, buyerId);
    if (purchase !== null) {
        const response = await models.purchase.update({ confirmed: true }, {
            where: {
                productId: productId,
                buyer: buyerId                
            }
        })
        if (response[0] > 0) {
            return true;
        }
    } 
    return false;
};

const getOne = async (str_id) => {
    const id = Number.parseInt(str_id, 10);
    const row = await models.purchase.findByPk(id);
    
    return (row ? row : {});
}

module.exports = {
    create,
    getAll,
    getOne,
    getOneByProductAndBuyer,
    confirmPurchase
};
