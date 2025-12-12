// models/ThemeConfig.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Stickers nested object
const StickerSchema = new Schema(
  {
    sportyFrameComponent: { type: String },
    funFrameComponent: { type: String },
    carBase: { type: String },
    carPaint: { type: String },
    carDecal: { type: String },
    primaryColour: { type: String },
    secondaryColour: { type: String },
    logo: { type: String },

    // For flora pink (special)
    funImage: { type: String },
    sportyImage: { type: String },

    
  },
  { _id: false }
);

// Colors inside each part
const ColorSchema = new Schema(
  {
    colorName: { type: String, required: true },
    colorCode: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    stickers: { type: StickerSchema, default: undefined }
  },
  { _id: false }
);

// Each part like C02 / C03 / F01
const PartSchema = new Schema(
  {
    partCode: { type: String, required: true },
    partName: { type: String, required: true },
    colors: { type: [ColorSchema], default: [] }
  },
  { _id: false }
);

// Main theme config schema
const ThemeConfigSchema = new Schema(
  {
    themeId: { type: String, required: true, unique: true },
    themeName: { type: String, required: true },
    themeSlug: { type: String, required: true, unique: true },
    themeRawLabel: { type: String, default: "" },

    cycleId: { type: String, default: "" },
    modelId: { type: String, default: "" },

    brand: { type: String, default: "" },
    price: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    productDetails: { type: String, default: "" },
    manufacturer: { type: String, default: "" },
    technicalSpecification: { type: String, default: "" },

    assets: {
      parts: { type: [PartSchema], default: [] }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThemeConfig", ThemeConfigSchema);
