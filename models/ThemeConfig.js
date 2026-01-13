// models/ThemeConfig.js
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Stickers nested object
const StickerSchema = new Schema(
  {
    sportyFrameComponent: { type: String },
    funFrameComponent: { type: String },
    carBase: { type: String },
    isBaseStickerColorAllowed: { type: Boolean, default: false },
    carPaint: { type: String },
    isPaintStickerColorAllowed: { type: Boolean, default: false },
    carDecal: { type: String },
    isDecalStickerColorAllowed: { type: Boolean, default: false },
    primaryColour: { type: String },
    isPrimaryStickerColorAllowed: { type: Boolean, default: false },
    secondaryColour: { type: String },
    isSecondaryStickerColorAllowed: { type: Boolean, default: false },
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
    stickers: { type: StickerSchema, default: undefined },

    // flags
    isSportyEnabled: { type: Boolean, default: true },
    isFunEnabled: { type: Boolean, default: true }
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

const InternalThemeSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }
});

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

    internalThemes: {
      type: [InternalThemeSchema],
      default: []
    },

    assets: {
      parts: { type: [PartSchema], default: [] }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ThemeConfig", ThemeConfigSchema);
