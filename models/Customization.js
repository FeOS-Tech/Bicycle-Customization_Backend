// const mongoose = require("mongoose");

// const CustomizationSchema = new mongoose.Schema(
//   {
//     // HIGH LEVEL
//     brand: String,

//     // Theme / cycle info
//     themeId: String,
//     themeSlug: String,
//     themeName: String,   // 👈 NEW
//     cycleId: String,
//     modelId: String,
//     cycleName: String,   // 👈 NEW
//     modelNo: String,     // 👈 NEW

//     // User inputs
//     userName: String,
//     tagline: String,
//     bikeSize: String,

//     // Mode / variant
//     mode: String,         // 'sporty' | 'fun'
//     themeVariant: String, // 'primary' | 'secondary'

//     // Frame color info
//     frameColorIndex: Number,
//     frameColor: {
//       colorName: String,
//       colorCode: String,
//       imageUrl: String,
//       fileName: String,
//     },

//     // All image layers used to render
//     images: {
//       baseBikeImage: String,
//       carBase: String,
//       carPaint: String,
//       carDecal: String,
//       primaryColour: String,
//       secondaryColour: String,
//       logo: String,
//     },

//     // For safety – keep full stickers JSON
//     stickersRaw: Object,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Customization", CustomizationSchema);

// models/Customization.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * For CMYK / hex info of the recoloured stickers
 */
const StickerColorSchema = new Schema(
  {
    hex: { type: String },   // e.g. "#ff00aa"
    c: { type: Number },     // 0–100
    m: { type: Number },     // 0–100
    y: { type: Number },     // 0–100
    k: { type: Number },     // 0–100
  },
  { _id: false }
);

/**
 * For generic part selections (frame, grip, mudguard, brake lever, etc.)
 */
const PartSelectionSchema = new Schema(
  {
    partCode: String,        // e.g. "F01", "C05"
    partName: String,        // e.g. "Frame", "Grip"
    colorName: String,
    colorCode: String,
    imageUrl: String,
    fileName: String,
  },
  { _id: false }
);

const CustomizationSchema = new Schema(
  {
    // HIGH LEVEL
    brand: String,

    // Theme / cycle info
    themeId: String,
    themeSlug: String,
    themeName: String,   // e.g. "CAR DECAL"
    cycleId: String,
    modelId: String,
    cycleName: String,   // e.g. "Xplorer 20T"
    modelNo: String,     // model number if any

    image_url: String,

    // User inputs
    userName: String,
    tagline: String,
    bikeSize: String,    // "20T" | "24T" | "26T" | etc.

    // Mode / variant
    mode: String,         // "sporty" | "fun"
    themeVariant: String, // "primary" | "secondary"

    // Frame colour (kept for backward compatibility)
    frameColorIndex: Number,
    frameColor: {
      colorName: String,
      colorCode: String,
      imageUrl: String,
      fileName: String,
    },

    // All selected parts (frame, grip, mudguard, brake lever…)
    selectedParts: {
      type: [PartSelectionSchema],
      default: [],
    },

    // All image layers used to render
    images: {
      baseBikeImage: String,   // sportyFrameComponent / funFrameComponent
      carBase: String,
      carPaint: String,
      carDecal: String,
      primaryColour: String,
      secondaryColour: String,
      logo: String,
    },

    // Which sticker keys are recolourable (from ThemeConfig.stickersMeta)
    stickersMeta: {
      paintKey: String,     // e.g. "carPaint"
      decalKey: String,     // e.g. "carDecal"
      highlightKey: String, // e.g. "primaryColour" or "secondaryColour"
    },

    // CMYK + hex chosen for each recolourable sticker
    stickerColors: {
      paint: { type: StickerColorSchema, default: undefined },     // Sticker 03
      decal: { type: StickerColorSchema, default: undefined },     // Sticker 04
      highlight: { type: StickerColorSchema, default: undefined }, // primary / secondary
    },

    // For safety – keep full stickers JSON from ThemeConfig
stickersRaw: {
  sportyFrameComponent: String,
  funFrameComponent: String,

  carBase: String,
  carPaint: String,
  carDecal: String,
  primaryColour: String,
  secondaryColour: String,
  logo: String,

    funImage: String,
    sportyImage: String,

  selectedBaseImage: String, // ✅ NEW: freeze the exact preview image
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customization", CustomizationSchema);
