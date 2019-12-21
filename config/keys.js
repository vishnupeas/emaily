//setting up the logic to choose which keys
if (process.env.NODE_ENV === "production") {
  //where the production keys are setuped
  module.exports = require("./prod.js");
} else {
  //we are in the development environment
  module.exports = require("./dev.js");
}
