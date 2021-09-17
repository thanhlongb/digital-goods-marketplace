const { Sequelize } = require("sequelize");
const { applyRelationships } = require("./relationships")

const sequelize = new Sequelize({
    database: "postgres",
    username: "postgres",
    password: "digital123",
    host: "digital-ecommerce-db.c575bvamglbq.ap-southeast-1.rds.amazonaws.com",
    port: 5432,
    dialect: "postgres"
});

const modelDefiners = [
    require("./models/product.model"),
    require("./models/tag.model"),
    // require("./models/product_tag.model"),
    require("./models/review.model"),
    require("./models/category.model"),
    require("./models/purchase.model"),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyRelationships(sequelize);

module.exports = sequelize;
