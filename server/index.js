const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const app = express();

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
    console.log("connected !!!")
  }
})

app.get('/hello', (req, res) => {
  res.send('hello.');
});

app.post("/signup",(req,res)=>{
  const email = req.body.email;
  const username = req.body.Username;
  const password =req.body.password;

  db.query("INSERT INTO users (email, Username, password) VALUES (?,?,?)",[email, username,password]),
  (err,result)=>{
    if(result){
      res.send(result);
    }else{
      res.send({message: "Enter correct info"})
    }
  }

})


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
      }else{
        res.send({message: "Wrong username or pw"})
      }
    }
  })

})




app.listen(8080, () => console.log('Example app is listening on port 8080.'));