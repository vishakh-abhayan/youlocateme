const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  locationId: { type: String, required: true, unique: true },
  billingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
});

module.exports = mongoose.model("User", UserSchema);
