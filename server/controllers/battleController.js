const Battle = require('../models/Battle');
const jwt = require('jsonwebtoken');

class battleController {
   
   
    static async newBattle(req, res) {
        const userF = req.body.userF;
        const userS = req.body.userS;
        Battle.createBattleTableIfNotExists();
    
    
             Battle.createBattle(userF, userS, (err) => {
                if (err) {
                  res.status(500).json({ message: 'Internal server error' });
                } else {
               
                  res.status(201).json({ message: 'Battle created successfully' });
                }
              });
            }
            static async getInProgress(req,res){
              const userId = req.body.userId
              console.log(userId)
      
              Battle.getInProgress(userId, (err) => {
                if (err) {
                  res.status(500).json({ message: 'Internal server error' });
                } else {
               
                  res.status(201).json({ message: 'Battle created successfully' });
                }
              });
            }
          }

  
module.exports = battleController;