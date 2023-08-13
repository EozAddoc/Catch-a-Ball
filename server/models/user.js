// models/user.js
const db = require('../db');

class User {
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
