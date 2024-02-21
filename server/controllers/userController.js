const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Battle = require('../models/Battle')
const bcrypt = require('bcrypt')
class UserController {

  //REGISTER
  static async newUser(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const isValid = await bcrypt.compare(password,hashedPassword)
    console.log(password, hashedPassword, isValid,User.password)
    User.createUserTableIfNotExists();
    Battle.createBattleTableIfNotExists()


    User.checkExistingUser(username, (err, userCount) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        if (userCount > 0) {
          res.status(409).json({ error: 'Username or email already exists' });
        } else {
          User.createUser(email, username, hashedPassword, (err,userId) => {
            if (err) {
              res.status(500).json({ message: 'Internal server error' });
            } else {
              const token = jwt.sign({ username,userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
              res.cookie('token', token);
              res.status(201).json({ message: 'Account created successfully' });
            }
          });
        }
      }
    });
  }

  //FORGOT
  static async filterUsers(req, res){
    const filterData = req.body.filterData

    User.filterUsers(userId, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Users filtered successfully' });
      }
    })
  }


  //ADD AVATAR 
  static async updateAvatar(req, res) {
    const userId = req.body.userId;
    const avatar_api = req.body.avatar_api;

    User.addAvatar(userId, avatar_api, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Avatar added successfully' });
      }
    });
  }


  //UPDATE
  static async updateUser(req, res) {
    const userId = req.body.updatedUserData.id;
    const updatedUserData = req.body.updatedUserData
    console.log("userdata", updatedUserData)

    User.updateUser(userId, updatedUserData, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Success' });
      }
    });
  }

//WON BATTLE OR MISSIONS
  static async levelUpUser(req, res) {
    console.log("in levelUpUser")
    const userId = req.body.userId;
console.log("winner" + userId)
    User.levelUp(userId,  (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        console.log("success in leveling up")
        res.status(200).json({ message: 'Success in leveling up' });
      }
    });
  }

  //NOTIFICATIONS
  static async updateNotifications(req, res) {
    const userId = req.body.newNotificationData.id;
    const newNotification = req.body.newNotificationData.notifications
    console.log("notifdata", newNotification)

    User.updateNotificationArray(userId, newNotification, (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'Success in deleting notification' });
      }
    });

  }

  //LOGIN
  static async loginUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;
console.log("logging in " + username )
    User.getUserByUsername(username, async (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Internal server error' });
      } else {
        if (result.length > 0) {
          const hashedPassword = result[0].password;
          console.log(hashedPassword)
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        console.log("password match: " + passwordMatch)
        if(passwordMatch){
          const username = result[0].username;
          const userId = result[0].id
          const token = jwt.sign({ username, userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
          res.cookie('token', token);
          res.status(200).json({ message: 'Successful login' });
        }else{
          res.status(401).json({ error: 'Wrong username or password' });

        }
        
        } else {
          res.status(401).json({ error: 'Wrong username or password' });
        }
      }
    });
  }
}

module.exports = UserController;
