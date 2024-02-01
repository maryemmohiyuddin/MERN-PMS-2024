const teamModel = require("../models/teamModel");
const { v4: uuidv4 } = require("uuid");



module.exports = {
    createTeam: async (body) => {
        try {

            console.log("Service method started execution",body);

            const teamId = uuidv4();
            const membersArray = [];

            // Loop through the userIds array and create the members
            for (let traineeId of body.traineeId) {
                console.log("error")
                const member = {
                    traineeId: traineeId,
                    teamMemberId: uuidv4(),
                    teamId: teamId
                };
                membersArray.push(member);
            }

            console.log("Members Array:", membersArray);
            const team = await teamModel.createTeam(body, teamId, membersArray);

            if (team.error) {
                return {
                    error: team.error,
                }
            }

            return {
                response: team.response,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getAllTeams: async (query) => {
        try {
            const teams = await teamModel.getAllTeams(query);
            console.log("tea", teams.response)
            if (teams.error) {
                return {
                    error: teams.error,
                }
            }

            const teamResponses = [];
            console.log("length", teams.response.length)
            for (let i = 0; i < teams.response.length; i++) {
                const teamId = teams.response[i].team.dataValues.teamId;
                const memberslength = teams.response[i].membersLength
                ;

                console.log("if its fetching",teams.response[i].team.dataValues.teamId)
                const projectId = teams.response[i].team.dataValues.projectId;
console.log("ccc",teamId,projectId)
                const isTeam = await teamModel.getTeamById( projectId);

                // console.log("isTeam",isTeam.response)
                if (!isTeam.response || isTeam.error) {
                    continue; // Skip this team and move to the next one
                }

                // Extract the required information from the response
                const teamInfo = {
                    teamId: teamId,
                    projectTitle: isTeam.response.projectTitle,
                    memberslength:memberslength
                     // Assuming 'projectName' is the property name in the response
                };

                teamResponses.push(teamInfo);
            }
console.log("tt",teamResponses)
            return {
                response: teamResponses,
            };

        } catch (error) {
            return {
                error: error,
            };
        }
    },

    deleteTeam: async (query) => {
        try {


            const team = await teamModel.deleteTeam(query.teamId);

            if (team.error) {
                return {
                    error: team.error,
                }
            }
            return {
                response: team.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },

    getAllMembers: async (query) => {
        try {

            const teamMembers = await teamModel.getAllMembers(query);

            if (teamMembers.error) {
                return {
                    error: teamMembers.error,
                }

            } return {
                response: teamMembers.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getUserMembers: async (query) => {
        try {

            const teamMembers = await teamModel.getUserMembers(query);
console.log("service",teamMembers)
            if (teamMembers.error) {
                return {
                    error: teamMembers.error,
                }

            } return {
                response: teamMembers.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getTeamByProjectId: async (query) => {
        try {

            // const teamMembers = await teamModel.getTeamMembers(query);
            const MembersName = await teamModel.getTeamByProjectId(query);
            if (MembersName.error) {
                return {
                    error: MembersName.error,
                }

            } return {
                response: MembersName.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getTeamMembers: async (query) => {
        try {

            const teamMembers = await teamModel.getTeamMembers(query);
            console.log("3rd query for members", teamMembers)

        const MembersName=await teamModel.getMemberById(teamMembers);
            console.log("4th query for members", MembersName)

            if (MembersName.error) {
                return {
                    error: MembersName.error,
                }

            } return {
                response: MembersName.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

};