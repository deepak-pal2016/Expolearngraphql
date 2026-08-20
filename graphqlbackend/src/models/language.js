const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trimg: true,
    },
    value: {
      type: String,
      required: true,
      unique: true,
      trimg: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model('Language',languageSchema)