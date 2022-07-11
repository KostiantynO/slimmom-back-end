const { Schema, model } = require('mongoose');

const productSchema = Schema(
  {
    categories: { type: Array },
    weight: { type: Number },
    title: {
      type: {
        ru: { type: String },
        ua: { type: String },
      },
    },
    calories: { type: Number },
    groupBloodNotAllowed: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true },
);

const Product = model('product', productSchema);

module.exports = { Product };
