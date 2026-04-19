const mongoose = require("mongoose");

// ✅ Schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    fcmToken: String,
  },
  {
    timestamps: true,
  },
);

// ✅ Model
module.exports = mongoose.model("User", userSchema);
