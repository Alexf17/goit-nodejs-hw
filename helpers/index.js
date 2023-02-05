const nodemailer = require("nodemailer");
const { EMAIL_PASS, EMAIL_LOGIN } = process.env;

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

async function sendMail({ to, subject, html, text }) {
  try {
    const email = {
      from: "alexf17@meta.ua",
      to,
      subject,
      html,
      text,
    };
    const transport = nodemailer.createTransport({
      host: "smtp.meta.ua",
      port: "465",
      secure: "true",
      auth: {
        user: EMAIL_LOGIN,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const response = await transport.sendMail(email);
    console.log(response);
  } catch (error) {
    console.error("app error", error);
  }
}

module.exports = { tryCatchWrapper, sendMail };
