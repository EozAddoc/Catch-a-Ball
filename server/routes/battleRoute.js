const express = require('express');
const { body } = require('express-validator');
const battleController = require('../controllers/battleController')
const Deck = require('../models/Deck'); // Import the Deck model
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');


router.post("/Battle", battleController.newBattle)
router.get('/inProgress', battleController.getInProgress)

module.exports = router;
