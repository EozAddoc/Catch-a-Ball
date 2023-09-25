const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const userRoute = require('./routes/userRoute');
const deckRoute =require('./routes/deckRoute');
const cookieParser = require('cookie-parser')
const app = express();
const auth = require('./middleware/authenticateToken');
const authenticateToken = require('./middleware/authenticateToken');

app.use(express.json());
app.use(cors({
  origin:["http://localhost:3000"], 
  methods:["POST","GET"],
  credentials: true
}));
app.use(cookieParser());


app.use(userRoute)
app.use(deckRoute)


app.get('/logout', (req,res)=>{
  res.clearCookie('token');
  return res.json({Status:"Sucess"})
})

const port = 1117;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

