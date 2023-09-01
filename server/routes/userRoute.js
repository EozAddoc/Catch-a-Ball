const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.post("/signup", [
  body('email').isEmail(),
  body('username').notEmpty(),
  body('password').notEmpty()
], async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.checkExistingUser(email, username, (err, userCount) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (userCount > 0) {
        res.status(409).json({ error: 'Username or email already exists' });
      } else {
        User.createUser(email, username, password, (err) => {
          if (err) {
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.status(201).json({ message: 'Account created successfully' });
          }
        });
      }
    }
  });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsernameAndPassword(username, password, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
    } else {
      if (result.length > 0) {
        const username = result[0].username;
        //generated token
        const token = jwt.sign({username}, process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        //put in cookie
        res.cookie('token',token)
        console.log("cookie ??")
        res.status(200).json({ message: 'Successful login' });
      } else {
        res.status(401).json({ error: 'Wrong username or password' });
      }
    }
  });
});

module.exports = router;
