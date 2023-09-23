const express = require('express');
const { body } = require('express-validator');
const deckController = require('../controllers/deckController')
const Deck = require('../models/Deck'); // Import the Deck model
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');


router.post('/signup/pokemon', deckController.addCards)
router.get('/deck', authenticateToken,async ( req,res)=>{
    try {
    const userId = req.userId;
    const deck = await Deck.getDeckByUserId(userId);
    if ( deck) {
        return res.json({
          Status: "Success",
          deckData: deck // Include deck data
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