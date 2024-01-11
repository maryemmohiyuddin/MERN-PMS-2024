const teamService = require("../services/teamService");
const joi = require("joi");



const createTeamSchema = joi.object().keys({
    leaderId: joi.string().required(),
    projectId: joi.string().required(),
    userId: joi.array().items(joi.string().uuid()).required(),
    instructorId: joi.string().required()


})

const getMembersSchema = joi.object().keys({
    instructorId: joi.string().required()
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
            const validate = await createTeamSchema.validateAsync(req.body);
            console.log("here    ",validate)
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
console.log("query here                  ",req.query)
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