const userService = require("../services/userService");
const joi = require("joi");



const createUserSchema = joi.object().keys({
    firstName: joi.string().required().min(3).max(20),
    lastName: joi.string().required().min(3).max(30),
    email: joi.string().required().email(),
    cohort: joi.string().required().min(3).max(30),
    stack: joi.string().required().min(3).max(30),
    password: joi.string().required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmPassword: joi.ref("password"),
    role: joi.string().valid("instructor", "trainee", "admin"),

})



const updateUserSchema = joi.object().keys({
    userId: joi.string().required(),
    firstName: joi.string().min(3).max(20),
    lastName: joi.string().min(3).max(30),
    email: joi.string().email(),
    cohort: joi.string().min(3).max(30),
    stack: joi.string().min(3).max(30),
    role: joi.string().valid("instructor", "trainee"),
    isApproved: joi.boolean(),
    isRequested: joi.boolean(),
    isBlocked: joi.boolean(),
    instructorId: joi.string()


})
const paginationSchema = joi.object().keys({
    pageNo: joi.number().required().greater(0),
    limit: joi.number().valid(5, 10),
    sortValue: joi.string().valid("firstName", "lastName", "email"),
    sortOrder: joi.string().valid("ASC", "DESC"),
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string(),
    role: joi.string().valid("instructor", "trainee"),

})
const getByUserIdSchema = joi.object().keys({
    userId: joi.string().required(),
})

module.exports = {
    createUser: async (req, res) => {
        try {
            const validate = await createUserSchema.validateAsync(req.body);
            console.log("req.body")
            const user = await userService.createUser(validate);
            if (user.error) {
                return res.send({
                    error: user.error,
                });

            }
            return res.send({
                response: user.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllUsers: async (req, res) => {
        try {


            // const validate = await paginationSchema.validateAsync(req.query);
            const users = await userService.getAllUsers(req.query);
            console.log(req.body)
            if (users.error) {
                return res.send({
                    error: users.error,
                });

            }
            return res.send({
                response: users.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

    deleteUser: async (req, res) => {
        try {
            console.log(req.query)
            const validate = await getByUserIdSchema.validateAsync(req.query);

            const user = await userService.deleteUser(validate);
            if (user.error) {
                return res.send({
                    error: user.error,
                });

            }
            return res.send({
                response: user.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    updateUser: async (req, res) => {
        try {
            const validate = await updateUserSchema.validateAsync(req.body);

            const user = await userService.updateUser(validate);
            console.log("user", user)
            if (user.error) {
                return res.send({
                    error: user.error,
                });

            }
            return res.send({
                response: user.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },
    getAllRequests: async (req, res) => {
        try {


            const users = await userService.getAllRequests();

            if (users.error) {
                return res.send({
                    error: users.error,
                });

            }
            return res.send({
                response: users.response,
            });

        }
        catch (error) {
            return res.send({
                error: error
            });
        };
    },

}