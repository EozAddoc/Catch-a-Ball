const Deck = require('../models/Deck');

class deckController {

    static async addCards(req, res) {
        const api_Ids = req.body.api_Ids;
        const userId = req.body.userId;
        Deck.createDeckTable();
      
        Deck.addCards(userId,api_Ids,(err)=>{
          if (err) {
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.status(201).json({ message: 'UserCards added successfully' });
          }
        })
      }

}
module.exports = deckController;