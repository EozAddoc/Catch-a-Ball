
const mysql = require('mysql');
require('dotenv').config();


const db = mysql.createConnection({
  user:'root',
  password:"rootpw",
  database:"CatchABall",
  host:"db",
  port: '3306',
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});


module.exports = db;
