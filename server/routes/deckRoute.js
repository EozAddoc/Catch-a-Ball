const express = require('express');
const { body } = require('express-validator');
const deckController = require('../controllers/deckController')
const router = express.Router();
const jwt = require('jsonwebtoken')


router.post('/signup/pokemon', deckController.addCards)

module.exports = router;