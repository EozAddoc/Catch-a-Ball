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
        try {
           db.query(query);
          console.log('Deck table created or already exists.');
        } catch (err) {
          console.error('Error while creating user table:', err);
        }
    }

    static async getDeckByUserId(userId) {
      try {
        const user = await User.getUserByUserId(userId);
        
        if (!user) {
          // User not found, handle this case as needed
          return null;
        }
    
        const query = 'SELECT * FROM deck WHERE user_id = ?';
        const values = [userId];
    
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

    static async chooseForBattle(card_api, userId, callback) {
      const query = 'UPDATE deck SET Chosen_For_Battle = true WHERE user_id = ? AND card_api = ?';
      const values = [userId, card_api];
      try {
        await db.query(query,values);
        console.log('Updated successfully');
        callback(null, 'Updated successfully');

      } catch (err) {
        console.error('Error in chooseForBattle method:', err);
        callback(err);      }
  
    }
    
    

    static async addCards(userId, api_Ids, callback) {
      const query = 'INSERT INTO deck (user_id,card_api,Experience,Chosen_For_Battle) VALUES (?, ?, 0, FALSE)';
      const user_id = userId;
    
      try {
        for (const card_api of api_Ids) {
          const values = [user_id, card_api];
          await new Promise((resolve, reject) => {
            db.query(query, values, (err, result) => {
              if (err) {
                console.error('Error while adding cards:', err);
                reject(err);
              } else {
                resolve(result);
              }
            });
          });
        }
    
        callback(null, 'Cards added successfully');
      } catch (err) {
        console.error('Error in addCards method:', err);
        callback(err);
      }
    }
    
}
module.exports = Deck;
