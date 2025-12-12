// routes/customizations.js
const express = require("express");
const router = express.Router();
const Customization = require("../models/Customization");

// CREATE customization
router.post("/", async (req, res) => {
  try {
    const saved = await Customization.create(req.body);
    return res.status(201).json(saved);
  } catch (err) {
    console.error("Customization save error:", err);
    return res.status(500).json({ error: "Failed to save customization" });
  }
});

// UPDATE customization
router.put("/:id", async (req, res) => {
  try {
    const updated = await Customization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Customization not found" });
    }
    return res.json(updated);
  } catch (err) {
    console.error("Customization update error:", err);
    return res.status(500).json({ error: "Failed to update customization" });
  }
});

// GET customization by ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await Customization.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: "Customization not found" });
    }
    return res.json(doc);
  } catch (err) {
    console.error("Customization get error:", err);
    return res.status(500).json({ error: "Failed to fetch customization" });
  }
});

module.exports = router;
