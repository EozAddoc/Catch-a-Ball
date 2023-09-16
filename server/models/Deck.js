const db = require('../db');
const User = require('./User')

class Deck {
    static async createUser_DeckTableIfNotExists() {
        const query = `
        CREATE TABLE IF NOT EXISTS deck (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          card_api VARCHAR(255) NOT NULL,
          Experience INT NOT NULL,
          Chosen_For_Battle BOOLEAN,
          FOREIGN KEY (user_id) REFERENCES users(id)
          )
          
        `  
        db.query(query, (err) => {
            if (err) {
              console.error('Error while creating user table:', err);
            } else {
              console.log('User table created or already exists.');
            }
          });
    }

    
    static async addCards(username, api_Ids, callback) {
        const query = 'INSERT INTO deck (user_id,card_api,Experience,Chosen_For_Battle) VALUES (?, ?, 0, FALSE)';
        const user_id= await User.getUserIdByUsername(username);
        api_Ids.forEach(async (card_api) => {
            const values = [user_id, card_api];
            db.query(query, values, (err, result) => {
              if (err) {
                console.error('Error while adding cards:', err);
                callback(err);
              }
            });
          });
        
          callback(null, 'Cards added successfully');
        }
      
}
module.exports = Deck;
