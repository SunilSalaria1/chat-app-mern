const express = require("express");
const userRoutes = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

userRoutes.get("/users", getUsers);
userRoutes.get("/user/:id", getUserById);
userRoutes.put("/user", updateUser);
userRoutes.delete("/user/:id", deleteUser);

module.exports = userRoutes;
