const { env } = require("../config");
const { generateToken } = require("./jwt-handle");
const { sendMail } = require("./send-email");
const { pwdSetupTemplate } = require("../templates");

const sendPasswordSetupEmail = async ({ userId, userEmail }) => {
  const pwdToken = generateToken(
    { id: userId },
    env.PASSWORD_SETUP_TOKEN_SECRET,
    env.PASSWORD_SETUP_TOKEN_TIME_IN_MS
  );
  const link = `${env.UI_URL}/auth/setup-password/${pwdToken}`;
  const mailOptions = {
    from: env.MAIL_FROM_USER,
    to: userEmail,
    subject: "Setup account password",
    html: pwdSetupTemplate(link),
  };
  await sendMail(mailOptions);
};

module.exports = { sendPasswordSetupEmail };
