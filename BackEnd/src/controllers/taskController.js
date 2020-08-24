const pool = require("../db");

//get all users
//method - get
//url - /api/admin/users
const getAllTasksFromProject = async (req, res, next) => {
  try {
    const { project_id } = req.body;
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE project_id = $1 ORDER BY project_id ASC",
      [project_id]
    );
    res.json(tasks.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get all users
//method - get
//url - /api/admin/users
const getUserTasksFromProject = async (req, res, next) => {
  try {
    const { project_id, user_id } = req.body;
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE project_id = $1 AND user_id= $2 ORDER BY project_id ASC",
      [project_id, user_id]
    );
    res.json(tasks.rows);
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
const createTask = async (req, res, next) => {
  try {
    req
      .checkBody("project_id")
      .notEmpty()
      .withMessage("Project Name is required");
    req
      .checkBody("description")
      .notEmpty()
      .withMessage("Description is required");
    req.checkBody("title").notEmpty().withMessage("title is required");
    req.checkBody("deadline").notEmpty().withMessage("deadline is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const {
        title,
        description,
        deadline,
        user_id,
        project_id,
        previous_assignee_id,
      } = req.body;
      let query = `INSERT INTO tasks (title, description,  user_id, project_id, deadline, previous_assignee_id )
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

      let value = [
        title,
        description,
        user_id,
        project_id,
        deadline,
        previous_assignee_id,
      ];
      try {
        const task = await pool.query(query, value);
        res.json({
          task: task.rows[0],
          msg: "task added successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: err, status: 300, u_msg: "error inserting task" });
      }
    }
  } catch (err) {
    next(err);
  }
};

//update an user
//method - put
//url - /api/admin/users-update
const updateTask = async (req, res, next) => {
  try {
    req
      .checkBody("description")
      .notEmpty()
      .withMessage("Description is required");
    req.checkBody("title").notEmpty().withMessage("title is required");
    req.checkBody("deadline").notEmpty().withMessage("deadline is required");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const {
        title,
        description,
        deadline,
        user_id,
        project_id,
        previous_assignee_id,
        task_id,
      } = req.body;

      let query = `UPDATE tasks SET title = $1, description=$2, deadline=$3, user_id= $4, previous_assignee_id=$5
                     WHERE task_id = $6  RETURNING *`;

      let value = [
        title,
        description,
        deadline,
        user_id,
        previous_assignee_id,
        task_id,
      ];
      try {
        const task = await pool.query(query, value);
        res.json({
          task: task.rows[0],
          msg: "task updated successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: err, status: 300, u_msg: "error updating task" });
      }
    }
  } catch (err) {
    next(err);
  }
};

//delete an user -- actually change role to inactive
//method - put
//url - /api/admin/users-delete
const deleteTask = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const task = await pool.query(
      `DELETE FROM tasks WHERE task_id = $1 RETURNING *`,
      [task_id]
    );
    res.json({
      task: task.rows[0],
      msg: "task successfully Deleted",
      status: 200,
    });
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

module.exports = {
  getAllTasksFromProject,
  getUserTasksFromProject,
  createTask,
  updateTask,
  deleteTask,
};
