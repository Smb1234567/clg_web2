// routes/announcements.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const Announcement = require("../models/Announcement");

// GET /api/announcements - Public route
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json({ success: true, announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ success: false, message: "Failed to load announcements" });
  }
});

// POST /api/announcements - Admin only
router.post("/", authenticateToken, async (req, res) => {
  const { title, content, category, urgent } = req.body;

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  try {
    const announcement = new Announcement({
      title,
      content,
      category: category || "Academic",
      urgent: !!urgent,
    });

    await announcement.save();
    res.json({ success: true, message: "Announcement created successfully!" });
  } catch (err) {
    console.error("Error saving announcement:", err);
    res.status(500).json({ success: false, message: "Failed to create announcement" });
  }
});

module.exports = router;
