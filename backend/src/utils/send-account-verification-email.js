const { env } = require("../config");
const { generateToken } = require("./jwt-handle");
const { sendMail } = require("./send-email");
const { emailVerificationTemplate } = require("../templates");

const sendAccountVerificationEmail = async ({ userId, userEmail }) => {
  const pwdToken = generateToken(
    { id: userId },
    env.EMAIL_VERIFICATION_TOKEN_SECRET,
    env.EMAIL_VERIFICATION_TOKEN_TIME_IN_MS
  );
  const link = `${env.API_URL}/api/v1/auth/verify-email/${pwdToken}`;
  const mailOptions = {
    from: env.MAIL_FROM_USER,
    to: userEmail,
    subject: "Verify account",
    html: emailVerificationTemplate(link),
  };
  await sendMail(mailOptions);
};

module.exports = { sendAccountVerificationEmail };
