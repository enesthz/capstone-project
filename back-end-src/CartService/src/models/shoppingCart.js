const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const cartItemSchema = new Schema({
  product: Schema.Types.ObjectId,
  quantity: Number,
});

const shoppingCartSchema = new Schema({
  user: Schema.Types.ObjectId,
  cartItems: { type: [cartItemSchema], default: [] },
});

const ShoppingCartModel = mongoose.model("ShoppingCart", shoppingCartSchema);

const findShoppingCartById = async (cartId) => {
  return await ShoppingCartModel.findById(new Types.ObjectId(cartId));
};

const findShoppingCartByUserId = async (userId) => {
  return await ShoppingCartModel.findOne({
    user: new Types.ObjectId(userId),
  });
};

const createShoppingCart = async (userId) => {
  return await ShoppingCartModel.create({ user: new Types.ObjectId(userId) });
};

const deleteShoppingCart = async ({ cartId }) => {
  return await ShoppingCartModel.findByIdAndDelete(new Types.ObjectId(cartId));
};

const deleteCartItem = async ({ userId, productId }) => {
  return await ShoppingCartModel.findOneAndUpdate(
    { user: new Types.ObjectId(userId) },
    {
      $pull: { cartItems: { product: productId } },
    }
  );
};

const addCartItem = async ({ productId, quantity, userId }) => {
  return await ShoppingCartModel.updateOne(
    { user: new Types.ObjectId(userId) },
    {
      $push: {
        cartItems: { product: new Types.ObjectId(productId), quantity },
      },
    }
  );
};

const updateCartItem = async ({ productId, quantity, userId, operation }) => {
  const cart = await ShoppingCartModel.findOne({ user: userId });

  if (!cart) {
    return null;
  }

  const itemToUpdate = cart.cartItems.find((item) =>
    item.product.equals(productId)
  );

  if (!itemToUpdate) {
    return null;
  }

  if (operation === "SUM_UP") {
    itemToUpdate.quantity += quantity;
  } else if (operation === "REPLACE") {
    itemToUpdate.quantity = quantity;
  }

  await cart.save();
};

module.exports = {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  createShoppingCart,
  deleteShoppingCart,
  findShoppingCartById,
  findShoppingCartByUserId,
};
