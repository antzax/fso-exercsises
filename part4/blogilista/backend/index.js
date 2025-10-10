const { info } = require("./utils/logger");
const app = require("./app");
const config = require("./utils/config");

console.log(config.PORT)

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`);
});
