const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret123232");
    const user = await User.findOne({ _id: decoded._id, });
    if (!user) {
      res.status(401).send({ error: "Please authenticate" });
    }
    req.user = user;
  } catch (error) {
    res.status(401).send({ error});
  }
  next();
}

module.exports = isAuthenticate;