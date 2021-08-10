
const UserService = require("../services/userServices");

const singUp = async (req, res, next) => {
  try {
    const { name, email, password , phone_number } = req.body;
    const data = await UserService.singUp(name, email, password , phone_number);
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

  const getUserInfo = async (req, res, next) => {
    try {
      const { userid } = req.body;
      const data = await UserService.getUserInfo(userid);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

  const getAllUsers = async (req , res , next) => {
    try {
      const data = await UserService.getAllUsers();
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  }

  const sendPasswordReset = async (req, res, next) => {
    try {
      const { email } = req.body;
      const data = await UserService.getUserInfo(email);
      return res.status(data.status).json(data);
    } catch (error) {
      return next(error);
    }
  };

  
const editUsers = async (req, res, next) => {
  try {
    const {
      name, 
      email, 
      password , 
      phone_number,
      user_level
    } = req.body;
    const profile_Pic = req.files;
    const data = await UserService.UpdateUsers(
      name, 
      email, 
      password , 
      phone_number,
      user_level,
      profile_Pic
    );
    return res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  singUp,
  singIn,
  getUserInfo,
  sendPasswordReset,
  getAllUsers,
  editUsers
};