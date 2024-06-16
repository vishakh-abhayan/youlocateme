const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateLocationId } = require("../utils/generateLocationId");
const logger = require("../utils/logger");

// Helper function to generate a unique location ID

// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    const { homeName, cordinates, billingAddress } = req.body;
    const locationId = await generateLocationId(homeName); // Generate a unique location ID based on home name
    logger.verbose(`new locationid - ${locationId} generated`);
    const newUser = new User({ locationId, cordinates, billingAddress });
    await newUser.save();

    logger.info(`POST ${req.originalUrl} ${newUser.locationId} registered`);
    res.status(201).json({ locationId });
  } catch (error) {
    logger.error(`POST ${req.originalUrl} ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// Address retrieval endpoint remains the same
router.get("/address/:locationId", async (req, res) => {
  try {
    const { locationId } = req.params;
    logger.http(`GET ${req.originalUrl} ${locationId} requested`);
    const user = await User.findOne({ locationId });

    if (!user) {
      logger.warn(`GET ${req.originalUrl} ${locationId} not found`);
      return res.status(404).json({ message: "Location ID not found" });
    }

    logger.info(`GET ${req.originalUrl} ${locationId} found`);
    res.json(user.billingAddress);
  } catch (error) {
    logger.error(`GET ${req.originalUrl} ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.get("/status", (req, res) => {
  logger.silly(`GET ${req.originalUrl} API is running`);
  res.send("API is running");
});

module.exports = router;
