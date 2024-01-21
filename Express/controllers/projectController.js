const projectModel = require("../models/projectModel");
const projectService = require("../services/projectService");
const joi = require("joi");



const createProjectSchema = joi.object().keys({
    title: joi.string().required().min(3).max(20),
    description: joi.string().required().min(5).max(100),
    instructorId: joi.string().required(),
    projectEnding: joi.date().required(),
    projectStarting: joi.date().required(),
    projectTag: joi.string().required(),
})

const updateProjectSchema = joi.object().keys({
    projectId: joi.string().required(),
    title: joi.string().min(3).max(20),
    description: joi.string().min(5).max(100),
    projectEnding: joi.date(),
    projectStarting: joi.date(),
    projectTag: joi.string(),
    status: joi.string()
})
const getByProjectIdSchema = joi.object().keys({
    projectId: joi.string().required(),
})
const InsProjectSchema = joi.object().keys({
    instructorId: joi.string().required(),
    projectTag:joi.string().required()
})
const UserProjectSchema = joi.object().keys({
    userId: joi.string().required(),
})

module.exports = {
    createProject: async (req, res) => {
        try {
            const validate = await createProjectSchema.validateAsync(req.body);
            console.log("req.body")
            const project = await projectService.createProject(validate);
            if (project.error) {
                return res.send({
                    error: project.error,
                });

            }
            return res.send({
                response: project.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

    deleteProject: async (req, res) => {
        try {
            console.log(req.query)
            const validate = await getByProjectIdSchema.validateAsync(req.query);

            const project = await projectModel.deleteProject(validate);
            console.log(project)


            if (project.error) {
                return res.send({
                    error: project.error,
                });

            }
            return res.send({
                response: project.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllProjects: async (req, res) => {
        try {


            console.log("check 1", req.query)
            const projects = await projectService.getAllProjects(req.query);
            console.log("check 2", projects)
            if (projects.error) {
                return res.send({
                    error: projects.error,
                });

            }
            return res.send({
                response: projects.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getInsProjects: async (req, res) => {
        try {


            const validate = await InsProjectSchema.validateAsync(req.query);
            const projects = await projectService.getInsProjects(validate);
            console.log(validate)
            if (projects.error) {
                return res.send({
                    error: projects.error,
                });

            }
            return res.send({
                response: projects.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },


    getUserProject: async (req, res) => {
        try {


            const validate = await UserProjectSchema.validateAsync(req.query);
            const projects = await projectService.getUserProject(validate);
            console.log("controller",projects)

            console.log(validate)
            
            return res.send({
                response: projects,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },


    updateProject: async (req, res) => {
        try {
            const validate = await updateProjectSchema.validateAsync(req.body);

            const project = await projectService.updateProject(validate);
            console.log("user", project)
            if (project.error) {
                return res.send({
                    error: project.error,
                });

            }
            return res.send({
                response: project.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },


}