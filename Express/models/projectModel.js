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
    getAllProjects: async (offset, query) => {
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
    updateProject: async (body) => {
        try {
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