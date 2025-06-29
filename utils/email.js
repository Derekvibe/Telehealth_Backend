const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  //defining email option and structure

  const mailOptions = {
    from: `"DEREK" <emmanuelnzube89@gmail.com>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
