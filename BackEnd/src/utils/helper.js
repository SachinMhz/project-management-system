const jwt = require("jsonwebtoken");
require("../env");

function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET);
}

module.exports = { createToken };
