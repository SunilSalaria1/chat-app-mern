const express = require('express');
const messageRouter = express.Router();
const { createMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/message.controller');
const isAuthenticate = require('../middlewares/auth.middleware');

messageRouter.post('/message', createMessage,isAuthenticate);
messageRouter.get('/message/:id', getMessages);
messageRouter.put('/message/:id', updateMessage);
messageRouter.delete('/message/:id', deleteMessage);

module.exports = messageRouter;



