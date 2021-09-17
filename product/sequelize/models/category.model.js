const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "category",
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
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
