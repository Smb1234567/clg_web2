// routes/notes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/auth");
const Note = require("../models/Note");

// GET /api/notes - Public: Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load notes" });
  }
});

// POST /api/notes - Admin only: Upload new note
router.post("/", authenticateToken, upload.single("file"), async (req, res) => {
  const { title, branch, semester, subjectCode } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  try {
    const note = new Note({
      title,
      branch,
      semester: Number(semester),
      subjectCode,
      fileName: file.originalname,
      filePath: `/uploads/notes/${file.filename}`,
    });
    await note.save();
    res.json({ success: true, message: "Note uploaded successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to upload note" });
  }
});

module.exports = router;
