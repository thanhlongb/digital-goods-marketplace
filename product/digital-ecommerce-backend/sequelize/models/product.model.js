const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "product",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            description: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            details: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL(11, 2),
            },
            published: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            image_path: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            seller: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            category: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
