const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "password must be at least 6 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/[a-z0-9]+@[a-z0-9]+/, "user email is not valid"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", schema);
module.exports = { User };
