const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 6,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["male", "female", "other"],
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, "secret123232");
  return token;
};

module.exports = mongoose.model("User", userSchema);