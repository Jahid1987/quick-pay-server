const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // console.log(req.headers.authorization.split(" ")[1]);
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
}

module.exports = authenticateToken;
