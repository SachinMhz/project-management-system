const pool = require("../db");

//get all users
//method - get
//url - /api/admin/users
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await pool.query(
      "SELECT * FROM projects ORDER BY project_id ASC"
    );
    res.json(projects.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get all users on project
//method - get
//url - /api/admin/users-on-project
const getProjectEnrolled = async (req, res, next) => {
  const user_id = req.body.user_id;
  try {
    const projects = await pool.query(
      `WITH project_user_bridge AS (SELECT project_id FROM user_on_project where user_id = $1)
          SELECT  p.project_id, p.name FROM
          projects p JOIN project_user_bridge b 
          ON p.project_id = b.project_id;`,
      [user_id]
    );
    res.json(projects.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get all users on project
//method - post
//url - /api/admin/users-create
const createProject = async (req, res, next) => {
  try {
    req.checkBody("name").notEmpty().withMessage("Project Name is required");

    req
      .checkBody("description")
      .notEmpty()
      .withMessage("Description is required");

    req
      .checkBody("manager_id")
      .notEmpty()
      .withMessage("Project Manager is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { name, description, manager_id } = req.body;

      //show custom msg if project name already exist
      const checkName = await pool.query(
        "SELECT name FROM projects WHERE name=$1",
        [name]
      );
      if (checkName.rows.length > 0) {
        next({ msg: "Project Name already taken", status: 300 });
      } else {
        let query = `INSERT INTO projects (name, description, manager_id)
             VALUES ($1, $2, $3) RETURNING *`;

        let value = [name, description, manager_id];
        try {
          const project = await pool.query(query, value);
          res.json({
            project: project.rows[0],
            msg: "project added successfully",
            status: 200,
          });
        } catch (err) {
          next({ msg: err, status: 300, u_msg: "error inserting project" });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

//update an user
//method - put
//url - /api/admin/users-update
const updateProject = async (req, res, next) => {
  try {
    req.checkBody("name").notEmpty().withMessage("Project Name is required");

    req
      .checkBody("description")
      .notEmpty()
      .withMessage("Description is required");

    req
      .checkBody("manager_id")
      .notEmpty()
      .withMessage("Project Manager is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      // const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
      const { name, description, manager_id, project_id } = req.body;
      //show custom msg if email already exist
      // const checkEmail = await pool.query(
      //   "SELECT email FROM users where email=$1",
      //   [email]
      // );
      // if (checkEmail.rows.length > 0) {
      //   next({ msg: "Email already exits", status: 300 });
      // } else {

      let query = `UPDATE projects SET name = $1, description=$2, manager_id=$3
                     WHERE project_id = $4  RETURNING *`;

      let value = [name, description, manager_id, project_id];
      try {
        const project = await pool.query(query, value);
        res.json({
          project: project.rows[0],
          msg: "project updated successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: err, status: 300, u_msg: "error updating project" });
      }
    }
  } catch (err) {
    next(err);
  }
};

//delete an user -- actually change role to inactive
//method - put
//url - /api/admin/users-delete
const deleteProject = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    const project = await pool.query(
      `DELETE FROM projects WHERE project_id = $1 RETURNING *`,
      [project_id]
    );
    res.json({
      project: project.rows[0],
      msg: "project successfully Deleted",
      status: 200,
    });
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

module.exports = {
  getAllProjects,
  getProjectEnrolled,
  createProject,
  updateProject,
  deleteProject,
};
