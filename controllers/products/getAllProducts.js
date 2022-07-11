const { Product } = require('../../models/product');

const getAllProducts = async (req, res) => {
  const { title } = req.query;
  const products = await Product.find({
    title: { $elemMatch: { ua: title }, $size: 2 },
  });
  if (products.length === 0) {
    const error = new Error(`${title} not found`);
    error.status = 404;
    throw error;
  }
  const firstProducts = products.slice(0, 10);
  console.log(products);
  res.json({
    status: 'success',
    code: 200,
    data: firstProducts,
  });
};

module.exports = getAllProducts;
