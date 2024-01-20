const teamService = require("../services/teamService");
const joi = require("joi");



const createTeamSchema = joi.object().keys({
    leaderId: joi.string().required(),
    projectId: joi.string().required(),
    userId: joi.array().items(joi.string().uuid()).required(),
    instructorId: joi.string().required(),
    status: joi.string().valid("Pending", "Completed"),



})

const getByTeamIdSchema = joi.object().keys({
    teamId: joi.string().required()
})
const getTeamByProjectId = joi.object().keys({
    projectId: joi.string().required()
})

// const paginationSchema = joi.object().keys({
//     pageNo: joi.number().greater(0).default(1),
//     limit: joi.number().valid(5, 10).default(5),
//     sortValue: joi
//         .string()
//         .default("title"),
//     sortOrder: joi.valid("ASC", "DESC").default("ASC"),


// })

module.exports = {
    createTeam: async (req, res) => {
        try {
            console.log("how many req's",req.length)
            const validate = await createTeamSchema.validateAsync(req.body);
            console.log("here    ", validate)
            const team = await teamService.createTeam(validate);
            if (team.error) {
                return res.send({
                    error: team.error,
                });

            }
            return res.send({
                response: team.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

    deleteTeam: async (req, res) => {
        try {
            console.log(req.query)
            const validate = await getByTeamIdSchema.validateAsync(req.query);

            const team = await teamService.deleteTeam(validate);
            if (team.error) {
                return res.send({
                    error: team.error,
                });

            }
            return res.send({
                response: team.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllTeams: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const teams = await teamService.getAllTeams(req.query);

            console.log("teams", teams);
            if (teams.error) {
                return res.send({
                    error: teams.error,
                });

            }
            return res.send({
                response: teams.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllMembers: async (req, res) => {
        try {


            // const validate = await getMembersSchema.validateAsync(req.query);
            const members = await teamService.getAllMembers(req.query);
            console.log("query here                  ", req.query)
            if (members.error) {
                return res.send({
                    error: members.error,
                });

            }
            return res.send({
                response: members.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getTeamByProjectId: async (req, res) => {
        try {
            console.log("check1",req.query)
            const validate = await getTeamByProjectId.validateAsync(req.query);
            console.log("check2", validate)

            const members = await teamService.getTeamByProjectId(validate);
            // console.log("check3", members)
            if (members.error) {
                return res.send({
                    error: members.error,
                });

            }
            return res.send({
                response: members.response,
            });
        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getTeamMembers: async (req, res) => {
        try {
            const validate = await getByTeamIdSchema.validateAsync(req.query);
            const members = await teamService.getTeamMembers(validate);
            if (members.error) {
                return res.send({
                    error: members.error,
                });

            }
            return res.send({
                response: members.response,
            });
        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

}