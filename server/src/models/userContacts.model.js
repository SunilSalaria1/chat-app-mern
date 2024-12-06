const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isFavoriteContact: { type: Boolean, default: false }
});

const myContactsSchema = mongoose.Schema({
  contacts: [contactSchema],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
})

const Contact = mongoose.model('Contact', myContactsSchema);

module.exports = Contact

/* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Update contact information.' */