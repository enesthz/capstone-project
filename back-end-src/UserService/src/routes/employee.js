const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  findEmployeeByIds,
  updateEmployeeById,
  deleteEmployeeById,
  findEmployeeByEmail,
  findEmployeeById,
  addNewEmployee,
} = require("../models/employee");

const { authenticateToken } = require("../middlewares/authentication");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }
  try {
    const employee = await findEmployeeByEmail(email, password);
    if (!employee) {
      return res.status(401).send({ error: "Invalid email or password." });
    }
    const passwordMatch = await bcrypt.compare(password, employee.password);
    if (!passwordMatch) {
      return res.status(401).send({ error: "Invalid email or password." });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { email: employee.email, password: employee.password },
      process.env.JWT_SECRET
    );
    return res.send({ token });
  } catch (error) {
    return res.status(401).send({ error: "Invalid token." });
  }
});

router.post("/register", async (req, res) => {
  const { name, surname, gender, phone, password, email, address } = req.body;
  if (!(name || surname || gender || phone || password || email || address)) {
    return res.status(400).send({ error: "Some informations are missing!" });
  }

  const isEmployeeExist = await findEmployeeByEmail(email);

  if (!!isEmployeeExist) {
    return res
      .status(400)
      .send({ error: "There is a registered employee with this email!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await addNewEmployee({
      name,
      surname,
      email,
      gender,
      phone,
      password: hashedPassword,
      address,
    });

    return res.send({ message: "Employee successfully added." });
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
    const employees = await findEmployeeByIds(ids);
    return res.send(employees);
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }
  const employee = await findEmployeeById(id);

  if (!employee) {
    return res.status(400).send({ error: "Employee not found!" });
  }

  return res.send(employee);
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "ID is missing!" });
  }

  const employee = await findEmployeeById(id);

  if (!employee) {
    return res.status(400).send({ error: "Employee not found!" });
  }

  try {
    const deletedEmployee = await deleteEmployeeById(id);
    return res.send({
      message: "Employee deleted successfully",
      deletedEmployee,
    });
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const employee = await findEmployeeById(id);
  delete employee?.password;

  if (!employee) {
    return res.status(400).send({ error: "Employee not found!" });
  }

  try {
    const updatedEmployee = await updateEmployeeById(id, fields);
    return res.send(updatedEmployee);
  } catch (error) {
    return res.status(500).send(`Something went wrong! ${error} `);
  }
});

module.exports = router;
