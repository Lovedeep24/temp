const registerController = require('./auth/registerController');
const loginController = require('./auth/loginController');
const fileController = require('./fileController');
const userController = require('./userController');
const adminController = require('./adminController')
module.exports = { registerController, loginController, fileController, userController, adminController };