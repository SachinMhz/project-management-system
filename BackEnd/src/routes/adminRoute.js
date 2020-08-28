const router = require("express").Router();
const userController = require("../controllers/usersController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const commentController = require("../controllers/commentController");
const tagController = require("../controllers/tagController");

// CRUD on users
router.route("/users").get(userController.getAllUsers);
router.route("/user/:user_id").get(userController.getUser);
router.route("/users-tagged/:task_id").get(userController.getTaggedUserInTask);
router
  .route("/user-on-project/:project_id")
  .get(userController.getAllUsersAssignedOnProject);
router.route("/users-update").put(userController.updateUser);
router.route("/users-delete").put(userController.deleteUser);

router.route("/user-pm").get(userController.getProjectManagers);
router.route("/user-tm").get(userController.getTeamLeaders);
router.route("/user-eng").get(userController.getEngineers);

// CRUD on projects
router.route("/projects").get(projectController.getAllProjects);
router.route("/project/:project_id").get(projectController.getProjectInfo);
router.route("/projects-enrolled").get(projectController.getProjectEnrolled);
router.route("/projects-create").post(projectController.createProject);
router.route("/projects-update").put(projectController.updateProject);
router.route("/projects-delete").delete(projectController.deleteProject);

router.route("/user-on-project").post(projectController.addUserToProject);

//CRUD on tasks
router.route("/tasks/:project_id").get(taskController.getAllTasksFromProject);
router.route("/task/:task_id").get(taskController.getTaskInfo);
router.route("/tasks-user").get(taskController.getUserTasksFromProject);
router.route("/tasks-create").post(taskController.createTask);
router.route("/tasks-update").put(taskController.updateTask);
router.route("/tasks-change-user").put(taskController.changeUser);
router.route("/tasks-delete").delete(taskController.deleteTask);

//CRUD on tasks
router
  .route("/comments/:task_id")
  .get(commentController.getAllCommentsFromTask);
router.route("/comment").get(commentController.getComment);
router.route("/comments-create").post(commentController.createComment);
router.route("/comments-update").put(commentController.updateComment);
router.route("/comments-delete").delete(commentController.deleteComment);

//CRUD on tasks
router.route("/tags").get(tagController.getAllTaggedTasks);
router.route("/tags-users/:task_id").get(tagController.getTaggedUsersOnTask);
// router.route("/tag").get(tagController.get);
router.route("/tags-create").post(tagController.createTag);
// router.route("/tags-update").put(tagController.updateComment);
router.route("/tags-delete").delete(tagController.deleteTag);

module.exports = router;
