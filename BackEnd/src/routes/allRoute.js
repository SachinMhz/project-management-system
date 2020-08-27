const router = require("express").Router();
const userController = require("../controllers/usersController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const commentController = require("../controllers/commentController");
const tagController = require("../controllers/tagController");

// CRUD on users
router.route("/user/:user_id").get(userController.getUser);

// // CRUD on projects
router.route("/projects").get(projectController.getAllProjects);
// router.route("/project").get(projectController.getAllProjects);
router.route("/project-enrolled").get(projectController.getProjectEnrolled);
// router.route("/projects-create").post(projectController.createProject);
// router.route("/projects-update").put(projectController.updateProject);
// router.route("/projects-delete").delete(projectController.deleteProject);

// //CRUD on tasks
// router.route("/tasks").get(taskController.getAllTasksFromProject);
// router.route("/tasks-user").get(taskController.getUserTasksFromProject);
// router.route("/tasks-create").post(taskController.createTask);
// router.route("/tasks-update").put(taskController.updateTask);
// router.route("/tasks-change-user").put(taskController.changeUser);
// router.route("/tasks-delete").delete(taskController.deleteTask);

// //CRUD on tasks
// router.route("/comments").get(commentController.getAllCommentsFromTask);
// router.route("/comment").get(commentController.getComment);
// router.route("/comments-create").post(commentController.createComment);
// router.route("/comments-update").put(commentController.updateComment);
// router.route("/comments-delete").delete(commentController.deleteComment);

// //CRUD on tasks
// router.route("/tags").get(tagController.getAllTaggedTasks);
// // router.route("/tag").get(tagController.get);
// router.route("/tags-create").post(tagController.createTag);
// // router.route("/tags-update").put(tagController.updateComment);
// router.route("/tags-delete").delete(tagController.deleteTag);

module.exports = router;