const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createProject: async (body, projectId) => {
        try {
            const project = await models.Projects.create({
                projectId,
                ...body
            })
            return {
                response: project,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    deleteProject: async (query) => {
        try {
            const project = await models.Projects.destroy({
                where: {
                    projectId: query.projectId,
                }
            })
            console.log(project)

            return {
                response: project,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getProjectById: async (projectId) => {
        try {
            const project = await models.Projects.findOne({
                where: {
                    projectId: projectId,
                }
            })
            return {
                response: project,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getAllProjects: async (query) => {
        try {

            const projects = await models.Projects.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where:
                {

                    instructorId: query.instructorId

                },



            })
            return {
                response: projects,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getInsProjects: async (query) => {
        try {

            const projects = await models.Projects.findAll({
                // attributes : ["firstName", "lastName", "role", "email"]
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    instructorId: query.instructorId,
                    projectTag:query.projectTag
                }
            })
            return {
                response: projects,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getUserProject: async (query) => {
        try {
            let project;
            let teamLeader;

            const isUser = await models.TeamMembers.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    userId: query.userId,
                }
            });

            console.log("isUser", isUser);
            console.log("isUser length", isUser.teamId);

            if (isUser) {
                const team = await models.Teams.findOne({
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"],
                    },
                    where: {
                        teamId: isUser.teamId,
                    }
                });

                console.log("team", team);

                project = await models.Projects.findOne({
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"],
                    },
                    where: {
                        projectId: team.projectId,
                    }
                });

                console.log("project", project);

                teamLeader = team.teamLeader; // Assuming teamLeader is a property of the team object
            }

            return {
                response: {
                    project: project,
                    teamLeader: teamLeader,
                },
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getUserNames: async (query) => {
        try {
        
console.log("quer",query)
            console.log("queryyy", query.response.project.dataValues.instructorId)

            const instructor = await models.Users.findOne({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
                where: {
                    userId: query.response.project.dataValues.instructorId,
                }
            });

            console.log("instructor", instructor);
            console.log("isUser length", instructor.firstName+instructor.lastName);

            
                const user = await models.Users.findOne({
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"],
                    },
                    where: {
                        userId: query.response.teamLeader,
                    }
                });

                console.log("user", user.dataValues.firstName);

               


            
            return {
                response: {
                    instructorName: instructor.firstName +" "+ instructor.lastName,
                    leaderName: user.dataValues.firstName + " " + user.dataValues.lastName,
                },
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    updateProject: async (body) => {
        try {
            console.log("body",body)
            const project = await models.Projects.update({
                ...body
            }, {
                where: {

                    projectId: body.projectId,
                }
            })
            return {
                response: project,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },




};