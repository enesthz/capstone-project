const express = require("express");

const {
  findCategoryById,
  findCategories,
  createNewCategory,
} = require("../models/category");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const categories = await findCategories();
    return res.send(categories);
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }

  try {
    const category = await findCategoryById(id);
    return res.send(category);
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ error: "Some fields are missing! (title)" });
  }

  try {
    await createNewCategory({ title });
    return res.send({ message: "Category successfully created!" });
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
