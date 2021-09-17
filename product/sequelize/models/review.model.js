const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "review",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            rating: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            content: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            productid: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            reviewer: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
