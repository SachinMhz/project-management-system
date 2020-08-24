const router = require("express").Router();

//loading middlewares
const authenticate = require("./middlewares/authenticate");

//loading routes
const adminRoute = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");

router.use("/auth", authRoutes);

router.use("/admin",authenticate, adminRoute);

module.exports = router;
