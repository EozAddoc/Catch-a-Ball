const db = require('../db');
const User = require('./User')

class Deck {
    static async createDeckTable() {
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

    static async getDeckByUsername(username) {
      try {
        const user = await User.getUserByUsername(username);
        
        if (!user) {
          // User not found, handle this case as needed
          return null;
        }
    
        const query = 'SELECT * FROM deck WHERE user_id = ?';
        const values = [user.id];
    
        return new Promise((resolve, reject) => {
          db.query(query, values, (err, result) => {
            if (err) {
              console.error('Error while retrieving deck by username:', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      } catch (err) {
        console.error('Error while getting user by username:', err);
        throw err;
      }
    }
    
  

    
    static async addCards(username, api_Ids, callback) {
        const query = 'INSERT INTO deck (user_id,card_api,Experience,Chosen_For_Battle) VALUES (?, ?, 0, FALSE)';
        console.log("addCards fn ",username);
        const user_id=  await User.getUserIdByUsername(username);
        api_Ids.forEach((card_api) => {
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
