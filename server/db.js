// const mysql = require('mysql');
// require('dotenv').config();

// const db = mysql.createConnection({
//   user: process.env.dev..DB_USER,
//   password: process.env.dev..DB_PASSWORD,
//   database: process.env.dev..DB_NAME
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//   } else {
//     console.log('Connected to the database.');
//   }
// });
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
    console.error('Error connecting to the database:', err.message, db.user);
  } else {
    console.log('Connected to the database.');
  }
});


module.exports = db;
