const isAuthenticate = require("../middlewares/auth.middleware");
const express = require("express");
const authRoutes = express.Router();
const {getCurrentUser,login,register,logout} = require("../controllers/auth.controller");

authRoutes.get("/currentUser",isAuthenticate, getCurrentUser);
authRoutes.post("/register",register);
authRoutes.post("/login", login);
authRoutes.post("/logout", isAuthenticate,logout);

module.exports = authRoutes;
