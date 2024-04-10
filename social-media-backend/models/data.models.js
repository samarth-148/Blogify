/** @format */

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    imageKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const data = mongoose.model("data", schema);

module.exports = data;
