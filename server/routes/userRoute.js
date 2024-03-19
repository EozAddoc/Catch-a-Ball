const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authenticateToken');
const request = require('supertest');
const db = require('../db');

//SIGNUP USER 
router.post("/signup", [
  body('email').notEmpty(),
  body('username').notEmpty(),
  body('password').notEmpty()
], userController.newUser);


// ADD AVATAR API
router.post("/signup/avatar",authenticateToken, userController.updateAvatar);


//LOGIN USER
router.post("/login", userController.loginUser);


//Profile user info CREATE
router.get('/suggestedPlayers',authenticateToken, userController.filterUsers)


//UPDATE
router.post('/Notifications',authenticateToken, userController.updateNotifications )
router.post("/Profile",authenticateToken, userController.updateUserData)
router.patch('/LevelUp',authenticateToken,  userController.levelUpUser)

router.delete('/Delete',authenticateToken, userController.deleteUser )

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

router.get(`/user/filters`, authenticateToken, (req, res) => {
  const { field, value } = req.query;
  if (!field || !value) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }


  const query = `SELECT * FROM users WHERE ${field} = ?`;

  db.query(query, [value], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});
router.get(`/api/search`, (req, res) => {

  const searchTerm = req.query.q;

  const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%'`;


  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

  res.json(results);
  });
});

module.exports = router;
