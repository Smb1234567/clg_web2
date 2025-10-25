// models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  branch: { type: String, required: true }, // e.g., CSE, ECE
  semester: { type: Number, required: true }, // e.g., 1 to 8
  subjectCode: { type: String, required: true }, // e.g., CS101
  fileName: { type: String, required: true }, // original name like "ds-unit1.pdf"
  filePath: { type: String, required: true }, // path like "/uploads/notes/ds-unit1.pdf"
  //uploadedBy: { type: String, default: "admin" },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", noteSchema);
