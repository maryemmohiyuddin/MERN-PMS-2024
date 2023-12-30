const userController = require("../controllers/userController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/createUser", userController.createUser);
router.post("/getAllUsers", userController.getAllUsers);
router.delete("/deleteUser", userController.deleteUser);
router.put("/updateUser", userController.updateUser);
router.get("/getAllRequests", userController.getAllRequests);



module.exports = router;

