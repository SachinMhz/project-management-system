const pool = require("../db");

//get all users
//method - get
//url - /api/admin/projects
const getAllProjects = async (req, res, next) => {
  try {
    const projects = await pool.query(
      "SELECT projects.*, users.display_name FROM projects INNER JOIN users ON users.user_id = projects.manager_id ORDER BY project_id ASC"
    );
    res.json(projects.rows);
  } catch (err) {
    next(err);
  }
};

const getProjectInfo = async (req, res, next) => {
  try {
    const project_id = Number(req.params.project_id);
    const projects = await pool.query(
      `SELECT projects.*, users.display_name FROM projects 
        INNER JOIN users ON users.user_id = projects.manager_id 
          WHERE project_id = $1 LIMIT 1`,
      [project_id]
    );
    res.json({ data: projects.rows[0], msg: "project read success" });
  } catch (err) {
    next(err);
  }
};

//get all users on project
//method - get
//url - /api/admin/users-on-project
const getProjectEnrolled = async (req, res, next) => {
  const user_id = req.body.user_id;
  try {
    const projects = await pool.query(
      `WITH project_user_bridge AS (SELECT project_id FROM user_on_project where user_id = 17)
          SELECT  p.project_id, p.name FROM
          projects p JOIN project_user_bridge b 
          ON p.project_id = b.project_id`,
      [user_id]
    );
    res.json(projects.rows);
  } catch (err) {
    next(err);
  }
};

//get all users on project
//method - get
//url - /api/admin/projects-enrolled-by-user/:user_id
const getProjectEnrolledByUser = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const projects = await pool.query(
      `SELECT DISTINCT p.project_id, u.user_id, p.name, p.description, p.manager_id FROM user_on_project u JOIN projects p
      ON u.project_id = p.project_id WHERE user_id = $1 ORDER BY project_id ASC`,
      [user_id]
    );
    res.json({ data: projects.rows, msg: "users fetched" });
  } catch (err) {
    next(err);
  }
};

//get all users on project
//method - post
//url - /api/admin/projects-create
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
            data: project.rows[0],
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
      const { name, description, manager_id, project_id } = req.body;
      //show custom msg if project name already exist
      const checkName = await pool.query(
        "SELECT name FROM projects WHERE name=$1 AND project_id <> $2",
        [name, project_id]
      );
      if (checkName.rows.length > 0) {
        next({ msg: "Project Name already taken", status: 300 });
      } else {
        let query = `UPDATE projects SET name = $1, description=$2, manager_id=$3
                     WHERE project_id = $4  RETURNING *`;

        let value = [name, description, manager_id, project_id];
        try {
          const project = await pool.query(query, value);
          res.json({
            data: project.rows[0],
            msg: "project updated successfully",
            status: 200,
          });
        } catch (err) {
          next({ msg: err, status: 300, u_msg: "error updating project" });
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

//delete an user -- actually change role to inactive
//method - put
//url - /api/admin/projects-delete
const deleteProject = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    const project = await pool.query(
      `DELETE FROM projects WHERE project_id = $1 RETURNING *`,
      [project_id]
    );
    res.json({
      data: project.rows[0],
      msg: "project successfully Deleted",
      status: 200,
    });
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
  }
};

//get all users on project
//method - post
//url - /api/admin/user-to-project
const addUserToProject = async (req, res, next) => {
  try {
    req.checkBody("user_id").notEmpty().withMessage("Assignee is required");
    req.checkBody("project_id").notEmpty().withMessage("Project is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { project_id, user_id } = req.body;

      let query = `INSERT INTO user_on_project (project_id, user_id)
             VALUES ($1, $2 ) RETURNING *`;

      let value = [project_id, user_id];
      try {
        const user_on_project = await pool.query(query, value);
        res.json({
          data: user_on_project.rows[0],
          msg: "user added to project successfully",
          status: 200,
        });
      } catch (err) {
        next({
          msg: err,
          status: 300,
          u_msg: "error inserting user to project",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProjects,
  getProjectInfo,
  getProjectEnrolled,
  getProjectEnrolledByUser,
  createProject,
  updateProject,
  deleteProject,
  addUserToProject,
};
