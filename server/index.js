const express = require('express');
const cors = require('cors');
const db = require('./db');
const userRoute = require('./routes/userRoute');
const deckRoute =require('./routes/deckRoute');
const battleRoute =require('./routes/battleRoute');
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Environment variables
const front = "http://" + process.env.URL + ":3000";
const test = "http://188.165.238.74:1117/";
const externalApi = "https://api.pokemontcg.io/v2/cards/*";
const resetPassword = "http://" + process.env.URL + ":3000/ResetPassword";

app.use(cookieParser());
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: [front, externalApi, test],
  methods: ["POST", "GET", "PUT", "PATCH","DELETE"],
  credentials: true
}));

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server for emails is ready to take our messages");
  }
});

app.post("/api/send", (req, res) => {     
  const query = `SELECT * FROM users WHERE email = ?`;
console.log(req.body.email)
const mail = req.body.email
  db.query(query, [mail], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }
    console.log(results[0].id)
    const id =results[0].id
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    const resetLink = `${resetPassword}?me2eg8p=${token}`;
    const mailOptions = {
      from: "coddazoe@gmail.com",
      to: req.body.email,
      subject: "Reset Password",
      html: `Hello, click <a href="${resetLink}">here</a> to reset your password for catchABall.`
    }; 

    transporter.sendMail(mailOptions, (error, info) => {
      if(error){
        console.error('Error sending email:', error);
        return res.status(500).send(error);
      }
      res.status(200).send("Email sent successfully");
    });   
  });
});

app.use(userRoute);
app.use(deckRoute);
app.use(battleRoute);

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
});

const port = process.env.PORT || 1117;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
