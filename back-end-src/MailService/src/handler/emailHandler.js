const { MAIL_EVENTS } = require("../utils/constants");
const EmailFormatter = require("../formatter/emailFormatters");
const Mailgun = require("mailgun.js");
const FormData = require("form-data");

const emailHandler = async (event, payload) => {
  let formattedMailData;

  switch (event) {
    case MAIL_EVENTS.WELCOME:
      formattedMailData = EmailFormatter.welcomeMailData({
        name: payload.name,
        recieverEmail: payload.email,
      });
      break;

    default:
      break;
  }

  try {
    const mailgun = new Mailgun(FormData);
    console.log(formattedMailData);
    const client = mailgun.client({
      username: "api",
      url: "https://api.eu.mailgun.net/",
      key: `${process.env.MAIL_GUN_API_KEY}`,
    });

    await client.messages.create(
      `${process.env.MAIL_GUN_DOMAIN}`,
      formattedMailData
    );
  } catch (error) {
    throw error;
  }
};

module.exports = emailHandler;
