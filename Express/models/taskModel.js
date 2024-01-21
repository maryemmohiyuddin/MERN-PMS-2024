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
    getProjectMembers: async (namesArray) => {
        try {
            console.log("Array", namesArray.response)
            const results = [];

            for (const item of namesArray.response) {
                console.log("Array", item.title)

                const project = await models.Projects.findOne({
                    where: {
                        projectId: item.projectId,
                    },
                    attributes: ["title"],
                });

                const teamMember = await models.TeamMembers.findOne({
                    where: {
                        teamMemberId: item.teamMemberId,
                    },
                    attributes: ["userId"],
                });

                const user = await models.Users.findOne({
                    where: {
                        userId: teamMember.userId,
                    },
                    attributes: ["firstName", "lastName"],

                });

                results.push({
                    projectId: item.projectId,
                    teamMemberId: item.teamMemberId,
                    project: project.dataValues,
                    teamMember: teamMember.dataValues,
                    user: user.dataValues,
                    taskTitle: item.title,
                    taskDes: item.description,
                    taskId: item.taskId,
                    status: item.status



                });
            }
            console.log("here", results)
            return {
                response: results,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },


    getAllTasks: async (query) => {
        try {
            const task = await models.Tasks.findAll({
                where: {
                    instructorId: query.instructorId
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
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

    deleteTask: async (taskId) => {
        try {

            const deletedTask = await models.Tasks.destroy({
                where: {
                    taskId: taskId,
                },
            });
            return {
                response: deletedTask,
            };
        } catch (error) {
            return {
                error: error,
            };
        }
    },

    getTaskById: async (taskId) => {
        try {
            const task = await models.Tasks.findOne({
                where: {
                    taskId: taskId,
                }
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
    getTaskByUserId: async (query) => {
        try {
            const memberId = await models.TeamMembers.findOne({
                where: {
                    userId: query.userId,
                },
                attributes: ["teamMemberId"],

            })
            console.log("memberId",memberId.dataValues.teamMemberId)
            if (memberId) {
                tasks = await models.Tasks.findAll({
                    where: {
                        teamMemberId: memberId.dataValues.teamMemberId,
                    }
                })
            }
            return {
                response: tasks,
            };


        } catch (error) {
            return {
                error: error,
            };
        }

    },
    updateTask: async (body) => {
        try {
            console.log("body", body)
            const task = await models.Tasks.update({
                ...body
            }, {
                where: {

                    taskId: body.taskId,
                }
            })
            return {
                response: task,
            };


        } catch (error) {
            console.log("error", error);
            return {
                error: error,
            };
        }

    },
};