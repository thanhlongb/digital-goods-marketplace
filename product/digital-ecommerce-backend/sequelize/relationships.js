const applyRelationships = (sequelize) => {
    const { product, tag, product_tag } = sequelize.models;
    
    product.belongsToMany(tag, { through: product_tag, as: 'product' });
    tag.belongsToMany(product, { through: product_tag, as: 'tag' });
}

module.exports = { applyRelationships };