const isAuthenticate = require("../middlewares/auth.middleware");
const express = require("express");
const authRoutes = express.Router();
const {getCurrentUser,login,register} = require("../controllers/auth.controller");

authRoutes.get("/currentUser",isAuthenticate, getCurrentUser);
authRoutes.post("/register",register);
authRoutes.post("/login", login);

module.exports = authRoutes;
