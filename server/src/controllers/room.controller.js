const Room = require("../models/rooms.model");
const HttpError = require("../utils/httpError");

const createRoom = async (req, res) => {
  /* 	#swagger.tags = ['Rooms']
     #swagger.description = 'Get rooms' */
  try {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Create new room.',
            schema: { $ref: '#/definitions/Room' }
    } */
    const room = new Room(req.body);
    await room.save();
    res.status(201).send(room);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const getRooms = async (req, res) => {
  /* 	#swagger.tags = ['Rooms']
       #swagger.description = 'Get rooms' */
  try {
    const rooms = await Room.find({}).populate("members createdBy admin", { password: 0, confirmPassword: 0, __v: 0 });
    res.status(200).send(rooms);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const getRoomsByUserId = async (req, res) => {
  /* 	#swagger.tags = ['Rooms']
       #swagger.description = 'Get rooms by user id' */
  try {
    const rooms = await Room.find({members:req.params.id}).populate("members createdBy admin", { password: 0, confirmPassword: 0, __v: 0 });
    res.status(200).send(rooms);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const updateRoom = async (req, res) => {
  /* 	#swagger.tags = ['Rooms']
       #swagger.description = 'Endpoint to sign in a specific user' */
  /*  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Update room info.',
      schema: { $ref: '#/definitions/Room' }
} */
  try {
    await Room.findByIdAndUpdate({member:req.params.id,_id:req.params.roomId}, req.body);
    res.status(200).send("Room updated successfully");
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const deleteRoom = async (req, res) => {
  /* 	#swagger.tags = ['Rooms']
       #swagger.description = 'Delete a room.' */
  try {
    await Room.findByIdAndDelete(req.params.roomId);
    res.status(200).send("Room deleted successfully");
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

module.exports = { createRoom, getRooms,getRoomsByUserId, updateRoom, deleteRoom };
