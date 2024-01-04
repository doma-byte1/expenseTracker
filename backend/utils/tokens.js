const jwt = require('jsonwebtoken');
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
  }
  
function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  }

module.exports = {generateAccessToken, generateRefreshToken};