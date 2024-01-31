const requestController = require("../controllers/requestController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/submitRequest", requestController.submitRequest);
router.get("/getRequest", requestController.getRequest);
router.get("/getTaskRequest", requestController.getTaskRequest);
router.put("/approveTaskRequest", requestController.approveTaskRequest);
router.get("/getAllRequests", requestController.getAllRequests);
router.post("/taskRequest", requestController.taskRequest);
router.put("/updateRequest", requestController.updateRequest);

module.exports = router;

