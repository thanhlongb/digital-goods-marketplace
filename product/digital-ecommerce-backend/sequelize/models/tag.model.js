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
                type: DataTypes.STRING,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );
};
