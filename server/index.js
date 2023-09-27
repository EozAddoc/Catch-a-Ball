const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const deckRoute =require('./routes/deckRoute');
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();

app.use(express.json());
const url = "http://"+process.env.URL+":3000"
app.use(cors({
  origin:[url], 
  methods:["POST","GET"],
  credentials: true
}));
app.use(cookieParser());


app.use(userRoute)
app.use(deckRoute)


app.get('/logout', (req,res)=>{
  res.clearCookie('token');
  return res.json({Status:"Success"})
})

const port = 1117;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

