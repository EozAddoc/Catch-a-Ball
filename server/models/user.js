const db = require('../db');

class User {
  static async createUserTableIfNotExists() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        api_Ids JSON NOT NULL
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

  // ... other methods for user operations
  static async createUser(email, username, password, callback) {
    const query = 'INSERT INTO users (email, username, password, api_Ids) VALUES (?, ?, ?, \'[]\')';
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
  static async addCards(username, api_Ids, callback) {
    const query = 'UPDATE users SET api_Ids = ? WHERE username = ?';
    const values = [JSON.stringify(api_Ids), username];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while adding cards:', err);
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
  
  static async checkExistingUser(username, email, callback) {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ? OR email = ?';
    const values = [username, email];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error while checking username or email:", err);
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
  

    }


module.exports = User;

