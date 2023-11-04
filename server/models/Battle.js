const db = require('../db');

class Battle {

  // CREATE

  static async createBattleTableIfNotExists() {
    const query = `
    CREATE TABLE IF NOT EXISTS battle (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userIdF INT,
      userIdS INT,
      status VARCHAR(255) NOT NULL,
      FOREIGN KEY (userIdF) REFERENCES users(id),
      FOREIGN KEY (userIdS) REFERENCES users(id)
    )`;

    try {
      await db.query(query);
      console.log('Battle table created or already exists.');
    } catch (err) {
      console.error('Error while creating battle table:', err);
    }
  }

  static async createBattle(userF, userS) {
    const query = 'INSERT INTO battle (userIdF, userIdS, status) VALUES (?, ?, "InProgress")';
    const values = [userF, userS];

    try {
      const result = await db.query(query, values);
      const userId = result.insertId;
      console.log('Battle created with ID:', userF);
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
  
}

module.exports = Battle;
