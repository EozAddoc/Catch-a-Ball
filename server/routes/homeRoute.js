const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const Deck = require('../models/Deck'); // Import the Deck model
const router = express.Router();
const auth = require('../middleware/authenticateToken');
const authenticateToken = require('../middleware/authenticateToken');


// Define a route for the home page
// router.get('/home', authenticateToken, (req,res)=>{
//   return res.json({Status:"Sucess", username: req.username})

// })


router.get('/home', authenticateToken, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.getUserByUsername(username);
    const deck = await Deck.getDeckByUsername(username);

    if (user && deck) {
      console.log("backend home success")
      return res.json({
        Status: "Success",
        username: req.username,
        userData: user, // Include user data
        deckData: deck // Include deck data
      });
    } else {
      return res.status(404).json({ error: "User or deck not found" });
    }
  } catch (err) {
    console.error('Error fetching user and deck information:', err);
    return res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;


