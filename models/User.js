const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    sid: {
      type: String,
      index: true,           // fast lookup
      trim: true,
    },

    name: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      default: null,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
