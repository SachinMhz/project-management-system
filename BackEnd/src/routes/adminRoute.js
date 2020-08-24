const router = require("express").Router();
const userController = require("../controllers/usersController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

// CRUD on users
router.route("/users").get(userController.getAllUsers);
router
  .route("/users-on-project")
  .get(userController.getAllUsersAssignedOnProject);
router.route("/users-update").put(userController.updateUser);
router.route("/users-delete").put(userController.deleteUser);

// CRUD on projects
router.route("/projects").get(projectController.getAllProjects);
router.route("/projects-enrolled").get(projectController.getProjectEnrolled);
router.route("/projects-create").post(projectController.createProject);
router.route("/projects-update").put(projectController.updateProject);
router.route("/projects-delete").delete(projectController.deleteProject);

//CRUD on tasks
router.route("/tasks").get(taskController.getAllTasksFromProject);
router.route("/tasks-user").get(taskController.getUserTasksFromProject);
router.route("/tasks-create").post(taskController.createTask);
router.route("/tasks-update").put(taskController.updateTask);
router.route("/tasks-change-user").put(taskController.changeUser);
router.route("/tasks-delete").delete(taskController.deleteTask);

module.exports = router;
