const pool = require("../db");

//get all users
//method - get
//url - /api/admin/comments/:task_id
const getAllCommentsFromTask = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const comments = await pool.query(
      "SELECT * FROM comments WHERE task_id = $1 ORDER BY task_id ASC",
      [task_id]
    );
    res.json({ data: comments.rows, msg: "comment successfully fetched" });
  } catch (err) {
    next(err);
  }
};

//get all users
//method - get
//url - /api/admin/comments
const getComment = async (req, res, next) => {
  try {
    const { comment_id } = req.body;
    const comment = await pool.query(
      "SELECT * FROM comments WHERE comment_id = $1 ORDER BY comment_id ASC",
      [comment_id]
    );
    res.json(comment.rows[0]);
  } catch (err) {
    next(err);
  }
};

//get all users on project
//method - post
//url - /api/admin/comments-create
const createComment = async (req, res, next) => {
  try {
    req.checkBody("task_id").notEmpty().withMessage("Task Name is required");
    req
      .checkBody("comment")
      .notEmpty()
      .withMessage("Comment should not be empty.");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { task_id, commenter_id, commenter_name, comment } = req.body;
      let query = `INSERT INTO comments (task_id, comment,  commenter_name, commenter_id )
      VALUES ($1, $2, $3, $4) RETURNING *`;

      let value = [task_id, comment, commenter_name, commenter_id];
      try {
        const comment = await pool.query(query, value);
        res.json({
          data: comment.rows[0],
          msg: "comment added successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: err, status: 300, u_msg: "error inserting comment" });
      }
    }
  } catch (err) {
    next(err);
  }
};

//update an user
//method - put
//url - /api/admin/comments-update
const updateComment = async (req, res, next) => {
  try {
    req
      .checkBody("comment")
      .notEmpty()
      .withMessage("Comment should not be empty.");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { comment, comment_id } = req.body;

      let query = `UPDATE comments SET comment = $1
                     WHERE comment_id = $2  RETURNING *`;

      let value = [comment, comment_id];
      try {
        const comment = await pool.query(query, value);
        res.json({
          comment: comment.rows[0],
          msg: "comment updated successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: err, status: 300, u_msg: "error updating comment" });
      }
    }
  } catch (err) {
    next(err);
  }
};

//delete an user -- actually change role to inactive
//method - put
//url - /api/admin/comments-delete
const deleteComment = async (req, res, next) => {
  try {
    const { comment_id, user_id } = req.body;
    const comment = await pool.query(
      `DELETE FROM comments WHERE comment_id = $1 AND commenter_id = $2 RETURNING *`,
      [comment_id, user_id]
    );
    res.json({
      comment: comment.rows[0],
      msg: "comment successfully Deleted",
      status: 200,
    });
  } catch (err) {
    next({ msg: "error loading from server", status: 300, err });
  }
};

module.exports = {
  getAllCommentsFromTask,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
