const applyRelationships = (sequelize) => {
    const { product, tag, product_tag, review, purchase } = sequelize.models;
    
    // product.belongsToMany(tag, { through: product_tag, as: 'product' });
    // tag.belongsToMany(product, { through: product_tag, as: 'tag' });
    
    product.hasMany(review, {
        foreignKey: 'productid'
    });
    review.belongsTo(product, {
        foreignKey: 'productid'
    });
    
    product.hasMany(purchase, {
        foreignKey: 'productId'
    });
    purchase.belongsTo(product, {
        foreignKey: 'productId'
    });
};

module.exports = { applyRelationships };