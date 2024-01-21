const taskModel = require("../models/taskModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");



module.exports = {
    createTask: async (body) => {
        try {
            const taskId = uuidv4();


            const task = await taskModel.createTask(body, taskId);

            if (task.error) {
                return {
                    error: task.error,
                }
            }
            return {
                response: task.response,
            }

        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
    getAllTasks: async (query) => {
        try {


            const task = await taskModel.getAllTasks(query);
            const names = await taskModel.getProjectMembers(task);


            if (names.error) {
                return {
                    error: names.error,
                }
            }
            return {
                response: names.response,
            }

        }
        catch (error) {
            return {
                error: error,
            };
        }
    },

    getTaskByUserId: async (query) => {
        try {


            const task = await taskModel.getTaskByUserId(query);


            if (task.error) {
                return {
                    error: task.error,
                }
            }
            return {
                response: task.response,
            }

        }
        catch (error) {
            return {
                error: error,
            };
        }
    },
    deleteTask: async (query) => {
        try {


            const task = await taskModel.deleteTask(query.taskId);

            if (task.error) {
                return {
                    error: task.error,
                }
            }
            return {
                response: task.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
    updateTask: async (body) => {
        try {
            const isTask = await taskModel.getTaskById(body.taskId);
            console.log("isUser", isTask)
            if (!isTask.response || isTask.error) {
                return {
                    error: "task does not exist",
                }
            }


            const task = await taskModel.updateTask(body);

            if (task.error) {
                return {
                    error: task.error,
                }
            }
            return {
                response: task.response,
            }


        }

        catch (error) {
            return {
                error: error,
            };
        }
    },
};