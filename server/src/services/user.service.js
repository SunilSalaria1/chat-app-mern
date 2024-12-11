const User = require("../models/user.model");
const HttpError = require("../utils/httpError");

class UserService {
  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      return error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user){
        throw new HttpError("Invalid user Id", 401);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError("Internal server error, please try again later", 500);
    }
  }

  async updateUser(userId, updatedUser) {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUser);
      if (!user) {
        throw new HttpError("Invalid data", 401);
      }
      return user;
    } catch (error) {
        if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError("Internal server error, please try again later", 500);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user){
        throw new HttpError("Invalid user id", 401);
      }
      return user;
    } catch (error) {
        if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError("Internal server error, please try again later", 500);
    }
  }
}

module.exports = UserService;
