const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "tag",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            title: {
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
