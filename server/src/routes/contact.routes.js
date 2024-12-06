const express = require('express');
const { getContacts,createContact } = require('../controllers/contact.controller');
const contactRouter = express.Router();

contactRouter.get('/contacts/:id',getContacts);
contactRouter.post('/contact',createContact);

module.exports = contactRouter;
