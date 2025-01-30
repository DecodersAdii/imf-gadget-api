const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  // Extract the token from the "Bearer <token>" format
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const jwtToken = tokenParts[1];

  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err); // Log the error for debugging
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;