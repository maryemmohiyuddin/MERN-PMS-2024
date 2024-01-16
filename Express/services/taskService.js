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
};