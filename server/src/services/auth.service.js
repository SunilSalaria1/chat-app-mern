const User = require("../models/user.model");
const HttpError = require("../utils/httpError");

class AuthService {
  async login(body) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        throw new HttpError("Invalid username or password", 404);
      }
      if (user.password !== body.password) {
        throw new HttpError("Invalid username or password", 404);
      }
      const token = await user.generateAuthToken();
      return { token, user };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError("Internal server error, please try again later", 500);
    }
  }

  async register(user) {
    try {
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthService;
