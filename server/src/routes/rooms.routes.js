const express = require("express");
const roomRoutes = express.Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller");

roomRoutes.post("/room", createRoom);

roomRoutes.get("/room", getRooms);

roomRoutes.put("/room/:id", updateRoom);

roomRoutes.delete("/room/:id", deleteRoom);

module.exports = roomRoutes;
