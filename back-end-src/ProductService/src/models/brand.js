const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const brandSchema = new Schema({
  name: String,
  logo: String,
});

const BrandModel = mongoose.model("Brand", brandSchema);

const createNewBrand = async ({ name, logo }) => {
  return BrandModel.create({ name, logo });
};

const findBrandById = async (id) => {
  return BrandModel.findById(new Types.ObjectId(id));
};

const findBrands = async () => {
  return BrandModel.find();
};

module.exports = { BrandModel, createNewBrand, findBrandById, findBrands };
