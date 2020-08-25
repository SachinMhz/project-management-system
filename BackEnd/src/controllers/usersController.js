const pool = require("../db");
const bcrypt = require("bcrypt");
const helper = require("../utils/helper");

const saltRounds = 10; // saltRounds for bcrypt

//get all users
//method - get
//url - /api/admin/users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE role <> 'inactive' ORDER BY user_id ASC"
    );
    res.json(users.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get one user
//method - get
//url - /api/admin/user
const getUser = async (req, res, next) => {
  try {
    const user_id = Number(req.params.user_id);
    const users = await pool.query(
      "SELECT * FROM users WHERE role <> 'inactive' AND user_id = $1 LIMIT 1",
      [user_id]
    );
    res.json(users.rows[0]);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get all users on project
//method - get
//url - /api/admin/users-on-project
const getAllUsersAssignedOnProject = async (req, res, next) => {
  const project_id = req.body.project_id;
  try {
    const users = await pool.query(
      `WITH project_user_bridge AS (SELECT * FROM user_on_project where project_id = $1)
          SELECT u.display_name, u.user_id, p.project_id FROM
          users u JOIN project_user_bridge p 
          ON u.user_id = p.user_id
          WHERE role <> 'inactive' `,
      [project_id]
    );
    res.json(users.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get all users on project
//method - post
//url - /api/admin/users-create
const createUser = require("./authController").register;

//update an user
//method - put
//url - /api/admin/users-update
const updateUser = async (req, res, next) => {
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
      const { email, password, display_name, role, id } = req.body;

      //show custom msg if email already exist
      // const checkEmail = await pool.query(
      //   "SELECT email FROM users where email=$1",
      //   [email]
      // );
      // if (checkEmail.rows.length > 0) {
      //   next({ msg: "Email already exits", status: 300 });
      // } else {
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            return next(err);
          }
          let query =
            "UPDATE users SET email = $1, hash=$2, display_name=$3, role=$4  WHERE user_id = $5  RETURNING *";

          const value = [email, hash, display_name, role, id];
          try {
            const user = await pool.query(query, value);
            res.json({
              user: user.rows[0],
              msg: "registered updated",
              status: 200,
            });
            // Store hash in your password DB.
          } catch (err) {
            console.log(err);
            next({ msg: err, status: 300, u_msg: "error updating" });
          }
        });
      });
    }
  } catch (err) {
    next(err);
  }
};

//delete an user -- actually change role to inactive
//method - put
//url - /api/admin/users-delete
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await pool.query(
      "UPDATE users SET role = 'inactive'  WHERE user_id = $1 RETURNING *",
      [id]
    );
    res.json({ user: user.rows[0], msg: "successfully Deleted", status: 200 });
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  getAllUsersAssignedOnProject,
  updateUser,
  deleteUser,
};
