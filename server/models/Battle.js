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
    
    try {
      let winner = await this.determineWinner(userF, userS);
      console.log("winner : " + winner);
      const query = 'INSERT INTO battle (userIdF, userIdS, winner, status, time) VALUES (?, ?, ?, "InProgress", NOW())';
      const values = [userF, userS, winner];

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
  static async endBattle(id){
    //update status to ended 
    const query = 'UPDATE battle SET status = ? WHERE id = ?';
  const values = ['ended', id];
  console.log("endBattle", id )
  
    try {
      const result = await db.query(query, values);
      console.log('Battle ended:', result);
      return result;
    } catch (err) {
      console.error('Error while ending battles in progress:', err);
      throw err;
    }
  }

  static async determineWinner(userIdF, userIdS) {
    try {
      const user1 = await db.query('SELECT battleLvl FROM users WHERE id = ?', [userIdF]);
      const user2 = await db.query('SELECT battleLvl FROM users WHERE id = ?', [userIdS]);

      const battleLevel1 = user1;
      const battleLevel2 = user2;
      let winner;

      if (battleLevel1 === battleLevel2) {
         winner = Math.random() < 0.5 ? userIdF : userIdS;
      } else if (battleLevel1 > battleLevel2) {
         winner = userIdF;
      } else {
         winner = userIdS;
      }

      console.log(`Final Winner: ${winner}`);
      return winner;
    } catch (err) {
      console.error('Error while determining winner:', err);
      throw err;
    }
  }
  
}

module.exports = Battle;
