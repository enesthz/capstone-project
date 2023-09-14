const express = require("express");
const shoppingCartRouter = require("./routes/shopingCart");
const cors = require("cors");

const connectDB = require("./configs/database");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/carts", shoppingCartRouter);

app.listen(process.env.APP_PORT, () => {
  connectDB();
  console.log("✅ Cart service started");
});
