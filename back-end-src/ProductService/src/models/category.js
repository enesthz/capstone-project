const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const categorySchema = new Schema({
  title: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  }
});

const CategoryModel = mongoose.model("Category", categorySchema);

const createNewCategory = async ({ title }) => {
  return CategoryModel.create({ title });
};

const findCategoryById = async (id) => {
  return CategoryModel.findById(new Types.ObjectId(id));
};

const findCategories = async () => {
  return CategoryModel.find();
};

module.exports = {
  CategoryModel,
  createNewCategory,
  findCategoryById,
  findCategories,
};
