const express = require('express');
const { body } = require('express-validator');
const battleController = require('../controllers/battleController')
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware/authenticateToken');


router.post("/Battle",authenticateToken, battleController.newBattle)
router.get('/inProgress',authenticateToken, battleController.getInProgress)
router.patch('/End', battleController.battleEnding)
router.get('/Battle/filter',authenticateToken, (req,res)=>{
  const initialTime = req.query.time;
  

  if (!initialTime ) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const query = 'SELECT * FROM battle WHERE status = "InProgress" AND time=?';
  
  db.query(query, [initialTime], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

  res.json(results);
  });
})
router.get(`/inProgress/filter`,authenticateToken, (req, res) => {
    const searchTerm = req.query.q;
    
    if (!searchTerm ) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const query = 'SELECT * FROM battle WHERE status = "InProgress" AND (userIdF = ? OR userIdS = ?)';
    
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
