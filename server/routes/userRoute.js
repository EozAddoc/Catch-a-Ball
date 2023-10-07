const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authenticateToken');



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

router.put("/profile", userController.updateUser)


router.get('/user', authenticateToken,async ( req,res)=>{
  try {
  const userId = req.userId;
  const user = await User.getUserByUserId(userId);
  if ( user) {
      return res.json({
        Status: "Success",
        userData: user 
      });
    } else {
      return res.status(404).json({ error: "User or deck not found" });
    }
  } catch (err) {
    console.error('Error fetching user and deck information:', err);
    return res.status(500).json({ error: "An error occurred" });
  }

})


module.exports = router;
