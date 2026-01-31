const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465", // ← correct logic
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
transporter.verify((err, success) => {
  if (err) {
    console.error("SMTP AUTH FAILED:", err);
  } else {
    console.log("SMTP AUTH OK");
  }
});

module.exports = transporter;
