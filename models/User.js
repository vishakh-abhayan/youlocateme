const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  locationId: { type: String, required: true, unique: true },
  billingAddress: {
    street: String,
    city: String,
    zip: String,
    country: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
