const transporter = require("../config/mailer");

const sendEmail = async ({ to, subject, text, html }) => {
  return transporter.sendMail({
    from: `"TI Cycles – Customization" <${process.env.SENDER_EMAIL}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendEmail };
