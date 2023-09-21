const db = require('../db');

class User {

  //CREATE


  static async createUserTableIfNotExists() {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      avatar_api VARCHAR(255) NOT NULL,
      battleLvl INT,
      lvl INT,
      coins INT
      )
    `;

    db.query(query, (err) => {
      if (err) {
        console.error('Error while creating user table:', err);
      } else {
        console.log('User table created or already exists.');
      }
    });
  }

//READ 


  static async createUser(email, username, password, callback) {
    const query = 'INSERT INTO users (email, username, password, avatar_api, battleLvl,lvl, coins) VALUES (?, ?,?,"before", 0,0,0)';
    const values = [email, username, password];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while inserting user:', err);
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
  static async getUserByUsernameAndPassword(username, password, callback) {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [username, password];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while retrieving user:', err);
        callback(err);
      } else {
        callback(null, result);
        console.log("userPage", result)
      }
    });
  }

  static async checkExistingUser(username, callback) {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
    const values = [username];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error while checking username:", err);
        callback(err); // Call the callback with the error
      } else {
        const userCount = result[0].count;
        if (userCount > 0) {
          // Username or email already exists, send error response
          callback(null, true); // Call the callback with userExists = true
        } else {
          callback(null, false); // Call the callback with userExists = false
        }
      }
    });
  }

  static async getUserIdByUsername(username) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM users WHERE username = ?';
      const values = [username];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error while retrieving user ID by username:', err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0].id); // Resolve with the user's id
          } else {
            resolve(null); // User not found
          }
        }
      });
    });
  }
  
  


  //UPDATE


  static async addAvatar(username, avatar_api,callback) {

    const query = 'UPDATE users SET avatar_api = ? WHERE id = ?';
    const id = await this.getUserIdByUsername(username).id
    const values = [avatar_api, id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while adding avatar:', err);
      } else {
        console.log(callback,'Avatar added succesfully ')

      }
    });
  }
  

  static async DeleteUser(username,callback) {

    const query = 'DELETE users WHERE id = ?';
    const id = await this.getUserIdByUsername(username)
    const values = [ id];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while adding avatar:', err);
      } else {
        console.log(callback,'Avatar added succesfully ')

      }
    });
  }
  

  
  

    }


module.exports = User;

