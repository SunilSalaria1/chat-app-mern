const Contact = require('../models/userContacts.model');

const getContacts = async (req, res) => {
  /* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Endpoint to sign in a specific user' */
  let contacts = await Contact.find({ user: req.params.id }).populate('contacts.user');
  res.json(contacts[0]);
}

const createContact = async (req, res) => {
  /* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Endpoint to sign in a specific user' */
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Create Contact info.',
      schema: { $ref: '#/definitions/Contacts' }
} */
  let contact = new Contact(req.body);
  await contact.save();
  res.send(contact)
}

module.exports = { getContacts, createContact }