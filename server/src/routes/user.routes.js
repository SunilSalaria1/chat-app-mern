const express = require("express");
const userRoutes = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:id", getUserById);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);

module.exports = userRoutes;
