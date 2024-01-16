const teamController = require("../controllers/teamController");
const router = require("express").Router();
const { trainee, instructor } = require("../middleware")

router.post("/createTeam", teamController.createTeam);
router.get("/getAllTeams", teamController.getAllTeams);
router.get("/getAllMembers", teamController.getAllMembers);
router.get("/getTeamMembers", teamController.getTeamMembers);

router.delete("/deleteTeam", teamController.deleteTeam);





module.exports = router;

