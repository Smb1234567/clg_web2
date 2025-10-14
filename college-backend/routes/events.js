// routes/events.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: events
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Create new event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, venue, category, attendees, featured, uploadedBy } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      venue,
      category,
      attendees,
      featured,
      uploadedBy
    });

    await newEvent.save();

    res.json({
      success: true,
      message: "Event created successfully!",
      data: newEvent
    });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
