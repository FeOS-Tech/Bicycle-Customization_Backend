// models/Theme.js

const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema(
  {
    themeId: {
      type: String,
      required: true,
      unique: true,
    },
    themeName: {
      type: String,
      required: true,
    },
    themeImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    bannerImage: {
      type: String,
      default: "",
    },
    priority: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Theme", ThemeSchema);
