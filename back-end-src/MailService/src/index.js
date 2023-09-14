const express = require("express");
const { createAmqpConnection } = require("./connections/rabbitmq-connection");

const app = express();

app.listen(process.env.PORT, () => {
  createAmqpConnection();
  console.log(`✅ Mail service started`);
});
