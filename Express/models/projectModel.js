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