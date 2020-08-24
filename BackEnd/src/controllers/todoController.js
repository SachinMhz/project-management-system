const pool = require("../db");
const logger = require("../utils/logger");

//get all todo
const getAll = async (req, res, next) => {
  try {
    const todo = await pool.query(
      "SELECT * FROM todo WHERE email = $1 ORDER BY id ASC",
      [req.user.email]
    );
    res.json(todo.rows);
  } catch (err) {
    next(err);
    console.log(err);
    logger.error(err);
  }
};

//get a todo - remaining
// -- /todo/remaining
const getRemaining = async (req, res, next) => {
  try {
    const remaining = await pool.query(
      "SELECT * FROM todo WHERE is_complete = $1 AND email=$2 ORDER BY id ASC",
      [false, req.user.email]
    );
    res.json(remaining.rows);
  } catch (err) {
    next(err);
    logger.error(err);
  }
};

//get a todo - completed
// --- /todo/completed
const getCompleted = async (req, res, next) => {
  try {
    const remaining = await pool.query(
      "SELECT * FROM todo WHERE is_complete = $1 AND email=$2 ORDER BY id ASC",
      [true, req.user.email]
    );
    res.json(remaining.rows);
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

//create new todo
const postTodo = async (req, res, next) => {
  try {
    req
      .checkBody("description")
      .notEmpty()
      .withMessage("description is required");

    let errors = req.validationErrors();
    console.log(errors);
    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { description } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO todo (description,is_complete,email) VALUES ($1, $2,$3) RETURNING *",
        [description, false, req.user.email]
      );
      res.json(newTodo.rows[0]);
    }
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

//update todo
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = description
      ? await pool.query(
          "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
          [description, id]
        )
      : await pool.query(
          "UPDATE todo SET is_complete = NOT is_complete WHERE id = $1 RETURNING *",
          [id]
        );
    // res.json(newTodo.rows[0]);
    console.log(updatedTodo.rows[0]);
    const todo = await pool.query("SELECT * FROM todo ORDER BY id ASC");
    res.json(updatedTodo.rows[0]);
    // res.json("complete status was toggle");
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

//delete todo
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(deleteQuery.rows[0]);
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
    logger.error(err);
  }
};

module.exports = {
  getAll,
  getRemaining,
  getCompleted,
  postTodo,
  updateTodo,
  deleteTodo,
};
