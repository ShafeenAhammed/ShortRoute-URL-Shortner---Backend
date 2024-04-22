const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const urlCollection = mongoose.model("url", urlSchema);

module.exports = urlCollection;
