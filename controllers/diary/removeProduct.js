const { Diary } = require("../../models");
const { NotFound } = require("http-errors");

const removeProduct = async (req, res) => {
  const { productId } = req.params;
  const result = await Diary.findByIdAndRemove(productId);
  if (!result) {
    throw new NotFound(`Not found`);
  }
  res.json({
    message: "Product deleted",
  });
};

module.exports = removeProduct;
