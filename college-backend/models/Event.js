// models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true }, // ISO date string
  time: { type: String },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  attendees: { type: String },
  featured: { type: Boolean, default: false },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);
