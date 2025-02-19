const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  isFavoriteContact: { type: Boolean, default: false },
});

module.exports = contactSchema;

/* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Update contact information.' */
