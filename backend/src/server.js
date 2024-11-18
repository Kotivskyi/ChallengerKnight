const { app } = require("./app.js");
const { env } = require("./config");

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);                                                                                                                                                
});
