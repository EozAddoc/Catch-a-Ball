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
const front ="http://"+process.env.URL+":3000"
const externalApi = "https://api.pokemontcg.io/v2/cards/*"

app.use(cors({
  origin: [front, externalApi],
    methods:["POST","GET","PUT", "PATCH"],
  credentials: true
}));

app.use((req, res, next) => {
  res.set("Content-Security-Policy", "default-src 'none'; img-src 'self'");
  next()
})

app.use(cookieParser());

app.use(userRoute)
app.use(deckRoute)
app.use(battleRoute)

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




app.get('/logout', (req,res)=>{
  res.clearCookie('token');
  return res.json({Status:"Success"})
})

const port = 1117;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

