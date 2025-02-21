const express = require("express");
const roomRoutes = express.Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  getRoomsByUserId
} = require("../controllers/room.controller");

roomRoutes.get("/rooms", getRooms);
roomRoutes.post("/rooms", createRoom);
roomRoutes.get("/users/:id/rooms", getRoomsByUserId);
roomRoutes.put("/users/:id/rooms/:roomId", updateRoom);
roomRoutes.delete("/users/:id/rooms/:roomId", deleteRoom);

module.exports = roomRoutes;
