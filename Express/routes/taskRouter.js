const taskController = require("../controllers/taskController");
const router = require("express").Router();

router.post("/createTask", taskController.createTask);
router.get("/getAllTasks", taskController.getAllTasks);
router.get("/getTaskByUserId", taskController.getTaskByUserId);
router.delete("/deleteTask", taskController.deleteTask);
router.put("/updateTask", taskController.updateTask);




module.exports = router;

