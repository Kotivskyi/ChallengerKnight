const cors = require("cors");
const { env } = require("./env");

const corsPolicy = cors({
  origin: env.UI_URL,
  method: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Accept", "Origin", "X-CSRF-TOKEN"],
  credentials: true,
});

module.exports = { corsPolicy };
