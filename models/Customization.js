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
const Counter = require("./Counter");
/**
 * For CMYK / hex info of the recoloured stickers
 */
// const StickerColorSchema = new Schema(
//   {
//     hex: { type: String },   // e.g. "#ff00aa"
//     c: { type: Number },     // 0–100
//     m: { type: Number },     // 0–100
//     y: { type: Number },     // 0–100
//     k: { type: Number },     // 0–100
//   },
//   { _id: false }
// );

const CmykSchema = new mongoose.Schema(
  {
    c: { type: Number, default: 0 },
    m: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    k: { type: Number, default: 0 },
  },
  { _id: false }
);

const StickerColorsSchema = new mongoose.Schema({
  baseHex: { type: String, default: null },
  baseCmyk: { type: CmykSchema, default: () => ({}) },

  paintHex: { type: String, default: null },
  paintCmyk: { type: CmykSchema, default: () => ({}) },

  decalHex: { type: String, default: null },
  decalCmyk: { type: CmykSchema, default: () => ({}) },

  primaryHex: { type: String, default: null },
  primaryCmyk: { type: CmykSchema, default: () => ({}) },

  secondaryHex: { type: String, default: null },
  secondaryCmyk: { type: CmykSchema, default: () => ({}) },
}, { _id: false });

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
    partIdx:Number,
  },
  { _id: false }
);

const CustomizationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customization_number: {
      type: String,
      unique: true,
      index: true,
    },

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
    brakeColorIndex: Number,
    gripColorIndex: Number,
    mudguardColorIndex: Number,
    basketColorIndex:Number,
    backrestColorIndex:Number,
    
    frameColor: {
      colorName: String,
      colorCode: String,
      imageUrl: String,
      fileName: String,
    },
    // All selected parts (frame, grip, mudguard, brake lever…)
    selectedParts: {
      frame: { type: PartSelectionSchema, default: undefined },
      grip: { type: PartSelectionSchema, default: undefined },
      mudguard: { type: PartSelectionSchema, default: undefined },
      breaklever: { type: PartSelectionSchema, default: undefined },
      basket: { type: PartSelectionSchema, default: undefined },
      backrest: { type: PartSelectionSchema, default: undefined }
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

    // For safety – keep full stickers JSON from ThemeConfig
    stickersRaw: {
      sportyFrameComponent: String,
      funFrameComponent: String,

      carBase: String,
      isBaseStickerColorAllowed: { type: Boolean, default: false },
      carPaint: String,
      isPaintStickerColorAllowed: { type: Boolean, default: false },
      carDecal: String,
      isDecalStickerColorAllowed: { type: Boolean, default: false },
      primaryColour: String,
      isPrimaryStickerColorAllowed: { type: Boolean, default: false },
      secondaryColour: String,
      isSecondaryStickerColorAllowed: { type: Boolean, default: false },
      logo: String,

      funImage: String,
      sportyImage: String,

      selectedBaseImage: String, // ✅ NEW: freeze the exact preview image
    },

    stickerColors: {
      type: StickerColorsSchema,
      default: () => ({}),
    }
  },
  { timestamps: true }
);


CustomizationSchema.pre("save", async function () {
  // if already exists (update case)
  if (this.customization_number) return;

  const counter = await Counter.findOneAndUpdate(
    { name: "customization" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const padded = String(counter.seq).padStart(3, "0");

  this.customization_number = `TICUS${padded}`;
});

module.exports = mongoose.model("Customization", CustomizationSchema);
