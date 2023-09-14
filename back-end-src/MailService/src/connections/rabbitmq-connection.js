const amqp = require("amqplib");
const emailHandler = require("../handler/emailHandler");

let amqpChannel = null;

const createAmqpConnection = async () => {
  const connection = await amqp.connect("amqp://localhost");
  amqpChannel = await connection.createChannel();

  await amqpChannel.consume("mailQueue", async (message) => {
    if (!message) {
      return;
    }
    console.log(message);
    const { event, payload } = JSON.parse(message.content.toString());

    await emailHandler(event, payload);
    amqpChannel.ack(message);
  });
};

module.exports = { amqpChannel, createAmqpConnection };
