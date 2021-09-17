const formatReverseQuery = (rawQueryRes) => {
  let productRows = [];
  rawQueryRes.rows.forEach((ele) => {
    let p = {};
    Object.entries(ele).forEach((e) => {
      let k = e[0];
      if (k.startsWith("product")) {
        k = k.replace("product.", "");
      }
      p[k] = e[1];
    });
    productRows.push(p);
  });

  return {
    count: rawQueryRes.count.length,
    rows: productRows,
  };
};

module.exports = { formatReverseQuery };
