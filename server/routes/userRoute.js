const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authenticateToken');
const db = require('../db');



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


//Profile user info CREATE
router.post("/Profile", userController.updateUser)

router.get('/suggestedPlayers', userController.filterUsers)

//User info 
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
router.get(`/user/filter`, (req, res) => {
  const searchTerm = req.query.q;

  console.log(searchTerm)

  if (!searchTerm ) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Use parameterized query to prevent SQL injection
  const query = 'SELECT * FROM users WHERE id = ? ';
  
  // Use an array to pass values securely to the query
  db.query(query, [searchTerm,searchTerm], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});


module.exports = router;
