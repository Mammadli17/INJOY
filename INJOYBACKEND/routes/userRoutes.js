const express = require('express');
const { userController } = require('../controllers/UserController');

const userRoutes = express.Router();


userRoutes.post('/register', userController.register)
userRoutes.post('/confirm', userController.confirmCode)
userRoutes.post('/login', userController.login)
userRoutes.post('/getuser', userController.getUser)
userRoutes.post('/bio', userController.updateBio)
userRoutes.post('/post', userController.createPost)
userRoutes.get('/getpost', userController.getAllPosts)
userRoutes.post('/getpostId', userController.getPostByUserId)
userRoutes.post('/postLike', userController.likePost)
userRoutes.post('/postComment', userController.CommentPost)
userRoutes.get('/getAllLikes', userController.getAllLikes)
userRoutes.get('/getAllComments', userController.getAllComments)




module.exports = {
    userRoutes
}