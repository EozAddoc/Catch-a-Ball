const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
 const token = req.cookies.token;
 if(!token){
  return res.json({Error: "you are not authenticated"})
 }else{
  jwt.verify(token, jwtSecretKey,(err,decoded)=>{
    if(err){
      return res.json({Error: "token not okay"})

    }else{
req.username = decoded.username;
console.log("authTok", decoded, decoded.username)
next()
    }
  })
 }
}

module.exports = authenticateToken;
