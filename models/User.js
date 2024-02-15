const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  locationId: { type: String, required: true, unique: true },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
});

// Ensure the schema uses the GeoJSON format for spatial queries.
UserSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
