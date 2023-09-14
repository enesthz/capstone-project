const express = require("express");
const {
  findBrands,
  findBrandById,
  createNewBrand,
} = require("../models/brand");
const router = express.Router();
const { authenticateToken } = require("../middlewares/authentication");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const brands = await findBrands();
    return res.send(brands);
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
    const brand = await findBrandById(id);
    return res.send(brand);
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { logo, name } = req.body;

  if (!(logo || name)) {
    return res
      .status(400)
      .send({ error: "Some fields are missing! (logo or name)" });
  }

  try {
    await createNewBrand({ logo, name });
    return res.send({ message: "Brand successfully created!" });
  } catch (error) {
    return res.status(400).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
