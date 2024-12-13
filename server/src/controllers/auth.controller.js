const AuthService = require("../services/auth.service");
const HttpError = require("../utils/httpError");

const service = new AuthService();
const register = async (req, res) => {
  try {
    /* 	#swagger.tags = ['Auth']
          #swagger.description = 'Create a an user' */

    /*  #swagger.parameters['body'] = {
              in: 'body',
              description: 'Add new user.',
              schema: { $ref: '#/definitions/User' }
      } */
    const user = await service.register(req.body);
    console.log(user, "created");
    res.status(204).send();
  } catch (error) {
    console.error(error, "error creating user");
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  /* 	#swagger.tags = ['Auth']
          #swagger.description = 'Endpoint to sign in a specific user'
            #swagger.schema: { $ref: '#/definitions/Auth' }
          */
  try {
    const user = await service.login(req.body);
    res.status(201).send({ token: user.token });
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const logout = async (req, res) => {
  /* 	#swagger.tags = ['Auth']
          #swagger.description = 'Endpoint to sign out'
            #swagger.schema: { $ref: '#/definitions/Auth' }
          */
  try {
    await service.logout(req.token, req.user._id);
    res.status(201).send(true);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

const getCurrentUser = (req, res) => {
  /* 	#swagger.tags = ['Auth']
          #swagger.description = 'Get current user' */

  /* #swagger.parameters['headers'] = {
              in: 'headers',
              description: 'Bearer token.',
              required: true,
              type: 'string'
      } */

  try {
    res.status(200).send(req.user);
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
};
