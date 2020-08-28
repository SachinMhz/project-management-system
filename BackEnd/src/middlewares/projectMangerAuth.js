module.exports = function (req, res, next) {
    let role = req.user.role;
    if (role === "Project Manager") next();
    else next({ msg: "Admin can only access this route", status: 300 });
  };
  