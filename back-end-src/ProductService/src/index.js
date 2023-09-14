const express = require("express");
const productRouter = require("./routes/product");
const brandRouter = require("./routes/brand");
const categoryRouter = require("./routes/category");
const connectDB = require("./configs/database");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/categories", categoryRouter);

app.listen(process.env.APP_PORT, () => {
  connectDB();
  console.log("✅ Product service started");
});
