// routes/customizations.js
const express = require("express");
const router = express.Router();
const Customization = require("../models/Customization");
const User = require("../models/User");

// CREATE customization
router.post("/", async (req, res) => {
  try {
    const { user, ...customData } = req.body;

    if (!user || !user.phone) {
      return res.status(400).json({
        error: "user.phone is required"
      });
    }

    // 1️⃣ find user by phone
    let userDoc = await User.findOne({ phone: user.phone });

    // 2️⃣ create if not exists
    if (!userDoc) {
      userDoc = await User.create({
        name: user.name,
        phone: user.phone,
        email: user.email,
        sid: user.sid
      });
    }

    // 3️⃣ create customization linked to user
    const saved = await Customization.create({
      ...customData,
      userId: userDoc._id
    });

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

router.get("/user/:phone", async (req, res) => {
  try {
    const phone = req.params.phone;

    if (!phone) {
      return res.status(400).json({ error: "sid is required" });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const list = await Customization
      .find({ userId: user._id })
      .sort({ createdAt: -1 });

    return res.json(list);
  } catch (err) {
    console.error("Customization fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch customizations" });
  }
});


module.exports = router;
