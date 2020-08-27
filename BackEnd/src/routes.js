const router = require("express").Router();

//loading middlewares
const authenticate = require("./middlewares/authenticate");

//loading routes
const adminRoute = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoute");
const allRoutes = require("./routes/allRoute")

router.use("/auth", authRoutes);

router.use("/admin",authenticate, adminRoute);

router.use("/all",authenticate, allRoutes);

module.exports = router;
