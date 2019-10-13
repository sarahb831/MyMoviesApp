var jwtSecret = 'your_jwt_secret'; // needs to be same key as in JWTStrategy
var jwt=require('jsonwebtoken');
const passport = require('passport');
require('./passport.js'); // local file

/**
 * @typedef Function
 * 
 * @typedef InnerFunctions
 * @property {function} generateJWTToken
 * @param {object} user 
 * @return encoded JWT
 */

 /**
  * generates a JWT token based on user data
  * @type {InnerFunctions.generateJWTToken}
  * @param {object} user 
  * @return {string} encoded JWT 
  */

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // gets encoded in JWT
    expiresIn: '7d', // this token expires in 7 days
    algorithm: 'HS256' // signs / encodes value of JWT
  });
}

/**
 * POST login for user
 * 
 * @return {object} user and JWT token
 */

module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session:false}, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not correct',
          user: user
        });
      }
      req.login(user, {session: false}, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token }); // aka {user: user, token: token}
      });
    })(req, res);
  });
}
