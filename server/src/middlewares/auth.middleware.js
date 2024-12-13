const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret123232");
    const user = await User.findOne({ _id: decoded._id });
    const isValidToken = user.tokens.find((el) => el.token === token);
    if (!user && !isValidToken) {
      res.status(401).send({ error: "Please authenticate" });
    }
    req.user = user;
    req.token = token;
  } catch (error) {
    res.status(401).send({ error });
  }
  next();
};

module.exports = isAuthenticate;
