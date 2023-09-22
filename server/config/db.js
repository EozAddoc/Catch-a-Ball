const mysql2 = require('mysql2');
require('dotenv').config();


const db = mysql2.createConnection({
  user:process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database:process.env.MYSQL_DATABASE,
  port: '3306'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

module.exports = db;
