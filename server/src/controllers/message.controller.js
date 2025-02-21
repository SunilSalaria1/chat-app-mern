const Message = require("../models/message.model");
const HttpError = require("../utils/httpError");

const createMessage = async (req, res) => {
  /* 	#swagger.tags = ['Message']
       #swagger.description = 'Post a message.' */
  try {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create a message.',
            schema: { $ref: '#/definitions/Message' }
    } */
     if(!req.body.parentMessage){
     delete   req.body.parentMessage 
    }
    const message = new Message(req.body);
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

const getMessagesById = async (req, res) => {
  /* 	#swagger.tags = ['Message']
     #swagger.description = 'Get list of messages.' 
     */

      /*  #swagger.parameters['isContactEntity'] = {
            in: 'query',
            description: 'Some description...',
            type: 'boolean'
    } */

  try {
    let messages =await Message.findById({ _id: req.params.id }).populate("sender parentMessage", { password: 0, confirmPassword: 0, __v: 0,tokens:0});
    res.status(200).send(messages);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const getMessagesByRoomId = async (req, res) => {
  /* 	#swagger.tags = ['Message']
     #swagger.description = 'Get list of messages.' 
     */

      /*  #swagger.parameters['isContactEntity'] = {
            in: 'query',
            description: 'Some description...',
            type: 'boolean'
    } */

  try {
    let messages =await Message.find({ room: req.params.id }).populate("sender parentMessage", { password: 0, confirmPassword: 0, __v: 0,tokens:0 });
    res.status(200).send(messages);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
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
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
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
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

module.exports = { createMessage, getMessagesById,getMessagesByRoomId, updateMessage, deleteMessage };
