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
      "SELECT * FROM users WHERE role <> 'inactive' AND role <> 'admin'  ORDER BY user_id ASC"
    );
    res.json({ data: users.rows, msg: "user fetch successful" });
  } catch (err) {
    next(err);
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
  }
};

//get one user
//method - get
//url - /api/admin/user-pm
const getProjectManagers = async (req, res, next) => {
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE role = 'Project Manager' ORDER BY user_id ASC"
    );
    res.json(users.rows);
  } catch (err) {
    next(err);
  }
};

//get one user
//method - get
//url - /api/admin/user-tm
const getTeamLeaders = async (req, res, next) => {
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE role = 'Team Leader' ORDER BY user_id ASC"
    );
    res.json(users.rows);
  } catch (err) {
    next(err);
  }
};

//get one user
//method - get
//url - /api/admin/user-eng
const getEngineers = async (req, res, next) => {
  try {
    const users = await pool.query(
      "SELECT * FROM users WHERE role = 'Engineer' ORDER BY user_id ASC"
    );
    res.json(users.rows);
  } catch (err) {
    next(err);
  }
};

//get all users on project
//method - get
//url - /api/admin/users-on-project/:project_id
const getAllUsersAssignedOnProject = async (req, res, next) => {
  try {
    const project_id = req.params.project_id;
    const users = await pool.query(
      `WITH project_user_bridge AS (SELECT * FROM user_on_project where project_id = $1)
          SELECT u.display_name, u.user_id, p.project_id, u.email FROM
          users u JOIN project_user_bridge p 
          ON u.user_id = p.user_id
          WHERE role <> 'inactive' `,
      [project_id]
    );
    res.json(users.rows);
  } catch (err) {
    next(err);
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
  const { email, display_name, role, user_id } = req.body;
  console.log("user cont", email, display_name, role, user_id);
  try {
    req
      .checkBody("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a proper email, eg: example@xyz.abc");

    req
      .checkBody("display_name")
      .notEmpty()
      .withMessage("display name is required");

    req.checkBody("role").notEmpty().withMessage("role is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      // const { email, display_name, role, user_id } = req.body;

      let query =
        "UPDATE users SET email = $1, display_name=$2, role=$3  WHERE user_id = $4  RETURNING *";

      const value = [email, display_name, role, user_id];
      try {
        const user = await pool.query(query, value);
        res.json({
          data: user.rows[0],
          msg: "user updated",
          status: 200,
        });
      } catch (err) {
        console.log(err);
        next({ msg: err, status: 300, u_msg: "error updating user" });
      }
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
    const { user_id } = req.body;
    const user = await pool.query(
      "UPDATE users SET role = 'inactive'  WHERE user_id = $1 RETURNING *",
      [user_id]
    );
    res.json({ data: user.rows[0], msg: "successfully Deleted", status: 200 });
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
  }
};

//get all users
//method - get
//url - /api/admin/users-tagged/:task_id
const getTaggedUserInTask = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const tag = await pool.query(
      `SELECT t.*, u.display_name FROM tags t
        INNER JOIN users u ON t.tagged_id=u.user_id
        WHERE task_id = $1 ORDER BY tag_id ASC`,
      [task_id]
    );
    res.json({ data: tag.rows, msg: "tagged users fetched successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getProjectManagers,
  getTeamLeaders,
  getEngineers,
  getAllUsers,
  getAllUsersAssignedOnProject,
  updateUser,
  deleteUser,
  getTaggedUserInTask,
};
