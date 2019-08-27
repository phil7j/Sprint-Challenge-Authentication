/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets.js')


module.exports = (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.token;
  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if(err){
        // token is invalid
        console.log(err)
        res.status(401).json({message: 'you shall not pass, invalid token'})
      } else {
        // goood token
        req.user = { username: decodedToken.username}
        next();
      }
    })
  } else {
    res.status(400).json({message: 'bad panda. gimme token'})
  }
};
