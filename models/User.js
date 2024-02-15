const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  locationId: { type: String, required: true, unique: true },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: false, // Ensure this is set to false or omitted if not required
    },
    coordinates: {
      type: [Number],
      required: false, // Ensure this is set to false or omitted if not required
    },
  },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
});

UserSchema.index({ coordinates: "2dsphere" }); // This can remain if you want to support spatial queries when coordinates are provided

module.exports = mongoose.model("User", UserSchema);
