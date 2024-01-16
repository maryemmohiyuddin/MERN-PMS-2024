const { models } = require("./index");
const { Op } = require("sequelize");

module.exports = {
    createTask: async (body, taskId) => {
        try {
            const task = await models.Tasks.create({
                taskId,
                ...body
            })
            return {
                response: task,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },

    getInstructorTasks: async (query) => {
        try {
            const task = await models.Tasks.findAll({
                where: {
                    teamMemberId:query.teamMemberId,  
                    projectId:query.projectId            
                },
                attributes: {
                    exclude: [ "createdAt", "updatedAt", "deletedAt"],
                },
            });
            return {
                response: task,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },
    };