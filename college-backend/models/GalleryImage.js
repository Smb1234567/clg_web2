// models/GalleryImage.js
const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  imageUrl: { type: String, required: true }, // Path to uploaded image
  uploadedBy: { type: String, required: true }, // 👈 Add this!
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GalleryImage", galleryImageSchema);