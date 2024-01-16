const projectModel = require("../models/projectModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");



module.exports = {
    createProject: async (body) => {
        try {
            const projectId = uuidv4();


            const project = await projectModel.createProject(body, projectId);

            if (project.error) {
                return {
                    error: project.error,
                }
            }
            return {
                response: project.response,
            }

        }
        catch (error) {
            return {
                error: error,
            };
        }
    },

    deleteProject: async (query) => {
        try {


            const project = await projectModel.deleteProject(query.projectId);

            if (project.error) {
                return {
                    error: project.error,
                }
            }
            return {
                response: project.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },


    getAllProjects: async (query) => {
        try {
            const projects = await projectModel.getAllProjects( query);
            if (projects.error) {
                return {
                    error: projects.error,
                }
            } return {
                response: projects.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    getInsProjects: async (query) => {
        try {

            const projects = await projectModel.getInsProjects(query);
            if (projects.error) {
                return {
                    error: projects.error,
                }
            } return {
                response: projects.response,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    updateProject: async (body) => {
        try {
            const isProject = await projectModel.getProjectById(body.projectId);
            console.log("isUser", isProject)
            if (!isProject.response || isProject.error) {
                return {
                    error: "project does not exist",
                }
            }


            const project = await projectModel.updateProject(body);

            if (project.error) {
                return {
                    error: project.error,
                }
            }
            return {
                response: project.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },

};