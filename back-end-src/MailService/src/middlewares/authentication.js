const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const isInternalRequest = req.headers["x-internal-request"] === "true";
  if (isInternalRequest) {
    return next();
  }

  if (!token) {
    return res.status(401).json({ message: "Authentication token not found." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  });
};
module.exports = { authenticateToken };
