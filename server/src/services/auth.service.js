const User = require("../models/user.model");
const HttpError = require("../utils/httpError");
const bcrypt = require("bcrypt");

class AuthService {
  async login(body) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        throw new HttpError("Invalid username or password", 404);
      }
      const comparePassword =  await bcrypt.compare(body.password,user.password);
      if (!comparePassword) {
        throw new HttpError("Invalid username or password", 404);
      }
      user.tokenVersion++;
      const token = await user.generateAuthToken(user.tokenVersion);
      return { token, user };
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      console.log(error);
      throw new HttpError("Internal server error, please try again later", 500);
    }
  }

  async register(user) {
    try {
      const isAlreadyExist = await User.findOne({ email: user.email });
      if (isAlreadyExist) {
        throw new HttpError("Email already in use", 409);
      }
      const newUser = new User(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError("Internal server error, please try again later", 500);
    }
  }

  async logout(token, userID) {
    try {
      const user = await User.findById(userID);
      const isToken =user.tokens.some((el) => el.token === token);
      if (!isToken) {
        throw new HttpError("Invalid token", 401);
      }
      user.tokens = user.tokens.filter((el) => el.token !== token);
      await user.save();
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      throw new HttpError("Internal server error, please try again later", 500);
    }
  }
}

module.exports = AuthService;
