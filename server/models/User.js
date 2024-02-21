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
      coins INT,
      energyChoice VARCHAR(255) NOT NULL,
      notifications JSON
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

  static async createUser(email, username, password, callback) {
    const query = 'INSERT INTO users (email, username, password, avatar_api, battleLvl,lvl, coins, energyChoice, notifications) VALUES (?, ?,?,"before", 0,0,0, "/energy/waterEn.png",?)';
    const values = [email, username, password, `["Welcome ${username}"]`];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while inserting user:', err);
        callback(err);
      } else {
        const userId = result.insertId
        callback(null,userId);
      }
    });
  }

//READ 



  static async getUserByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const values = [username];
    try {
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error while retrieving user:', err);
          callback(err);
        } else {
          console.log("userPage", result)
          callback(null,result);
        }
      });
    }catch{
      console.log("err retrieving user ")
    }
 
 
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


  static async getUserByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      const values = [userId];
  
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error while retrieving user by username:', err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0]); // Resolve with the user data
          } else {
            resolve(null); // User not found
          }
        }
      });
    });
  }

  //FILTER
  
  static async filterUsers( filterData, callback) {
    console.log("data", filterData);
    const updatePromises = Object.keys(filterData).map((key) => {
      return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE ${key} = ? `;
        const values = [filterData[key]];
  
        db.query(query, values, (err, result) => {
          if (err) {
            console.error(`Error while filtering user ${key}:`, err);
            reject(err);
          } else {
            console.log(`Users ${key} filtered successfully`);
            resolve(result);
          }
        });
      });
    });
  
    try {
      const results = await Promise.all(updatePromises);
      if (callback) {
        callback(results);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error filtering  user:", error);
    }
  }
  


  //UPDATE


  static async addAvatar(userId, avatar_api,callback) {

    const query = 'UPDATE users SET avatar_api = ? WHERE id = ?';
    const values = [avatar_api, userId];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error while adding avatar:', err);
      } else {
        console.log(callback,'Avatar added succesfully ')

      }
    });
  }
  static async updateNotificationArray(userId, newNotificationsArray) {
    // Update the database with the new array of notifications
    const updateQuery = 'UPDATE users SET notifications = ? WHERE id = ?';
    const updateValues = [JSON.stringify(newNotificationsArray), userId];
  
    db.query(updateQuery, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error while updating notifications:', updateErr);
      } else {
        console.log('Notifications replaced successfully');
      }
    });
  }
   static async levelUp(userId) {
    // Update the database with the new array of notifications
    const updateQuery = 'UPDATE users SET battleLvl= battleLvl +1 WHERE id = ?';
    const updateValues = [userId];
  console.log("user Id winner" + userId)
    db.query(updateQuery, updateValues, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Error while leveling:', updateErr);
      } else {
        console.log('Leveled successfully');
      }
    });
  }

  
  
  

  static async updateUser(userId, updatedUserData, callback) {
    const updatePromises = Object.keys(updatedUserData).map((key) => {
      return new Promise((resolve, reject) => {
        const query = `UPDATE users SET ${key} = ? WHERE id = ?`;
        const values = [updatedUserData[key], userId];
  
        db.query(query, values, (err, result) => {
          if (err) {
            console.error(`Error while updating user ${key}:`, err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });
  
    try {
      const results = await Promise.all(updatePromises);
      if (callback) {
        callback(results);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error updating user:", error);
    }
  }
  
  
//TO DO 
  // static async DeleteUser(userId,callback) {

  //   const query = 'DELETE users WHERE id = ?';
  //   const values = [userId];

  //   db.query(query, values, (err, result) => {
  //     if (err) {
  //       console.error('Error while adding avatar:', err);
  //     } else {
  //       console.log(callback,'User deleted succesfully ')

  //     }
  //   });
  // }
  

  
  

    }


module.exports = User;

