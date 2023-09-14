const express = require("express");
const customerRouter = require("./routes/customer");
const employeeRouter = require("./routes/employee");
const connectDB = require("./configs/database");
const app = express();
const cors = require("cors");
const { createAmqpConnection } = require("./configs/rabbitmq-connection");
const { authRouter } = require("./routes/auth");

require("dotenv").config();
createAmqpConnection();
app.use(cors());
app.use(express.json());
app.use("/customers", customerRouter);
app.use("/employees", employeeRouter);
app.use("/auth", authRouter);

app.listen(process.env.APP_PORT, () => {
  connectDB();
  console.log("✅ User service started");
});
