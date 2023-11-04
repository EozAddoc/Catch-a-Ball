const express = require('express');
const cors = require('cors');
const db = require('./db');
const userRoute = require('./routes/userRoute');
const deckRoute =require('./routes/deckRoute');
const battleRoute =require('./routes/battleRoute');

const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();

app.use(express.json());
const url = "http://"+process.env.URL+":3000"
app.use(cors({
  origin:[url], 
  methods:["POST","GET","PUT"],
  credentials: true
}));
app.use(cookieParser());


app.use(userRoute)
app.use(deckRoute)
app.use(battleRoute)

app.get('/test', (res)=>{
  res.json("e")
}
)
app.get(`/api/search`, (req, res) => {

  const searchTerm = req.query.q;

  const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%'`;


  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

  res.json(results);
  });
});

app.get(`/api/filter`, (req, res) => {
  const searchTerm = req.query.q;
  const filterField = req.query.field;

  console.log(searchTerm, filterField)

  if (!searchTerm || !filterField) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Use parameterized query to prevent SQL injection
  const query = `SELECT * FROM users WHERE ${filterField} = ?`;
  
  // Use an array to pass values securely to the query
  db.query(query, [`%${searchTerm}%`], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});
app.get(`/inProgress/filter`, (req, res) => {
  const searchTerm = req.query.q;

  console.log(searchTerm)

  if (!searchTerm ) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Use parameterized query to prevent SQL injection
  const query = 'SELECT * FROM battle WHERE status = "InProgress" AND (userIdF = ? OR userIdS = ?)';
  
  // Use an array to pass values securely to the query
  db.query(query, [searchTerm,searchTerm], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

app.get('/logout', (req,res)=>{
  res.clearCookie('token');
  return res.json({Status:"Success"})
})

const port = 1117;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

