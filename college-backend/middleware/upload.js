// middleware/upload.js
const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if uploading note or gallery image
    if (req.baseUrl.includes("notes")) {
      cb(null, "uploads/notes"); // Save PDFs here
    } else if (req.baseUrl.includes("gallery")) {
      cb(null, "uploads/gallery"); // Save images here
    } else {
      cb(new Error("Invalid upload path"));
    }
  },
  filename: function (req, file, cb) {
    // Create unique name: timestamp + original extension
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// File filter based on route
const fileFilter = (req, file, cb) => {
  if (req.baseUrl.includes("notes")) {
    // For notes: only PDFs
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed for notes"));
    }
  } else if (req.baseUrl.includes("gallery")) {
    // For gallery: allow images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for gallery"));
    }
  } else {
    cb(new Error("Invalid upload type"));
  }
};

// Create upload middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;