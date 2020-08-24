const pool = require("../db");
const bcrypt = require("bcrypt");
const helper = require("../utils/helper");

const saltRounds = 10; // saltRounds for bcrypt

const login = async (req, res, next) => {
  try {
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a proper email, eg: example@xyz.abc");

    req
      .checkBody("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { email, password } = req.body;
      var user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length === 0)
        next({ msg: "email doesn't exists", status: 200 });

      const { user_id, hash } = user.rows[0];
      bcrypt.compare(password, hash, function (err, result) {
        //if password doesn't match result is false
        //but err is also false ???
        if (!result) {
          return next({ msg: "incorrect password", status: 200 });
        }

        let data = { user_id };
        let token = helper.createToken(data);
        res.json({ data, token });
      });
    }
  } catch (err) {
    next({ msg: err, status: 404, u_msg: "something wrong " });
  }
};

const register = async (req, res, next) => {
  try {
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a proper email, eg: example@xyz.abc");

    req
      .checkBody("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters");

    req
      .checkBody("display_name")
      .notEmpty()
      .withMessage("display name is required");

    req.checkBody("role").notEmpty().withMessage("role is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      // const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
      const { email, password, display_name, role } = req.body;

      //show custom msg if email already exist
      const checkEmail = await pool.query(
        "SELECT email FROM users where email=$1",
        [email]
      );
      if (checkEmail.rows.length > 0) {
        next({ msg: "Email already exits", status: 300 });
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
              return next(err);
            }
            let query =
              "INSERT INTO users (email, hash, display_name, role) VALUES ($1, $2, $3, $4) RETURNING *";

            const value = [email, hash, display_name, role];
            try {
              const todo = await pool.query(query, value);
              res.json({ msg: "registered successful", status: 200 });
              // Store hash in your password DB.
            } catch (err) {
              console.log(err);
              next({ msg: err, status: 300, u_msg: "error inserting" });
            }
          });
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };
