const Service = require("../services/user.service");
const HttpError = require("../utils/httpError");
const UserService = new Service();


const getUsers = async (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Get all users.' */
  try {
    const users = await UserService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Get user by ID' */
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Update user' */
  try {
    await UserService.updateUser(req.params.id, req.body);
    res.status(200).send("User updated successfully");
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  /* 	#swagger.tags = ['User']
        #swagger.description = 'Delete an user.' */
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
