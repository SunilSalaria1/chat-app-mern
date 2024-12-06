const User = require("../models/user.model");

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
      if (!user) return "User not found";
      return user;
    } catch (error) {
      return error;
    }
  }

  async updateUser(userId, updatedUser) {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUser);
      if (!user) return "User not found";
      return user;
    } catch (error) {
      return error;
    }
  }

  async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) return "User not found";
      return user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
