const express = require('express');
const { body } = require('express-validator');
const Deck = require('../models/Deck');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post("/signup/pokemon",async (req, res) => {
    const api_Ids = req.body.api_Ids;
    const username = req.body.username;
    Deck.createUser_DeckTableIfNotExists();
  
    Deck.addCards(username,api_Ids,(err,result)=>{
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Cards added successfully' });
      }
    })
  })

module.exports = router;