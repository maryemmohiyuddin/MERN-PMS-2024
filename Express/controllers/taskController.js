const taskService = require("../services/taskService");
const joi = require("joi");



const createTaskSchema = joi.object().keys({
    title: joi.string().required().min(3).max(20),
    description: joi.string().required().min(5).max(100),
    projectId: joi.string().required(),
    teamMemberId: joi.string().required()


})




// const paginationSchema = joi.object().keys({
//     pageNo: joi.number().greater(0).default(1),
//     limit: joi.number().valid(5, 10).default(5),
//     sortValue: joi
//         .string()
//         .default("title"),
//     sortOrder: joi.valid("ASC", "DESC").default("ASC"),
//     title: joi.string(),
//     instructorId: joi.string().required()

// })

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

}