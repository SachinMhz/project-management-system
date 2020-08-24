const jwt = require("jsonwebtoken");
require("../env");

module.exports = function (req, res, next) {
  let token;
  if (req.headers["authorization"]) token = req.headers["authorization"];
  if (req.headers["x-access-token"]) token = req.headers["x-access-token"];
  if (req.headers["token"]) token = req.headers("token");

    if (!token) {
    return next({ msg: "Token not found", status: 400 });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return next(err);
    }
    //db query to take the real value of user according to unique identifier in decoded
    // result from query is stored in req.user
    //req.user is available everywhere when the url is passed through this middleware
    // if (!result) return next({ msg: "user not found", status: 404 });
    //req.user = result
    req.user = decoded;
    next();
  });
};
