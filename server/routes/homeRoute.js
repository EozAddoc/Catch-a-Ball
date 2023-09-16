const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const Deck = require('../models/Deck'); // Import the Deck model
const router = express.Router();
const auth = require('../middleware/authenticateToken');
const authenticateToken = require('../middleware/authenticateToken');


// Define a route for the home page
router.get('/home', authenticateToken, async (req, res) => {
  try {
    const username = req.username;
    console.log(username)
    const user = await User.getUserByUsername(username);
console.log(user.id)
    const deck = await Deck.getDeckDataByUsername(username);
    console.log(deck.id)

    const userData = {
      user,
      deck,
    };

    // Send the combined data to the home page
    return res.json({ status: "Success", userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "Error", message: "Internal server error" });
  }
});

module.exports = router;
