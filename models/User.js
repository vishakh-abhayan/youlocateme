const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  locationId: { type: String, required: true, unique: true },
  billingAddress: {
    street: String,
    city: String,
    zip: String,
    country: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
