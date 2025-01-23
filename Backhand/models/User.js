const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'team-member'], // Only allow these values
    default: 'team-member', // Default role is 'team-member'
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
