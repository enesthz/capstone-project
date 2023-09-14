const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  findCustomerByEmail,
  addNewCustomer,
  findCustomerById,
  deleteCustomerById,
  updateCustomerById,
  findCustomerByIds,
} = require("../models/customer");
const { authenticateToken } = require("../middlewares/authentication");
const { sendDatatoQueue } = require("../configs/rabbitmq-connection");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }
  try {
    const customer = await findCustomerByEmail(email, password);
    if (!customer) {
      return res.status(401).send({ error: "Invalid email or password." });
    }
    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      return res.status(401).send({ error: "Invalid email or password." });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { email: customer.email, password: customer.password, id: customer._id },
      process.env.JWT_SECRET
    );
    return res.send({ token });
  } catch (error) {
    return res.status(401).send({ error: "Invalid token." });
  }
});

router.post("/register", async (req, res) => {
  const { name, surname, gender, phone, password, email } = req.body;
  if (!name || !surname || !gender || !phone || !password || !email) {
    return res.status(400).send({ error: "Some informations are missing!" });
  }

  const isCustomerExist = await findCustomerByEmail(email);

  if (!!isCustomerExist) {
    return res
      .status(400)
      .send({ error: "There is a registered customer with this email!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newCustomer = await addNewCustomer({
      name,
      surname,
      email,
      gender,
      phone,
      password: hashedPassword,
    });

    if (newCustomer) {
      await sendDatatoQueue({
        event: "welcome",
        payload: { name: newCustomer.name, email: newCustomer.email },
      });
    }

    return res.send({ message: "Customer successfully added." });
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

router.get("/", authenticateToken, async (req, res) => {
  const { ids } = req.body;

  if (!ids) {
    return res.status(400).send({ error: "IDs doesn't exist!" });
  }

  try {
    const customers = await findCustomerByIds(ids);
    return res.send(customers);
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }
  const customer = await findCustomerById(id);

  if (!customer) {
    return res.status(400).send({ error: "Customer not found!" });
  }

  return res.send(customer);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }

  const customer = await findCustomerById(id);

  if (!customer) {
    return res.status(400).send({ error: "Customer not found!" });
  }

  try {
    const deletedCustomer = await deleteCustomerById(id);
    return res.send({
      message: "Customer deleted successfully",
      deletedCustomer,
    });
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  let fields = req.body;
  const customer = await findCustomerById(id);

  if (!customer) {
    return res.status(400).send({ error: "Customer not found!" });
  }

  if (fields.password) {
    const hashedPassword = await bcrypt.hash(fields.password, 10);
    fields.password = hashedPassword;
  }

  try {
    const updatedCustomer = await updateCustomerById(id, fields);
    return res.send(updatedCustomer);
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

module.exports = router;
