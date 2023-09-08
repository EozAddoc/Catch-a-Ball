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
    // Your existing createUser method logic
  }

  // ... other methods for user operations
}

module.exports = User;
