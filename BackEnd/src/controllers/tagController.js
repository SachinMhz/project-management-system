const pool = require("../db");

//get all users
//method - get
//url - /api/admin/tags
const getAllTaggedTasks = async (req, res, next) => {
  try {
    const { task_id } = req.body;
    const tags = await pool.query(
      "SELECT * FROM tags WHERE task_id = $1 ORDER BY task_id ASC",
      [task_id]
    );
    res.json(tags.rows);
  } catch (err) {
    next(err);
  }
};

//get all users
//method - get
//url - /api/admin/tags-users/:task_id
const getTaggedUsersOnTask = async (req, res, next) => {
  try {
    const { task_id } = req.params;
    const tag = await pool.query(
      `SELECT DISTINCT tagged_id, display_name, email, user_id  FROM tags 
      INNER JOIN users ON tags.tagged_id = users.user_id
      WHERE task_id = $1`,
      [task_id]
    );
    res.json({ data: tag.rows, msg: "tagged user fetched success" });
  } catch (err) {
    next(err);
  }
};

//get all users
//method - get
//url - /api/admin/tags
const getTaggedUser = async (req, res, next) => {
  try {
    const { tag_id } = req.body;
    const tag = await pool.query(
      "SELECT * FROM tags WHERE tag_id = $1 ORDER BY tag_id ASC",
      [tag_id]
    );
    res.json(tag.rows[0]);
  } catch (err) {
    next(err);
  }
};

//get all users on project
//method - post
//url - /api/admin/tags-create
const createTag = async (req, res, next) => {
  try {
    req.checkBody("task_id").notEmpty().withMessage("Task Name is required");
    req
      .checkBody("tagged_id")
      .notEmpty()
      .withMessage("Tag should not be empty.");
    req
      .checkBody("tagger_id")
      .notEmpty()
      .withMessage("Tagger should not be empty.");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { task_id, tagger_id, tagged_id } = req.body;
      let query = `INSERT INTO tags (task_id, tagger_id,  tagged_id )
          VALUES ($1, $2, $3) RETURNING *`;

      let value = [task_id, tagger_id, tagged_id];
      try {
        const tag = await pool.query(query, value);
        res.json({
          data: tag.rows[0],
          error: tag.rows[0] ? "" : "tag was not created, check req.body",
          msg: "user tagged successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: "error inserting tag", status: 300, err });
      }
    }
  } catch (err) {
    next(err);
  }
};

//delete an user -- actually change role to inactive
//method - put
//url - /api/admin/tags-delete
const deleteTag = async (req, res, next) => {
  try {
    const { tag_id, user_id } = req.body;
    // const checkTag = await pool.query(
    //   `SELECT * FROM tasks WHERE tag_id = $1 AND tagger_id = $2 LIMIT 1`,
    //   [tag_id, user_id]
    // );
    // if(checkTag.rows[].length===0) next({msg:'tag_id or tagger_id not found in database', status:300})
    const tag = await pool.query(
      `DELETE FROM tags WHERE tag_id = $1 AND tagger_id = $2 RETURNING *`,
      [tag_id, user_id]
    );
    res.json({
      tag: tag.rows[0],
      error: tag.rows[0] ? "" : "tag was not deleted, check req.body",
      msg: "delete query was success",
      status: 200,
    });
  } catch (err) {
    next({ msg: "error loading from database", status: 300, err });
  }
};

module.exports = {
  getAllTaggedTasks,
  createTag,
  deleteTag,
  getTaggedUsersOnTask,
};
