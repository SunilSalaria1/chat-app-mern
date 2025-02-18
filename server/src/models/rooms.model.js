const mongoose = require("mongoose");

const roomSchema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
    },
    description: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 255,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isGroup: {
      type: Boolean,
      default: true,
    },
    groupIcon: {
      type: String,
    },
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Adding an index to frequently queried fields
roomSchema.index({ name: 1 });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
