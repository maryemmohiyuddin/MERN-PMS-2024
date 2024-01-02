const authController = require("../controllers/authController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);
router.get("/resetpswd", authController.resetpswd);
router.get("/forgotpswd", authController.forgotpswd);
router.get("/getsession", authController.getSession);


module.exports = router;

