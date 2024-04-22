const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const userCollection = mongoose.model("user", userSchema);

module.exports = userCollection;
