const { models, QueryTypes } = require("../sequelize");
const sequelize = require("../sequelize");
const { formatReverseQuery } = require("./helper");

const create = async(body) => {
  try {
    const product = JSON.parse(body);
    return await models.product.create(product);
  }
  catch (error) {
    return error;
  }
};

const getAll = async() => {
  return await models.product.findAll();
};

const getOne = async(str_id) => {
  const id = Number.parseInt(str_id, 10);
  const row = await sequelize.query(
    `SELECT * FROM PRODUCT,(SELECT AVG(RATING) AS RATING_AVG, COUNT(RATING) AS REVIEW_COUNT FROM REVIEW WHERE PRODUCTID = ${id}) AS R WHERE ID = ${id}`, {
      type: QueryTypes.SELECT,
      plain: true
    }
  );

  return (row ? row : {});
};

const getRecent = async(limit) => {
  return await models.product.findAll({
    order: [
      ['published', 'DESC']
    ],
    limit: limit
  });
};

const getSearch = async(where, order, limit, pageIdx) => {
  if (order[0] == "ratings") {
    return await getSearchOrderByRatings(where, order, limit, pageIdx);
  }
  else if (order[0] == "sales") {
    return await getSearchOrderBySales(where, order, limit, pageIdx);
  }

  return await models.product.findAndCountAll({
    where: where,
    order: [order],
    offset: pageIdx,
    limit: limit,
  });
};

const getSearchOrderByRatings = async(where, order, limit, pageIdx) => {
  const res = await models.review.findAndCountAll({
    attributes: [
      [sequelize.fn("AVG", sequelize.col("review.rating")), "rating_avg"],
    ],
    include: [{
      model: models.product,
      where: where,
      right: true,
    }, ],
    group: ["productid", "product.id"],
    order: [
      [sequelize.literal("rating_avg " + order[1])]
    ],
    offset: pageIdx,
    limit: limit,
    raw: true,
  });

  return formatReverseQuery(res);
};

const getSearchOrderBySales = async(where, order, limit, pageIdx) => {
  const res = await models.purchase.findAndCountAll({
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("purchase.id")), "total_sales"],
    ],
    include: [{
      model: models.product,
      where: where,
      right: true,
    }, ],
    where: {
      confirmed: true,
    },
    group: ["productId", "product.id"],
    order: [
      [sequelize.literal("total_sales " + order[1])]
    ],
    offset: pageIdx,
    limit: limit,
    raw: true,
  });

  return formatReverseQuery(res);
};

const getTopSellers = async(limit_str) => {
  const limit = Number.parseInt(limit_str, 10);
  const rows = await sequelize.query(
    `SELECT PRODUCT.SELLER, COUNT("purchase"."productId") AS SALES FROM PRODUCT, PURCHASE WHERE PRODUCT.ID = "purchase"."productId" AND PURCHASE.CONFIRMED = TRUE GROUP BY PRODUCT.SELLER ORDER BY SALES DESC LIMIT ${limit}`, {
      type: QueryTypes.SELECT
    }
  );

  return (rows ? rows : []);
};

const getSelling = async(userId) => {
  return await models.product.findAll({
    where: {
      seller: userId
    }
  });
};

const getBought = async(userId) => {
  return await models.product.findAll({
    include: [{
      model: models.purchase,
      attributes: ['buyer'],
      where: {
        buyer: userId
      },
    }]
  });
};

module.exports = {
  create,
  getAll,
  getOne,
  getRecent,
  getSearch,
  getTopSellers,
  getSelling,
  getBought
};
