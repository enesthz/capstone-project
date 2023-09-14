const express = require("express");
const axios = require("axios");
const {
  findShoppingCartById,
  findShoppingCartByUserId,
  createShoppingCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
  deleteShoppingCart,
} = require("../models/shoppingCart");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "You should provide cart ID" });
  }
  try {
    const cart = await findShoppingCartById(id);
    return res.send(cart);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "You should provide user ID" });
  }
  try {
    let shoppingCart = await findShoppingCartByUserId(id);

    const populatedCartItems = await Promise.all(
      shoppingCart.cartItems.map(async (cartItem) => {
        const productInfo = await axios.get(
          `${process.env.PRODUCT_API_URL}/products/${cartItem.product}`,
          {
            headers: {
              "x-internal-request": "true",
            },
          }
        );

        return {
          product: productInfo.data,
          quantity: cartItem.quantity,
        };
      })
    );

    shoppingCart.cartItems = populatedCartItems;

    const populatedShoppingCart = {
      _id: shoppingCart._id,
      user: shoppingCart.user,
      cartItems: populatedCartItems,
    };
    return res.send(populatedShoppingCart);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});
router.post("/items", authenticateToken, async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId) {
    return res.status(400).send({ error: "You should provide user ID" });
  }
  let cart = await findShoppingCartByUserId(userId);

  if (!cart) {
    cart = await createShoppingCart(userId);
    const updatedCart = await addCartItem({ productId, quantity, userId });
    return res.send(updatedCart);
  }

  const itemToUpdate = cart.cartItems.find((item) =>
    item.product.equals(productId)
  );

  if (itemToUpdate) {
    const updatedCart = await updateCartItem({
      productId,
      userId,
      quantity,
      operation: "SUM_UP",
    });
    return res.send(updatedCart);
  }

  const updatedCart = await addCartItem({ productId, quantity, userId });
  return res.send(updatedCart);
});
router.delete("/items/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!id) {
    return res
      .status(400)
      .send({ error: "You should provide product ID to delete" });
  }
  if (!userId) {
    return res.status(400).send({ error: "You should provide user ID" });
  }

  try {
    await deleteCartItem({ userId, productId: id });
    return res.send({ message: "Cart Item deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .send({ error: "You should provide product ID to delete" });
  }

  try {
    await deleteShoppingCart({ cartId: id });
    return res.send({ message: "Cart deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.patch("/items/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { userId, quantity } = req.body;

  if (!id) {
    return res
      .status(400)
      .send({ error: "You should provide product ID to delete" });
  }
  if (!userId || !quantity) {
    return res.status(400).send({
      error: "Some required fields are missing! (userId or quantity)",
    });
  }

  try {
    const updatedCart = await updateCartItem({
      userId,
      productId: id,
      quantity,
      operation: "REPLACE",
    });
    return res.send(updatedCart);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
