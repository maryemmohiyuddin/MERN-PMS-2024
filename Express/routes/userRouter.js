const userController = require("../controllers/userController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/createUser", userController.createUser);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getAllInstructors", userController.getAllInstructors);
router.get("/getUserByUserId", userController.getUserByUserId);
router.delete("/deleteUser", userController.deleteUser);
router.put("/updateUser", userController.updateUser);
router.put("/updateProfile", userController.updateProfile);

router.get("/getAllRequests", userController.getAllRequests);
router.get("/getAllStatistics", userController.getAllStatistics);




module.exports = router;

