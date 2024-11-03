const jwt = require("jsonwebtoken");
const responseFormatter = require("../utils/responseFormatter");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json(responseFormatter(null, "Access denied", 401));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json(responseFormatter(null, "Invalid token", 403));
    }
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json(responseFormatter(null, "Access not allowed", 403));
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
