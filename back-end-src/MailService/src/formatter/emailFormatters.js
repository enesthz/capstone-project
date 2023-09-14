const { MAIL_TEMPLATES } = require("../utils/constants");

const welcomeMailData = ({ name, recieverEmail }) => {
  return {
    from: "ByteBuy",
    to: recieverEmail,
    subject: "Hello!",
    template: MAIL_TEMPLATES.WELCOME,
    "h:X-Mailgun-Variables": JSON.stringify({
      name,
    }),
  };
};

module.exports = { welcomeMailData };
