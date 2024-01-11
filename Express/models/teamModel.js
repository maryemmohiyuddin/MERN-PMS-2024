const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createTeam: async (body, teamId, membersArray) => {
        console.log("m", membersArray)
        let team;

        try {
            // Create the team
            team = await models.Teams.create({
                teamId,
                teamLeader: body.leaderId,
                userId: body.userId,
                projectId: body.projectId,
                instructorId: body.instructorId
            });

            // Associate members with the team
            if (membersArray && membersArray.length > 0) {
                for (let member of membersArray) {
                    await models.TeamMembers.create({
                        teamMemberId: member.teamMemberId,
                        teamId: team.teamId,
                        userId: member.userId,
                        // ... any other fields
                    });
                }
            }

            return {
                response: team,
            };

        } catch (error) {
            // If there's an error, attempt to undo changes
            try {
                if (team) {
                    await team.destroy({ force: true });
                }
            } catch (rollbackError) {
                // Handle the rollback error here
                console.error("Error during rollback:", rollbackError);
            }

            return {
                error: error,
            };
        }
    },

    getTeamById: async (teamLeader, projectId) => {
        try {
            // Fetch user details from the Users table
            // console.log("teamLeader", teamLeader)
            const user = await models.Users.findOne({
                where: {
                    userId: teamLeader  // Assuming teamLeaderId corresponds to id in the Users table
                },
                attributes: ['firstName', 'lastName']  // Specify the attributes you want from the Users table
            });

            // Fetch project details from the Projects table
            const project = await models.Projects.findOne({
                where: {
                    projectId: projectId
                },
                attributes: ['title']  // Specify the attributes you want from the Projects table
            });
            // console.log("username", user.firstName)
            // console.log("username", user.lastName)

            return {
                response: {
                    userName: user ? user.firstName + " " + user.lastName : null,
                    projectTitle: project ? project.title : null
                }
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    }
    ,
    getUserByEmail: async (userId) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getAllMembers: async (query) => {
        try {
            // Step 1: Fetch all trainees from the Users table
            const trainees = await models.Users.findAll({
                where: {
                    role: 'trainee',
                    isBlocked: 'false',
                    isApproved: 'true',
                    instructorId: query.instructorId
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                }
            });

            // Step 2: Extract all userIds from the trainees
            const userIds = [];
            for (let i = 0; i < trainees.length; i++) {
                userIds.push(trainees[i].userId);
            }

            // Step 3: Fetch all userIds from the teamMembers table
            const teamMembers = await models.TeamMembers.findAll({
                where: {
                    userId: userIds
                },
                attributes: ['userId']
            });

            // Step 4: Extract all userIds from the teamMembers
            const teamMemberUserIds = [];
            for (let i = 0; i < teamMembers.length; i++) {
                teamMemberUserIds.push(teamMembers[i].userId);
            }

            // Step 5: Filter out the trainees whose userId exists in the teamMemberUserIds
            const filteredTrainees = [];
            for (let i = 0; i < trainees.length; i++) {
                if (!teamMemberUserIds.includes(trainees[i].userId)) {
                    filteredTrainees.push(trainees[i]);
                }
            }

            return {
                response: filteredTrainees,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },


    getAllTeams: async (query) => {
        try {
            // console.log("model", offset, query)

            const teams = await models.Teams.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    instructorId: query.instructorId
                }

            })




            return {
                response: teams,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    deleteUser: async (userId) => {
        try {
            const user = await models.Users.destroy({
                where: {
                    userId: userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    updateUser: async (body) => {
        try {
            const user = await models.Users.update({
                ...body
            }, {
                where: {

                    userId: body.userId,
                }
            })
            return {
                response: user,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },



    getAllRequests: async () => {
        try {
            const user = await models.Users.findAll({
                where: {
                    isRequested: true,
                    isApproved: false,
                    isBlocked: false
                },
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt", "deletedAt"],
                },
            });
            return {
                response: user,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
};