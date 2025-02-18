const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

userSchema.methods.generateAuthToken = async function (tokenVersion) {
  const token = jwt.sign(
    { _id: this._id, email: this.email, tokenVersion },
    "secret123232"
  );
  this.tokens = this.tokens.concat({token:token});
  this.confirmPassword = this.password;
  await this.save();
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
  }
  if (this.isModified("confirmPassword")) {
    this.confirmPassword = undefined;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
