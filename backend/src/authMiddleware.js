const jwt = require('jsonwebtoken');

// Verify the token before allowing access to protected routes.
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Authentication token is required.'
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      error: 'Authentication is not configured.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: 'Invalid or expired token.'
      });
    }

    req.userId = decoded.userId;
    next();
  });
}

module.exports = authenticateToken;
