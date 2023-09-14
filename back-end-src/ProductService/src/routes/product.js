const express = require("express");
const {
  findProducts,
  findProductById,
  addNewProduct,
  updateProductById,
  deleteProductById,
  addCommentToProduct,
  deleteCommentFromProduct,
  updateComment,
} = require("../models/product");
const { uploadToStorage } = require("../helpers/uploadFile");
const { nanoid } = require("nanoid");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");

router.post("/get", authenticateToken, async (req, res) => {
  const { ids, filters } = req.body;

  try {
    const products = await findProducts({ ids: ids || [], filters });
    return res.send(products);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("ID is missing");
  }

  try {
    const product = await findProductById(id);
    return res.send(product);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const {
    title,
    images,
    description,
    color,
    warranty,
    memory,
    price,
    stockCount,
    categoryId,
    brandId,
    screenSize,
    OS,
    RAM,
    GraphicCard,
  } = req.body;

  if (
    !title ||
    !images ||
    !description ||
    !warranty ||
    !price ||
    !stockCount ||
    !categoryId ||
    !brandId
  ) {
    {
      return res
        .status(400)
        .send({ error: "Some required fields are missing!" });
    }
  }

  try {
    let imageURLs = [];
    if (images && images.length > 0) {
      imageURLs = await Promise.all(
        images.map(async (image) => {
          const imageURL = await uploadToStorage({
            filename: `${title.replace(/\s/g, "-").toLowerCase()}-${nanoid(5)}`,
            file: image,
          });

          return imageURL.Location;
        })
      );
    }

    const product = await addNewProduct({
      title,
      images: imageURLs,
      description,
      color,
      warranty,
      memory,
      price,
      stockCount,
      screenSize,
      OS,
      RAM,
      GraphicCard,
      category: categoryId,
      brand: brandId,
    });
    return res.send(product);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }
  try {
    await deleteProductById(id);

    return res.send({ message: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }
  try {
    const updatedProduct = await updateProductById({
      productId: id,
      fields: { ...req.body },
    });

    return res.send(updatedProduct);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.post("/:id/comments", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { rate, userId } = req.body;

  if (!rate || !userId) {
    return res.status(400).send({ error: "Some fields are missing!" });
  }

  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }
  try {
    const comment = await addCommentToProduct({
      productId: id,
      userId,
      rate,
    });

    return res.send(comment);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.put("/:id/comments/:commentId", authenticateToken, async (req, res) => {
  const { id, commentId } = req.params;
  const { rate } = req.body;

  if (!id || !commentId || !rate) {
    return res.status(400).send({ error: "Some requried fields are missing!" });
  }

  try {
    const updatedProduct = await updateComment({
      productId: id,
      commentId,
      rate,
    });

    return res.send(updatedProduct);
  } catch (error) {
    return res.status(500).send({ error: "Something went wrong!" });
  }
});

router.delete(
  "/:id/comments/:commentId",
  authenticateToken,
  async (req, res) => {
    const { id, commentId } = req.params;

    if (!id || !commentId) {
      return res.status(400).send({ error: "ID is missing!" });
    }

    try {
      await deleteCommentFromProduct({
        productId: id,
        commentId,
      });

      return res.send({ message: "Comment successfully deleted!" });
    } catch (error) {
      return res.status(500).send({ error: "Something went wrong!" });
    }
  }
);

module.exports = router;
