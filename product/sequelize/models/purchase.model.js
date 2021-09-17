const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "purchase",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            productId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            buyer: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            confirmed: {
                allowNull: true,
                type: DataTypes.BOOLEAN,
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
