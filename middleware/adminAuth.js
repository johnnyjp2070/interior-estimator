const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization Denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    if (!decoded.user.isAdmin) {
      res.status(401).json({ msg: "Access denied, You need to be an admin" });
    }
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token Not Valid" });
  }
};
