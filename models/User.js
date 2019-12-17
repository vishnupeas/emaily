const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  googleName: String,
  googleEmail: String
});

mongoose.model("users", userSchema);
