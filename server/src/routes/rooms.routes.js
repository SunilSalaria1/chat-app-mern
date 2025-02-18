const express = require("express");
const roomRoutes = express.Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller");

roomRoutes.post("/rooms", createRoom);
roomRoutes.get("/rooms", getRooms);
roomRoutes.put("/rooms/:id", updateRoom);
roomRoutes.delete("/rooms/:id", deleteRoom);

module.exports = roomRoutes;
