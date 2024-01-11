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
    getAllProjects: async (query) => {
        try {
            const offset = (query.pageNo - 1) * query.limit;
            console.log(offset)
            const projects = await projectModel.getAllProjects(offset, query);
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
    deleteUser: async (query) => {
        try {


            const user = await userModel.deleteUser(query.userId);

            if (user.error) {
                return {
                    error: user.error,
                }
            }
            return {
                response: user.response,
            }


        }

        catch (error) {
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

    getAllRequests: async () => {
        try {
            const user = await userModel.getAllRequests();
            if (!user.response || user.error) {
                return {
                    error: "request does not exist",
                };
            }

            return {
                response: user.response,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
};