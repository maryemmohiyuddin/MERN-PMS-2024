const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createTeam: async (body, teamId, membersArray) => {
        console.log("m", membersArray);
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

            // Add the team leader as a normal team member
            await models.TeamMembers.create({
                teamMemberId: body.leaderId,
                teamId: team.teamId,
                userId: body.leaderId,
                // ... any other fields
            });

            const project = await models.Projects.update({
                projectTag: 'Assigned',
                status: 'Pending'
            }, {
                where: {
                    projectId: body.projectId,
                }
            });

            // Associate other members with the team
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
    getMemberById: async (teammembers) => {
        try {
            let memberDetails = [];
console.log("teammebers",teammembers)
            // Assuming teammembers.response is an array of objects

            for (let i = 0; i < teammembers.response.length; i++) {
                console.log(teammembers.response[i].dataValues.userId)
                        console.log("mmm", member);

                        const userDetails = await models.Users.findOne({
                            where: {
                                userId: teammembers.response[i].dataValues.userId
                            },
                            attributes: ['firstName', 'lastName']
                        });

                        // Check if userDetails is not null before pushing to the array
                        if (userDetails) {
                            memberDetails.push({
                                userId: teammembers.response[i].dataValues.userId,
                                firstName: userDetails.firstName,
                                lastName: userDetails.lastName
                            });
                        
                    
                }
            }

            console.log("array", memberDetails);

            return {
                response: memberDetails
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    }
,
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

    getTeamMembers: async (query) => {
        try {
          
            const teamMembers = await models.TeamMembers.findAll({
                where: {
                    teamId: query.teamId
                },
                attributes: ['userId','teamMemberId']
            });
console.log("model",teamMembers)
            return {
                response: teamMembers,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },

    deleteTeam: async (teamId) => {
        try {
            // Fetch the team before destroying it to access its projectId
            const team = await models.Teams.findOne({
                where: {
                    teamId: teamId,
                },
            });

            if (!team) {
                return {
                    error: "Team not found",
                };
            }

            // Destroy the team
            const deletedTeam = await models.Teams.destroy({
                where: {
                    teamId: teamId,
                },
            });

            // Fetch the associated project
            const project = await models.Projects.findOne({
                where: { projectId: team.projectId },
            });

            // Update the projectTag to 'unassigned'
            if (project) {
                await project.update({ projectTag: 'Unassigned' });
            }

            return {
                response: deletedTeam,
            };
        } catch (error) {
            return {
                error: error.message,
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
};