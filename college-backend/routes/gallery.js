// routes/gallery.js
const express = require("express");
const router = express.Router();
const GalleryImage = require("../models/GalleryImage");

// Get all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: images
    });
  } catch (err) {
    console.error("Error fetching gallery images:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Upload new gallery image
router.post("/", async (req, res) => {
  try {
    const { title, description, category, uploadedBy } = req.body;
    const imageUrl = `/uploads/gallery/${Date.now()}.jpg`; // Example path

    const newImage = new GalleryImage({
      title,
      description,
      category,
      imageUrl,
      uploadedBy
    });

    await newImage.save();

    res.json({
      success: true,
      message: "Image uploaded successfully!",
      data: newImage
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Delete gallery image
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await GalleryImage.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    res.json({
      success: true,
      message: "Image deleted successfully!"
    });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;