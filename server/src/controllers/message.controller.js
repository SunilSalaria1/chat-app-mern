const Message = require("../models/message.model");
const createMessage = async (req, res) => {
  /* 	#swagger.tags = ['Message']
       #swagger.description = 'Post a message.' */
  try {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a message.',
            schema: { $ref: '#/definitions/Message' }
    } */
    const message = new Message(req.body);
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMessages = async (req, res) => {
  /* 	#swagger.tags = ['Message']
     #swagger.description = 'Get list of messages.' 
     */

      /*  #swagger.parameters['isContactEntity'] = {
            in: 'query',
            description: 'Some description...',
            type: 'boolean'
    } */

  try {
    let messages;
    if (Object.keys(req.query).length === 0) {
      messages = await Message.find({ room: req.params.id }).populate("sender", { password: 0, confirmPassword: 0, __v: 0 });
    } else {
      messages = await Message.find({ contactName: req.params.id }).populate("sender", { password: 0, confirmPassword: 0, __v: 0 });
    }
    res.status(200).send(messages);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

const updateMessage = async (req, res) => {
  /* 	#swagger.tags = ['Message']
     #swagger.description = 'Update a message.' */
  try {
    await Message.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Message updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMessage = async (req, res) => {
  /* 	#swagger.tags = ['Message']
     #swagger.description = 'Delete a message.' */
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).send("Message deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createMessage, getMessages, updateMessage, deleteMessage };
