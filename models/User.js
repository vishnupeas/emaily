const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  googleName: String,
  googleEmail: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
