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

//update an user
//method - put
//url - /api/admin/tags-update
const updateTag = async (req, res, next) => {
  try {
    req.checkBody("tag").notEmpty().withMessage("Tag should not be empty.");

    let errors = req.validationErrors();

    if (errors) {
      next({ msg: errors[0].msg, status: 300 });
    } else {
      const { tag, tag_id } = req.body;

      let query = `UPDATE tags SET tag = $1
                     WHERE tag_id = $2  RETURNING *`;

      let value = [tag, tag_id];
      try {
        const tag = await pool.query(query, value);
        res.json({
          tag: tag.rows[0],
          msg: "tag updated successfully",
          status: 200,
        });
      } catch (err) {
        next({ msg: err, status: 300, u_msg: "error updating tag" });
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
};
