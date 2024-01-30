const requestController = require("../controllers/requestController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/submitRequest", requestController.submitRequest);
router.get("/getRequest", requestController.getRequest);
router.get("/getAllRequests", requestController.getAllRequests);
router.put("/updateRequest", requestController.updateRequest);

module.exports = router;

