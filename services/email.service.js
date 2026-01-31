const transporter = require("../config/mailer");

const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"My App" <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendEmail };
