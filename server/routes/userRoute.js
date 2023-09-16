const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/userController')



//SIGNUP USER 
router.post("/signup", [
  body('email').isEmail(),
  body('username').notEmpty(),
  body('password').notEmpty()
], userController.newUser);



// ADD AVATAR API
router.post("/signup/avatar", userController.updateAvatar);


//LOGIN USER
router.post("/login",userController.loginUser);


module.exports = router;
