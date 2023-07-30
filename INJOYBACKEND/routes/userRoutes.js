const express = require('express');
const { userController } = require('../controllers/UserController');

const userRoutes = express.Router();


userRoutes.post('/register', userController.register)
userRoutes.post('/confirm', userController.confirmCode)
userRoutes.post('/login', userController.login)
userRoutes.post('/getuser', userController.getUser)
userRoutes.post('/getpic', userController.getPicture)



module.exports = {
    userRoutes
}