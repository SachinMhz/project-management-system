//importing files
const router = require("express").Router();
const controller = require("../controllers/authController");

//middlewares
const authenticate = require("../middlewares/authenticate");
const adminAuth = require("../middlewares/adminAuth");

router.route("/login").post(controller.login);

router
  .route("/register", adminAuth) 
  .post(controller.register);

module.exports = router;


// "editor.defaultFormatter": "vscode.typescript-language-features"