const User = require("../models/user.model");

class AuthService {
  async login(body) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) {
        return false;
      }
      if (user.password !== body.password) {
        return false;
      }
      const token = await user.generateAuthToken();
      return token;
    } catch (error) {
      console.log(error)
      return error;
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
