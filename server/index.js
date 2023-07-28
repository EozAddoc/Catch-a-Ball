const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json())
app.use(cors()); 


// //dot env sert a mettre de coté tes mdp et pas les transferer par git 
require('dotenv').config();

//connect to mysql workbench
const db = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }else{
    console.log("connected to db !!!")
  }
})


app.post("/signup", (req, res) => {
  const email = req.body.email;
  const username = req.body.Username;
  const password = req.body.password;

  // Check if the username or email already exists in the database
  db.query(
    "SELECT COUNT(*) AS count FROM users WHERE Username = ? OR email = ?",
    [username, email],
    (err, result) => {
      if (err) {
        console.error("Error while checking username or email:", err);
        res.status(500).json({ message: "Internal server error" });
      } else {
        const userCount = result[0].count;
        if (userCount > 0) {
          // Username or email already exists, send error response
          res.status(409).json({ error: "Username or email already exists" });
        } else {
          // Username and email are unique, proceed with user registration
          db.query(
            "INSERT INTO users (email, Username, password) VALUES (?,?,?)",
            [email, username, password],
            (err, result) => {
              if (err) {
                console.error("Error while inserting user:", err);
                res.status(500).json({ message: "Internal server error" });
              } else {
                res.status(200).json({ message: "Account created successfully" });
              }
            }
          );
        }
      }
    }
  );
});



app.post("/login",(req,res)=>{
  const username = req.body.username;
  const password =req.body.password;

  const sql = "SELECT * FROM users where username = ? && password = ?";

  db.query(sql,[username, password],(err,result)=>{
    if(err){
      return res.json("Login failed")
    }else{
      //means user exists
      if(result.length > 0){
        res.send(result);
        console.log("successful login")
      }else{
        res.status(409).json({ error: "Wrong username or password" });
      }
    }
  })

})




app.listen(8080, () => console.log('Example app is listening on port 8080.'));