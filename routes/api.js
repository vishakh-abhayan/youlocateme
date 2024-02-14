const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateLocationId } = require("../utils/generateLocationId");

// Helper function to generate a unique location ID

// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    const { homeName, cordinates, billingAddress } = req.body;
    const locationId = await generateLocationId(homeName); // Generate a unique location ID based on home name
    const newUser = new User({ locationId, cordinates, billingAddress });
    await newUser.save();

    res.status(201).json({ locationId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Address retrieval endpoint remains the same
router.get("/address/:locationId", async (req, res) => {
  try {
    const { locationId } = req.params;
    const user = await User.findOne({ locationId });

    if (!user)
      return res.status(404).json({ message: "Location ID not found" });

    res.json(user.billingAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
