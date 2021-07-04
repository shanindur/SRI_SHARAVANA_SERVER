
const UserService = require("../services/userServices");

const singUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await UserService.singUp(name, email, password);
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const singIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await UserService.singIn( email, password);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

module.exports = {
  singUp,
  singIn
};