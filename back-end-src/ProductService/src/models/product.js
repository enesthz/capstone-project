const mongoose = require("mongoose");
const { signURL } = require("../helpers/uploadFile");
const axios = require("axios");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: [String],
    description: String,
    warranty: Number,
    color: { type: String, default: null },
    memory: { type: String, default: null },
    screenSize: { type: String, default: null },
    OS: { type: String, default: null },
    RAM: { type: String, default: null },
    GraphicCard: { type: String, default: null },
    price: {
      type: Number,
      required: true,
    },
    stockCount: {
      type: Number,
      required: true,
    },
    comments: { type: [commentSchema], default: [] },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.virtual("signedImageURLs").get(function () {
  return this.images.map((image) => {
    return signURL(image);
  });
});

const ProductModel = mongoose.model("Product", productSchema);

const addNewProduct = async ({
  title,
  images,
  description,
  color,
  warranty,
  memory,
  price,
  stockCount,
  category,
  brand,
  screenSize,
  OS,
  RAM,
  GraphicCard,
}) => {
  return await ProductModel.create({
    title,
    images,
    description,
    color,
    warranty,
    memory,
    price,
    stockCount,
    category,
    brand,
    screenSize,
    OS,
    RAM,
    GraphicCard,
  });
};

const findProductById = async (id) => {
  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        title: 1,
        images: 1,
        description: 1,
        color: 1,
        warranty: 1,
        memory: 1,
        comments: 1,
        price: 1,
        stockCount: 1,
        category: 1,
        brand: 1,
        screenSize: 1,
        OS: 1,
        RAM: 1,
        GraphicCard: 1,
        averageRate: { $avg: "$comments.rate" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $project: {
        title: 1,
        images: 1,
        description: 1,
        color: 1,
        warranty: 1,
        memory: 1,
        price: 1,
        stockCount: 1,
        screenSize: 1,
        OS: 1,
        RAM: 1,
        GraphicCard: 1,
        comments: 1,
        category: { $arrayElemAt: ["$category", 0] },
        brand: { $arrayElemAt: ["$brand", 0] },
        averageRate: 1,
      },
    },
  ];
  const [product] = await ProductModel.aggregate(pipeline);

  if (!product) {
    return null;
  }

  product.signedImageURLs = product.images.map((image) => {
    return signURL(image);
  });

  if (product?.comments?.length > 0) {
    const populatedComments = await Promise.all(
      product?.comments.map(async (comment) => {
        const userInfo = await axios.get(
          `${process.env.USER_API_URL}/customers/${comment.user}`,
          {
            headers: {
              "x-internal-request": "true",
            },
          }
        );

        return {
          _id: comment._id,
          user: userInfo.data,
          rate: comment.rate,
        };
      })
    );

    product.comments = populatedComments;
  }

  return product;
};

const findProducts = async ({ ids, filters }) => {
  let aggregationPipeline = [];

  if (ids && ids.length > 0) {
    aggregationPipeline.push({
      $match: {
        _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
      },
    });
  }

  if (filters?.title) {
    aggregationPipeline.push({
      $match: {
        title: { $regex: filters.title, $options: "i" },
      },
    });
  }

  if (filters?.categories && filters?.categories.length > 0) {
    aggregationPipeline.push({
      $match: {
        category: {
          $in: filters.categories.map(
            (category) => new mongoose.Types.ObjectId(category)
          ),
        },
      },
    });
  }

  if (filters?.brands && filters?.brands.length > 0) {
    aggregationPipeline.push({
      $match: {
        brand: {
          $in: filters.brands.map(
            (brand) => new mongoose.Types.ObjectId(brand)
          ),
        },
      },
    });
  }
  aggregationPipeline.push(
    {
      $project: {
        title: 1,
        images: 1,
        description: 1,
        color: 1,
        warranty: 1,
        memory: 1,
        price: 1,
        stockCount: 1,
        comments: 1,
        category: 1,
        brand: 1,
        screenSize: 1,
        OS: 1,
        RAM: 1,
        GraphicCard: 1,
        averageRate: { $avg: "$comments.rate" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand",
        foreignField: "_id",
        as: "brand",
      },
    },
    {
      $project: {
        title: 1,
        images: 1,
        description: 1,
        color: 1,
        warranty: 1,
        memory: 1,
        price: 1,
        comments: 1,
        stockCount: 1,
        screenSize: 1,
        OS: 1,
        RAM: 1,
        GraphicCard: 1,
        category: { $arrayElemAt: ["$category", 0] },
        brand: { $arrayElemAt: ["$brand", 0] },
        averageRate: 1,
      },
    }
  );

  const products = await ProductModel.aggregate(aggregationPipeline).exec();
  return products.map((product) => {
    product.signedImageURLs = product.images.map((image) => signURL(image));
    return product;
  });
};

const updateProductById = async ({ productId, fields }) => {
  return await ProductModel.updateOne(
    { _id: new mongoose.Types.ObjectId(productId) },
    { ...fields },
    {
      returnOriginal: false,
    }
  );
};

const updateComment = async ({ productId, commentId, rate }) => {
  return await ProductModel.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(productId),
      "comments._id": new mongoose.Types.ObjectId(commentId),
    },
    { $set: { "comments.$.rate": rate } },
    { new: true }
  );
};

const deleteProductById = async (id) => {
  return await ProductModel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
};

const addCommentToProduct = async ({ rate, userId, productId }) => {
  const { comments } = await ProductModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(productId),
    { $push: { comments: { rate, user: userId } } },
    { returnOriginal: false }
  );

  return comments[comments.length - 1];
};

const deleteCommentFromProduct = async ({ commentId, productId }) => {
  return await ProductModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(productId),
    {
      $pull: { comments: { _id: new mongoose.Types.ObjectId(commentId) } },
    }
  );
};

module.exports = {
  findProducts,
  ProductModel,
  addNewProduct,
  updateComment,
  findProductById,
  updateProductById,
  deleteProductById,
  addCommentToProduct,
  deleteCommentFromProduct,
};
