const taskController = require("../controllers/taskController");
const router = require("express").Router();

router.post("/createTask", taskController.createTask);




module.exports = router;

