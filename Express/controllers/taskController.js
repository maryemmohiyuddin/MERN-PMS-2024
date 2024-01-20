const taskService = require("../services/taskService");
const joi = require("joi");

const createTaskSchema = joi.object().keys({
    title: joi.string().required().min(3).max(20),
    description: joi.string().required().min(5).max(100),
    projectId: joi.string().required(),
    teamMemberId: joi.string().required(),
    instructorId: joi.string().required()
})

const getTaskSchema = joi.object().keys({
    instructorId: joi.string().required()
})
const getByTaskIdSchema = joi.object().keys({
    taskId: joi.string().required()
})


const updateTaskSchema = joi.object().keys({
    taskId: joi.string().required(),
    title: joi.string().min(3).max(20),
    description: joi.string().min(5).max(100),
    status: joi.string()
})
module.exports = {
    createTask: async (req, res) => {
        try {
            const validate = await createTaskSchema.validateAsync(req.body);
            console.log("req.body")
            const task = await taskService.createTask(validate);
            if (task.error) {
                return res.send({
                    error: task.error,
                });

            }
            return res.send({
                response: task.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllTasks: async (req, res) => {
        try {
            const validate = await getTaskSchema.validateAsync(req.query);
            console.log("req.body")
            const task = await taskService.getAllTasks(validate);
            if (task.error) {
                return res.send({
                    error: task.error,
                });

            }
            return res.send({
                response: task.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    deleteTask: async (req, res) => {
        try {
            console.log(req.query)
            const validate = await getByTaskIdSchema.validateAsync(req.query);

            const task = await taskService.deleteTask(validate);
            if (task.error) {
                return res.send({
                    error: task.error,
                });

            }
            return res.send({
                response: task.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    updateTask: async (req, res) => {
        try {
            const validate = await updateTaskSchema.validateAsync(req.body);

            const task = await taskService.updateTask(validate);
            console.log("user", task)
            if (task.error) {
                return res.send({
                    error: task.error,
                });

            }
            return res.send({
                response: task.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
}