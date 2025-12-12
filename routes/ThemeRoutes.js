// routes/themeRoutes.js
const express = require("express");
const router = express.Router();
const Theme = require("../models/Theme");

// ✅ POST /api/themes/add → Add a new theme
router.post("/add", async (req, res) => {
  try {
    const { themeId, themeName, themeImage, description, bannerImage, priority, isActive } = req.body;

    // Basic validation
    if (!themeId || !themeName || !themeImage) {
      return res.status(400).json({
        message: "themeId, themeName, and themeImage are required",
      });
    }

    // Check duplicate themeId
    const existingTheme = await Theme.findOne({ themeId });
    if (existingTheme) {
      return res.status(400).json({
        message: "Theme with this themeId already exists",
      });
    }

    const theme = new Theme({
      themeId,
      themeName,
      themeImage,
      description,
      bannerImage,
      priority,
      isActive,
    });

    await theme.save();
    res.status(201).json({ message: "Theme added", data: theme });
  } catch (error) {
    console.error("Error adding theme:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET /api/themes/all → Get all active themes
router.get("/all", async (req, res) => {
  try {
    const themes = await Theme.find({ isActive: true }).sort({ priority: 1 });
    res.status(200).json(themes);
  } catch (error) {
    console.error("Error fetching themes:", error);
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.themeSlug) {
      return res.status(400).json({ message: "themeSlug is required (e.g. car-decal)" });
    }

    let existing = await ThemeConfig.findOne({ themeSlug: data.themeSlug });

    let saved;
    if (existing) {
      existing.set(data); 
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


// 🔴 Important: export the router
module.exports = router;
