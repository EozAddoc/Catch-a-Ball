const express = require('express');
const cors = require('cors');
const db = require('./db');
const userRoute = require('./routes/userRoute');
const deckRoute =require('./routes/deckRoute');
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
app.get('/test', (res)=>{
  res.json("e")
}
)
app.get(`/api/search`, (req, res) => {

  const searchTerm = req.query.q;
  console.log("ssss", searchTerm)

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

