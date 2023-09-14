// const mongoose = require("mongoose");

// const { Schema, Types } = mongoose;

// const cartItemSchema = new Schema({
//   cart: Schema.Types.ObjectId,
//   product: Schema.Types.ObjectId,
//   quantity: number,
// });

// const CartItemModel = mongoose.model("CartItem", cartItemSchema);

// const createCartItem = async ({ productId, cartId, quantity }) => {
//   return await CartItemModel.create({
//     cart: cartId,
//     product: productId,
//     quantity,
//   });
// };

// const updateCartItem = async ({ itemId, quantity }) => {
//   return await CartItemModel.findByIdAndUpdate(new Types.ObjectId(itemId), {
//     quantity,
//   });
// };

// const deleteCartItem = async (itemId) => {
//   return await CartItemModel.findByIdAndDelete(new Types.ObjectId(itemId));
// };

// module.exports = {
//   CartItemModel,
//   createCartItem,
//   updateCartItem,
//   deleteCartItem,
// };
