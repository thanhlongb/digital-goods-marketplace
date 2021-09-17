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
                type: DataTypes.TEXT,
            },
            description: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            details: {
                allowNull: false,
                type: DataTypes.TEXT,
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
                type: DataTypes.TEXT,
            },
            file_path: {
                allowNull: false,
                type: DataTypes.TEXT,
            },            
            seller: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            category: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            tags: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
