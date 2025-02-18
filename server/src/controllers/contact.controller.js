const Contact = require("../models/userContacts.model");

const getContacts = async (req, res) => {
  /* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Endpoint to sign in a specific user' */
  try {
    let contacts = await Contact.find({ user: req.params.id }).populate(
      "contacts.user"
    );
    res.json(contacts);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

const createContact = async (req, res) => {
  /* 	#swagger.tags = ['Contacts']
     #swagger.description = 'Endpoint to sign in a specific user' */
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Create Contact info.',
      schema: { $ref: '#/definitions/Contacts' }
} */
  try {
    const user = await Contact.findOne({user:req.body?.user});
    if(user){
      console.log('console')
      user.contacts.push(req.body);
      await user.save();
      res.send(user);
    }
    let contact = new Contact(req.body);
    await contact.save();
    res.send(contact);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = { getContacts, createContact };
