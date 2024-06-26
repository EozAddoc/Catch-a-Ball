const db = require('../db');

class Battle {

  // CREATE

  static async createBattleTableIfNotExists() {
    const query = `
    CREATE TABLE IF NOT EXISTS battle (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userIdF INT,
      userIdS INT,
      winner INT,
      status VARCHAR(255) NOT NULL,
      time DATETIME,
      FOREIGN KEY (userIdF) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (userIdS) REFERENCES users(id) ON DELETE CASCADE
    )`;

    try {
      await db.query(query);
      console.log('Battle table created or already exists.');
    } catch (err) {
      console.error('Error while creating battle table:', err);
    }
  }

  static async createBattle(userF, userS) {
    
    try {
      const query = "INSERT INTO battle (userIdF, userIdS, winner, status, time) SELECT ? AS userIdF, ? AS userIdS, (SELECT id FROM users WHERE id = ? OR id = ? ORDER BY battleLvl DESC LIMIT 1) AS winner, 'InProgress' AS status, NOW() AS time";
      const values = [userF, userS,userF,userS];
      const result = db.query(query, values);
      const userId = result.insertId;
      return userId;
    } catch (err) {
      console.error('Error while inserting users into battle:', err);
      throw err;
    }
  }

  static async getInProgress(userId) {
    const query = 'SELECT * FROM battle WHERE status = "InProgress" AND (userIdF = ? OR userIdS = ?)';
    const values = [userId, userId];
  
    try {
      const result = await db.query(query, values);
      console.log('Battle in progress:', result);
      return result;
    } catch (err) {
      console.error('Error while fetching battles in progress:', err);
      throw err;
    }
  }
  static async endBattle(id, card, userId) {
    try {
      // Start a transaction
      db.beginTransaction();
  
      const updateBattleQuery = 'UPDATE battle SET status = ? WHERE id = ?';
      const battleValues = ['ended', id];
      db.query(updateBattleQuery, battleValues);
  
      const insertDeckQuery = 'INSERT INTO deck (user_id, card_api, Experience, Chosen_For_Battle) VALUES (?, ?, 0, FALSE)';
      const deckValues = [userId, card];
      db.query(insertDeckQuery, deckValues);
  
      const updateUsersQuery = 'UPDATE users SET battleLvl = battleLvl + 1 WHERE id = ?';
      const userValues = [userId];
      db.query(updateUsersQuery, userValues);
  
      db.commit();
  
      return true; 
    } catch (err) {
      await db.rollback();
      console.error('Error while ending battles in progress:', err);
      throw err;
    }
  }
  

}

module.exports = Battle;
