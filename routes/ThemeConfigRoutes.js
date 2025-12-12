// routes/themeConfigRoutes.js
const express = require("express");
const router = express.Router();
const ThemeConfig = require("../models/ThemeConfig");

// 🔹 POST: Add or Update theme config using Postman (based on themeId)
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.themeId) {
      return res.status(400).json({ message: "themeId is required" });
    }

    let existing = await ThemeConfig.findOne({ themeId: data.themeId });

    let saved;
    if (existing) {
      existing.set(data); // update existing doc
      saved = await existing.save();
    } else {
      saved = await ThemeConfig.create(data);
    }

    res.status(201).json({
      message: existing ? "Theme updated successfully" : "Theme added successfully",
      data: saved
    });
  } catch (err) {
    console.error("❌ Error saving theme config:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET: Fetch theme by slug  (URL: /api/theme-config/slug/car-decal)
// router.get("/slug/:slug", async (req, res) => {
//   try {
//     const slug = req.params.slug; // e.g. "car-decal"
//     console.log("🔎 Incoming slug:", slug);

//     // 1️⃣ First: try exact match on themeSlug
//     let theme = await ThemeConfig.findOne({ themeSlug: slug });
//     console.log("🔎 Found by themeSlug?", !!theme);

//     // 2️⃣ If not found: derive name from slug and search by themeName
//     if (!theme) {
//       const derivedName = slug.replace(/-/g, " ").toUpperCase(); // "car-decal" -> "CAR DECAL"
//       console.log("🔎 Derived themeName:", derivedName);
//       theme = await ThemeConfig.findOne({ themeName: derivedName });
//       console.log("🔎 Found by themeName?", !!theme);
//     }

//     if (!theme) {
//       return res.status(404).json({ message: "Theme not found for slug" });
//     }

//     res.json(theme);
//   } catch (err) {
//     console.error("❌ Error fetching theme by slug:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// 🔹 GET: Fetch theme by slug  (URL: /api/theme-config/slug/car-decal)
router.get("/slug/:slug", async (req, res) => {
  try {
    const slug = req.params.slug; // e.g. "car-decal"
    console.log("🔎 Incoming slug:", slug);

    // 1️⃣ First: try exact match on themeSlug
    let theme = await ThemeConfig.findOne({ themeSlug: slug });
    console.log("🔎 Found by themeSlug?", !!theme);

    // 2️⃣ If not found: derive name from slug and search by themeName
    if (!theme) {
      const derivedName = slug.replace(/-/g, " ").toUpperCase(); // "car-decal" -> "CAR DECAL"
      console.log("🔎 Derived themeName:", derivedName);
      theme = await ThemeConfig.findOne({ themeName: derivedName });
      console.log("🔎 Found by themeName?", !!theme);
    }

    if (!theme) {
      return res.status(404).json({ message: "Theme not found for slug" });
    }

    // ✅ Convert to plain object so we can safely modify
    const themeObj = theme.toObject();

    // ✅ Define default order & editable flags for sticker layers
    //   (for now, common for all themes – later we can customize per slug if needed)
    const STICKER_ORDER = {
      carBase: 1,
      carPaint: 2,
      carDecal: 3,
      primaryColour: 4,
      secondaryColour: 5,
      logo: 6,
      funImage: 10,    // flora pink special (not editable)
      sportyImage: 10, // flora pink special (not editable)
    };

    const EDITABLE_DEFAULT = {
      carPaint: true,
      carDecal: true,
      primaryColour: true,
      secondaryColour: true,
      carBase: false,
      logo: false,
      funImage: false,
      sportyImage: false,
    };

    const parts = themeObj.assets?.parts || [];

    // ✅ Build stickersMeta for every color in every part
    const normalizedParts = parts.map((part) => {
      const newColors = (part.colors || []).map((color) => {
        const stickersObj = color.stickers || {};

        // { key: url } → [{ key, url, order, editable, label }]
        const stickersMeta = Object.entries(stickersObj).map(([key, url]) => ({
          key,                       // 'carPaint', 'carDecal', 'primaryColour', etc.
          url,
          order: STICKER_ORDER[key] || 99,
          editable: EDITABLE_DEFAULT[key] || false,
          label: key,                // can beautify later if needed
        }));

        return {
          ...color,
          stickersMeta,              // 👈 NEW FIELD for frontend
        };
      });

      return {
        ...part,
        colors: newColors,
      };
    });

    const response = {
      ...themeObj,
      assets: {
        ...themeObj.assets,
        parts: normalizedParts,
      },
    };

    // 🔁 Return enriched theme (original stickers + stickersMeta)
    return res.json(response);
  } catch (err) {
    console.error("❌ Error fetching theme by slug:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔹 GET: Fetch theme by themeName (URL: /api/theme-config/by-name/CAR%20DECAL)
router.get("/by-name/:themeName", async (req, res) => {
  try {
    const themeName = decodeURIComponent(req.params.themeName);
    const theme = await ThemeConfig.findOne({ themeName });

    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    res.json(theme);
  } catch (err) {
    console.error("❌ Error fetching theme by name:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET: Fetch theme by themeId (URL: /api/theme-config/01)
router.get("/:themeId", async (req, res) => {
  try {
    const themeId = req.params.themeId;
    const theme = await ThemeConfig.findOne({ themeId });

    if (!theme) {
      return res.status(404).json({ message: "Theme not found" });
    }

    res.json(theme);
  } catch (err) {
    console.error("❌ Error fetching theme config:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 GET: All themes (URL: /api/theme-config)
router.get("/", async (req, res) => {
  try {
    const themes = await ThemeConfig.find({});
    res.json(themes);
  } catch (err) {
    console.error("❌ Error fetching themes:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
