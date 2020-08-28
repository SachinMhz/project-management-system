const router = require("express").Router();

//loading middlewares
const authenticate = require("./middlewares/authenticate");
const adminAuth = require("./middlewares/adminAuth");

//loading routes
const userRoute = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
// const allRoutes = require("./routes/allRoute")

router.use("/auth", authRoutes);

router.use("", authenticate, userRoute);

router.use("/admin", authenticate, adminAuth, adminRoute);

module.exports = router;
