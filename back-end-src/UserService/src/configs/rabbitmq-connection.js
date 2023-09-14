const amqplib = require("amqplib");

let amqpChannel = null;

const createAmqpConnection = async () => {
  connection = await amqplib.connect(process.env.AMQP_URL);
  amqpChannel = await connection.createChannel();
  await amqpChannel.assertQueue("mailQueue");
};

async function sendDatatoQueue(data) {
  await amqpChannel.sendToQueue("mailQueue", Buffer.from(JSON.stringify(data)));
}

module.exports = { amqpChannel, createAmqpConnection, sendDatatoQueue };
