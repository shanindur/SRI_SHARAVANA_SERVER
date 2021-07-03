const httpStatus = require("http-status");
const UserService = require("../services/userServices");

const singUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await UserService.singUp(name, email, password);
    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  singUp,
};