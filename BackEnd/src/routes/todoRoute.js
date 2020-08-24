const router = require("express").Router();

const controller = require("../controllers/todoController");

router.route("/").get(controller.getAll).post(controller.postTodo);

router
  .route("/:id")
  .put(controller.updateTodo)
  .delete(controller.deleteTodo);

router.route("/remaining").get(controller.getRemaining);

router.route("/completed").get(controller.getCompleted);

// router.route('/:id').get(controller.readToDo).delete(controller.deleteToDo).put(controller.updateToDo);

module.exports = router;
