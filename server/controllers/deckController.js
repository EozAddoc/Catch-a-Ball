const Deck = require('../models/Deck');

class deckController {

    static async addCards(req, res) {
        const api_Ids = req.body.api_Ids;
        const username = req.body.username;
        Deck.createUser_DeckTableIfNotExists();
      
        Deck.addCards(username,api_Ids,(err)=>{
          if (err) {
            res.status(500).json({ message: 'Internal server error' });
          } else {
            res.status(201).json({ message: 'UserCards added successfully' });
          }
        })
      }

}
module.exports = deckController;