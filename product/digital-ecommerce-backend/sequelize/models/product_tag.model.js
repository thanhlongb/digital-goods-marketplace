const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "product_tag", 
        {
            product: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'product',
                    key: 'id'
                }
            },
            tag: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'tag',
                    key: 'id'
                }
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};