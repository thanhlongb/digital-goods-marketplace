const { models } = require("../sequelize");
const sequelize = require("../sequelize");

const create = async (body) => {
    try {
        const category = JSON.parse(body)
        return await models.category.create(category)
    } catch (error) {
        throw error
    }
};

const getAll = async () => {
    return await models.category.findAll();
};

const getOne = async (str_id) => {
    const id = Number.parseInt(str_id, 10);
    const row = await models.category.findByPk(id);
    
    return (row ? row : {});
}

module.exports = {
    create,
    getAll,
    getOne,
};
