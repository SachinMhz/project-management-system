//importing files
const router = require("express").Router();
const userController = require("../controllers/usersController");
const projectController = require("../controllers/projectController");


router.route("/users").get(userController.getAllUsers);
router.route("/users-update").put(userController.updateUser);
router.route("/users-delete").put(userController.deleteUser);


router.route("/projects-create").post(projectController.createProject);
router.route("/projects-delete").delete(projectController.deleteProject);


module.exports = router;
