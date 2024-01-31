const instructorController = require("../controllers/instructorController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/createInstructor", instructorController.createInstructor);
router.get("/getUserByUserId", instructorController.getUserByUserId);
router.get("/getAllInstructors", instructorController.getAllInstructors);
router.get("/getInsById", instructorController.getInsById);
// router.delete("/deleteUser", userController.deleteUser);
// router.put("/updateUser", userController.updateUser);
router.put("/updateProfile", instructorController.updateProfile);
// router.get("/getAllRequests", userController.getAllRequests);
router.get("/getAllStatistics", instructorController.getAllStatistics);




module.exports = router;

